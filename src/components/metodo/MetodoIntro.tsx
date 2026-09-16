import { METODO } from "@/lib/metodo-copy";
import { rich } from "@/lib/rich";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// 8 · O MÉTODO
// Mockup oficial do produto (public/mockup-metodo.jpg, 3:4, o mesmo da
// página /). CTA → #oferta.
export function MetodoIntro() {
  const { metodo: c } = METODO;

  return (
    <Section tone="marfim" width="larga">
      <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div className="mx-auto w-full max-w-[19rem] lg:max-w-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mockup-metodo.jpg"
            alt="O que está incluso no Método Puro Gozo: aulas em vídeo, apostilas e o Diário do Prazer, no computador e no celular"
            width={1080}
            height={1440}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-[1.25rem]"
          />
        </div>
        <div>
          <h2 className="font-serif text-[1.8rem] font-semibold leading-[1.18] text-indigo sm:text-[2.4rem]">
            {rich(c.abre, "italic text-vinho")}
          </h2>
          <p className="prosa mt-6 max-w-xl text-tinta/80">
            <span className="block text-[1rem] leading-[1.78] sm:text-[1.06rem]">
              {c.corpo}
            </span>
          </p>
          <div className="mt-10">
            <Cta position="metodo" to="oferta" funnel="metodo">
              {c.cta}
            </Cta>
          </div>
        </div>
      </div>
    </Section>
  );
}
