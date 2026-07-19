"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useQuiz } from "@/lib/store";
import { SCREENS, resolveContent } from "@/lib/screens";
import { AB, type Variant } from "@/lib/ab";
import { useReducedMotion, pageVariants } from "@/lib/motion";
import {
  captureParams,
  trackEvent,
  buildCheckoutUrl,
  getSessionId,
} from "@/lib/tracking";
import { ReservoirMeter } from "./ReservoirMeter";
import { AudioToggle } from "./AudioToggle";
import { LandingScreen } from "./screens/LandingScreen";
import { SelectScreen } from "./screens/SelectScreen";
import { LetterScreen } from "./screens/LetterScreen";
import { SocialScreen } from "./screens/SocialScreen";
import { MechanismScreen } from "./screens/MechanismScreen";
import { LoadingScreen } from "./screens/LoadingScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { SalesScreen } from "./screens/SalesScreen";

const OWN_BG = new Set(["landing", "letter", "loading", "result", "sales"]);
const NO_METER = new Set(["landing", "loading", "result", "sales"]);

export function QuizFlow({ variant = "a" }: { variant?: Variant }) {
  const reduced = useReducedMotion();
  const params = useSearchParams();

  const index = useQuiz((s) => s.index);
  const hydrated = useQuiz((s) => s.hydrated);
  const path = useQuiz((s) => s.path());
  const profileKey = useQuiz((s) => s.profile());
  const meter = useQuiz((s) => s.meter());
  const goToScreenId = useQuiz((s) => s.goToScreenId);
  const reset = useQuiz((s) => s.reset);

  // captura UTMs uma vez
  useEffect(() => {
    captureParams();
  }, []);

  // Rede de segurança do hydrated.
  // Quando o storage está indisponível (navegação privada restrita, storage
  // bloqueado), o persist do zustand retorna ANTES de registrar a reidratação
  // e o onRehydrateStorage nunca dispara — hydrated ficaria false pra sempre e
  // a pessoa veria o splash índigo em branco, sem nunca entrar no quiz.
  // Este efeito só roda no cliente, depois da montagem: se a reidratação já
  // aconteceu, é no-op; se não aconteceu, destrava a tela.
  useEffect(() => {
    if (!useQuiz.getState().hydrated) useQuiz.getState().setHydrated();
  }, []);

  // jump de preview (?screen=N) e reset (?reset=1)
  useEffect(() => {
    if (!hydrated) return;
    if (params.get("reset") === "1") {
      reset();
      return;
    }
    const s = params.get("screen");
    if (s) goToScreenId(Number(s));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const screen = SCREENS[index];

  // analytics + scroll-to-top a cada tela
  useEffect(() => {
    if (!hydrated || !screen) return;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    trackEvent("screen_view", { screen: screen.id, type: screen.type, path, variant });
    if (screen.type === "result") trackEvent("quiz_complete", { path, profile: profileKey, variant });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hydrated]);

  function goCheckout() {
    trackEvent("cta_click", { screen: 20, path, profile: profileKey, variant });
    trackEvent("checkout_redirect", { path, profile: profileKey, variant });
    // o session_id viaja no xcod até a Hotmart e volta no webhook — é o que
    // liga a venda à sessão de quiz que a gerou (receita por perfil/variante
    // com dado próprio, sem depender da atribuição do Meta).
    const sid = getSessionId() ?? "";
    const url = buildCheckoutUrl({
      xcod: `${path}_${profileKey}_${variant}${sid ? `_${sid}` : ""}`,
    });
    window.location.href = url;
  }

  // splash enquanto reidrata (evita flash de tela errada)
  if (!hydrated || !screen) {
    return <div className="min-h-dvh w-full bg-indigo" />;
  }

  const content = resolveContent(screen, path);
  const ownBg = OWN_BG.has(screen.type);
  const dark = screen.intimate || screen.type === "result";

  const bgClass = ownBg
    ? "bg-transparent"
    : screen.intimate
      ? "bg-breathe"
      : screen.warm
        ? "bg-warm"
        : "bg-marfim";

  function renderScreen() {
    switch (screen.type) {
      case "landing":
        return <LandingScreen content={content} headline={AB.landingHeadline[variant]} />;
      case "letter":
        return <LetterScreen content={content} />;
      case "social":
        return <SocialScreen screen={screen} content={content} />;
      case "mechanism":
        return <MechanismScreen content={content} />;
      case "loading":
        return <LoadingScreen content={content} />;
      case "result":
        return <ResultScreen content={content} ctaLabel={AB.resultCta[variant]} />;
      case "sales":
        return <SalesScreen content={content} onCheckout={goCheckout} />;
      case "single":
      case "multi":
      default:
        return <SelectScreen screen={screen} content={content} />;
    }
  }

  return (
    <div className={`relative min-h-dvh w-full ${bgClass} ${screen.intimate ? "grain" : ""}`}>
      {/* flicker de vela nas telas íntimas — acento por caminho (T3):
          A (com parceiro) = luz quente · B (sozinha) = luz fria/lavanda */}
      {screen.intimate && !reduced && (
        <div
          className="pointer-events-none fixed inset-0 z-0 candle-glow"
          style={{
            background: `radial-gradient(100% 60% at 50% 10%, ${
              path === "A" ? "rgba(231,154,125,0.15)" : "rgba(123,118,170,0.15)"
            }, transparent 55%)`,
          }}
        />
      )}

      {!NO_METER.has(screen.type) && <ReservoirMeter level={meter} />}
      <AudioToggle dark={dark} />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={pageVariants(reduced)}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 min-h-dvh w-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
