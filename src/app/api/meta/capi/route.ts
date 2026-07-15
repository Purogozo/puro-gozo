// Route Handler · Meta CAPI (eventos do funil vindos do navegador)
// O cliente (tracking.ts) dispara o mesmo evento no Pixel e aqui, com o
// MESMO event_id — o Meta desduplica. Aqui enriquecemos com IP / user-agent /
// cookies (_fbp, _fbc) que o servidor enxerga e o navegador nem sempre entrega.

import type { NextRequest } from "next/server";
import {
  sendCapiEvents,
  userDataFromRequest,
  type CapiEvent,
} from "@/lib/meta-capi";
import { OFFER_CURRENCY, OFFER_VALUE } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Só aceitamos estes eventos (o endpoint é público — evita abuso)
const ALLOWED = new Set(["QuizStep", "Lead", "InitiateCheckout"]);
// Eventos monetários: valor é autoritativo no servidor (ignora o que vier do cliente)
const MONETARY = new Set(["Lead", "InitiateCheckout"]);

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: "json inválido" }, { status: 400 });
  }

  const { event_name, event_id, event_source_url, custom_data } =
    (payload ?? {}) as {
      event_name?: unknown;
      event_id?: unknown;
      event_source_url?: unknown;
      custom_data?: unknown;
    };

  if (typeof event_name !== "string" || !ALLOWED.has(event_name)) {
    return Response.json(
      { ok: false, error: "event_name não permitido" },
      { status: 400 }
    );
  }

  const custom: Record<string, unknown> =
    custom_data && typeof custom_data === "object"
      ? { ...(custom_data as Record<string, unknown>) }
      : {};

  if (MONETARY.has(event_name)) {
    custom.value = OFFER_VALUE;
    custom.currency = OFFER_CURRENCY;
  }

  const event: CapiEvent = {
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: typeof event_id === "string" ? event_id : undefined,
    event_source_url:
      typeof event_source_url === "string" ? event_source_url : undefined,
    action_source: "website",
    user_data: userDataFromRequest(req),
    custom_data: Object.keys(custom).length ? custom : undefined,
  };

  const result = await sendCapiEvents([event]);
  return Response.json({ ok: result.ok });
}
