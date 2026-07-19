// Route Handler · eventos do funil (navegador) → Supabase
// Alimenta SÓ o dashboard. O caminho do Meta (Pixel + CAPI) é independente e
// não passa por aqui — se esta rota morrer, o tracking de anúncio segue igual.
//
// ⚠️ Chega por navigator.sendBeacon, que manda Content-Type: text/plain.
// req.json() falharia em parte do tráfego — por isso lemos text() e parseamos.
//
// Responde SEMPRE 204, mesmo em erro: é telemetria, não pode gerar retry nem
// ruído no console do visitante.

import type { NextRequest } from "next/server";
import { sbInsert, sbRpc, supabaseReady } from "@/lib/supabase";
import { clientIpFromRequest } from "@/lib/meta-capi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENTS = new Set([
  "screen_view",
  "option_select",
  "quiz_complete",
  "cta_click",
  "checkout_redirect",
]);

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const noContent = () => new Response(null, { status: 204 });

function asUuid(v: unknown): string | null {
  return typeof v === "string" && UUID_RE.test(v) ? v : null;
}

function asInt(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isInteger(n) ? n : null;
}

// Limita texto livre: nada aqui deveria ser longo, e o banco não é lixeira.
function asText(v: unknown, max = 120): string | null {
  return typeof v === "string" && v.length > 0 ? v.slice(0, max) : null;
}

export async function POST(req: NextRequest) {
  if (!supabaseReady) return noContent();

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text()) as Record<string, unknown>;
  } catch {
    return noContent();
  }

  const event = asText(body.event, 40);
  const sessionId = asUuid(body.session_id);

  // sem session_id não há funil possível — descarta em vez de gravar lixo
  if (!event || !EVENTS.has(event) || !sessionId) return noContent();

  const screen = asInt(body.screen);
  const path = asText(body.path, 40);
  const profile = asText(body.profile, 40);
  const variant = asText(body.variant, 10);
  const isPreview = body.preview === true;
  const utm =
    body.utm && typeof body.utm === "object" ? (body.utm as object) : {};

  const clientTs =
    typeof body.ts === "number" ? new Date(body.ts).toISOString() : null;

  // IP e user-agent saem do REQUEST, nunca do corpo — senão o cliente forjaria.
  // O helper trata a Cloudflare na frente do site: o x-forwarded-for sozinho
  // devolvia o IP da BORDA, não o do visitante (ver nota em meta-capi.ts).
  const clientIp = clientIpFromRequest(req) ?? null;
  const userAgent = req.headers.get("user-agent")?.slice(0, 400) ?? null;

  // Cada destino em try/catch próprio: uma falha não impede a outra escrita.
  try {
    await sbInsert("pg_events", {
      client_ts: clientTs,
      session_id: sessionId,
      visitor_id: asUuid(body.visitor_id),
      event,
      screen,
      screen_type: asText(body.type, 40),
      path,
      profile,
      variant,
      option: asText(body.option, 200),
      options: Array.isArray(body.options) ? body.options : null,
      utm,
      user_agent: userAgent,
      is_preview: isPreview,
    });
  } catch (err) {
    console.error("[analytics] insert:", err);
  }

  // Preview não atualiza a sessão: senão um teste nosso marcaria completed.
  if (!isPreview) {
    try {
      await sbRpc("pg_upsert_session", {
        p_session_id: sessionId,
        p_visitor_id: asUuid(body.visitor_id),
        p_screen: screen,
        p_path: path,
        p_profile: profile,
        p_variant: variant,
        p_utm: utm,
        p_completed: event === "quiz_complete",
        p_checkout: event === "checkout_redirect",
        // Ponte de identidade: guardados aqui pra reidratar o Purchase quando
        // o webhook da Hotmart chegar, horas depois e sem navegador.
        // O IP vem do header do PROXY (x-forwarded-for), não do corpo — o
        // cliente não deve poder forjar o próprio IP.
        p_fbp: asText(body.fbp, 200),
        p_fbc: asText(body.fbc, 400),
        p_client_ip: clientIp,
        p_user_agent: userAgent,
        p_landing_url: asText(body.landing_url, 800),
      });
    } catch (err) {
      console.error("[analytics] upsert sessão:", err);
    }
  }

  return noContent();
}
