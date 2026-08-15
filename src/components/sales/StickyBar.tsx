"use client";

import { useEffect, useState } from "react";
import { COPY } from "@/lib/sales-copy";
import { Cta } from "@/components/sales/Cta";

const APARECE_APOS = 350; // px de scroll (definido no handoff de design)

// Barra fixa de oferta. Aparece depois de 350px e SOME enquanto a seção de
// oferta (#oferta) estiver visível — não faz sentido oferecer o mesmo botão
// duas vezes na mesma tela.
export function StickyBar() {
  const [passouDobra, setPassouDobra] = useState(false);
  const [ofertaVisivel, setOfertaVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setPassouDobra(window.scrollY > APARECE_APOS);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const alvo = document.getElementById("oferta");
    if (!alvo || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setOfertaVisivel(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(alvo);
    return () => obs.disconnect();
  }, []);

  if (!passouDobra || ofertaVisivel) return null;

  return (
    <div className="bar-in fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-tinta/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
        <div className="min-w-0 leading-tight">
          <p className="truncate font-serif text-[0.95rem] text-marfim sm:text-[1.05rem]">
            {COPY.sticky.label}
          </p>
          <p className="truncate font-sans text-[0.72rem] text-nevoa sm:text-[0.78rem]">
            <span className="line-through">{COPY.sticky.de}</span>{" "}
            <span className="text-marfim">{COPY.sticky.preco}</span>
            {/* em 360px a menção à garantia quebrava a linha e engordava a
                barra; ela já aparece no botão da seção de oferta */}
            <span className="hidden sm:inline"> · 30 dias de garantia</span>
          </p>
        </div>
        <Cta position="sticky" full={false} className="shrink-0 !px-5 !py-3 !text-[0.7rem] sm:!px-7">
          {COPY.sticky.cta}
        </Cta>
      </div>
    </div>
  );
}
