import { METODO } from "@/lib/metodo-copy";
import { Section } from "@/components/sales/Section";
import { Foto } from "@/components/metodo/Foto";

// 2 · AS CENAS DA DOR
// Fundo escuro (gravidade). Três cenas, cada uma imagem + frase; a imagem
// alterna de lado no desktop pra leitura em zigue-zague. No mobile a imagem
// vem SEMPRE antes do texto — é a cena que faz a frase doer.
export function Dor() {
  const { dor: c } = METODO;

  return (
    <Section tone="escuro" width="larga" innerClassName="flex flex-col gap-14 sm:gap-20">
      {c.cenas.map((cena, i) => (
        <div
          key={cena.img.src}
          className="reveal grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-14"
        >
          <Foto
            src={cena.img.src}
            alt={cena.img.alt}
            className={`shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] ${i % 2 ? "lg:order-2" : ""}`}
          />
          <p className="font-serif text-[1.35rem] leading-[1.42] text-marfim sm:text-[1.7rem] lg:text-[1.85rem]">
            {cena.texto}
          </p>
        </div>
      ))}
    </Section>
  );
}
