"use client";

import { getParams } from "./params";

// ============================================================
// PURO GOZO · Sinais de correspondência do Meta (lado navegador)
// Extraído de tracking.ts em 14/08/2026, quando a página de vendas passou a
// viver no mesmo app. Quiz (/quiz) e página de vendas (/) compartilham o MESMO
// pixel, o MESMO visitante e as MESMAS regras de fbp/fbc/external_id — este é
// o único lugar onde essa lógica existe.
//
// Cada funil tem o seu mapeamento de eventos (tracking.ts e sales-tracking.ts);
// o que é comum mora aqui.
// ============================================================

const EID_KEY = "pg-eid";
const FBC_KEY = "pg-fbc";
const FBP_KEY = "pg-fbp";
const SID_KEY = "pg-sid";

export const CAPI_ENDPOINT = "/api/meta/capi";

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

export function getFbq(): Fbq | undefined {
  if (typeof window === "undefined") return undefined;
  return typeof window.fbq === "function" ? window.fbq : undefined;
}

// id único por evento; compartilhado entre Pixel e CAPI p/ o Meta desduplicar
export function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID)
      return crypto.randomUUID();
  } catch {
    /* fallback abaixo */
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

// ID anônimo estável por visitante (localStorage). Melhora a correspondência
// sem coletar nenhum dado pessoal — vai hasheado no servidor.
// Também serve de visitor_id no dashboard: liga várias sessões da mesma pessoa,
// e agora liga também a visita à página de vendas com a visita ao quiz.
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

// ID de uma EXECUÇÃO do quiz (sessionStorage). Distinto do visitor_id: o mesmo
// visitante pode voltar dias depois numa sessão nova. É o session_id que dá
// sentido ao funil — sem ele dá pra contar views por tela, mas não "de 100 que
// entraram, X chegaram na T19".
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
export function getFbc(): string | undefined {
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

// fbp (ID do navegador, _fbp): o Pixel cria esse cookie, mas em navegador in-app
// (Instagram/Facebook) ele frequentemente NÃO existe — medido em ~68% das
// sessões sem fbp. Sem ele, o Purchase do webhook (reidratado de pg_sessions)
// e os eventos da CAPI saem sem um dos sinais de maior peso na correspondência.
//
// Estratégia (a mesma que a Meta recomenda e que já usamos pro fbc): se o cookie
// existir, usa ele (mantém a paridade com o Pixel); senão gera no formato oficial
// fb.1.<ts>.<rand>, persiste em localStorage (estável por navegador, como o
// cookie de 90 dias da Meta e como o pg-eid) e, best-effort, grava o cookie _fbp
// pra que o Pixel adote o MESMO valor. Assim CAPI, Supabase e Pixel convergem.
export function getFbp(): string | undefined {
  const cookie = readCookie("_fbp");
  if (cookie) return cookie;
  try {
    const stored = localStorage.getItem(FBP_KEY);
    if (stored) return stored;
    const rand = Math.floor(1e10 + Math.random() * 9e10); // ~11 dígitos
    const fbp = `fb.1.${Date.now()}.${rand}`;
    localStorage.setItem(FBP_KEY, fbp);
    try {
      // host-only, 90 dias (mesma validade do _fbp da Meta). Se o Pixel rodar,
      // ele reusa um _fbp existente em vez de criar outro → valores batem.
      document.cookie = `_fbp=${fbp}; max-age=${90 * 24 * 60 * 60}; path=/; samesite=Lax`;
    } catch {
      /* cookie bloqueado: seguimos com o valor em localStorage */
    }
    return fbp;
  } catch {
    return undefined;
  }
}

// Qual funil originou o evento. O servidor usa isso pra decidir o VALOR
// monetário autoritativo — o mesmo produto tem duas ofertas (quiz R$ 47,
// página de vendas) e mandar o valor errado envenena a otimização.
// É um rótulo fechado, não um número: o cliente não consegue forjar preço.
export type Funnel = "quiz" | "vendas";

// Envia o evento pra CAPI (servidor) com o mesmo event_id do Pixel + os sinais
// de correspondência que o servidor sozinho não tem (external_id, fbp, fbc).
// keepalive: sobrevive ao redirect do checkout (InitiateCheckout).
export function sendToCapi(
  eventName: string,
  eventId: string,
  customData: Record<string, unknown>,
  funnel: Funnel
) {
  try {
    fetch(CAPI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        funnel,
        custom_data: customData,
        user_data: {
          external_id: getExternalId(),
          fbp: getFbp(),
          fbc: getFbc(),
        },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* no-op */
  }
}
