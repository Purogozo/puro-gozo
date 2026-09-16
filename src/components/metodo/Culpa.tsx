import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";
import { Foto } from "@/components/metodo/Foto";

// 3 · A CULPA
// Volta pro claro (areia). A pergunta calada é a linha de assinatura da
// seção — entra como citação em vinho, isolada.
export function Culpa() {
  const { culpa: c } = METODO;

  return (
    <Section tone="areia" width="larga">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Foto
          src={c.img.src}
          alt={c.img.alt}
          className="mx-auto w-full max-w-[19rem] shadow-[0_28px_70px_-40px_rgba(30,31,58,0.6)] lg:max-w-none"
        />
        <div>
          <p className="font-serif text-[1.5rem] font-semibold leading-[1.28] text-indigo sm:text-[2rem]">
            {c.abre}
          </p>
          <p className="prosa mt-6 max-w-xl text-tinta/80">
            <span className="block text-[1rem] leading-[1.78] sm:text-[1.06rem]">
              {c.corpo}
            </span>
          </p>
          <blockquote className="mt-6 border-l-2 border-vinho/30 pl-5 font-serif text-[1.2rem] italic leading-[1.5] text-vinho sm:text-[1.4rem]">
            {c.pergunta}
          </blockquote>
        </div>
      </div>
    </Section>
  );
}
