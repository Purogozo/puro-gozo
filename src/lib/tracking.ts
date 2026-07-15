"use client";

import {
  ANALYTICS_ENDPOINT,
  CHECKOUT_URL,
  OFFER_CURRENCY,
  OFFER_VALUE,
  TRACKED_PARAMS,
} from "./config";

const STORE_KEY = "pg-params";

// Captura UTMs / click IDs da URL e persiste por sessão (hydration-safe:
// chamado em useEffect, nunca durante o render)
export function captureParams() {
  if (typeof window === "undefined") return;
  try {
    const url = new URLSearchParams(window.location.search);
    const existing = JSON.parse(sessionStorage.getItem(STORE_KEY) ?? "{}");
    let changed = false;
    for (const key of TRACKED_PARAMS) {
      const v = url.get(key);
      if (v && !existing[key]) {
        existing[key] = v;
        changed = true;
      }
    }
    if (changed) sessionStorage.setItem(STORE_KEY, JSON.stringify(existing));
  } catch {
    /* no-op */
  }
}

export function getParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

// Monta o checkout Hotmart preservando parâmetros (compra discreta)
export function buildCheckoutUrl(meta?: Record<string, string>): string {
  const params = { ...getParams(), ...meta };
  const url = new URL(CHECKOUT_URL);
  for (const [k, v] of Object.entries(params)) {
    if (v) url.searchParams.set(k, v);
  }
  return url.toString();
}

type EventName =
  | "screen_view"
  | "option_select"
  | "quiz_complete"
  | "cta_click"
  | "checkout_redirect";

// fbq é injetado pelo script do Meta Pixel no layout (pode não existir em
// dev/adblock — sempre checar antes de chamar). O 4º argumento (options)
// carrega o eventID usado na desduplicação com a CAPI (server-side).
type Fbq = (
  method: "track" | "trackCustom",
  event: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

const CAPI_ENDPOINT = "/api/meta/capi";

// id único por evento; compartilhado entre Pixel e CAPI p/ o Meta desduplicar
function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fallback abaixo */
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

// Envia o evento pra CAPI (servidor) com o mesmo event_id do Pixel.
// keepalive: sobrevive ao redirect do checkout (InitiateCheckout).
function sendToCapi(
  eventName: string,
  eventId: string,
  customData: Record<string, unknown>
) {
  try {
    fetch(CAPI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        custom_data: customData,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* no-op */
  }
}

// Mapeia os eventos internos do funil → Meta.
// Pixel (navegador) + CAPI (servidor) com event_id compartilhado.
// Padrão (Lead / InitiateCheckout) onde o Meta otimiza; custom no funil.
function trackPixel(name: EventName, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const fbq = typeof window.fbq === "function" ? window.fbq : undefined;
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
      sendToCapi("QuizStep", eventId, custom);
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
      sendToCapi("Lead", eventId, custom);
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
      sendToCapi("InitiateCheckout", eventId, custom);
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

  const body = JSON.stringify({
    event: name,
    ts: Date.now(),
    ...getParams(),
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
