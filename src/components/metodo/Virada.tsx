import { METODO } from "@/lib/metodo-copy";
import { rich } from "@/lib/rich";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";
import { Foto } from "@/components/metodo/Foto";

// 5 · A VIRADA (a revelação)
// Seção-soco em VINHO: é a frase que a página inteira prepara. Primeiro CTA
// da página → #oferta (está acima da oferta).
export function Virada() {
  const { virada: c } = METODO;

  return (
    <Section tone="vinho" width="larga" className="py-20 sm:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Foto
          src={c.img.src}
          alt={c.img.alt}
          className="mx-auto w-full max-w-[19rem] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] lg:max-w-none"
        />
        <div>
          <p className="eyebrow text-rose-suave/90">{c.eyebrow}</p>
          <h2 className="mt-4 font-serif text-[2rem] font-bold leading-[1.12] text-marfim sm:text-[2.9rem] lg:text-[3.2rem]">
            {rich(c.h2, "italic text-rose-suave")}
          </h2>
          <div className="prosa mt-8 max-w-xl text-marfim/85">
            {c.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10">
            <Cta position="virada" to="oferta" funnel="metodo" pulse>
              {c.cta}
            </Cta>
          </div>
        </div>
      </div>
    </Section>
  );
}
