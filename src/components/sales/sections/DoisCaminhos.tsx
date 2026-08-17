import { COPY } from "@/lib/sales-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// SEÇÃO 12 · OS DOIS CAMINHOS (fechamento)
// Seção de peso. Os dois caminhos entram em contraste explícito: o primeiro
// apagado (o que acontece se ela fechar a página), o segundo aceso.
export function DoisCaminhos() {
  const { doisCaminhos: c } = COPY;

  return (
    <Section tone="escuro" width="media">
      <h2 className="text-center font-serif text-[1.8rem] font-semibold leading-[1.18] text-marfim sm:text-[2.4rem]">
        {c.h2}
      </h2>

      <div className="mt-11 flex flex-col gap-5 sm:mt-14">
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
              <p
                className={`eyebrow ${aceso ? "text-rose-suave" : "text-nevoa"}`}
              >
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

      <p className="mt-11 text-center font-serif text-[1.3rem] leading-snug text-marfim sm:text-[1.65rem]">
        {c.fecho}
      </p>

      <div className="mt-10 flex justify-center">
        <Cta position="dois-caminhos" to="checkout" pulse>
          {c.cta}
        </Cta>
      </div>

      <p className="mx-auto mt-5 max-w-md text-center font-sans text-[0.8rem] font-light leading-relaxed text-marfim/70">
        {c.micro}
      </p>
    </Section>
  );
}
