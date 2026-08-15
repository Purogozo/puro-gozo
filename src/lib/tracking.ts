"use client";

import {
  ANALYTICS_ENDPOINT,
  CHECKOUT_URL,
  OFFER_CURRENCY,
  OFFER_VALUE,
} from "./config";
import { captureParams, getParams, withParams } from "./params";
import {
  getExternalId,
  getFbc,
  getFbp,
  getFbq,
  getSessionId,
  newEventId,
  sendToCapi,
} from "./meta-client";

// ============================================================
// PURO GOZO · Tracking do QUIZ (rota /quiz)
//
// A página de vendas (rota /) tem o mapeamento dela em sales-tracking.ts.
// A captura de UTMs (params.ts) e os sinais de correspondência do Meta
// (meta-client.ts) são compartilhados pelos dois — o que está aqui é só o
// vocabulário de eventos do quiz e a ingestão no Supabase.
//
// ⚠️ Só o quiz alimenta o endpoint de analytics (pg_events / pg_sessions).
// A página de vendas NÃO manda evento pra lá de propósito: as views do
// dashboard montam o funil agrupando por tela com lag(), e eventos de outra
// origem quebrariam essa contagem.
// ============================================================

// Reexportados pra não obrigar os componentes do quiz a saber da divisão.
export { captureParams, getParams, getExternalId, getSessionId };

// Monta o checkout Hotmart preservando parâmetros (compra discreta)
export function buildCheckoutUrl(meta?: Record<string, string>): string {
  return withParams(CHECKOUT_URL, meta);
}

type EventName =
  | "screen_view"
  | "option_select"
  | "quiz_complete"
  | "cta_click"
  | "checkout_redirect";

// Navegação por ?screen=N é preview interno (nós testando), não visita real.
// Marcado na origem pra não sujar o funil — as views filtram is_preview.
function isPreview(): boolean {
  try {
    return new URLSearchParams(window.location.search).has("screen");
  } catch {
    return false;
  }
}

// Mapeia os eventos internos do funil → Meta.
// Pixel (navegador) + CAPI (servidor) com event_id compartilhado.
// Padrão (Lead / InitiateCheckout) onde o Meta otimiza; custom no funil.
function trackPixel(name: EventName, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const fbq = getFbq();
  const eventId = newEventId();

  switch (name) {
    case "screen_view": {
      const custom = {
        screen: payload.screen,
        screen_type: payload.type,
        path: payload.path,
        variant: payload.variant,
      };
      fbq?.("trackCustom", "QuizStep", custom, { eventID: eventId });
      sendToCapi("QuizStep", eventId, custom, "quiz");
      break;
    }
    case "option_select":
      // alto volume, baixo valor: só Pixel (não vai pra CAPI)
      fbq?.("trackCustom", "QuizAnswer", { screen: payload.screen });
      break;
    case "quiz_complete": {
      const custom = {
        content_name: "Quiz Puro Gozo",
        content_category: payload.path,
        value: OFFER_VALUE,
        currency: OFFER_CURRENCY,
      };
      fbq?.("track", "Lead", custom, { eventID: eventId });
      sendToCapi("Lead", eventId, custom, "quiz");
      break;
    }
    case "checkout_redirect": {
      const custom = {
        content_name: "Puro Gozo",
        content_ids: ["puro-gozo"],
        content_type: "product",
        num_items: 1,
        value: OFFER_VALUE,
        currency: OFFER_CURRENCY,
      };
      fbq?.("track", "InitiateCheckout", custom, { eventID: eventId });
      sendToCapi("InitiateCheckout", eventId, custom, "quiz");
      break;
    }
    // cta_click dispara junto com checkout_redirect no mesmo clique —
    // não mapeamos pra não duplicar o InitiateCheckout.
    default:
      break;
  }
}

// Evento de analytics → endpoint configurável (Supabase / Meta CAPI) + Meta Pixel
export function trackEvent(name: EventName, payload: Record<string, unknown> = {}) {
  trackPixel(name, payload);

  // session_id/visitor_id são o que torna o funil calculável; utm fica num
  // objeto próprio (e não espalhado na raiz) pra rota mapear sem ambiguidade.
  //
  // fbp/fbc/landing_url viajam junto pra serem PERSISTIDOS na sessão. Não é
  // duplicação do que já vai pra CAPI: o Purchase chega horas depois, pelo
  // webhook da Hotmart, sem navegador nenhum na requisição. Sem guardar esses
  // sinais agora, o evento de compra sai sem fbp, fbc, IP e user-agent — que
  // estão entre os de maior peso na correspondência da Meta.
  const body = JSON.stringify({
    event: name,
    ts: Date.now(),
    session_id: getSessionId(),
    visitor_id: getExternalId(),
    preview: isPreview(),
    utm: getParams(),
    fbp: getFbp(),
    fbc: getFbc(),
    landing_url: window.location.href,
    ...payload,
  });
  if (!ANALYTICS_ENDPOINT) {
    if (process.env.NODE_ENV !== "production")
      console.debug("[analytics]", name, payload);
    return;
  }
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ANALYTICS_ENDPOINT, body);
    } else {
      fetch(ANALYTICS_ENDPOINT, { method: "POST", body, keepalive: true });
    }
  } catch {
    /* no-op */
  }
}
