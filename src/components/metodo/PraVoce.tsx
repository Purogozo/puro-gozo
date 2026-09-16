import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";

// 14 · O PURO GOZO É PRA VOCÊ SE
export function PraVoce() {
  const { praVoce: c } = METODO;

  return (
    <Section tone="escuro" width="media">
      <h2 className="font-serif text-[1.6rem] font-semibold leading-[1.22] text-marfim sm:text-[2.15rem]">
        {c.h2}
      </h2>
      <ul className="mt-9 flex flex-col gap-5">
        {c.itens.map((item) => (
          <li
            key={item}
            className="reveal flex gap-4 font-serif text-[1.15rem] leading-[1.5] text-marfim/90 sm:text-[1.3rem]"
          >
            <span aria-hidden className="mt-[0.2em] shrink-0 font-sans text-[1rem] font-medium text-rose-suave">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
