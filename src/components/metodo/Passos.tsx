import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";
import { Foto } from "@/components/metodo/Foto";

// 13 · EM 3 PASSOS
// Imagem + texto por passo, alternando de lado. O verbo do passo é o título
// (DESCOBRIR / REACENDER / FICAR), em caixa alta. CTA → #oferta.
export function Passos() {
  const { passos: c } = METODO;

  return (
    <Section tone="marfim" width="larga">
      <h2 className="mx-auto max-w-3xl text-center font-serif text-[1.6rem] font-semibold leading-[1.22] text-indigo sm:text-[2.15rem]">
        {c.h2}
      </h2>

      <ol className="mt-12 flex flex-col gap-14 sm:mt-16 sm:gap-20">
        {c.itens.map((passo, i) => (
          <li
            key={passo.n}
            className="reveal grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-14"
          >
            <Foto
              src={passo.img.src}
              alt={passo.img.alt}
              className={`shadow-[0_28px_70px_-40px_rgba(30,31,58,0.55)] ${i % 2 ? "lg:order-2" : ""}`}
            />
            <div>
              <p className="eyebrow text-lavanda">{passo.n}</p>
              <h3 className="mt-3 font-serif text-[1.5rem] font-semibold leading-[1.2] text-indigo sm:text-[2rem]">
                <span className="uppercase tracking-[0.04em]">{passo.verbo}</span>{" "}
                {passo.titulo}
              </h3>
              <p className="mt-5 max-w-xl font-sans text-[1rem] font-light leading-[1.78] text-tinta/78 sm:text-[1.06rem]">
                {passo.corpo}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex justify-center sm:mt-16">
        <Cta position="passos" to="oferta" funnel="metodo" pulse>
          {c.cta}
        </Cta>
      </div>
    </Section>
  );
}
