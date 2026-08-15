"use client";

import type { MouseEvent } from "react";
import { SALES_CHECKOUT_URL } from "@/lib/config";
import { buildCheckoutUrl, trackEvent } from "@/lib/sales-tracking";

// ÚNICO elemento da página que usa a cor de ação (rosé). Nenhum ícone, selo
// ou numeral pode repetir essa cor — é o que faz o botão ser a única coisa
// clicável aos olhos de quem só passa o olho.
//
// É um <a>, não um <button>: sem JS (ou antes de hidratar) o clique já leva ao
// checkout. Com JS, o onClick assume pra anexar as UTMs e disparar o
// InitiateCheckout antes de navegar.
export function Cta({
  children,
  position,
  full = true,
  pulse = false,
  className = "",
}: {
  children: React.ReactNode;
  /** de qual seção partiu o clique — vai como cta_position no Pixel */
  position: string;
  full?: boolean;
  pulse?: boolean;
  className?: string;
}) {
  // Fallback do SSR: sem link de checkout configurado, o botão ao menos leva
  // até a oferta em vez de virar um clique morto.
  const href = SALES_CHECKOUT_URL || "#oferta";

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // deixa o navegador cuidar de abrir em nova aba / nova janela
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

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
