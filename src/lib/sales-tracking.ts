"use client";

import { SALES_CHECKOUT_URL, SALES_OFFER_VALUE, OFFER_CURRENCY } from "./config";
import { captureParams, withParams } from "./params";
import { getFbq, newEventId, sendToCapi } from "./meta-client";

// ============================================================
// PURO GOZO · Tracking da PÁGINA DE VENDAS (rota /)
//
// Só Pixel + CAPI. NÃO alimenta o endpoint de analytics do Supabase: as views
// do dashboard montam o funil do quiz agrupando por tela, e evento de outra
// origem entraria como ruído (ver tracking.ts).
// ============================================================

export { captureParams };

// Monta o checkout preservando UTMs/click IDs.
// ⚠️ A base traz `?off=` — é o parâmetro que separa a oferta de R$ 97 da de
// R$ 47 do quiz. `withParams` usa searchParams.set, que o preserva.
export function buildCheckoutUrl(meta?: Record<string, string>): string {
  return withParams(SALES_CHECKOUT_URL, meta);
}

type EventName = "page_view" | "scroll_depth" | "checkout_click";

// Mapeia os eventos da página → Meta.
// Padrão (ViewContent / InitiateCheckout) onde o Meta otimiza; custom no resto.
export function trackEvent(
  name: EventName,
  payload: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  const fbq = getFbq();
  const eventId = newEventId();

  switch (name) {
    case "page_view": {
      // O `fbq('track','PageView')` do layout já cobre o navegador. Este
      // ViewContent existe pra dar um evento de conteúdo com valor, e vai
      // também pela CAPI (o PageView do Pixel não vai).
      const custom = {
        content_name: "Página de vendas Puro Gozo",
        content_ids: ["puro-gozo-97"],
        content_type: "product",
        value: SALES_OFFER_VALUE,
        currency: OFFER_CURRENCY,
      };
      fbq?.("track", "ViewContent", custom, { eventID: eventId });
      sendToCapi("ViewContent", eventId, custom, "vendas");
      break;
    }
    case "scroll_depth":
      // Diagnóstico de página longa (onde a leitura morre). Alto volume e
      // valor zero pra otimização: só Pixel, não vai pra CAPI.
      fbq?.("trackCustom", "ScrollDepth", { depth: payload.depth });
      break;
    case "checkout_click": {
      const custom = {
        content_name: "Puro Gozo",
        content_ids: ["puro-gozo-97"],
        content_type: "product",
        num_items: 1,
        value: SALES_OFFER_VALUE,
        currency: OFFER_CURRENCY,
        // qual CTA da página levou ao checkout (são 8) — some no Pixel como
        // parâmetro custom e permite ranquear as seções que convertem.
        cta_position: payload.cta_position,
      };
      fbq?.("track", "InitiateCheckout", custom, { eventID: eventId });
      sendToCapi("InitiateCheckout", eventId, custom, "vendas");
      break;
    }
  }
}
