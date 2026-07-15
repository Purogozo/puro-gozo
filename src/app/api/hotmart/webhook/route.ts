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
  hashEmail,
  hashName,
  hashPhone,
  sendCapiEvents,
  type CapiEvent,
} from "@/lib/meta-capi";
import { OFFER_CURRENCY } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HOTTOK = process.env.HOTMART_HOTTOK ?? "";

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
    // 200 pra Hotmart não reenfileirar (só não é uma compra aprovada)
    return Response.json({ ok: true, ignored: eventType ?? null });
  }

  // ── Mapeamento do payload (ajuste aqui se necessário) ──
  const data = (payload.data ?? {}) as Record<string, unknown>;
  const buyer = (data.buyer ?? {}) as Record<string, unknown>;
  const purchase = (data.purchase ?? {}) as Record<string, unknown>;
  const price = (purchase.price ?? {}) as Record<string, unknown>;

  const transaction = purchase.transaction as string | undefined;
  const email = buyer.email as string | undefined;
  const phone = (buyer.checkout_phone ?? buyer.phone) as string | undefined;

  const fullName = ((buyer.name as string | undefined) ?? "").trim();
  const [firstName, ...rest] = fullName ? fullName.split(/\s+/) : [];
  const lastName = rest.join(" ");

  const rawValue = price.value;
  const value =
    typeof rawValue === "number" ? rawValue : Number(rawValue) || undefined;
  const currency = (price.currency_value as string) ?? OFFER_CURRENCY;

  const event: CapiEvent = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    // event_id estável por compra → desduplica com qualquer Pixel de obrigado
    event_id: transaction ? `hotmart_${transaction}` : undefined,
    action_source: "website",
    user_data: {
      em: hashEmail(email) ? [hashEmail(email)!] : undefined,
      ph: hashPhone(phone) ? [hashPhone(phone)!] : undefined,
      fn: hashName(firstName) ? [hashName(firstName)!] : undefined,
      ln: hashName(lastName) ? [hashName(lastName)!] : undefined,
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

  const result = await sendCapiEvents([event]);
  // devolve 200 mesmo em falha de rede pra evitar retentativa infinita da Hotmart;
  // o erro fica logado no servidor.
  return Response.json({ ok: result.ok });
}
