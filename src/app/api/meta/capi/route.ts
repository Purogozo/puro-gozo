// Route Handler · Meta CAPI (eventos do funil vindos do navegador)
// O cliente (tracking.ts) dispara o mesmo evento no Pixel e aqui, com o
// MESMO event_id — o Meta desduplica. Aqui enriquecemos com IP / user-agent /
// cookies (_fbp, _fbc) que o servidor enxerga e o navegador nem sempre entrega.

import type { NextRequest } from "next/server";
import {
  hashExternalId,
  sendCapiEvents,
  userDataFromRequest,
  type CapiEvent,
} from "@/lib/meta-capi";
import { FUNNEL_VALUE, OFFER_CURRENCY, type Funnel } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Só aceitamos estes eventos (o endpoint é público — evita abuso).
// ⚠️ "Purchase" fora de propósito: compra vem do webhook da Hotmart, nunca do
// navegador, senão qualquer um forja conversão neste dataset.
const ALLOWED = new Set(["QuizStep", "ViewContent", "Lead", "InitiateCheckout"]);
// Eventos monetários: valor é autoritativo no servidor (ignora o que vier do cliente)
const MONETARY = new Set(["ViewContent", "Lead", "InitiateCheckout"]);

// O app serve dois funis (quiz em /quiz, página de vendas em /). O cliente
// manda só o RÓTULO do funil; o preço sai desta tabela — hoje os dois valem
// R$ 47, mas cada funil continua tendo o seu valor próprio aqui.
// Assim o servidor continua sendo a autoridade sobre o valor — ninguém injeta
// um número arbitrário no dataset — e mesmo assim cada funil reporta o seu.
function funnelOf(v: unknown): Funnel {
  return v === "vendas" ? "vendas" : "quiz";
}

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: "json inválido" }, { status: 400 });
  }

  const { event_name, event_id, event_source_url, custom_data, user_data, funnel } =
    (payload ?? {}) as {
      event_name?: unknown;
      event_id?: unknown;
      event_source_url?: unknown;
      custom_data?: unknown;
      user_data?: unknown;
      funnel?: unknown;
    };

  if (typeof event_name !== "string" || !ALLOWED.has(event_name)) {
    return Response.json(
      { ok: false, error: "event_name não permitido" },
      { status: 400 }
    );
  }

  // Sinais de correspondência: base do servidor (IP/UA/cookies) + o que o
  // cliente manda (external_id anônimo, fbp/fbc quando o cookie ainda não
  // chegou ao servidor). external_id é hasheado aqui.
  const server = userDataFromRequest(req);
  const client = (user_data && typeof user_data === "object"
    ? user_data
    : {}) as { external_id?: unknown; fbp?: unknown; fbc?: unknown };

  const externalIdHash = hashExternalId(
    typeof client.external_id === "string" ? client.external_id : undefined
  );

  const mergedUserData = {
    ...server,
    fbp: server.fbp ?? (typeof client.fbp === "string" ? client.fbp : undefined),
    fbc: server.fbc ?? (typeof client.fbc === "string" ? client.fbc : undefined),
    external_id: externalIdHash ? [externalIdHash] : undefined,
  };

  const custom: Record<string, unknown> =
    custom_data && typeof custom_data === "object"
      ? { ...(custom_data as Record<string, unknown>) }
      : {};

  if (MONETARY.has(event_name)) {
    custom.value = FUNNEL_VALUE[funnelOf(funnel)];
    custom.currency = OFFER_CURRENCY;
  }

  const event: CapiEvent = {
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: typeof event_id === "string" ? event_id : undefined,
    event_source_url:
      typeof event_source_url === "string" ? event_source_url : undefined,
    action_source: "website",
    user_data: mergedUserData,
    custom_data: Object.keys(custom).length ? custom : undefined,
  };

  const result = await sendCapiEvents([event]);
  return Response.json({ ok: result.ok });
}
