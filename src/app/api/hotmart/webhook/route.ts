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

import type { NextRequest } from "next/server";
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
import { sbUpsert, supabaseReady } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HOTTOK = process.env.HOTMART_HOTTOK ?? "";

const UUID_RE =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

// O xcod sai daqui como `${path}_${profile}_${variant}_${session_id}`
// (ver goCheckout em QuizFlow.tsx) e volta no webhook — é o que liga a venda
// à sessão de quiz.
//
// ⚠️ O caminho exato do xcod no payload 2.0.0 ainda NÃO foi confirmado contra
// um postback real. Por isso procuramos nos caminhos prováveis e, se não
// acharmos, varremos o payload inteiro atrás de qualquer chave "xcod".
// O console.info abaixo mostra o que veio: rode o "Simular postback" no painel
// da Hotmart e confira o log pra fixar o caminho certo.
function extractXcod(payload: Record<string, unknown>): string | null {
  const data = (payload.data ?? {}) as Record<string, unknown>;
  const purchase = (data.purchase ?? {}) as Record<string, unknown>;
  const origin = (purchase.origin ?? {}) as Record<string, unknown>;

  const candidatos = [
    origin.xcod,
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
      if (k.toLowerCase() === "xcod" && typeof val === "string" && val) {
        achado = val;
        return;
      }
      visitar(val, prof + 1);
    }
  };
  visitar(payload);
  return achado;
}

// path_profile_variant_uuid → partes. O UUID tem hífens, não underscores,
// então split por "_" é seguro.
function parseXcod(xcod: string | null) {
  if (!xcod) return { sessionId: null, path: null, profile: null, variant: null };
  const partes = xcod.split("_");
  const m = xcod.match(UUID_RE);
  return {
    sessionId: m ? m[0] : null,
    path: partes[0] || null,
    profile: partes[1] || null,
    variant: partes[2] || null,
  };
}

async function recordPurchase(
  payload: Record<string, unknown>,
  info: {
    transaction?: string;
    value?: number;
    currency: string;
    eventType: string;
  }
) {
  if (!supabaseReady || !info.transaction) return;

  const xcod = extractXcod(payload);
  console.info("[hotmart] xcod recebido:", xcod ?? "(nenhum)");
  const { sessionId, path, profile, variant } = parseXcod(xcod);

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
  if (sessionId || path) {
    row.session_id = sessionId;
    row.path = path;
    row.profile = profile;
    row.variant = variant;
  }

  await sbUpsert("pg_purchases", row, "transaction");
}

// Status que contam como compra efetivada
const APPROVED_EVENTS = new Set(["PURCHASE_APPROVED", "PURCHASE_COMPLETE"]);

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "json inválido" }, { status: 400 });
  }

  // Validação: Hotmart envia o token no header e/ou no corpo
  const received =
    req.headers.get("x-hotmart-hottok") ?? (payload.hottok as string | undefined);
  if (!HOTTOK || received !== HOTTOK) {
    return Response.json({ ok: false, error: "hottok inválido" }, { status: 401 });
  }

  const eventType = payload.event as string | undefined;
  if (!eventType || !APPROVED_EVENTS.has(eventType)) {
    // Não vai pro Meta (só compra aprovada vira Purchase), MAS vai pro
    // dashboard: reembolso e chargeback precisam abater a receita, senão o
    // número exibido é bruto pra sempre. O upsert por transaction atualiza a
    // linha que o APPROVED criou.
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
    // 200 pra Hotmart não reenfileirar
    return Response.json({ ok: true, ignored: eventType ?? null });
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
  const externalId = hashExternalId(cpf);

  const event: CapiEvent = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    // event_id estável por compra → desduplica com qualquer Pixel de obrigado
    event_id: transaction ? `hotmart_${transaction}` : undefined,
    action_source: "website",
    user_data: {
      em: em ? [em] : undefined,
      ph: ph ? [ph] : undefined,
      fn: fn ? [fn] : undefined,
      ln: ln ? [ln] : undefined,
      ct: ct ? [ct] : undefined,
      st: st ? [st] : undefined,
      zp: zp ? [zp] : undefined,
      country: country ? [country] : undefined,
      external_id: externalId ? [externalId] : undefined,
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

  // ── 1. Meta PRIMEIRO (crítico) ──
  // Aguardado até o fim antes de qualquer coisa do dashboard: se o processo
  // morrer depois daqui, a conversão já saiu.
  const result = await sendCapiEvents([event]);

  // ── 2. Supabase depois (best-effort, só dashboard) ──
  // try/catch próprio: falha de banco NÃO pode alterar a resposta pra Hotmart.
  try {
    await recordPurchase(payload, { transaction, value, currency, eventType });
  } catch (err) {
    console.error("[hotmart] gravação no Supabase falhou:", err);
  }

  // devolve 200 mesmo em falha de rede pra evitar retentativa infinita da Hotmart;
  // o erro fica logado no servidor.
  return Response.json({ ok: result.ok });
}
