import { METODO } from "@/lib/metodo-copy";
import { rich } from "@/lib/rich";
import { Section } from "@/components/sales/Section";
import { Foto } from "@/components/metodo/Foto";

// 4 · TUDO O QUE VOCÊ JÁ TENTOU (E GASTOU)
// Lista com "×" em vinho (não rosé: cor de ação é só dos botões). A natureza-
// morta da gaveta fica ao lado — é o inventário do que não funcionou.
export function Tentou() {
  const { tentou: c } = METODO;

  return (
    <Section tone="marfim" width="larga">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <h2 className="font-serif text-[1.7rem] font-semibold leading-[1.2] text-indigo sm:text-[2.2rem]">
            {c.h2}
          </h2>
          <ul className="mt-7 flex flex-col gap-4">
            {c.itens.map((item) => (
              <li
                key={item}
                className="reveal flex gap-4 font-sans text-[1rem] font-light leading-[1.65] text-tinta/80 sm:text-[1.08rem]"
              >
                <span aria-hidden className="mt-[0.05em] shrink-0 font-serif text-[1.3rem] leading-none text-vinho">
                  ×
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-9 border-l-2 border-vinho/30 pl-5 font-serif text-[1.2rem] leading-[1.45] text-indigo sm:text-[1.4rem]">
            {rich(c.fecho, "font-semibold not-italic text-vinho")}
          </p>
        </div>
        <Foto
          src={c.img.src}
          alt={c.img.alt}
          className="shadow-[0_28px_70px_-40px_rgba(30,31,58,0.55)] lg:order-first"
        />
      </div>
    </Section>
  );
}
