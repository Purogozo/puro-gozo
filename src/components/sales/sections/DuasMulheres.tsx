import { COPY } from "@/lib/sales-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// SEÇÃO 3 · DUAS MULHERES
// Dois cards de peso oposto: o de hoje é escuro e pesado, o de depois é claro
// e leve. No mobile empilham com o PESADO PRIMEIRO — a ordem é o argumento.
// Os checks são vinho, não rosé: a cor de ação é exclusiva dos botões.
export function DuasMulheres() {
  const { duasMulheres: c } = COPY;

  return (
    <Section tone="areia" width="larga">
      <h2 className="mx-auto max-w-3xl text-center font-serif text-[1.6rem] font-semibold leading-[1.22] text-indigo sm:text-[2.15rem]">
        {c.h2}
      </h2>

      <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-7">
        {/* ── hoje (pesado) ── */}
        <div className="reveal rounded-[1.5rem] bg-indigo px-6 py-8 text-marfim shadow-[0_28px_70px_-40px_rgba(30,31,58,0.9)] sm:px-8 sm:py-10">
          <p className="eyebrow text-nevoa">{c.hoje.quando}</p>
          <h3 className="mt-3 font-serif text-[1.3rem] leading-snug text-marfim sm:text-[1.55rem]">
            {c.hoje.titulo}
          </h3>
          <ul className="mt-6 flex flex-col gap-4">
            {c.hoje.itens.map((item) => (
              <li key={item} className="flex gap-3 font-sans text-[0.97rem] font-light leading-[1.65] text-marfim/80">
                <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-nevoa/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── com o método (leve) ── */}
        <div className="reveal rounded-[1.5rem] border border-vinho/20 bg-white px-6 py-8 shadow-[0_20px_60px_-45px_rgba(110,51,80,0.6)] sm:px-8 sm:py-10">
          <p className="eyebrow text-vinho">{c.depois.quando}</p>
          <h3 className="mt-3 font-serif text-[1.3rem] leading-snug text-vinho sm:text-[1.55rem]">
            {c.depois.titulo}
          </h3>
          <ul className="mt-6 flex flex-col gap-4">
            {c.depois.itens.map((item) => (
              <li key={item} className="flex gap-3 font-sans text-[0.97rem] font-light leading-[1.65] text-tinta/80">
                <span aria-hidden className="mt-[0.15em] shrink-0 font-medium text-vinho">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex justify-center sm:mt-12">
        <Cta position="duas-mulheres" to="oferta">{c.cta}</Cta>
      </div>
    </Section>
  );
}
