import { METODO } from "@/lib/metodo-copy";
import { rich } from "@/lib/rich";
import { Section } from "@/components/sales/Section";
import { Foto } from "@/components/metodo/Foto";

// 7 · O MECANISMO (a verdade que ninguém fala)
// Leitura longa em fundo claro (areia). A cena entra entre o título e a
// prosa; o nome do mecanismo fecha numa faixa que sangra da medida.
export function Mecanismo() {
  const { mecanismo: c } = METODO;

  return (
    <Section tone="areia" width="prosa">
      <h2 className="font-serif text-[1.7rem] font-semibold leading-[1.2] text-indigo sm:text-[2.2rem]">
        {c.h2}
      </h2>

      <Foto
        src={c.img.src}
        alt={c.img.alt}
        className="mt-8 shadow-[0_28px_70px_-40px_rgba(30,31,58,0.55)]"
      />

      <div className="prosa mt-8 text-tinta/80">
        {c.paragrafos.map((p) => (
          <p key={p}>{rich(p, "font-medium not-italic text-vinho")}</p>
        ))}
      </div>

      <figure className="relative left-1/2 mt-12 w-screen -translate-x-1/2 border-y border-vinho/15 bg-marfim px-5 py-10 text-center sm:mt-16 sm:py-14">
        <blockquote className="mx-auto max-w-2xl font-serif text-[1.35rem] leading-[1.35] text-indigo sm:text-[1.8rem]">
          {rich(c.fecho, "font-semibold not-italic text-vinho")}
        </blockquote>
      </figure>
    </Section>
  );
}
