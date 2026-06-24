"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useQuiz } from "@/lib/store";
import { SCREENS, resolveContent } from "@/lib/screens";
import { AB, type Variant } from "@/lib/ab";
import { ENABLE_LEAD_CAPTURE } from "@/lib/config";
import { useReducedMotion, pageVariants } from "@/lib/motion";
import { captureParams, trackEvent, buildCheckoutUrl } from "@/lib/tracking";
import { ReservoirMeter } from "./ReservoirMeter";
import { LeadCapture } from "./LeadCapture";
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
  const [showLead, setShowLead] = useState(false);

  const index = useQuiz((s) => s.index);
  const hydrated = useQuiz((s) => s.hydrated);
  const path = useQuiz((s) => s.path());
  const profileKey = useQuiz((s) => s.profile());
  const meter = useQuiz((s) => s.meter());
  const lead = useQuiz((s) => s.lead);
  const next = useQuiz((s) => s.next);
  const goToScreenId = useQuiz((s) => s.goToScreenId);
  const reset = useQuiz((s) => s.reset);

  // captura UTMs uma vez
  useEffect(() => {
    captureParams();
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
    const url = buildCheckoutUrl({ xcod: `${path}_${profileKey}_${variant}` });
    window.location.href = url;
  }

  // ao sair do resultado: captura de lead no pico de investimento
  function leaveResult() {
    if (ENABLE_LEAD_CAPTURE && !lead) {
      setShowLead(true);
    } else {
      next();
    }
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
        return (
          <ResultScreen
            content={content}
            ctaLabel={AB.resultCta[variant]}
            onAdvance={leaveResult}
          />
        );
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
      {/* flicker de vela nas telas íntimas */}
      {screen.intimate && !reduced && (
        <div
          className="pointer-events-none fixed inset-0 z-0 candle-glow"
          style={{ background: "radial-gradient(100% 60% at 50% 10%, rgba(231,154,125,0.14), transparent 55%)" }}
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

      <AnimatePresence>
        {showLead && (
          <LeadCapture
            path={path}
            profile={profileKey}
            onDone={() => {
              setShowLead(false);
              next();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
