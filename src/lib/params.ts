"use client";

import { TRACKED_PARAMS } from "./config";

// ============================================================
// PURO GOZO · UTMs / click IDs
// Extraído de tracking.ts em 14/08/2026, quando a página de vendas entrou
// no mesmo app: os dois funis (quiz em /quiz, vendas em /) precisam da MESMA
// captura de origem, e duplicar essa lógica garantiria que ela ia divergir.
// Este módulo não conhece Meta nem checkout — só a origem do visitante.
// ============================================================

const STORE_KEY = "pg-params";

// utm_source nunca vazio. Precedência (padrão de mídia BR): utm_source da URL →
// utm_source do referrer → hostname do referrer → "direto". Assim tráfego
// orgânico/direto chega ao checkout com uma origem legível em vez de vazio.
function resolveUtmSource(url: URLSearchParams): string {
  const fromUrl = url.get("utm_source");
  if (fromUrl) return fromUrl;
  const ref = document.referrer;
  if (ref) {
    try {
      const refUrl = new URL(ref);
      return (
        new URLSearchParams(refUrl.search).get("utm_source") || refUrl.hostname
      );
    } catch {
      /* referrer malformado — ignora */
    }
  }
  return "direto";
}

// Captura UTMs / click IDs da URL e persiste por sessão (hydration-safe:
// chamado em useEffect, nunca durante o render).
//
// O guard `!existing[key]` faz a PRIMEIRA entrada da sessão vencer. Isso
// importa agora que há duas portas de entrada: quem cai na página de vendas
// por anúncio e depois navega pro quiz mantém a origem do anúncio.
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
    // Fallback de origem: se nada trouxe utm_source, deriva do referrer.
    if (!existing["utm_source"]) {
      existing["utm_source"] = resolveUtmSource(url);
      changed = true;
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

// Anexa os parâmetros capturados a uma URL de checkout.
//
// ⚠️ Usa `searchParams.set`, que PRESERVA a query que já existe na base — é o
// que mantém o `?off=` da oferta da página intacto. Sem esse cuidado a venda
// cairia na oferta errada do checkout (mesmo produto Hotmart,
// ofertas diferentes).
export function withParams(
  baseUrl: string,
  meta?: Record<string, string>
): string {
  if (!baseUrl) return "";
  const params = { ...getParams(), ...meta };
  try {
    const url = new URL(baseUrl);
    for (const [k, v] of Object.entries(params)) {
      if (v) url.searchParams.set(k, v);
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}
