import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";
import { Foto } from "@/components/metodo/Foto";

// 15 · OS BÔNUS
// "Mockup" de cada bônus = capa gerada (sem texto — texto por IA sai errado)
// com o nome sobreposto em HTML. Valor riscado em lavanda; selo em vinho.
export function Bonus() {
  const { bonus: c } = METODO;

  return (
    <Section tone="marfim" width="larga">
      <h2 className="mx-auto max-w-3xl text-center font-serif text-[1.6rem] font-semibold leading-[1.22] text-indigo sm:text-[2.15rem]">
        {c.h2}
      </h2>

      <div className="mt-11 grid gap-6 sm:mt-14 md:grid-cols-3">
        {c.itens.map((b) => (
          <div key={b.n} className="reveal flex flex-col">
            <div className="relative mx-auto w-full max-w-[17rem] md:max-w-none">
              <Foto
                src={b.img.src}
                alt={b.img.alt}
                className="shadow-[0_28px_70px_-40px_rgba(30,31,58,0.6)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-tinta/85 via-tinta/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="rounded-full bg-vinho px-3 py-1 font-sans text-[0.62rem] font-medium uppercase tracking-[0.14em] text-marfim">
                  🎁 {b.n}
                </span>
                <p className="mt-3 font-serif text-[1.45rem] font-semibold leading-[1.15] text-marfim">
                  {b.nome}
                </p>
              </div>
            </div>
            <p className="mt-5 font-sans text-[0.8rem] font-light uppercase tracking-[0.12em] text-lavanda">
              valor: <span className="line-through">{b.valor}</span>
            </p>
            <p className="mt-3 font-sans text-[0.95rem] font-light leading-[1.7] text-tinta/75">
              {b.corpo}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
