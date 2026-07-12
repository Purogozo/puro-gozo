"use client";

import { ANALYTICS_ENDPOINT, CHECKOUT_URL, TRACKED_PARAMS } from "./config";

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

// Evento de analytics → endpoint configurável (Supabase / Meta CAPI)
export function trackEvent(name: EventName, payload: Record<string, unknown> = {}) {
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
