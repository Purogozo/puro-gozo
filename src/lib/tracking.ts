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

const EID_KEY = "pg-eid";
const FBC_KEY = "pg-fbc";
const SID_KEY = "pg-sid";

// ID anônimo estável por visitante (localStorage). Melhora a correspondência
// sem coletar nenhum dado pessoal — vai hasheado no servidor.
// Também serve de visitor_id no dashboard: liga várias sessões da mesma pessoa.
export function getExternalId(): string | undefined {
  try {
    let eid = localStorage.getItem(EID_KEY);
    if (!eid) {
      eid = newEventId();
      localStorage.setItem(EID_KEY, eid);
    }
    return eid;
  } catch {
    return undefined;
  }
}

// ID de uma EXECUÇÃO do quiz (sessionStorage). Distinto do visitor_id: o store
// do quiz persiste em localStorage, então quem volta dias depois é o mesmo
// visitante numa sessão nova. É o session_id que dá sentido ao funil — sem ele
// dá pra contar views por tela, mas não "de 100 que entraram, X chegaram na T19".
export function getSessionId(): string | undefined {
  try {
    let sid = sessionStorage.getItem(SID_KEY);
    if (!sid) {
      sid = newEventId();
      sessionStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return undefined;
  }
}

// Navegação por ?screen=N é preview interno (nós testando), não visita real.
// Marcado na origem pra não sujar o funil — as views filtram is_preview.
function isPreview(): boolean {
  try {
    return new URLSearchParams(window.location.search).has("screen");
  } catch {
    return false;
  }
}

function readCookie(name: string): string | undefined {
  try {
    const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : undefined;
  } catch {
    return undefined;
  }
}

// fbc (ID do clique do anúncio): usa o cookie _fbc; se não existir, constrói a
// partir do fbclid capturado (formato exigido: fb.1.<ts>.<fbclid>) e memoiza.
function getFbc(): string | undefined {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;
  try {
    const stored = sessionStorage.getItem(FBC_KEY);
    if (stored) return stored;
    const fbclid = getParams()["fbclid"];
    if (!fbclid) return undefined;
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    sessionStorage.setItem(FBC_KEY, fbc);
    return fbc;
  } catch {
    return undefined;
  }
}

// Envia o evento pra CAPI (servidor) com o mesmo event_id do Pixel + os sinais
// de correspondência que o servidor sozinho não tem (external_id, fbp, fbc).
// keepalive: sobrevive ao redirect do checkout (InitiateCheckout).
function sendToCapi(
  eventName: string,
  eventId: string,
  customData: Record<string, unknown>
) {
  try {
    const userData = {
      external_id: getExternalId(),
      fbp: readCookie("_fbp"),
      fbc: getFbc(),
    };
    fetch(CAPI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        custom_data: customData,
        user_data: userData,
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

  // session_id/visitor_id são o que torna o funil calculável; utm fica num
  // objeto próprio (e não espalhado na raiz) pra rota mapear sem ambiguidade.
  const body = JSON.stringify({
    event: name,
    ts: Date.now(),
    session_id: getSessionId(),
    visitor_id: getExternalId(),
    preview: isPreview(),
    utm: getParams(),
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
