// Primitiva de seção: cuida do fundo, do respiro vertical e da medida de
// leitura. É aqui que mora o RITMO da página — claro / escuro alternando,
// nunca 3 seções seguidas com o mesmo fundo (ver o mapa em page.tsx).

export type Tone = "marfim" | "areia" | "escuro" | "vinho" | "tinta";

const TONES: Record<Tone, string> = {
  marfim: "bg-marfim text-tinta",
  areia: "bg-areia text-tinta",
  // gradiente índigo → vinho: o fundo "de gravidade"
  escuro: "bg-profundo grain text-marfim",
  // vinho chapado: reservado pra seção-soco (a virada de posse)
  vinho: "bg-vinho grain text-marfim",
  tinta: "bg-tinta text-marfim",
};

const WIDTHS = {
  /** leitura longa — medida curta o bastante pra não cansar */
  prosa: "max-w-[42rem]",
  media: "max-w-3xl",
  larga: "max-w-6xl",
} as const;

export function Section({
  children,
  id,
  tone = "marfim",
  width = "prosa",
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  id?: string;
  tone?: Tone;
  width?: keyof typeof WIDTHS;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:py-28 ${TONES[tone]} ${className}`}
    >
      <div className={`relative z-[2] mx-auto w-full ${WIDTHS[width]} ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
