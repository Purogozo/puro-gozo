import { COPY } from "@/lib/sales-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// SEÇÃO 6 · O SEU TESÃO NUNCA FOI DELE (virada de posse)
// Seção-soco: fundo de peso, tipo grande, muito respiro, texto curto, nada de
// imagem competindo. Fecha em CTA — é o primeiro clique movido por emoção,
// antes de a pessoa saber qualquer coisa sobre o método.
export function Posse() {
  const { posse: c } = COPY;

  return (
    <Section tone="vinho" width="media" innerClassName="text-center" className="py-20 sm:py-28 lg:py-36">
      <h2 className="font-serif text-[2rem] font-bold leading-[1.12] text-marfim sm:text-[2.9rem] lg:text-[3.4rem]">
        {c.h2}
      </h2>

      <div className="prosa mx-auto mt-9 max-w-xl text-marfim/85 sm:mt-11">
        {c.paragrafos.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="mt-11 flex justify-center sm:mt-14">
        <Cta position="posse" to="oferta" pulse>
          {c.cta}
        </Cta>
      </div>
    </Section>
  );
}
