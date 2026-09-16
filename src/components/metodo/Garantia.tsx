import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";

// 18 · A GARANTIA — o risco é meu
// Duas garantias (7 dias incondicional + 30 dias de resultado), cada uma com
// o seu selo. Sem CTA: o FAQ logo abaixo leva o clique.
function Selo({ texto }: { texto: string }) {
  const [n, unidade] = texto.split(" ");
  return (
    <div
      aria-hidden
      className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-rose-suave/50 text-center"
    >
      <div>
        <p className="font-serif text-[1.5rem] font-bold leading-none text-marfim">{n}</p>
        <p className="mt-1 font-sans text-[0.6rem] font-medium uppercase tracking-[0.16em] text-rose-suave">
          {unidade}
        </p>
      </div>
    </div>
  );
}

export function Garantia() {
  const { garantia: c } = METODO;
  const blocos = [c.sete, c.trinta];

  return (
    <Section tone="escuro" width="media">
      <h2 className="text-center font-serif text-[1.7rem] font-semibold leading-[1.2] text-marfim sm:text-[2.2rem]">
        {c.h2}
      </h2>

      <div className="mt-11 flex flex-col gap-6 sm:mt-14">
        {blocos.map((b) => (
          <div
            key={b.selo}
            className="reveal flex flex-col items-center gap-6 rounded-[1.25rem] border border-white/10 bg-black/15 px-6 py-7 text-center sm:flex-row sm:items-start sm:gap-8 sm:px-8 sm:text-left"
          >
            <Selo texto={b.selo} />
            <div>
              <h3 className="font-serif text-[1.3rem] font-semibold leading-snug text-marfim sm:text-[1.5rem]">
                {b.titulo}
              </h3>
              <p className="mt-3 font-sans text-[0.97rem] font-light leading-[1.75] text-marfim/80">
                {b.texto}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-11 max-w-xl text-center font-serif text-[1.25rem] italic leading-snug text-rose-suave sm:text-[1.5rem]">
        {c.fecho}
      </p>
    </Section>
  );
}
