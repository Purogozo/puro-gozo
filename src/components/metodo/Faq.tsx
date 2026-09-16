import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// 19 · FAQ
// <details> nativo: abre e fecha sem JS e sem hidratação (mesma regra da
// página: nada de conteúdo que dependa de React pra aparecer). CTA → checkout.
export function Faq() {
  const { faq: c } = METODO;

  return (
    <Section tone="marfim" width="media">
      <h2 className="text-center font-serif text-[1.6rem] font-semibold leading-[1.22] text-indigo sm:text-[2.15rem]">
        {c.h2}
      </h2>

      <div className="mt-10 flex flex-col divide-y divide-nevoa/35 border-y border-nevoa/35 sm:mt-12">
        {c.itens.map((item) => (
          <details key={item.p} className="faq group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-[1.08rem] font-semibold leading-snug text-indigo sm:text-[1.2rem] [&::-webkit-details-marker]:hidden">
              <span>{item.p}</span>
              <span
                aria-hidden
                className="mt-[0.15em] shrink-0 font-sans text-[1.2rem] font-light leading-none text-vinho transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl font-sans text-[0.97rem] font-light leading-[1.75] text-tinta/75">
              {item.r}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-11 flex justify-center">
        <Cta position="faq" to="checkout" funnel="metodo">
          {c.cta}
        </Cta>
      </div>
    </Section>
  );
}
