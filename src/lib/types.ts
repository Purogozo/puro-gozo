// ============================================================
// PURO GOZO · Tipos do funil
// ============================================================

export type Path = "A" | "B";

// Perfil dominante derivado da Tela 13
export type Profile = "programacao" | "silencio" | "desconexao";

export type ScreenType =
  | "landing" // T1
  | "single" // seleção única (auto-advance)
  | "multi" // múltipla escolha (checkbox)
  | "letter" // T4 — carta/confissão da Andreia
  | "social" // T11 — prova social
  | "mechanism" // T12 — revelação do mecanismo (pico)
  | "loading" // T18
  | "result" // T19 — resultado/represa (pico)
  | "sales"; // T20 — página de vendas

export interface Option {
  id: string;
  emoji?: string;
  label: string;
  sublabel?: string;
  profile?: Profile; // usado na T13 para calcular perfilDominante
}

export interface ScreenContent {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  body?: string[]; // parágrafos
  options?: Option[];
  cta?: string;
  microcopy?: string; // selo de privacidade / nota de rodapé
  reassurance?: string; // bloco "Respira..." de acolhimento
}

export interface Screen {
  id: number; // 1..20
  type: ScreenType;
  meter: number; // 0..1 — nível da represa nesta tela
  intimate?: boolean; // fundo escuro íntimo (flicker de vela)
  warm?: boolean; // luz dourada/quente
  bifurcates?: boolean; // renderiza variante A/B
  // conteúdo: universal OU por caminho (universal tem prioridade campo a campo)
  universal?: ScreenContent;
  A?: ScreenContent;
  B?: ScreenContent;
}

export interface ProfileInfo {
  key: Profile;
  name: string; // "A Bem-Comportada"
  camada: string; // camada associada
  diagnosis: string; // leitura curta no resultado
}
