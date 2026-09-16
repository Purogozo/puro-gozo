import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// 17 · QUEM SOU EU (bio completa)
// Foto REAL (public/andreia-hero.jpg, 4:5). Abaixo da oferta → checkout.
export function Bio() {
  const { bio: c } = METODO;

  return (
    <Section tone="marfim" width="larga">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="mx-auto w-full max-w-[19rem] overflow-hidden rounded-[1.5rem] shadow-[0_28px_70px_-40px_rgba(30,31,58,0.6)] lg:max-w-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/andreia-hero.jpg"
            alt="Andreia Fiamoncini, psicóloga e sexóloga, CRP 12/11076"
            width={1000}
            height={1250}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="eyebrow text-lavanda">{c.eyebrow}</p>
          <div className="prosa mt-5 text-tinta/80">
            {c.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-7 border-l-2 border-vinho/30 pl-5 font-serif text-[1.2rem] italic leading-snug text-vinho sm:text-[1.35rem]">
            {c.fecho}
          </p>
          <div className="mt-7">
            {c.credencial.map((linha, i) => (
              <p
                key={linha}
                className={
                  i === 0
                    ? "font-sans text-[0.95rem] font-medium text-indigo"
                    : "mt-1 font-sans text-[0.88rem] font-light leading-relaxed text-tinta/70"
                }
              >
                {linha}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <Cta position="bio" to="checkout" funnel="metodo">
              {c.cta}
            </Cta>
          </div>
        </div>
      </div>
    </Section>
  );
}
