import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Avaliação Puro Gozo · Descubra o que apagou o seu desejo",
  description:
    "Uma avaliação de 2 minutos, criada por uma sexóloga, que identifica por que você perdeu a vontade e te mostra o caminho de volta ao prazer.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#363975",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
