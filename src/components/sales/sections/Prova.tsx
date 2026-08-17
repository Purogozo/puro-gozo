import { COPY } from "@/lib/sales-copy";
import { Section } from "@/components/sales/Section";
import { Cta } from "@/components/sales/Cta";

// SEÇÃO 9 · PROVA
// Os relatos entram como balão de conversa (o formato que a leitora reconhece
// como mensagem de gente de verdade, não como depoimento de site).
//
// ⚠️ O handoff previa também prints de WhatsApp e blocos de vídeo com rosto.
// Eles NÃO estão aqui porque os arquivos ainda não existem, e caixa de vídeo
// vazia (ou print inventado) é prova falsa. Quando o material chegar, o lugar
// dele é logo abaixo do grid de relatos, acima do disclaimer — o grid já é
// responsivo e aceita os cards novos sem mudar mais nada.
export function Prova() {
  const { prova: c } = COPY;

  return (
    <Section tone="escuro" width="larga">
      <div className="text-center">
        <p className="eyebrow text-rose-suave/90">{c.eyebrow}</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-serif text-[1.6rem] font-semibold leading-[1.22] text-marfim sm:text-[2.15rem]">
          {c.h2}
        </h2>
      </div>

      <div className="mt-11 grid gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-6">
        {c.depoimentos.map((d) => (
          <figure
            key={d.nome}
            className="reveal flex flex-col rounded-[1.25rem] rounded-bl-sm bg-marfim px-6 py-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)]"
          >
            <blockquote className="mb-4 font-serif text-[1.02rem] italic leading-[1.62] text-tinta/90 sm:text-[1.1rem]">
              “{d.texto}”
            </blockquote>
            {/* mt-auto: os cards têm alturas de texto diferentes mas o grid os
                estica; sem isso a assinatura fica boiando no meio do card */}
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

      <p className="mt-8 text-center font-sans text-[0.78rem] font-light text-marfim/70">
        {c.disclaimer}
      </p>

      <div className="mt-10 flex justify-center sm:mt-12">
        <Cta position="prova" to="oferta">{c.cta}</Cta>
      </div>
    </Section>
  );
}
