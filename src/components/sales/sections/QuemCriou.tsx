import { COPY } from "@/lib/sales-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// SEÇÃO 8 · QUEM CRIOU (autoridade)
// Foto à esquerda, texto à direita. A credencial vive num callout de borda
// lateral, e os três números fecham a seção — o "+13 mil atendimentos" tem o
// maior peso visual porque é o número que prova a escala do consultório.
//
// Pra trocar a foto: substitua public/andreia-retrato.jpg (quadrado).
export function QuemCriou() {
  const { quemCriou: c } = COPY;

  return (
    <Section tone="areia" width="larga">
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* ── retrato ── */}
        <div className="mx-auto w-full max-w-[19rem] lg:sticky lg:top-12 lg:max-w-none">
          <div className="overflow-hidden rounded-[1.5rem] shadow-[0_28px_70px_-40px_rgba(30,31,58,0.6)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/andreia-retrato.jpg"
              alt="Andreia Fiamoncini, psicóloga e sexóloga, CRP 12/11076"
              width={700}
              height={700}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* ── texto ── */}
        <div>
          <p className="eyebrow text-lavanda">{c.eyebrow}</p>
          <h2 className="mt-3 font-serif text-[1.6rem] font-semibold leading-[1.22] text-indigo sm:text-[2.1rem]">
            {c.h2}
          </h2>

          <div className="mt-7 border-l-2 border-vinho/30 pl-5">
            {c.credencial.map((linha, i) => (
              <p
                key={linha}
                className={
                  i === 0
                    ? "font-sans text-[0.95rem] font-medium text-vinho"
                    : "mt-1 font-sans text-[0.88rem] font-light leading-relaxed text-tinta/70"
                }
              >
                {linha}
              </p>
            ))}
          </div>

          <div className="prosa mt-8 text-tinta/80">
            {c.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* ── números de autoridade ── */}
          {/* items-end: os três números têm corpos diferentes de propósito
              (o "+13 mil" é o que pesa). Alinhar pela base faz os rótulos
              ficarem na mesma linha em vez de escadinha. */}
          <dl className="mt-11 grid gap-6 border-t border-vinho/15 pt-8 sm:grid-cols-3 sm:items-end sm:gap-5">
            {c.numeros.map((n) => (
              <div key={n.valor} className="sm:text-center">
                <dt
                  className={`font-serif font-bold leading-none text-indigo ${
                    n.destaque
                      ? "text-[3rem] sm:text-[3.4rem]"
                      : "text-[1.9rem] sm:text-[2.1rem]"
                  }`}
                >
                  {n.valor}
                </dt>
                <dd className="mt-2 font-sans text-[0.85rem] font-light leading-snug text-tinta/65">
                  {n.rotulo}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-11">
            <Cta position="quem-criou" to="oferta">{c.cta}</Cta>
          </div>
        </div>
      </div>
    </Section>
  );
}
