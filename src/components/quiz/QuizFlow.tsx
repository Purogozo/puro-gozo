"use client";

import { useEffect, useState, Suspense, lazy } from "react";
import { SCREENS, resolveContent } from "@/lib/screens";
import { type Variant } from "@/lib/ab";
import { captureParams } from "@/lib/tracking";
import { LandingScreen } from "./screens/LandingScreen";

// O fluxo interativo (Framer Motion + as 8 telas) é carregado SOB DEMANDA, só
// no cliente e só depois da T1 já ter pintado. Como o QuizRunner nunca é
// renderizado durante o SSR nem na primeira pintura do cliente (guard `mounted`
// abaixo), o import() dele vira um chunk separado que baixa DEPOIS da hidratação
// — tirando ~o Framer e as telas de baixo do bundle inicial da rota.
const QuizRunner = lazy(() =>
  import("./QuizRunner").then((m) => ({ default: m.QuizRunner }))
);

// Shell da home.
//
// PROBLEMA que isto resolve: antes, o QuizFlow devolvia uma tela índigo em
// branco até o React hidratar (~800KB de JS). Num navegador in-app lento
// (Instagram/Facebook no celular) isso era segundos de tela preta → a pessoa
// achava que travou e voltava. Medido: ~78% de abandono na T1.
//
// AGORA: a T1 (LandingScreen, sem Framer) é renderizada no SSR e na primeira
// pintura do cliente — vem VISÍVEL já no HTML, sem esperar JS. O QuizRunner
// assume por baixo assim que carrega, de forma imperceptível.
//
// Hydration-safe: `mounted` (useState) é garantidamente false no servidor e na
// primeira renderização do cliente, virando true só depois de montar. Servidor
// e cliente-primeira-pintura produzem o MESMO HTML (a T1), sem mismatch.
export function QuizFlow({ variant = "a" }: { variant?: Variant }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    // UTMs capturadas já na hidratação do shell, não só quando o QuizRunner
    // carrega: a T1 agora tem opções clicáveis, e um toque rápido podia gravar
    // a sessão sem origem se o chunk do runner ainda estivesse baixando.
    // captureParams é idempotente (não sobrescreve o que já capturou).
    captureParams();
  }, []);

  // A T1 é estática (headline vem do cookie A/B no servidor; conteúdo é fixo).
  // Renderizada já em estado final (animateIn={false}) pra não "pular" quando o
  // QuizRunner assumir a mesma tela.
  const landing = (
    <LandingScreen
      content={resolveContent(SCREENS[0], "B")}
      variant={variant}
      animateIn={false}
    />
  );

  // SSR + primeira pintura no cliente: T1 instantânea, sem Framer.
  if (!mounted) return landing;

  // Depois de montar: carrega o fluxo interativo. A T1 segue na tela como
  // fallback enquanto o chunk baixa — sem flash de tela em branco.
  return <Suspense fallback={landing}>{<QuizRunner variant={variant} />}</Suspense>;
}
