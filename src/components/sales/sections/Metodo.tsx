import { COPY } from "@/lib/sales-copy";
import { rich } from "@/lib/rich";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// SEÇÃO 7 · O QUE FALTA + OS 3 PASSOS (método)
// Volta pro claro (respiro depois da seção-soco). Os numerais 01/02/03 são
// névoa/lavanda, NUNCA rosé — a cor de ação não se repete fora dos botões.
//
// Mockup oficial do produto (entregue pelo cliente em 14/08/2026 como página
// HTML "Mockup Puro Gozo 3x4"; rasterizado em 1080×1440 = 3:4).
// PRA TROCAR: substitua public/mockup-metodo.jpg mantendo a proporção 3:4.
// O fundo do arquivo é o próprio marfim da marca, então ele se funde com a
// seção — nada de moldura, sombra ou card em volta.
function MockupProduto() {
  return (
    <div className="mx-auto w-full max-w-[19rem] lg:max-w-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mockup-metodo.jpg"
        alt="O que está incluso no Método Puro Gozo: 6 módulos em vídeo, apostilas e o Diário do Prazer, acessíveis no computador e no celular"
        width={1080}
        height={1440}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-[1.25rem]"
      />
    </div>
  );
}

export function Metodo() {
  const { metodo: c } = COPY;

  return (
    <Section tone="marfim" width="larga">
      {/* a coluna do mockup ganhou peso quando a arte oficial entrou: a peça
          tem detalhe interno (tela, celular, apostilas) que some se ficar
          estreita demais */}
      <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div className="lg:sticky lg:top-12">
          <MockupProduto />
        </div>

        <div>
          <p className="eyebrow text-lavanda">{c.eyebrow}</p>
          <h2 className="mt-3 font-serif text-[1.7rem] font-semibold leading-[1.2] text-indigo sm:text-[2.2rem]">
            {rich(c.h2, "italic text-vinho")}
          </h2>

          <p className="prosa mt-6 max-w-2xl text-tinta/80">
            <span className="block text-[1rem] leading-[1.78] sm:text-[1.06rem]">
              {c.intro}
            </span>
          </p>

          <ol className="mt-11 flex flex-col gap-9 sm:gap-11">
            {c.passos.map((passo) => (
              <li key={passo.n} className="reveal">
                <div className="flex items-baseline gap-4">
                  {/* largura fixa: 01/02/03 não têm a mesma largura em Playfair,
                      e sem isso os três títulos começam em x diferentes */}
                  <span
                    aria-hidden
                    className="w-[3rem] shrink-0 font-serif text-[2.6rem] font-bold leading-none text-nevoa sm:w-[3.6rem] sm:text-[3.2rem]"
                  >
                    {passo.n}
                  </span>
                  <h3 className="font-serif text-[1.2rem] font-semibold leading-snug text-indigo sm:text-[1.45rem]">
                    {passo.titulo}
                  </h3>
                </div>
                {/* alinha com o título (largura do numeral + gap-4) */}
                <p className="mt-3 max-w-2xl font-sans text-[0.98rem] font-light leading-[1.78] text-tinta/75 sm:pl-[4.6rem]">
                  {passo.corpo}
                </p>
              </li>
            ))}
          </ol>

          {c.fonte && (
            <p className="mt-8 border-t border-nevoa/30 pt-4 font-sans text-[0.78rem] font-light leading-relaxed text-lavanda">
              {c.fonte}
            </p>
          )}

          <p className="prosa mt-10 max-w-2xl border-l-2 border-vinho/25 pl-5 text-tinta/80">
            <span className="block text-[1rem] leading-[1.78] sm:text-[1.06rem]">
              {c.fecho}
            </span>
          </p>

          <div className="mt-10">
            <Cta position="metodo">{c.cta}</Cta>
          </div>
        </div>
      </div>
    </Section>
  );
}
