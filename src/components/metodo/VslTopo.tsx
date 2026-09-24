import { METODO } from "@/lib/metodo-copy";
import { Vsl } from "@/components/metodo/Vsl";
import { Cta } from "@/components/sales/Cta";

import { Logo } from "@/components/brand/Logo";

// 0 · VSL (topo da página) — pedido do cliente em 16/09/2026.
// Seção NOVA acima do callout: fundo BRANCO (o único da página), logo e o
// player do VTurb (vídeo vertical, largura de celular), e abaixo dele o
// preço ("Somente agora · De R$ 697 por 12x R$ 30,72") com botão DIRETO pro
// checkout — exceção pedida pelo cliente em 16/09/2026 à regra dos CTAs
// acima da oferta. O bloco 1 continua intacto logo abaixo.
// O preço/botão (e tudo dali pra baixo) tem DELAY: só aparece depois de
// 13:10 de vídeo — ver VslDelay.tsx.
export function VslTopo() {
  const { vsl, oferta } = METODO;

  return (
    <section className="bg-white px-5 pb-12 pt-7 sm:px-8 sm:pb-16 sm:pt-9">
      <header className="text-center">
        <Logo className="text-[1.35rem] sm:text-[1.6rem]" />
      </header>

      {/* Headline acima do player (21/09/2026) — sem delay, é o que ela lê primeiro. */}
      <div className="mx-auto mt-7 max-w-2xl text-center sm:mt-9">
        <h1 className="font-serif text-[1.85rem] font-bold leading-[1.16] text-indigo sm:text-[2.5rem] lg:text-[2.8rem] lg:leading-[1.1]">
          {vsl.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-tinta/85 sm:text-[1.2rem]">
          {vsl.subline}
        </p>
      </div>

      <div className="mx-auto mt-7 w-full max-w-3xl sm:mt-9">
        <Vsl id={vsl.id} script={vsl.script} />
      </div>

      {/* data-vsl-delay: escondido até o vídeo passar de 13:10 (VslDelay) */}
      <div
        data-vsl-delay
        className="mx-auto mt-8 flex w-full max-w-md flex-col items-center text-center sm:mt-10"
      >
        <p className="eyebrow text-vinho">{vsl.eyebrow}</p>
        <p className="mt-2 font-serif text-[1.35rem] leading-snug text-indigo sm:text-[1.6rem]">
          {vsl.precoDe}{" "}
          <span className="text-tinta/50 line-through decoration-vinho/50">{oferta.de}</span>{" "}
          {vsl.precoPor} <span className="font-bold">{oferta.parcela}</span>
        </p>
        <div className="mt-5 w-full">
          <Cta position="vsl" to="checkout" funnel="metodo" pulse>
            {vsl.cta}
          </Cta>
        </div>
      </div>
    </section>
  );
}
