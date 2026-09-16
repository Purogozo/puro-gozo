import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// 16 · STACK OFFER
// id="oferta": a sticky bar some enquanto esta seção está na tela, e é o
// alvo de todos os CTAs acima dela. Daqui pra baixo, botão = checkout.
//
// Layout do brief: lista com ✅ e valores riscados à direita; total riscado;
// parcela em destaque grande; à vista menor abaixo.
export function Oferta() {
  const { oferta: c } = METODO;

  return (
    <Section id="oferta" tone="areia" width="media">
      <div className="rounded-[1.5rem] border-2 border-vinho/25 bg-white px-6 py-8 shadow-[0_28px_70px_-45px_rgba(110,51,80,0.55)] sm:px-10 sm:py-10">
        <h2 className="text-center font-serif text-[1.6rem] font-semibold leading-[1.2] text-indigo sm:text-[2.1rem]">
          {c.h2}
        </h2>

        <ul className="mt-8 flex flex-col">
          {c.itens.map((item) => (
            <li
              key={item.nome}
              className="flex items-start justify-between gap-4 border-b border-nevoa/30 py-4"
            >
              <span className="flex gap-3">
                <span aria-hidden className="mt-[0.1em] shrink-0 text-[1rem]">
                  ✅
                </span>
                <span>
                  <span className="block font-sans text-[0.98rem] font-medium leading-snug text-tinta">
                    {item.nome}
                  </span>
                  {item.detalhe && (
                    <span className="mt-0.5 block font-sans text-[0.82rem] font-light text-tinta/60">
                      {item.detalhe}
                    </span>
                  )}
                </span>
              </span>
              <span className="shrink-0 whitespace-nowrap font-sans text-[0.95rem] font-light text-lavanda line-through decoration-vinho/50">
                {item.valor}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <p className="font-sans text-[1rem] font-light text-tinta/60">
            {c.deRotulo}{" "}
            <span className="text-[1.15rem] line-through decoration-vinho/60">{c.de}</span>
          </p>
          <p className="eyebrow mt-5 text-lavanda">{c.porRotulo}</p>
          <p className="mt-2 font-serif leading-none text-indigo">
            <span className="text-[1.5rem] font-semibold sm:text-[1.9rem]">{c.parcelas}</span>{" "}
            <span className="text-[3.8rem] font-bold sm:text-[4.8rem]">{c.parcela}</span>
          </p>
          <p className="mt-3 font-sans text-[1rem] font-light text-tinta/70 sm:text-[1.08rem]">
            {c.avista}
          </p>
          <p className="mx-auto mt-5 max-w-sm font-serif text-[1rem] italic leading-snug text-vinho sm:text-[1.08rem]">
            {c.comparacao}
          </p>

          <div className="mt-8 flex justify-center">
            <Cta position="oferta" to="checkout" funnel="metodo" pulse>
              {c.cta}
            </Cta>
          </div>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {c.selos.map((s) => (
              <li key={s} className="font-sans text-[0.78rem] font-light text-lavanda">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
