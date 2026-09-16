"use client";

import { useEffect, useRef } from "react";
import * as vendas from "@/lib/sales-tracking";
import * as metodo from "@/lib/metodo-tracking";

// Cada página tem o seu módulo de tracking (valor, content_ids, funil da
// CAPI). O tracker só escolhe qual usa — a lógica de captura é a mesma.
const FUNIS = { vendas, metodo } as const;

const MARCOS = [25, 50, 75, 100] as const;

// Não renderiza nada: só captura UTMs e dispara os eventos da página.
// Fica fora dos componentes de conteúdo de propósito — assim nenhuma seção
// precisa ser client component só pra medir.
export function PageTracker({
  funnel = "vendas",
}: {
  funnel?: keyof typeof FUNIS;
} = {}) {
  const disparados = useRef<Set<number>>(new Set());
  const { captureParams, trackEvent } = FUNIS[funnel];

  useEffect(() => {
    captureParams();
    trackEvent("page_view");
  }, [captureParams, trackEvent]);

  // Profundidade de rolagem: numa página longa é o que diz ONDE a leitura
  // morre. Só Pixel (evento custom), não vai pra CAPI.
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const rolavel = doc.scrollHeight - window.innerHeight;
      if (rolavel <= 0) return;
      const pct = (window.scrollY / rolavel) * 100;
      for (const marco of MARCOS) {
        if (pct >= marco && !disparados.current.has(marco)) {
          disparados.current.add(marco);
          trackEvent("scroll_depth", { depth: marco });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [trackEvent]);

  return null;
}
