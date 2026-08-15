import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/config";
import "./globals.css";

// Playfair Display — títulos e headlines (protagonista)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Jost — corpo (300/400) e rótulos/eyebrows/botões (500)
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// ⚠️ REGISTRO CLÍNICO PROPOSITAL — não "melhorar" com copy de venda.
// Em 07/2026 o domínio purogozo.com foi marcado pela Meta como "Conteúdo
// inadequado", o que restringiu entrega e dados de otimização e obrigou a
// migração pro domínio atual. Estas tags descrevem o produto como saúde
// sexual, que é o que ele é.
//
// ⚠️⚠️ MUDOU EM 14/08/2026, E MUDOU PRA PIOR EM TERMOS DE EXPOSIÇÃO.
// Antes, a raiz era o quiz e o <body> servido tinha só a T1 — title,
// description e OG eram quase o único texto rastreável. Agora a raiz é a
// PÁGINA DE VENDAS, que é SSR de texto puro: a copy crua inteira vai no HTML
// e é lida por qualquer rastreador. Estas tags continuam valendo, mas já não
// são a única superfície — hoje elas são a menor parte dela.
// Ver a nota de risco no README antes de apontar campanha pra este domínio.
export const metadata: Metadata = {
  title: "Avaliação de Saúde Sexual Feminina",
  description:
    "Autoavaliação desenvolvida por uma sexóloga para mulheres que perderam o interesse na vida íntima. Resultado em 2 minutos.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Avaliação de Saúde Sexual Feminina",
    description:
      "Autoavaliação desenvolvida por uma sexóloga para mulheres que perderam o interesse na vida íntima. Resultado em 2 minutos.",
    type: "website",
    locale: "pt_BR",
    // siteName omitido de propósito: era a última ocorrência do nome da marca
    // em texto que o rastreador lê. Sobra só o domínio, em og:url.
    // Domínio neutro (07/2026): purogozo.com foi marcado "Conteúdo inadequado"
    // pela Meta; o funil migrou pra reconectasexualidade.com.br pra sair do bloqueio.
    url: "https://www.reconectasexualidade.com.br",
  },
  verification: {
    other: {
      "facebook-domain-verification": "ta0vpv45b3sj8jhnuyhb6gouzfvneh",
    },
  },
};

// ⚠️ SEM `maximumScale` aqui de propósito. Ele existia no app inteiro por
// causa da dobra medida da T1, mas bloquear o zoom numa página de leitura
// longa (a de vendas, na raiz) é barreira de acessibilidade. A restrição foi
// movida pro `viewport` da própria rota /quiz, onde ela faz sentido.
export const viewport: Viewport = {
  themeColor: "#363975",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${jost.variable} h-full antialiased`}
    >
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        {/* End Meta Pixel Code */}
      </head>
      <body className="min-h-full">
        {children}
        {/* Meta Pixel — noscript fallback */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
