// Aba "Respostas" — a opção mais escolhida em cada tela do quiz.
// Server Component: recebe os grupos já montados (answers.ts) e só desenha.

import {
  ROTULO_CAMINHO,
  perguntaDoBloco,
  type BlocoRespostas,
  type GrupoTela,
} from "./answers";

const num = (n: number) => new Intl.NumberFormat("pt-BR").format(n);
const taxa = (p: number) => `${(p * 100).toFixed(0)}%`;

export default function AnswersPanel({ grupos }: { grupos: GrupoTela[] }) {
  if (grupos.length === 0) {
    return (
      <p className="text-sm text-nevoa/60">
        Nenhuma resposta no período. As telas de conteúdo (carta, prova social,
        resultado) não têm opção pra escolher — só as de pergunta aparecem aqui.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {grupos.map((g) => (
        <article key={g.screen}>
          <h3 className="text-sm text-marfim">
            <span className={g.removida ? "text-nevoa/50" : "text-marfim/70"}>
              T{g.screen}
            </span>{" "}
            <span className={g.removida ? "text-nevoa/50 line-through" : ""}>
              {g.pergunta}
            </span>
          </h3>

          <div
            className={`mt-3 gap-x-8 gap-y-6 ${
              g.blocos.length > 1 ? "grid lg:grid-cols-2" : ""
            }`}
          >
            {g.blocos.map((b) => (
              <Bloco
                key={b.caminho ?? "unico"}
                bloco={b}
                screen={g.screen}
                multipla={g.multipla}
                // a tela inteira já aparece riscada — marcar opção por opção
                // seria repetir a mesma informação cinco vezes
                marcarForaDoQuiz={!g.removida}
                // no cabeçalho já está a pergunta do caminho A; a coluna só
                // repete a sua quando a redação muda de um lado pro outro
                perguntaDoCabecalho={g.pergunta}
              />
            ))}
          </div>

          {g.semCaminho > 0 && (
            <p className="mt-3 text-xs text-nevoa/60">
              + {num(g.semCaminho)} sessão(ões) responderam sem a T3 registrada —
              sem saber o caminho, não dá pra dizer quais opções elas viram, então
              ficam fora das colunas.
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

function Bloco({
  bloco,
  screen,
  multipla,
  marcarForaDoQuiz,
  perguntaDoCabecalho,
}: {
  bloco: BlocoRespostas;
  screen: number;
  multipla: boolean;
  marcarForaDoQuiz: boolean;
  perguntaDoCabecalho: string;
}) {
  const maior = bloco.escolhas[0]?.sessoes ?? 0;
  const propria = perguntaDoBloco(screen, bloco.caminho);
  const pergunta = propria === perguntaDoCabecalho ? null : propria;

  return (
    <div>
      <p className="mb-2 flex flex-wrap items-baseline gap-x-2 text-xs">
        {bloco.caminho && (
          <span className="rounded bg-marfim/10 px-1.5 py-0.5 text-marfim">
            {bloco.caminho} · {ROTULO_CAMINHO[bloco.caminho]}
          </span>
        )}
        <span className="text-nevoa">
          {num(bloco.respondentes)} responderam
        </span>
      </p>

      {/* nas telas que bifurcam a pergunta muda de um lado pro outro */}
      {pergunta && (
        <p className="mb-2 text-xs italic text-nevoa/70">“{pergunta}”</p>
      )}

      <ul className="space-y-1.5">
        {bloco.escolhas.map((e, i) => {
          // barra proporcional à campeã (e não a 100%): com 5 opções nenhuma
          // passa de 40% e a leitura ficaria toda espremida à esquerda
          const largura = maior > 0 ? (e.sessoes / maior) * 100 : 0;
          const lider = i === 0 && e.sessoes > 0;
          return (
            <li key={e.id} className="text-sm">
              <div className="flex items-baseline gap-2">
                <span
                  className={`min-w-0 flex-1 ${
                    e.sessoes === 0
                      ? "text-nevoa/40"
                      : lider
                        ? "text-marfim"
                        : "text-nevoa"
                  }`}
                >
                  {e.emoji && <span aria-hidden>{e.emoji} </span>}
                  {e.rotulo}
                  {e.fora && marcarForaDoQuiz && (
                    <span className="ml-1 text-xs text-nevoa/50">
                      (opção fora do quiz)
                    </span>
                  )}
                </span>
                <span
                  className={`shrink-0 tabular-nums ${
                    lider ? "font-medium text-marfim" : "text-nevoa"
                  }`}
                >
                  {taxa(e.pct)}
                </span>
                <span className="w-10 shrink-0 text-right text-xs tabular-nums text-nevoa/60">
                  {num(e.sessoes)}
                </span>
              </div>
              <span className="mt-1 block h-1.5 overflow-hidden rounded bg-marfim/10">
                <span
                  className={`block h-1.5 rounded ${
                    lider ? "bg-rose" : "bg-nevoa/50"
                  }`}
                  style={{ width: `${largura}%` }}
                />
              </span>
            </li>
          );
        })}
      </ul>

      {multipla && (
        <p className="mt-2 text-xs text-nevoa/60">
          Múltipla escolha — a soma passa de 100%.
        </p>
      )}
    </div>
  );
}
