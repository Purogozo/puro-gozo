import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";

// 10 · PROVA SOCIAL
// Relatos reais, com o trecho-chave em destaque acima do texto completo.
//
// ⚠️ O brief pede foto/vídeo por depoimento. Os arquivos NÃO existem ainda,
// e caixa vazia ou rosto inventado é prova falsa — por isso o card não tem
// imagem. Quando chegarem, o lugar é acima da citação, no topo do card.
export function Prova() {
  const { prova: c } = METODO;

  return (
    <Section tone="areia" width="larga">
      <h2 className="mx-auto max-w-3xl text-center font-serif text-[1.6rem] font-semibold leading-[1.22] text-indigo sm:text-[2.15rem]">
        {c.h2}
      </h2>

      <div className="mt-11 grid gap-5 sm:mt-14 lg:grid-cols-3 lg:gap-6">
        {c.depoimentos.map((d) => (
          <figure
            key={d.nome}
            className="reveal flex flex-col rounded-[1.25rem] rounded-bl-sm bg-white px-6 py-6 shadow-[0_24px_60px_-40px_rgba(30,31,58,0.5)]"
          >
            <p className="font-serif text-[1.2rem] font-semibold leading-[1.35] text-vinho sm:text-[1.3rem]">
              “{d.destaque}”
            </p>
            <blockquote className="mt-4 mb-4 font-sans text-[0.95rem] font-light leading-[1.7] text-tinta/75">
              {d.texto}
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-2.5 border-t border-nevoa/25 pt-3">
              <span
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-full bg-indigo/10 font-serif text-[0.8rem] font-semibold text-indigo"
              >
                {d.nome.charAt(0)}
              </span>
              <span className="font-sans text-[0.82rem] font-light text-tinta/60">
                {d.nome}, {d.idade}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

    </Section>
  );
}
