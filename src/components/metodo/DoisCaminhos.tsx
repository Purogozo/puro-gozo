import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";
import { Foto } from "@/components/metodo/Foto";

// 20 · OS DOIS CAMINHOS + FECHO
// Vinho: o segundo soco da página, no fechamento. A cena da "quarta-feira
// qualquer" abre a seção. O preço reaparece em uma linha acima do botão
// ("preço acima", no brief) — reaproveita os textos da oferta pra nunca
// divergir. CTA → checkout.
export function DoisCaminhos() {
  const { doisCaminhos: c, oferta } = METODO;

  return (
    <Section tone="vinho" width="media" className="py-20 sm:py-28">
      <Foto
        src={c.img.src}
        alt={c.img.alt}
        className="shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]"
      />

      <h2 className="mt-12 text-center font-serif text-[1.8rem] font-semibold leading-[1.18] text-marfim sm:mt-16 sm:text-[2.4rem]">
        {c.h2}
      </h2>

      <div className="mt-10 flex flex-col gap-5 sm:mt-12">
        {c.caminhos.map((caminho, i) => {
          const aceso = i === 1;
          return (
            <div
              key={caminho.rotulo}
              className={`reveal rounded-[1.25rem] px-6 py-7 sm:px-8 sm:py-8 ${
                aceso
                  ? "border border-rose-suave/40 bg-marfim/10"
                  : "border border-white/10 bg-black/15"
              }`}
            >
              <p className={`eyebrow ${aceso ? "text-rose-suave" : "text-nevoa"}`}>
                {caminho.rotulo}
              </p>
              <p
                className={`mt-3 font-sans text-[0.99rem] font-light leading-[1.76] sm:text-[1.05rem] ${
                  aceso ? "text-marfim/95" : "text-marfim/70"
                }`}
              >
                {caminho.texto}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mx-auto mt-11 max-w-xl text-center font-serif text-[1.25rem] leading-snug text-marfim sm:text-[1.55rem]">
        {c.fecho}
      </p>

      <p className="mt-10 text-center font-sans text-[0.95rem] font-light text-marfim/75">
        <span className="line-through">{oferta.de}</span>{" "}
        <span className="font-medium text-marfim">
          {oferta.parcelas} {oferta.parcela}
        </span>{" "}
        · {oferta.avista}
      </p>

      <div className="mt-5 flex justify-center">
        <Cta position="dois-caminhos" to="checkout" funnel="metodo" pulse>
          {c.cta}
        </Cta>
      </div>
      <p className="mt-4 text-center font-sans text-[0.8rem] font-light text-marfim/70">
        {c.ctaSub}
      </p>
    </Section>
  );
}
