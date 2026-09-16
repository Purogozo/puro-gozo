// Imagem de bloco da página /pg-vsl-a.
//
// <img> puro com width/height (não next/image), como na página /: trocar a
// imagem = trocar o arquivo em public/metodo/. As proporções são fixas por
// arquivo — foram geradas nesses tamanhos exatos (KIE · nano-banana,
// 15/09/2026) e a tabela abaixo é o que evita layout shift.
const DIM = {
  "3:2": { width: 1400, height: 933 },
  "4:3": { width: 1400, height: 1050 },
  "4:5": { width: 1000, height: 1250 },
} as const;

const RATIO: Record<string, keyof typeof DIM> = {
  hero: "4:5",
  "dor-1": "3:2",
  "dor-2": "3:2",
  "dor-3": "3:2",
  culpa: "4:5",
  tentou: "4:3",
  faisca: "4:5",
  mecanismo: "3:2",
  "passo-1": "4:3",
  "passo-2": "4:3",
  "passo-3": "4:3",
  "bonus-1": "4:5",
  "bonus-2": "4:5",
  "bonus-3": "4:5",
  quarta: "3:2",
};

export function Foto({
  src,
  alt,
  priority = false,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  /** só a imagem da dobra: sem lazy, com fetchPriority alto */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const { width, height } = DIM[RATIO[src] ?? "3:2"];
  return (
    <div className={`overflow-hidden rounded-[1.5rem] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/metodo/${src}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={`h-auto w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
