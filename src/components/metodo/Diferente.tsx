import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";

// 11 · POR QUE É DIFERENTE
// Quatro cards; numerais em névoa (nunca rosé).
export function Diferente() {
  const { diferente: c } = METODO;

  return (
    <Section tone="marfim" width="larga">
      <h2 className="mx-auto max-w-3xl text-center font-serif text-[1.6rem] font-semibold leading-[1.22] text-indigo sm:text-[2.15rem]">
        {c.h2}
      </h2>
      <div className="mt-11 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
        {c.itens.map((item) => (
          <div
            key={item.n}
            className="reveal rounded-[1.25rem] border border-nevoa/35 bg-white/70 px-6 py-7 sm:px-7 sm:py-8"
          >
            <span aria-hidden className="font-serif text-[2.4rem] font-bold leading-none text-nevoa">
              {item.n}
            </span>
            <h3 className="mt-3 font-serif text-[1.2rem] font-semibold leading-snug text-indigo sm:text-[1.35rem]">
              {item.titulo}
            </h3>
            <p className="mt-3 font-sans text-[0.95rem] font-light leading-[1.72] text-tinta/75">
              {item.corpo}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
