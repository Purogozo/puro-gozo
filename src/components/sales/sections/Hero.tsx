import { COPY } from "@/lib/sales-copy";
import { Cta } from "@/components/sales/Cta";

// SEÇÃO 2 · HERO — promessa + autoridade
// Único H1 da página. Texto à esquerda, retrato à direita com o card de
// credencial sobreposto; no mobile a foto desce pra baixo do CTA (a promessa
// tem que vir antes de qualquer coisa na dobra de 360px).
//
// Pra trocar a foto: substitua public/andreia-hero.jpg (proporção 4:5).
// É <img> puro, não next/image: o arquivo já sai otimizado do repositório de
// assets e esta imagem está no caminho crítico da dobra.
export function Hero() {
  const { hero } = COPY;

  return (
    <section className="relative isolate overflow-hidden bg-marfim px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
      {/* wash quente atrás do herói — dá profundidade sem virar "fundo colorido" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 60% at 78% 18%, rgba(234,210,216,0.55) 0%, rgba(251,244,246,0) 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ── texto ── */}
        <div className="flex flex-col items-start">
          <h1 className="font-serif text-[1.85rem] font-bold leading-[1.16] text-indigo sm:text-[2.5rem] lg:text-[2.9rem] lg:leading-[1.1]">
            {hero.h1}
          </h1>

          <p className="prosa mt-6 max-w-xl text-tinta/75">
            <span className="block text-[1.02rem] leading-[1.75] sm:text-[1.1rem]">
              {hero.sub}
            </span>
          </p>

          <p className="mt-8 font-sans text-[0.82rem] font-medium uppercase tracking-[0.16em] text-lavanda">
            {hero.micro}
          </p>

          <div className="mt-4 w-full">
            <Cta position="hero" to="oferta" pulse>
              {hero.cta}
            </Cta>
          </div>
        </div>

        {/* ── retrato + credencial ── */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="overflow-hidden rounded-[1.75rem] bg-rose-suave/40 shadow-[0_30px_80px_-40px_rgba(30,31,58,0.55)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/andreia-hero.jpg"
              alt="Andreia Fiamoncini, psicóloga e sexóloga"
              width={1000}
              height={1250}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>

          {/* card de credencial sobreposto — no mobile encosta na base da foto */}
          <div className="mx-auto -mt-8 w-[88%] rounded-2xl border border-nevoa/30 bg-white/95 px-5 py-4 shadow-[0_18px_50px_-24px_rgba(30,31,58,0.5)] backdrop-blur-sm lg:absolute lg:-bottom-6 lg:left-6 lg:mt-0 lg:w-auto lg:max-w-[19rem]">
            <p className="font-serif text-[1.05rem] font-semibold text-indigo">
              {hero.credencial.nome}
            </p>
            <p className="mt-0.5 font-sans text-[0.85rem] font-light text-tinta/70">
              {hero.credencial.titulo}
            </p>
            <p className="eyebrow mt-1.5 text-lavanda">
              {hero.credencial.registro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
