// ============================================================
// PURO GOZO · Configuração de integração
// (edite estes valores — não precisa mexer em componentes)
// ============================================================

// Checkout Hotmart — troque pelo link real do produto
export const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://pay.hotmart.com/XXXXXXX";

// Endpoint de analytics (screen_view, option_select, etc.)
export const ANALYTICS_ENDPOINT =
  process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ?? "";

// Captura de lead após o resultado (pico de investimento).
// Desligue passando NEXT_PUBLIC_LEAD_CAPTURE=off
export const ENABLE_LEAD_CAPTURE =
  process.env.NEXT_PUBLIC_LEAD_CAPTURE !== "off";

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

// Preço (oferta) — fonte única do bloco de vendas
export const OFFER = {
  itens: [
    { nome: "Método das 3 Camadas — 6 módulos", valor: "R$ 197" },
    { nome: "🎁 Anatomia do prazer — o que ninguém te mostrou sobre o seu corpo e o seu orgasmo", valor: "R$ 77" },
    { nome: "🎁 Presença na hora H — como fazer a cabeça parar de fugir durante o sexo, sem culpa", valor: "R$ 119" },
    { nome: "🎁 Comunicação erótica — como pedir o que você quer na cama sem criar climão", valor: "R$ 159" },
    { nome: "🎁 Acesso ao aplicativo completo — tudo organizado, da primeira à última camada", valor: "incluso" },
  ],
  de: "R$ 552",
  por: "R$ 47",
  parcelado: "ou 5x de R$ 9,90",
  timerSeconds: 15 * 60,
};
