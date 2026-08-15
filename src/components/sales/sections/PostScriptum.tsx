import { COPY } from "@/lib/sales-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// SEÇÃO 13 · P.S.
// Callout de borda lateral, itálico, muito respiro. O CTA final é BOTÃO sólido,
// nunca link de texto — quem chegou até aqui merece um alvo grande.
export function PostScriptum() {
  const { ps: c } = COPY;

  return (
    <Section tone="marfim" width="prosa">
      <div className="border-l-2 border-vinho/30 pl-6 sm:pl-8">
        <p className="eyebrow text-lavanda">{c.rotulo}</p>
        <p className="mt-4 font-serif text-[1.12rem] italic leading-[1.7] text-tinta/85 sm:text-[1.25rem]">
          {c.texto}
        </p>
        <p className="mt-6 font-serif text-[1.35rem] font-semibold not-italic leading-snug text-indigo sm:text-[1.7rem]">
          {c.fecho}
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <Cta position="ps" pulse>
          {c.cta}
        </Cta>
      </div>
    </Section>
  );
}
