import { COPY } from "@/lib/sales-copy";
import { Section } from "@/components/sales/Section";

// SEÇÃO 11 · GARANTIA
// Reframe do risco. Sem CTA: a seção 12 é o fechamento e leva o clique.
// O selo é vinho — cor de ação continua exclusiva dos botões.
export function Garantia() {
  const { garantia: c } = COPY;

  return (
    <Section tone="areia" width="prosa">
      <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-start sm:gap-9">
        {/* selo */}
        <div
          aria-hidden
          className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-2 border-vinho/30 text-center"
        >
          <div>
            <p className="font-serif text-[1.5rem] font-bold leading-none text-vinho">
              30
            </p>
            <p className="mt-1 font-sans text-[0.62rem] font-medium uppercase tracking-[0.16em] text-vinho/70">
              dias
            </p>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h2 className="font-serif text-[1.7rem] font-semibold leading-[1.2] text-indigo sm:text-[2.15rem]">
            {c.h2}
          </h2>
          <div className="prosa mt-5 text-tinta/80">
            {c.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-7 border-l-2 border-vinho/30 pl-5 text-left font-serif text-[1.15rem] italic leading-snug text-vinho sm:text-[1.3rem]">
            {c.fecho}
          </p>
        </div>
      </div>
    </Section>
  );
}
