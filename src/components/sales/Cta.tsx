"use client";

import type { MouseEvent } from "react";
import { SALES_CHECKOUT_URL } from "@/lib/config";
import { buildCheckoutUrl, trackEvent } from "@/lib/sales-tracking";

// ÚNICO elemento da página que usa a cor de ação (rosé). Nenhum ícone, selo
// ou numeral pode repetir essa cor — é o que faz o botão ser a única coisa
// clicável aos olhos de quem só passa o olho.
//
// É um <a>, não um <button>: sem JS (ou antes de hidratar) o clique já leva ao
// destino. Com JS, o onClick assume pra anexar as UTMs e medir antes de navegar.
//
// ⚠️ REGRA DE DESTINO (`to`), definida pelo cliente em 17/08/2026 — depende de
// ONDE o botão está na página, não do que ele diz:
//
//   ACIMA da seção de oferta  → to="oferta"   (âncora #oferta, rolagem interna)
//   Da OFERTA pra baixo       → to="checkout" (Hotmart, direto)
//
// Por isso a prop é obrigatória: seção nova precisa decidir de que lado da
// oferta ela está. Ver o mapa de seções no topo de src/app/page.tsx.
export function Cta({
  children,
  position,
  to,
  full = true,
  pulse = false,
  className = "",
}: {
  children: React.ReactNode;
  /** de qual seção partiu o clique — vai como cta_position no Pixel */
  position: string;
  /** "oferta" = rola até #oferta · "checkout" = vai pro Hotmart */
  to: "oferta" | "checkout";
  full?: boolean;
  pulse?: boolean;
  className?: string;
}) {
  // Fallback do SSR: sem link de checkout configurado, o botão ao menos leva
  // até a oferta em vez de virar um clique morto.
  const href = to === "oferta" ? "#oferta" : SALES_CHECKOUT_URL || "#oferta";

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // deixa o navegador cuidar de abrir em nova aba / nova janela
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    if (to === "oferta") {
      // Custom, NÃO InitiateCheckout: quem clica aqui não foi pro checkout, e
      // sujar o InitiateCheckout (evento que o Meta otimiza) com rolagem
      // interna estragaria a otimização. O cta_position continua vindo, então
      // ainda dá pra ranquear qual seção empurra pra oferta.
      trackEvent("oferta_click", { cta_position: position });

      // Nada de e.preventDefault(): o salto nativo do href="#oferta" é o que
      // leva até a seção. Só medimos e saímos da frente.
      //
      // Tentamos rolagem suave por JS e ela foi descartada: a oferta fica a
      // ~8.500px do herói, e animar essa distância acionando em cadeia todas
      // as revelações de scroll da página chegou a travar o renderizador no
      // Chrome (o scrollIntoView suave nem sai do lugar aqui). O pulo do
      // navegador é instantâneo, funciona sem JS e antes da hidratação — a
      // mesma regra do resto da página.
      return;
    }

    trackEvent("checkout_click", { cta_position: position });

    const url = buildCheckoutUrl();
    if (!url) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[cta] NEXT_PUBLIC_SALES_CHECKOUT_URL não configurado — ver src/lib/config.ts"
        );
      }
      return; // segue pro #oferta do href
    }

    e.preventDefault();
    window.location.href = url;
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      // inline-block + text-center (e NÃO flex): os rótulos longos ("Quero
      // acesso ao Puro Gozo — R$ 97") quebram em duas linhas em 360px, e com
      // flex a seta ficava órfã, empurrada pro canto. Assim ela flui logo
      // depois da última palavra, sem nunca quebrar sozinha.
      className={`group relative inline-block rounded-full bg-rose px-7 py-4 text-center font-sans text-[0.78rem] font-medium uppercase leading-[1.45] tracking-[0.14em] text-white transition-transform duration-300 active:scale-[0.97] sm:px-10 sm:text-[0.85rem] ${
        pulse
          ? "cta-pulse"
          : "shadow-[0_10px_34px_-10px_rgba(201,125,144,0.75)]"
      } ${full ? "w-full max-w-md" : ""} ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}
