import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";

// 6 · QUEM SOU EU (história curta)
// Foto REAL da Andreia (public/andreia-retrato.jpg, 700×700 — a mesma da
// página /). Nunca IA aqui.
export function QuemSou() {
  const { quemSou: c } = METODO;

  return (
    <Section tone="marfim" width="larga">
      <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="mx-auto w-full max-w-[17rem] lg:sticky lg:top-12 lg:max-w-none">
          <div className="overflow-hidden rounded-[1.5rem] shadow-[0_28px_70px_-40px_rgba(30,31,58,0.6)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/andreia-retrato.jpg"
              alt="Andreia Fiamoncini, psicóloga e sexóloga"
              width={700}
              height={700}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mx-auto -mt-6 w-[88%] rounded-2xl border border-nevoa/30 bg-white/95 px-5 py-4 shadow-[0_18px_50px_-24px_rgba(30,31,58,0.5)]">
            <p className="font-serif text-[1.05rem] font-semibold text-indigo">
              {c.credencial.nome}
            </p>
            <p className="mt-0.5 font-sans text-[0.85rem] font-light text-tinta/70">
              {c.credencial.titulo}
            </p>
            <p className="eyebrow mt-1.5 text-lavanda">{c.credencial.registro}</p>
          </div>
        </div>

        <div>
          <p className="eyebrow text-lavanda">{c.eyebrow}</p>
          <div className="prosa mt-5 text-tinta/80">
            {c.paragrafos.map((p, i) => (
              <p
                key={p}
                className={i === 0 ? "!text-[1.15rem] font-serif !leading-[1.6] text-indigo sm:!text-[1.3rem]" : ""}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
