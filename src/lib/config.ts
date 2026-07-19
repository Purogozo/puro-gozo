// ============================================================
// PURO GOZO · Configuração de integração
// (edite estes valores: não precisa mexer em componentes)
// ============================================================

// Checkout Hotmart: link real do produto (env sobrescreve se precisar)
export const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://pay.hotmart.com/R106650092U";

// Endpoint de analytics (screen_view, option_select, etc.) → Supabase.
// Default aponta pra rota interna: em produção funciona sem env nenhuma.
// Defina como "" pra desligar a ingestão (eventos vão pro console em dev).
export const ANALYTICS_ENDPOINT =
  process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ?? "/api/analytics";

// Meta Pixel — ID único (usado no layout e no mapeamento de eventos)
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "902002282309973";

// Valor da oferta para os eventos do Pixel (Lead / InitiateCheckout)
export const OFFER_VALUE = 47;
export const OFFER_CURRENCY = "BRL";

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
