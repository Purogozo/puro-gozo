"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useQuiz } from "@/lib/store";
import { SCREENS, resolveContent } from "@/lib/screens";
import { RESULT_CTA, type Variant } from "@/lib/ab";
import { useReducedMotion, pageVariants } from "@/lib/motion";
import {
  captureParams,
  trackEvent,
  buildCheckoutUrl,
  getSessionId,
} from "@/lib/tracking";
import { uuidToShortId } from "@/lib/shortid";
import { ReservoirMeter } from "./ReservoirMeter";
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

// Fluxo interativo do quiz (Framer Motion + as 8 telas). Carregado sob demanda
// pelo QuizFlow (dynamic/ssr:false) DEPOIS que a T1 já pintou — assim o Framer e
// as telas de baixo saem do bundle inicial. Ver comentário no QuizFlow.tsx.
export function QuizRunner({ variant = "a" }: { variant?: Variant }) {
  const reduced = useReducedMotion();
  const params = useSearchParams();

  const index = useQuiz((s) => s.index);
  const hydrated = useQuiz((s) => s.hydrated);
  const path = useQuiz((s) => s.path());
  const profileKey = useQuiz((s) => s.profile());
  // O caminho SÓ existe depois da T3 — antes dela, `path()` devolve "B" por
  // padrão só pra ter o que renderizar. Mandar esse "B" pro analytics carimbava
  // a sessão inteira como "sozinha" logo no primeiro screen_view (o
  // pg_upsert_session guarda o primeiro valor não-nulo), e o valor certo, que
  // chega depois, era descartado. Enquanto a T3 não foi respondida vai
  // undefined: o dashboard mostra "desconhecido", que é a verdade.
  //
  // Mesma história com o perfil, que vem da T13 e cai em "programacao" por
  // padrão: sem esse guard toda sessão nascia carimbada como "A Bem-Comportada".
  const bifurcou = useQuiz((s) => s.answers[3] != null);
  const perfilado = useQuiz((s) => s.answers[13] != null);
  const pathReal = bifurcou ? path : undefined;
  const profileReal = perfilado ? profileKey : undefined;
  const meter = useQuiz((s) => s.meter());
  const goToScreenId = useQuiz((s) => s.goToScreenId);
  const reset = useQuiz((s) => s.reset);

  // captura UTMs uma vez
  useEffect(() => {
    captureParams();
  }, []);

  // Limpeza do estado legado.
  // Até 19/07/2026 o quiz persistia em localStorage. Quem já tinha entrado
  // ficou com um "pg-quiz-v1" órfão lá — ninguém mais lê, mas é dado morto no
  // navegador da pessoa (e confundiria quem for depurar isso no futuro).
  // Some sozinho na primeira visita depois do deploy.
  useEffect(() => {
    try {
      localStorage.removeItem("pg-quiz-v1");
      // v1 também ficou órfão no sessionStorage quando a T2 foi absorvida pela
      // T1 e o store passou a se chamar pg-quiz-v2 (ver store.ts).
      sessionStorage.removeItem("pg-quiz-v1");
    } catch {
      /* storage bloqueado: nada a limpar */
    }
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
    trackEvent("screen_view", { screen: screen.id, type: screen.type, path: pathReal, variant });
    if (screen.type === "result")
      trackEvent("quiz_complete", { path: pathReal, profile: profileReal, variant });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hydrated]);

  function goCheckout() {
    trackEvent("cta_click", { screen: 20, path: pathReal, profile: profileReal, variant });
    trackEvent("checkout_redirect", { path: pathReal, profile: profileReal, variant });
    // O session_id viaja no xcod até a Hotmart e volta no webhook — é o que
    // liga a venda à sessão de quiz que a gerou e permite reidratar o Purchase
    // com fbp/fbc/IP/user-agent guardados no Supabase.
    //
    // ⚠️ Vai SÓ o id, em 24 caracteres alfanuméricos. A versão anterior mandava
    // `path_perfil_variante_uuid` (56 chars, com underscore) — a Hotmart
    // documenta máximo de 30 caracteres e PROÍBE underscore nos parâmetros de
    // origem, então aquilo era truncado ou descartado em silêncio.
    // path/perfil/variante não se perdem: são lidos de pg_sessions pelo id.
    const sid = getSessionId();
    const short = sid ? uuidToShortId(sid) : null;
    const url = buildCheckoutUrl(short ? { xcod: short } : undefined);
    window.location.href = url;
  }

  // Enquanto reidrata, mostra a T1 (não o splash índigo): o QuizRunner só é
  // montado depois da T1 já ter pintado no shell, então cair na landing aqui é
  // a continuidade natural — sem flash de tela em branco.
  if (!hydrated || !screen) {
    const landing = SCREENS[0];
    return (
      <LandingScreen
        content={resolveContent(landing, "B")}
        variant={variant}
        animateIn={false}
        restore
      />
    );
  }

  const content = resolveContent(screen, path);
  const ownBg = OWN_BG.has(screen.type);

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
        // animateIn={false}: a T1 já estava visível (shell/fallback). Não repete
        // o fade de entrada ao o QuizRunner assumir — troca imperceptível.
        return (
          <LandingScreen
            content={content}
            variant={variant}
            animateIn={false}
            restore
          />
        );
      case "letter":
        return <LetterScreen content={content} />;
      case "social":
        return <SocialScreen screen={screen} content={content} />;
      case "mechanism":
        return <MechanismScreen content={content} />;
      case "loading":
        return <LoadingScreen content={content} />;
      case "result":
        return <ResultScreen content={content} ctaLabel={RESULT_CTA} />;
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

      {/* initial={false}: quando o QuizRunner monta, a tela atual (normalmente a
          T1, já pintada pelo shell) NÃO refaz a animação de entrada. Transições
          entre telas seguintes continuam animando normalmente. */}
      <AnimatePresence mode="wait" initial={false}>
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
