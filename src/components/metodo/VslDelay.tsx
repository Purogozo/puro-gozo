"use client";

import { useEffect } from "react";
import { VSL_REVEAL_CLASS, VSL_REVEAL_KEY } from "@/lib/vsl-delay";

// ============================================================
// DELAY DA VSL (pedido do cliente em 16/09/2026)
//
// Tudo o que está abaixo do vídeo (preço e botão da seção 0, todas as
// seções, rodapé e sticky bar) nasce ESCONDIDO — `[data-vsl-delay]` tem
// display:none no globals.css — e só aparece quando o vídeo passa de
// `delaySeconds`. Quem já viu uma vez (flag no localStorage) vê tudo de
// cara na volta; o script inline em page.tsx aplica a classe antes da
// primeira pintura, então nem pisca.
//
// Como se lê o tempo: o custom element <vturb-smartplayer> expõe
// `currentTime` (getter no protótipo, medido em 16/09/2026 — é o que o
// próprio VTurb usa nos "CTAs com delay" dele). Lemos por POLLING de 500ms,
// não por evento: o player não documenta os nomes dos eventos e o polling
// não depende de nada além do getter. Se por acaso o getter vier 0 (player
// antigo), tentamos o <hls-video> dentro do shadow root.
//
// ⚠️ Não há fallback por tempo de página: se o player não carregar, a
// página fica só com o vídeo. Decisão consciente — um fallback entregaria
// a oferta a quem nem viu a VSL (e a qualquer revisor de anúncio).
//
// Pra REVISAR a página inteira sem esperar 14:20: abrir com `?revelar=1`
// (grava a flag e revela na hora). Só serve pra conferência interna.
// ============================================================

const POLL_MS = 500;

type PlayerEl = HTMLElement & {
  currentTime?: number;
  renderRoot?: ShadowRoot | HTMLElement;
};

function readTime(el: PlayerEl): number {
  const t = Number(el.currentTime);
  if (Number.isFinite(t) && t > 0) return t;
  try {
    const inner = el.renderRoot?.querySelector?.("hls-video") as PlayerEl | null;
    const t2 = Number(inner?.currentTime);
    if (Number.isFinite(t2) && t2 > 0) return t2;
  } catch {
    /* shadow root fechado ou player diferente — segue no 0 */
  }
  return 0;
}

export function reveal() {
  document.documentElement.classList.add(VSL_REVEAL_CLASS);
  try {
    localStorage.setItem(VSL_REVEAL_KEY, "1");
  } catch {
    /* storage bloqueado: a classe já revelou nesta visita */
  }
}

export function VslDelay({ delaySeconds }: { delaySeconds: number }) {
  useEffect(() => {
    // já revelado (volta) ou pedido de revisão via query
    try {
      if (
        localStorage.getItem(VSL_REVEAL_KEY) === "1" ||
        new URLSearchParams(window.location.search).get("revelar") === "1"
      ) {
        reveal();
        return;
      }
    } catch {
      /* segue pro polling */
    }

    const id = window.setInterval(() => {
      const el = document.querySelector("vturb-smartplayer") as PlayerEl | null;
      if (!el) return;
      if (readTime(el) >= delaySeconds) {
        reveal();
        window.clearInterval(id);
      }
    }, POLL_MS);
    return () => window.clearInterval(id);
  }, [delaySeconds]);

  return null;
}
