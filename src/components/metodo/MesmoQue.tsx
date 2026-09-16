import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";

// 9 · "MESMO QUE…" (quebra de objeções)
// Escuro, curto, tipo grande. Cada linha entra sozinha.
export function MesmoQue() {
  const { mesmoQue: c } = METODO;

  return (
    <Section tone="escuro" width="media">
      <ul className="flex flex-col gap-6 sm:gap-8">
        {c.itens.map((item) => (
          <li
            key={item}
            className="reveal border-l border-rose-suave/30 pl-5 font-serif text-[1.35rem] italic leading-[1.35] text-marfim sm:pl-7 sm:text-[1.8rem]"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="prosa mt-12 text-marfim/85 sm:mt-14">
        <span className="block text-[1.02rem] leading-[1.78] sm:text-[1.1rem]">
          {c.fecho}
        </span>
      </p>
    </Section>
  );
}
