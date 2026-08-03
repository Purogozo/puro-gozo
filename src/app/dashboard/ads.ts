// ============================================================
// PURO GOZO · Retenção por anúncio
// ============================================================
// A pergunta que esta aba responde: qual criativo traz gente que FICA?
// CPC baixo não significa nada se quem entra some na T3 — e o inverso também
// acontece: anúncio caro que entrega mulher que vai até o resultado.
//
// A agregação é feita em JS, sobre as linhas de pg_sessions do período, em vez
// de uma função SQL nova. Motivo: função nova exige rodar migração no Supabase
// (que só a cliente consegue fazer) e o volume aqui é de centenas de linhas por
// período. Se um dia isso virar dezenas de milhares, migra pra SQL.

import { SCREENS } from "@/lib/screens";

export type SessionRow = {
  session_id: string;
  max_screen: number | null;
  completed: boolean | null;
  checkout_click: boolean | null;
  landing_url: string | null;
  utm: Record<string, string> | null;
};

export type PurchaseSessionRow = {
  session_id: string | null;
  value: number | null;
};

export type Agrupamento = "anuncio" | "conjunto" | "campanha" | "origem";

export const AGRUPAMENTOS: { chave: Agrupamento; rotulo: string }[] = [
  { chave: "anuncio", rotulo: "Anúncio" },
  { chave: "conjunto", rotulo: "Conjunto" },
  { chave: "campanha", rotulo: "Campanha" },
  { chave: "origem", rotulo: "Origem" },
];

export function normalizaAgrupamento(v: string | undefined): Agrupamento {
  return AGRUPAMENTOS.some((a) => a.chave === v) ? (v as Agrupamento) : "anuncio";
}

// Marcos de retenção, derivados do próprio fluxo — assim renumerar ou remover
// tela não deixa número velho chumbado aqui.
// • entrou:    a 2ª tela do quiz (hoje a T3) = respondeu a idade e seguiu
// • meio:      a revelação do mecanismo (T12), onde a promessa é entregue
// • resultado: a tela de resultado (T19), fim do quiz
const idPorTipo = (tipo: string) => SCREENS.find((s) => s.type === tipo)?.id;

export const MARCOS = {
  entrou: SCREENS[1]?.id ?? 3,
  meio: idPorTipo("mechanism") ?? 12,
  resultado: idPorTipo("result") ?? 19,
};

const CAMPO: Record<Agrupamento, string[]> = {
  // utm_content é o nome do criativo; utm_term é o ID do anúncio na Meta e
  // serve de reserva quando o criativo subiu sem nome.
  anuncio: ["utm_content", "utm_term"],
  conjunto: ["utm_medium"],
  campanha: ["utm_campaign"],
  origem: ["utm_source"],
};

export type LinhaAnuncio = {
  chave: string;
  detalhe: string; // campanha · conjunto, pra dar contexto ao nome do criativo
  sessoes: number;
  telaMedia: number;
  entrou: number;
  meio: number;
  resultado: number;
  checkout: number;
  vendas: number;
  receita: number;
};

export type ResumoAnuncios = {
  linhas: LinhaAnuncio[];
  sessoesLocais: number; // testes em localhost, fora da conta
  vendasSemSessao: number; // compra cuja sessão começou fora do período
};

const ehLocal = (url: string | null) =>
  !!url && /localhost|127\.0\.0\.1/i.test(url);

// Nome de criativo chega escapado quando a Meta injeta o valor já codificado na
// URL do anúncio ("Anuncio_1_Hook_B+%E2%80%94+C%C3%B3pia"). É só apresentação:
// o banco guarda o que veio, e aqui deixamos legível pra quem lê o relatório.
export function legivel(v: string): string {
  try {
    return decodeURIComponent(v.replace(/\+/g, " "));
  } catch {
    return v; // escape quebrado: melhor o valor cru que uma exceção
  }
}

function valorDe(utm: Record<string, string> | null, campos: string[]): string {
  for (const c of campos) {
    const v = utm?.[c];
    if (typeof v === "string" && v.trim()) return legivel(v.trim());
  }
  return "(sem identificação)";
}

export function agregaAnuncios(
  sessoes: SessionRow[],
  compras: PurchaseSessionRow[],
  por: Agrupamento
): ResumoAnuncios {
  const mapa = new Map<string, LinhaAnuncio & { somaTelas: number }>();
  const chavePorSessao = new Map<string, string>();
  let sessoesLocais = 0;

  for (const s of sessoes) {
    // Teste nosso na máquina não é anúncio. Sessões antigas (antes do filtro na
    // rota de ingestão) ainda estão no banco, então limpamos na leitura também.
    if (ehLocal(s.landing_url)) {
      sessoesLocais++;
      continue;
    }

    const chave = valorDe(s.utm, CAMPO[por]);
    const detalhe =
      por === "anuncio"
        ? [s.utm?.utm_campaign, s.utm?.utm_medium]
            .filter((v): v is string => !!v)
            .map(legivel)
            .join(" · ")
        : "";

    const cur =
      mapa.get(chave) ??
      ({
        chave,
        detalhe,
        sessoes: 0,
        telaMedia: 0,
        somaTelas: 0,
        entrou: 0,
        meio: 0,
        resultado: 0,
        checkout: 0,
        vendas: 0,
        receita: 0,
      } as LinhaAnuncio & { somaTelas: number });

    const tela = Number(s.max_screen ?? 1);
    cur.sessoes++;
    cur.somaTelas += tela;
    if (tela >= MARCOS.entrou) cur.entrou++;
    if (tela >= MARCOS.meio) cur.meio++;
    if (tela >= MARCOS.resultado || s.completed) cur.resultado++;
    if (s.checkout_click) cur.checkout++;
    if (!cur.detalhe && detalhe) cur.detalhe = detalhe;

    mapa.set(chave, cur);
    chavePorSessao.set(s.session_id, chave);
  }

  // Vendas entram pela sessão que as gerou (xcod → session_id no webhook).
  let vendasSemSessao = 0;
  for (const c of compras) {
    const chave = c.session_id ? chavePorSessao.get(c.session_id) : undefined;
    if (!chave) {
      vendasSemSessao++;
      continue;
    }
    const linha = mapa.get(chave);
    if (!linha) continue;
    linha.vendas++;
    linha.receita += Number(c.value ?? 0);
  }

  const linhas = [...mapa.values()]
    .map(({ somaTelas, ...l }) => ({
      ...l,
      telaMedia: l.sessoes > 0 ? somaTelas / l.sessoes : 0,
    }))
    // Volume primeiro: retenção de 100% em 2 sessões não é informação.
    .sort((a, b) => b.sessoes - a.sessoes);

  return { linhas, sessoesLocais, vendasSemSessao };
}

// Abaixo disso a porcentagem é ruído — a tabela avisa em vez de deixar alguém
// desligar um criativo por causa de 3 sessões.
export const AMOSTRA_MINIMA = 20;
