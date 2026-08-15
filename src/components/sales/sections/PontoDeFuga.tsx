import { COPY } from "@/lib/sales-copy";
import { rich } from "@/lib/rich";
import { Section } from "@/components/sales/Section";

// SEÇÃO 5 · ONDE O SEU TESÃO SE PERDE (diagnóstico + mecanismo)
// Fundo claro: é a leitura mais longa da página e prosa longa respira melhor
// no claro. A pull-quote assinatura é uma faixa isolada no meio, sangrando pra
// fora da medida de leitura — é a única linha que quebra o registro.
// Sem CTA: a seção 6 é curta e leva ao clique.
export function PontoDeFuga() {
  const { pontoDeFuga: c } = COPY;

  return (
    <Section tone="marfim" width="prosa">
      <h2 className="font-serif text-[1.7rem] font-semibold leading-[1.2] text-indigo sm:text-[2.2rem]">
        {c.h2}
      </h2>

      <div className="prosa mt-7 text-tinta/80">
        {c.antes.map((p) => (
          <p key={p}>{rich(p, "font-medium not-italic text-vinho")}</p>
        ))}
      </div>

      {/* faixa da linha-assinatura — sangra além da medida de leitura */}
      <figure className="relative left-1/2 my-12 w-screen -translate-x-1/2 border-y border-vinho/15 bg-rose-suave/35 px-5 py-10 text-center sm:my-16 sm:py-14">
        <blockquote className="mx-auto max-w-2xl font-serif text-[1.5rem] font-semibold leading-[1.25] text-vinho sm:text-[2.1rem]">
          {c.pullQuote}
        </blockquote>
      </figure>

      <div className="prosa text-tinta/80">
        {c.depois.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {c.fonte && (
        <p className="mt-6 border-t border-nevoa/30 pt-4 font-sans text-[0.78rem] font-light leading-relaxed text-lavanda">
          {c.fonte}
        </p>
      )}
    </Section>
  );
}
