"use client";

import { METODO_CHECKOUT_URL, METODO_OFFER_VALUE, OFFER_CURRENCY } from "./config";
import { captureParams, withParams } from "./params";
import { getFbq, newEventId, sendToCapi } from "./meta-client";

// ============================================================
// PURO GOZO · Tracking da página /pg-vsl-a (R$ 297)
//
// Espelho de sales-tracking.ts com funil "metodo": mesmo Pixel, mesmos sinais
// de correspondência (meta-client), valor próprio (autoritativo no servidor
// via FUNNEL_VALUE.metodo). content_ids separado ("puro-gozo-metodo") pra
// que os relatórios não misturem as duas páginas.
//
// Como a de vendas, NÃO alimenta o Supabase (o dashboard monta o funil do
// quiz por tela; evento de outra origem vira ruído).
// ============================================================

export { captureParams };

export function buildCheckoutUrl(meta?: Record<string, string>): string {
  return withParams(METODO_CHECKOUT_URL, meta);
}

type EventName = "page_view" | "scroll_depth" | "oferta_click" | "checkout_click";

export function trackEvent(name: EventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const fbq = getFbq();
  const eventId = newEventId();

  switch (name) {
    case "page_view": {
      const custom = {
        content_name: "Página /pg-vsl-a Puro Gozo",
        content_ids: ["puro-gozo-metodo"],
        content_type: "product",
        value: METODO_OFFER_VALUE,
        currency: OFFER_CURRENCY,
      };
      fbq?.("track", "ViewContent", custom, { eventID: eventId });
      sendToCapi("ViewContent", eventId, custom, "metodo");
      break;
    }
    case "scroll_depth":
      fbq?.("trackCustom", "ScrollDepth", { depth: payload.depth, page: "metodo" });
      break;
    case "oferta_click":
      fbq?.("trackCustom", "ClickToOffer", {
        cta_position: payload.cta_position,
        page: "metodo",
      });
      break;
    case "checkout_click": {
      const custom = {
        content_name: "Puro Gozo",
        content_ids: ["puro-gozo-metodo"],
        content_type: "product",
        num_items: 1,
        value: METODO_OFFER_VALUE,
        currency: OFFER_CURRENCY,
        cta_position: payload.cta_position,
      };
      fbq?.("track", "InitiateCheckout", custom, { eventID: eventId });
      sendToCapi("InitiateCheckout", eventId, custom, "metodo");
      break;
    }
  }
}
