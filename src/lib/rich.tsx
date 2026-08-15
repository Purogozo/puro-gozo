import { Fragment, type ReactNode } from "react";

// Ênfase dentro da copy sem colocar HTML no copy.ts.
// `*trecho*` vira <em> em itálico — nada além disso é interpretado.
//
// Existe pra que src/lib/copy.ts continue sendo texto puro e legível
// pra quem escreve a copy (e comparável linha a linha com o handoff),
// sem obrigar o componente a fatiar string na mão.
export function rich(text: string, emphasisClassName = "italic"): ReactNode {
  const partes = text.split(/\*(.+?)\*/g);
  if (partes.length === 1) return text;

  return partes.map((parte, i) =>
    // índices ímpares são o que estava entre asteriscos
    i % 2 === 1 ? (
      <em key={i} className={emphasisClassName}>
        {parte}
      </em>
    ) : (
      <Fragment key={i}>{parte}</Fragment>
    )
  );
}
