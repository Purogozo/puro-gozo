"use client";

import { useEffect, useState } from "react";
import { COPY } from "@/lib/sales-copy";
import { Cta } from "@/components/sales/Cta";

const APARECE_APOS = 350; // px de scroll (definido no handoff de design)

// Barra fixa de oferta. Aparece depois de 350px e SOME enquanto a seção de
// oferta (#oferta) estiver visível — não faz sentido oferecer o mesmo botão
// duas vezes na mesma tela.
//
// É o único CTA que não tem um lado fixo na página: ele acompanha a leitura.
// Por isso o destino é decidido em tempo real pela mesma regra das seções —
// antes da oferta rola até ela, depois dela vai direto pro checkout.
export function StickyBar() {
  const [passouDobra, setPassouDobra] = useState(false);
  const [ofertaVisivel, setOfertaVisivel] = useState(false);
  const [passouOferta, setPassouOferta] = useState(false);

  // Uma medição só, na rolagem, para as três perguntas.
  //
  // Aqui havia um IntersectionObserver pra saber se #oferta estava na tela.
  // Não serve mais: o observer só avisa quando a seção CRUZA a borda, e desde
  // que os CTAs de cima viraram âncora a viewport pode pular a seção inteira
  // de uma vez (é o que a rolagem instantânea de prefers-reduced-motion faz).
  // Nesse salto o estado "não intersecta" não muda, nenhum callback dispara e
  // a barra ficava com o destino do trecho anterior. Ler o rect resolve.
  //
  // A leitura é síncrona no handler, sem rAF de propósito: o navegador já
  // entrega no máximo um evento de scroll por frame, e durante rolagem pura o
  // layout está limpo (o rect não força reflow). rAF só acrescentaria um modo
  // de falha — em aba de fundo ele não dispara e a barra congelaria no
  // destino antigo.
  useEffect(() => {
    const medir = () => {
      setPassouDobra(window.scrollY > APARECE_APOS);

      const alvo = document.getElementById("oferta");
      if (!alvo) return;
      const r = alvo.getBoundingClientRect();
      setOfertaVisivel(r.top < window.innerHeight && r.bottom > 0);
      // seção inteira acima da viewport = já foi lida
      setPassouOferta(r.bottom <= 0);
    };

    medir(); // cobre quem chega com a página já rolada (voltar do checkout)
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
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
        <Cta
          position={passouOferta ? "sticky-pos-oferta" : "sticky-pre-oferta"}
          to={passouOferta ? "checkout" : "oferta"}
          full={false}
          className="shrink-0 !px-5 !py-3 !text-[0.7rem] sm:!px-7"
        >
          {COPY.sticky.cta}
        </Cta>
      </div>
    </div>
  );
}
