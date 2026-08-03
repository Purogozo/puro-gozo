// ============================================================
// PURO GOZO · Aba "Respostas" — o que escolhem em cada tela
// ============================================================
// O banco devolve id cru: tela 10, opção "evito", 14 sessões. Aqui isso vira a
// pergunta e a frase que a pessoa leu na tela, na ordem do funil.
//
// Como em quiz-meta.ts, a regra é derivar de SCREENS: mudar a copy do quiz
// atualiza o dashboard junto. Só a agregação vem do banco.

import { SCREENS, resolveContent } from "@/lib/screens";
import { rotuloDaTela } from "./quiz-meta";
import type { Option, Path, Screen } from "@/lib/types";

/** Linha crua de pg_answers_range (uma por tela × caminho × opção). */
export type AnswerRow = {
  screen: number;
  caminho: string; // "A" | "B" | "desconhecido"
  opcao: string;
  sessoes: number;
  total_tela: number;
};

export type Escolha = {
  id: string;
  rotulo: string;
  emoji?: string;
  sessoes: number;
  /** fatia de quem respondeu a tela (0..1) */
  pct: number;
  /** opção que já saiu do quiz — sem copy pra resolver o rótulo */
  fora: boolean;
};

export type BlocoRespostas = {
  /** null quando as opções são as mesmas nos dois caminhos */
  caminho: Path | null;
  respondentes: number;
  escolhas: Escolha[];
};

export type GrupoTela = {
  screen: number;
  pergunta: string;
  /** tela que não existe mais no fluxo (ex.: a T2 da idade) */
  removida: boolean;
  /** múltipla escolha: as fatias somam mais de 100% */
  multipla: boolean;
  blocos: BlocoRespostas[];
  /** sessões que responderam sem ter passado pela T3 — fora do recorte A/B */
  semCaminho: number;
};

export const ROTULO_CAMINHO: Record<Path, string> = {
  A: "Com parceiro",
  B: "Sozinha",
};

// Opções que MUDAM conforme o caminho (T5, T9, T10, T15, T16, T17). Nessas, a
// mesma id significa coisas diferentes dos dois lados — a T10 tem "evito" como
// "invento desculpa pra não transar" (A) e "evito até sozinha" (B). Somar os
// dois lados inventaria uma resposta que ninguém deu.
//
// Quando as opções são universais (T3, T6, T7, T13…) o caminho é ruído: as
// frases são idênticas, então os dois lados viram um bloco só.
function opcoesPorCaminho(tela: Screen): boolean {
  return Boolean(tela.A?.options?.length || tela.B?.options?.length);
}

// A pergunta como a pessoa leu. Na T1 ela é o `prompt` ("qual a sua idade?"),
// não a headline — que ali é a promessa da oferta, não uma pergunta.
function perguntaDaTela(tela: Screen, caminho: Path): string {
  const c = resolveContent(tela, caminho);
  return c.prompt?.trim() || c.headline?.trim() || rotuloDaTela(tela.id).texto;
}

type Contagem = { total: number; opcoes: Map<string, number> };

function indexaPorCaminho(linhas: AnswerRow[]): Map<string, Contagem> {
  const mapa = new Map<string, Contagem>();
  for (const l of linhas) {
    let c = mapa.get(l.caminho);
    if (!c) {
      // total_tela é o mesmo em todas as linhas do par (tela, caminho):
      // o denominador é calculado antes de quebrar por opção.
      c = { total: Number(l.total_tela) || 0, opcoes: new Map() };
      mapa.set(l.caminho, c);
    }
    c.opcoes.set(l.opcao, (c.opcoes.get(l.opcao) ?? 0) + (Number(l.sessoes) || 0));
  }
  return mapa;
}

// Uma sessão tem um caminho só, então somar os totais dos caminhos dá o total
// de quem respondeu a tela — sem risco de contar ninguém duas vezes.
function funde(contagens: Contagem[]): Contagem {
  const fundido: Contagem = { total: 0, opcoes: new Map() };
  for (const c of contagens) {
    fundido.total += c.total;
    for (const [id, n] of c.opcoes) {
      fundido.opcoes.set(id, (fundido.opcoes.get(id) ?? 0) + n);
    }
  }
  return fundido;
}

// Parte das opções do quiz (não do banco): opção que ninguém escolheu aparece
// com zero, que é informação — dizer "essa ninguém marca" é tão útil quanto
// dizer qual é a campeã. O que sobra no banco e não está mais na copy entra
// depois, marcado como fora do fluxo.
function montaEscolhas(opcoes: Option[], c: Contagem): Escolha[] {
  const conhecidas = new Set(opcoes.map((o) => o.id));
  const escolhas: Escolha[] = opcoes.map((o) => {
    const n = c.opcoes.get(o.id) ?? 0;
    return {
      id: o.id,
      rotulo: o.label,
      emoji: o.emoji,
      sessoes: n,
      pct: c.total > 0 ? n / c.total : 0,
      fora: false,
    };
  });
  for (const [id, n] of c.opcoes) {
    if (conhecidas.has(id)) continue;
    escolhas.push({
      id,
      rotulo: id,
      sessoes: n,
      pct: c.total > 0 ? n / c.total : 0,
      fora: true,
    });
  }
  return escolhas.sort((a, b) => b.sessoes - a.sessoes);
}

/** Linhas cruas do banco → um grupo por tela, na ordem do funil. */
export function montaRespostas(linhas: AnswerRow[]): GrupoTela[] {
  const porTela = new Map<number, AnswerRow[]>();
  for (const l of linhas) {
    const arr = porTela.get(l.screen);
    if (arr) arr.push(l);
    else porTela.set(l.screen, [l]);
  }

  const grupos: GrupoTela[] = [];

  for (const screen of [...porTela.keys()].sort((a, b) => a - b)) {
    const contagens = indexaPorCaminho(porTela.get(screen)!);
    const tela = SCREENS.find((s) => s.id === screen);

    // Tela que saiu do fluxo: sem copy pra resolver rótulo, mostra os ids crus
    // em vez de esconder o dado — o período pode atravessar a mudança.
    if (!tela) {
      const tudo = funde([...contagens.values()]);
      grupos.push({
        screen,
        pergunta: rotuloDaTela(screen).texto,
        removida: true,
        multipla: false,
        semCaminho: 0,
        blocos: [
          {
            caminho: null,
            respondentes: tudo.total,
            escolhas: montaEscolhas([], tudo),
          },
        ],
      });
      continue;
    }

    const multipla = tela.type === "multi";

    if (!opcoesPorCaminho(tela)) {
      const tudo = funde([...contagens.values()]);
      grupos.push({
        screen,
        pergunta: perguntaDaTela(tela, "A"),
        removida: false,
        multipla,
        semCaminho: 0,
        blocos: [
          {
            caminho: null,
            respondentes: tudo.total,
            escolhas: montaEscolhas(tela.universal?.options ?? [], tudo),
          },
        ],
      });
      continue;
    }

    const blocos: BlocoRespostas[] = [];
    for (const caminho of ["A", "B"] as const) {
      const c = contagens.get(caminho);
      if (!c || c.total === 0) continue;
      blocos.push({
        caminho,
        respondentes: c.total,
        escolhas: montaEscolhas(resolveContent(tela, caminho).options ?? [], c),
      });
    }
    if (blocos.length === 0) continue;

    grupos.push({
      screen,
      // Nas telas que bifurcam a pergunta muda de um lado pro outro; o
      // cabeçalho usa a do caminho A e cada bloco repete a sua.
      pergunta: perguntaDaTela(tela, "A"),
      removida: false,
      multipla,
      // Quem respondeu essa tela mas não tem T3 registrada (beacon perdido,
      // pulo por ?screen=). Não dá pra saber que opções essa pessoa viu, então
      // fica de fora das colunas e vira nota de rodapé.
      semCaminho: contagens.get("desconhecido")?.total ?? 0,
      blocos,
    });
  }

  return grupos;
}

/** Pergunta específica do bloco (nas telas que bifurcam, muda por caminho). */
export function perguntaDoBloco(screen: number, caminho: Path | null): string | null {
  if (!caminho) return null;
  const tela = SCREENS.find((s) => s.id === screen);
  return tela ? perguntaDaTela(tela, caminho) : null;
}
