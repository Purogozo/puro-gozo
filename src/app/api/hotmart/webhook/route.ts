// Route Handler · Webhook da Hotmart → evento Purchase na CAPI
// A Hotmart chama esta URL quando uma compra muda de status. Validamos o
// hottok, e em compra aprovada disparamos "Purchase" pro Meta com os dados do
// comprador (email/telefone/nome hasheados — casamento server-side, sem cookie).
//
// ⚠️ MAPEAMENTO DO PAYLOAD: baseado no webhook Hotmart 2.0.0. Confira os campos
// contra o "Simular postback" no painel da Hotmart e ajuste os caminhos abaixo
// se a sua versão diferir. Os acessos são defensivos (optional chaining).
//
// ⚠️ NÃO habilite ao mesmo tempo a integração nativa Hotmart→Meta para o MESMO
// Pixel: o Purchase sairia por dois caminhos com event_id diferente = duplicado.
// Escolha UM: este webhook OU a integração nativa.

import { after } from "next/server";
import type { NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { shortIdToUuid } from "@/lib/shortid";
import {
  hashCity,
  hashCountry,
  hashEmail,
  hashExternalId,
  hashName,
  hashPhone,
  hashState,
  hashZip,
  sendCapiEvents,
  type CapiEvent,
} from "@/lib/meta-capi";
import { OFFER_CURRENCY } from "@/lib/config";
import { sbSelect, sbUpsert, supabaseReady } from "@/lib/supabase";

// event_source_url exigido pela Meta quando action_source = "website".
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.reconectasexualidade.com.br";

/** Comparação em tempo constante — `===` vaza o tamanho do prefixo correto. */
function safeEqual(a: string | undefined, b: string): boolean {
  if (!a) return false;
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HOTTOK = process.env.HOTMART_HOTTOK ?? "";

const UUID_RE =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

// O xcod sai daqui com o id da sessão em 24 caracteres alfanuméricos (ver
// goCheckout em QuizFlow.tsx) e volta no webhook — é o que liga a venda à
// sessão de quiz e permite reidratar fbp/fbc/IP/user-agent.
//
// A doc 2.0.0 diz que o campo é `data.purchase.origin.xcod`, MAS o changelog
// de 25/04/2024 chama o mesmo campo de `xcode` (com "e"). Como não dá pra
// saber qual chega no wire, procuramos os caminhos prováveis e, se falhar,
// varremos o payload inteiro atrás de qualquer chave "xcod"/"xcode".
// O console.info em lookupSession mostra o que veio — conferir no log após a
// primeira venda real e então fixar o caminho.
function extractXcod(payload: Record<string, unknown>): string | null {
  const data = (payload.data ?? {}) as Record<string, unknown>;
  const purchase = (data.purchase ?? {}) as Record<string, unknown>;
  const origin = (purchase.origin ?? {}) as Record<string, unknown>;

  const candidatos = [
    origin.xcod,
    origin.xcode,
    purchase.xcod,
    (data.origin as Record<string, unknown> | undefined)?.xcod,
    payload.xcod,
  ];
  for (const c of candidatos) {
    if (typeof c === "string" && c) return c;
  }

  // fallback: busca recursiva por qualquer chave chamada "xcod"
  let achado: string | null = null;
  const visitar = (v: unknown, prof = 0) => {
    if (achado || prof > 6 || !v || typeof v !== "object") return;
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (achado) return;
      const chave = k.toLowerCase();
      if ((chave === "xcod" || chave === "xcode") && typeof val === "string" && val) {
        achado = val;
        return;
      }
      visitar(val, prof + 1);
    }
  };
  visitar(payload);
  return achado;
}

// O xcod carrega SÓ o id da sessão, em 24 caracteres alfanuméricos.
// Aceita também o formato ANTIGO (`path_perfil_variante_uuid`) para não perder
// vendas de quem clicou no checkout antes deste deploy e comprou depois.
function parseXcod(xcod: string | null): string | null {
  if (!xcod) return null;
  const limpo = xcod.trim();

  // formato atual: 24 chars base62
  const porShortId = shortIdToUuid(limpo);
  if (porShortId) return porShortId;

  // formato legado: UUID cru em algum lugar da string
  const m = limpo.match(UUID_RE);
  return m ? m[0] : null;
}

/** Busca os sinais de navegador da sessão que originou a compra. */
async function lookupSession(payload: Record<string, unknown>): Promise<{
  session_id: string;
  visitor_id?: string;
  fbp?: string;
  fbc?: string;
  client_ip?: string;
  user_agent?: string;
  landing_url?: string;
  path?: string;
  profile?: string;
  variant?: string;
} | null> {
  if (!supabaseReady) return null;

  const xcod = extractXcod(payload);
  console.info("[hotmart] xcod recebido:", xcod ?? "(nenhum)");

  const sessionId = parseXcod(xcod);
  if (!sessionId) return null;

  const rows = await sbSelect<{
    session_id: string;
    visitor_id?: string;
    fbp?: string;
    fbc?: string;
    client_ip?: string;
    user_agent?: string;
    landing_url?: string;
    path?: string;
    profile?: string;
    variant?: string;
  }>(
    "pg_sessions",
    `select=session_id,visitor_id,fbp,fbc,client_ip,user_agent,landing_url,path,profile,variant&session_id=eq.${encodeURIComponent(sessionId)}&limit=1`
  );
  return rows[0] ?? null;
}

async function recordPurchase(
  payload: Record<string, unknown>,
  info: {
    transaction?: string;
    value?: number;
    currency: string;
    eventType: string;
    sessionId?: string | null;
    path?: string | null;
    profile?: string | null;
    variant?: string | null;
  }
) {
  if (!supabaseReady || !info.transaction) return;

  // Reaproveita o session_id já resolvido pela ponte de identidade quando
  // houver; senão resolve aqui (caso dos eventos não-aprovados).
  const sessionId = info.sessionId ?? parseXcod(extractXcod(payload));

  const data = (payload.data ?? {}) as Record<string, unknown>;
  const purchase = (data.purchase ?? {}) as Record<string, unknown>;

  // upsert por transaction: a Hotmart reenvia o webhook, e um PURCHASE_REFUNDED
  // depois de um APPROVED deve ATUALIZAR a linha, não criar outra.
  const row: Record<string, unknown> = {
    transaction: info.transaction,
    event_type: info.eventType,
    status: (purchase.status as string | undefined) ?? null,
    value: info.value ?? null,
    currency: info.currency,
    raw: payload,
  };

  // Atribuição só entra quando veio xcod. O payload de REFUNDED/CHARGEBACK não
  // traz xcod — incluir as colunas com null APAGARIA a atribuição gravada pelo
  // APPROVED (o upsert do PostgREST só atualiza as colunas presentes no corpo).
  // Sem isso, perde-se a taxa de reembolso por perfil/variante.
  if (sessionId) {
    row.session_id = sessionId;
    row.path = info.path ?? null;
    row.profile = info.profile ?? null;
    row.variant = info.variant ?? null;
  }

  await sbUpsert("pg_purchases", row, "transaction");
}

// Status que dispara o Purchase pro Meta.
//
// ⚠️ SÓ PURCHASE_APPROVED. Antes PURCHASE_COMPLETE também estava aqui, e isso
// contava a MESMA venda duas vezes: os dois eventos usam o mesmo
// event_id (`hotmart_<transaction>`), mas o COMPLETE só chega quando acaba o
// prazo de garantia — semanas depois. A desduplicação da Meta por event_id
// tem janela curta, então o segundo evento entrava como conversão nova e
// inflava faturamento e ROAS.
//
// PURCHASE_COMPLETE continua sendo gravado no Supabase (cai no ramo de baixo),
// onde o upsert por transaction atualiza a linha existente em vez de criar
// outra — o dashboard segue contando a venda uma vez só.
const META_PURCHASE_EVENTS = new Set(["PURCHASE_APPROVED"]);

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "json inválido" }, { status: 400 });
  }

  // Validação do hottok: rápida, sem I/O, então roda ANTES de responder.
  // O token oficial vem no header X-HOTMART-HOTTOK; os eventos de TESTE do
  // painel da Hotmart mandam no corpo — por isso aceitamos os dois.
  // Comparação em tempo constante: `===` vaza o tamanho do prefixo correto.
  const received =
    req.headers.get("x-hotmart-hottok") ?? (payload.hottok as string | undefined);
  if (!HOTTOK || !safeEqual(received, HOTTOK)) {
    return Response.json({ ok: false, error: "hottok inválido" }, { status: 401 });
  }

  // ⚠️ RESPONDER 200 IMEDIATAMENTE, processar depois.
  // A Hotmart reenvia até 5 vezes e, segundo a doc, "caso a URL cadastrada
  // apresente erro, a Hotmart DESATIVA automaticamente a configuração" — o
  // webhook morre em silêncio e as vendas param de ser reportadas. O timeout
  // dela não é documentado, e antes esperávamos CAPI + Supabase antes de
  // responder. `after` roda o trabalho depois da resposta já ter saído.
  after(async () => {
    try {
      const r = await processEvent(payload);
      console.info("[hotmart] processado:", JSON.stringify(r));
    } catch (err) {
      console.error("[hotmart] processamento falhou:", err);
    }
  });

  return Response.json({ ok: true, received: true });
}

// Todo o trabalho pesado — roda DEPOIS da resposta, via `after`.
async function processEvent(payload: Record<string, unknown>) {
  const eventType = payload.event as string | undefined;
  if (!eventType || !META_PURCHASE_EVENTS.has(eventType)) {
    // Não vai pro Meta, MAS vai pro dashboard. Cai aqui:
    //   · PURCHASE_COMPLETE  → mesma venda já contada no APPROVED
    //   · REFUNDED/CHARGEBACK → precisam abater a receita, senão o número
    //     exibido fica bruto pra sempre
    //   · BILLET_PRINTED, PIX gerado, EXPIRED… → não são pagamento
    // O upsert por transaction atualiza a linha que o APPROVED criou.
    if (eventType) {
      try {
        const d = (payload.data ?? {}) as Record<string, unknown>;
        const p = (d.purchase ?? {}) as Record<string, unknown>;
        const pr = (p.price ?? {}) as Record<string, unknown>;
        const v = typeof pr.value === "number" ? pr.value : Number(pr.value);
        await recordPurchase(payload, {
          transaction: p.transaction as string | undefined,
          value: Number.isFinite(v) ? v : undefined,
          currency: (pr.currency_value as string) ?? OFFER_CURRENCY,
          eventType,
        });
      } catch (err) {
        console.error("[hotmart] gravação de evento não-aprovado falhou:", err);
      }
    }
    return { ok: true, ignored: eventType ?? null };
  }

  // ── Mapeamento do payload (ajuste aqui se necessário) ──
  const data = (payload.data ?? {}) as Record<string, unknown>;
  const buyer = (data.buyer ?? {}) as Record<string, unknown>;
  const purchase = (data.purchase ?? {}) as Record<string, unknown>;
  const price = (purchase.price ?? {}) as Record<string, unknown>;

  const address = (buyer.address ?? {}) as Record<string, unknown>;

  const transaction = purchase.transaction as string | undefined;
  const email = buyer.email as string | undefined;
  const phone = (buyer.checkout_phone ?? buyer.phone) as string | undefined;
  const cpf = buyer.document as string | undefined; // CPF → external_id

  // Hotmart 2.0.0 já manda first_name/last_name separados; usa eles,
  // com fallback pra quebra do name completo.
  const nameParts = ((buyer.name as string | undefined) ?? "").trim().split(/\s+/);
  const firstName =
    (buyer.first_name as string | undefined)?.trim() || nameParts[0] || "";
  const lastName =
    (buyer.last_name as string | undefined)?.trim() ||
    nameParts.slice(1).join(" ") ||
    "";

  const rawValue = price.value;
  const value =
    typeof rawValue === "number" ? rawValue : Number(rawValue) || undefined;
  const currency = (price.currency_value as string) ?? OFFER_CURRENCY;

  // hashes pré-computados (a Hotmart manda PII completa → correspondência alta)
  const em = hashEmail(email);
  const ph = hashPhone(phone);
  const fn = hashName(firstName);
  const ln = hashName(lastName);
  const ct = hashCity(address.city as string | undefined);
  const st = hashState(address.state as string | undefined);
  const zp = hashZip(address.zipcode as string | undefined);
  const country = hashCountry(address.country_iso as string | undefined);
  // ── PONTE DE IDENTIDADE ──
  // O webhook chega dos servidores da Hotmart: não há navegador na requisição.
  // Buscamos no Supabase os sinais capturados durante o quiz (fbp, fbc, IP,
  // user-agent) pelo session_id que viajou no xcod.
  //
  // ⚠️ NÃO usar userDataFromRequest aqui: o IP e o user-agent desta requisição
  // são os da HOTMART, não os da compradora. Mandar isso pioraria a
  // correspondência em vez de melhorar.
  const sess = await lookupSession(payload);

  // external_id UNIFICADO. Antes o funil mandava o UUID do navegador e o
  // Purchase mandava o CPF — dois identificadores sem relação, o que impedia a
  // Meta de costurar a jornada. Agora o UUID vai nas duas pontas (mesma função
  // de hash), e o CPF entra como valor ADICIONAL no array.
  const externalIds = [
    hashExternalId(sess?.visitor_id),
    hashExternalId(cpf),
  ].filter((v): v is string => Boolean(v));

  const event: CapiEvent = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    // event_id estável por compra → desduplica com qualquer Pixel de obrigado
    // e também com as até 5 reentregas do próprio webhook da Hotmart.
    event_id: transaction ? `hotmart_${transaction}` : undefined,
    action_source: "website",
    // action_source "website" EXIGE event_source_url (doc da Meta). Sem a
    // sessão, cai na home — melhor que ausente, que gera aviso no Events Manager.
    event_source_url: sess?.landing_url || SITE_URL,
    user_data: {
      em: em ? [em] : undefined,
      ph: ph ? [ph] : undefined,
      fn: fn ? [fn] : undefined,
      ln: ln ? [ln] : undefined,
      ct: ct ? [ct] : undefined,
      st: st ? [st] : undefined,
      zp: zp ? [zp] : undefined,
      country: country ? [country] : undefined,
      external_id: externalIds.length ? externalIds : undefined,
      // Sinais de navegador reidratados da sessão de quiz.
      fbp: sess?.fbp,
      fbc: sess?.fbc,
      client_ip_address: sess?.client_ip,
      client_user_agent: sess?.user_agent,
    },
    custom_data: {
      content_name: "Puro Gozo",
      content_ids: ["puro-gozo"],
      content_type: "product",
      num_items: 1,
      value,
      currency,
      order_id: transaction,
    },
  };

  console.info(
    "[hotmart] Purchase — ponte de identidade:",
    sess
      ? `sessão ${sess.session_id} | fbp:${sess.fbp ? "sim" : "não"} fbc:${sess.fbc ? "sim" : "não"} ip:${sess.client_ip ? "sim" : "não"}`
      : "SESSÃO NÃO ENCONTRADA (Purchase sai sem sinais de navegador)"
  );

  // ── 1. Meta PRIMEIRO (crítico) ──
  const result = await sendCapiEvents([event]);

  // ── 2. Supabase depois (best-effort, só dashboard) ──
  // try/catch próprio: falha de banco NÃO pode alterar a resposta pra Hotmart.
  try {
    await recordPurchase(payload, {
      transaction,
      value,
      currency,
      eventType,
      sessionId: sess?.session_id,
      path: sess?.path,
      profile: sess?.profile,
      variant: sess?.variant,
    });
  } catch (err) {
    console.error("[hotmart] gravação no Supabase falhou:", err);
  }

  return { ok: result.ok };
}
