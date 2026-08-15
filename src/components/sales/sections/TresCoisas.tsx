import { COPY } from "@/lib/sales-copy";
import { Section } from "@/components/sales/Section";

// SEÇÃO 4 · AS TRÊS COISAS (agitação)
// Fundo escuro: é a seção de gravidade da página. Curta, respirável, e SEM CTA
// de propósito — empurra direto pro diagnóstico da seção 5.
export function TresCoisas() {
  const { tresCoisas: c } = COPY;

  return (
    <Section tone="escuro" width="prosa">
      <h2 className="font-serif text-[1.55rem] leading-[1.28] text-marfim sm:text-[2rem]">
        {c.h2}
      </h2>

      <div className="mt-12 flex flex-col gap-11 sm:mt-14 sm:gap-14">
        {c.itens.map((item) => (
          <div key={item.indice} className="reveal border-l border-rose-suave/25 pl-5 sm:pl-7">
            <p className="eyebrow text-rose-suave/90">{item.indice}</p>
            <h3 className="mt-2 font-serif text-[1.3rem] italic leading-snug text-marfim sm:text-[1.6rem]">
              {item.titulo}
            </h3>
            <div className="prosa mt-4 text-marfim/75">
              {item.paragrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 font-serif text-[1.3rem] leading-snug text-marfim sm:mt-14 sm:text-[1.6rem]">
        {c.fecho}
      </p>
    </Section>
  );
}
