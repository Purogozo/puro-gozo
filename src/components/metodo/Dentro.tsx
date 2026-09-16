import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";

// 12 · DENTRO DO PURO GOZO VOCÊ VAI TER
// Escuro. Checks em rose-suave (acento do fundo escuro; a cor de ação segue
// exclusiva dos botões).
export function Dentro() {
  const { dentro: c } = METODO;

  return (
    <Section tone="escuro" width="media">
      <h2 className="font-serif text-[1.6rem] font-semibold leading-[1.22] text-marfim sm:text-[2.15rem]">
        {c.h2}
      </h2>
      <ul className="mt-9 flex flex-col gap-5">
        {c.itens.map((item) => (
          <li
            key={item}
            className="reveal flex gap-4 border-b border-white/10 pb-5 font-sans text-[1rem] font-light leading-[1.65] text-marfim/85 sm:text-[1.08rem]"
          >
            <span aria-hidden className="mt-[0.15em] shrink-0 font-medium text-rose-suave">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
