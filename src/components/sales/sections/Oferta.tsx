import { COPY } from "@/lib/sales-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// SEÇÃO 10 · OFERTA + VALUE STACK
// id="oferta": é o que a sticky bar observa pra sumir enquanto esta seção
// estiver na tela (e o destino do CTA enquanto o link de checkout não existir).
//
// Os selos "Grátis hoje" são VINHO, não rosé: a cor de ação é exclusiva dos
// botões. Se um selo usar a mesma cor do botão, o olho para de saber onde clicar.
export function Oferta() {
  const { oferta: c } = COPY;

  return (
    <Section id="oferta" tone="marfim" width="media">
      <h2 className="text-center font-serif text-[1.7rem] font-semibold leading-[1.2] text-indigo sm:text-[2.2rem]">
        {c.h2}
      </h2>

      {/* ── item principal ── */}
      <div className="mt-10 rounded-[1.5rem] border-2 border-vinho/25 bg-white px-6 py-7 shadow-[0_28px_70px_-45px_rgba(110,51,80,0.55)] sm:px-8 sm:py-9">
        <h3 className="font-serif text-[1.3rem] font-semibold leading-snug text-indigo sm:text-[1.55rem]">
          {c.principal.nome}
        </h3>
        <p className="mt-3 font-sans text-[0.97rem] font-light leading-[1.72] text-tinta/75">
          {c.principal.corpo}
        </p>
      </div>

      {/* ── bônus ── */}
      <div className="mt-5 grid gap-4 sm:grid-cols-3 sm:gap-4">
        {c.bonus.map((b) => (
          <div
            key={b.nome}
            className="reveal flex flex-col rounded-[1.25rem] border border-nevoa/35 bg-white/70 px-5 py-6"
          >
            <span className="self-start rounded-full bg-vinho px-3 py-1 font-sans text-[0.62rem] font-medium uppercase tracking-[0.14em] text-marfim">
              {c.selo}
            </span>
            <h3 className="mt-3 font-serif text-[1.1rem] font-semibold leading-snug text-indigo">
              {b.nome}
            </h3>
            <p className="mt-1 font-sans text-[0.78rem] font-light uppercase tracking-[0.1em] text-lavanda line-through">
              {b.valor}
            </p>
            <p className="mt-3 font-sans text-[0.9rem] font-light leading-[1.65] text-tinta/70">
              {b.corpo}
            </p>
          </div>
        ))}
      </div>

      {/* ── checklist + preço ── */}
      <div className="mt-8 rounded-[1.5rem] bg-areia px-6 py-8 sm:px-10 sm:py-10">
        <p className="eyebrow text-lavanda">{c.checklistTitulo}</p>
        <ul className="mt-5 flex flex-col gap-3">
          {c.checklist.map((item) => (
            <li
              key={item}
              className="flex gap-3 font-sans text-[0.95rem] font-light leading-snug text-tinta/80"
            >
              <span aria-hidden className="mt-[0.1em] shrink-0 font-medium text-vinho">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-9 border-t border-vinho/15 pt-8 text-center">
          <p className="font-sans text-[0.9rem] font-light text-tinta/60">
            {c.ancoraRotulo}:{" "}
            <span className="line-through decoration-vinho/50">{c.ancora}</span>
          </p>
          <p className="eyebrow mt-4 text-lavanda">{c.precoRotulo}</p>
          <p className="mt-1 font-serif text-[3.4rem] font-bold leading-none text-indigo sm:text-[4.2rem]">
            {c.preco}
          </p>
          <p className="mt-2 font-sans text-[0.92rem] font-light text-tinta/65">
            {c.parcelado}
          </p>

          <div className="mt-8 flex justify-center">
            <Cta position="oferta" to="checkout" pulse>
              {c.cta}
            </Cta>
          </div>

          <p className="mt-4 font-sans text-[0.78rem] font-light leading-relaxed text-lavanda">
            {c.micro}
          </p>
        </div>
      </div>
    </Section>
  );
}
