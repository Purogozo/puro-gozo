import { METODO } from "@/lib/metodo-copy";
import { rich } from "@/lib/rich";
import { Foto } from "@/components/metodo/Foto";

// 1 · CALLOUT — a pergunta que abre a ferida
// Único H1. Sem CTA de propósito (o brief só pede o primeiro botão na
// virada, seção 5); a sticky bar cobre quem quer pular direto.
// Texto à esquerda, cena à direita; no mobile a foto desce pra baixo da
// pergunta — a dobra de 360px é da headline.
//
// O logo saiu daqui em 16/09/2026 pra seção 0 (VSL), que passou a ser o
// topo da página. A copy deste bloco é a mesma de sempre.
export function Callout() {
  const { callout: c } = METODO;

  return (
    <section className="relative isolate overflow-hidden bg-marfim px-5 py-16 sm:px-8 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 60% at 78% 18%, rgba(234,210,216,0.55) 0%, rgba(251,244,246,0) 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          {/* h2: o h1 da página passou a ser a headline acima da VSL (VslTopo, 21/09/2026). Estilo mantido. */}
          <h2 className="font-serif text-[1.85rem] font-bold leading-[1.16] text-indigo sm:text-[2.5rem] lg:text-[2.8rem] lg:leading-[1.1]">
            {c.h1}
          </h2>

          <p className="mt-8 font-sans text-[1.02rem] font-light leading-[1.75] text-tinta/75 sm:text-[1.1rem]">
            {c.intro}
          </p>

          <ul className="mt-4 flex flex-col gap-2">
            {c.conselhos.map((q) => (
              <li
                key={q}
                className="border-l-2 border-nevoa/60 pl-4 font-serif text-[1.08rem] italic leading-snug text-tinta/70 sm:text-[1.2rem]"
              >
                “{q}”
              </li>
            ))}
          </ul>

          <p className="mt-6 font-sans text-[1.02rem] font-light leading-[1.75] text-tinta/75 sm:text-[1.1rem]">
            {c.meio}
          </p>

          <p className="mt-6 font-serif text-[1.18rem] leading-[1.5] text-indigo sm:text-[1.35rem]">
            {rich(c.pergunta, "font-semibold not-italic text-vinho")}
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          {/* SEM priority: com o delay da VSL esta cena fica escondida até
              13:10, e o `priority` gerava um <link rel=preload> de 109 KB
              disputando banda com o vídeo (o LCP) logo no parse. */}
          <Foto
            src={c.img.src}
            alt={c.img.alt}
            className="shadow-[0_30px_80px_-40px_rgba(30,31,58,0.55)]"
          />
        </div>
      </div>
    </section>
  );
}
