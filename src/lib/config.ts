// ============================================================
// PURO GOZO · Configuração de integração
// (edite estes valores: não precisa mexer em componentes)
// ============================================================

// ⚠️ DUAS OFERTAS, UM PRODUTO SÓ.
// O app serve dois funis: o quiz em /quiz (R$ 47) e a página de vendas em /
// (R$ 97). Os dois vendem o MESMO produto na Hotmart (R106650092U) — o que
// separa as ofertas é o parâmetro `off` na URL de checkout. Se ele se perder,
// a pessoa lê um preço na página e paga outro no checkout.
// `withParams` (params.ts) anexa as UTMs com searchParams.set, que preserva
// a query da base. Não trocar por concatenação de string.

// Checkout do QUIZ — oferta de R$ 47 (env sobrescreve se precisar)
export const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://pay.hotmart.com/R106650092U";

// Checkout da PÁGINA DE VENDAS — oferta de R$ 97
export const SALES_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_SALES_CHECKOUT_URL ??
  "https://pay.hotmart.com/R106650092U?off=jqxrq4se&checkoutMode=10";

// Endpoint de analytics (screen_view, option_select, etc.) → Supabase.
// Default aponta pra rota interna: em produção funciona sem env nenhuma.
// Defina como "" pra desligar a ingestão (eventos vão pro console em dev).
export const ANALYTICS_ENDPOINT =
  process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ?? "/api/analytics";

// Meta Pixel — ID único (usado no layout e no mapeamento de eventos)
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "902002282309973";

// Valor da oferta para os eventos do Pixel (Lead / InitiateCheckout).
// O servidor é a autoridade sobre esses números (ver api/meta/capi/route.ts):
// o cliente só diz de QUAL funil veio o evento, nunca quanto ele vale.
export const OFFER_VALUE = 47; // funil do quiz
export const SALES_OFFER_VALUE = 97; // página de vendas
export const OFFER_CURRENCY = "BRL";

// Valor autoritativo por funil — a única fonte que o Route Handler consulta.
export const FUNNEL_VALUE = {
  quiz: OFFER_VALUE,
  vendas: SALES_OFFER_VALUE,
} as const;

export type Funnel = keyof typeof FUNNEL_VALUE;

// Parâmetros preservados da landing até o checkout
export const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "ttclid",
  "src",
  "sck",
] as const;

// Preço (oferta): fonte única do bloco de vendas.
// Ancoragem única: o Método é o valor cheio (R$ 297). Os bônus não entram
// na soma, entram como GRÁTIS. Valor sem "R$" é renderizado sem tarja.
export const OFFER = {
  itens: [
    { nome: "Método das 3 Camadas: 6 módulos", valor: "R$ 297" },
    { nome: "🎁 Anatomia do prazer: o que ninguém te mostrou sobre o seu corpo e o seu orgasmo", valor: "GRÁTIS" },
    { nome: "🎁 Presença na hora H: como fazer a cabeça parar de fugir durante o sexo, sem culpa", valor: "GRÁTIS" },
    { nome: "🎁 Comunicação erótica: como pedir o que você quer na cama sem criar climão", valor: "GRÁTIS" },
    { nome: "🎁 Acesso ao aplicativo completo: tudo organizado, da primeira à última camada", valor: "GRÁTIS" },
  ],
  de: "R$ 297",
  por: "R$ 47",
  parcelado: "ou 5x de R$ 9,90",
  timerSeconds: 15 * 60,
};
