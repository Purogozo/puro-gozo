"use client";

import { motion } from "motion/react";
import type { ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { useReducedMotion, DIARY } from "@/lib/motion";
import { Stagger, Item, Eyebrow, Headline } from "../Parts";
import { OptionCard } from "@/components/ui/OptionCard";

// Véus/estratos na ordem em que são retirados (do mais recente ao mais fundo)
const VEILS = [
  { n: 3, label: "O Hábito de Fingir", hint: "que virou prisão" },
  { n: 2, label: "A Culpa · o Medo · a Vergonha", hint: "de querer, de pedir, de gozar" },
  { n: 1, label: "A Programação", hint: "religião, família, cultura" },
];

// Estratos sólidos, cores distintas (lê-se 3 camadas diferentes)
const VEIL_BG = [
  "linear-gradient(155deg, #2a1f3e 0%, #4a2748 100%)",
  "linear-gradient(155deg, #2d2752 0%, #5d3152 100%)",
  "linear-gradient(155deg, #363975 0%, #6e3350 100%)",
];

// Brasas que sobem do núcleo (posições/atrasos determinísticos)
const EMBERS = [
  { x: -38, d: 0.0, s: 6.5 },
  { x: -14, d: 0.6, s: 5 },
  { x: 10, d: 0.25, s: 6 },
  { x: 32, d: 0.8, s: 5.5 },
  { x: -26, d: 1.0, s: 6 },
];

// Cena "O Desaterro": estratos SÓLIDOS deslizam pra cima e saem de quadro,
// revelando o tesão vivo embaixo. Opacos o tempo todo = nada vaza no início.
// A legenda fica ABAIXO da cena, sem sobrepor o círculo.
function LayersReveal() {
  const reduced = useReducedMotion();
  const peelBase = 0.5;
  const step = 0.9;
  const revealAt = peelBase + (VEILS.length - 1) * step + 0.85; // ~3.15s

  return (
    <div className="mx-auto my-8 flex w-full max-w-sm flex-col items-center gap-4">
      {/* cena */}
      <div
        className="relative h-56 w-full overflow-hidden rounded-[28px] border border-nevoa/30"
        style={{ background: "radial-gradient(120% 95% at 50% 55%, #fbeede, #fbf4f6)" }}
      >
        {/* núcleo vivo — sempre presente, pulsando; escondido pelos véus opacos */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <motion.div
            className="h-36 w-36 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, #ffe6c2 0%, #f0a878 26%, #d6809a 52%, #6e3350 100%)",
            }}
            animate={
              reduced
                ? { boxShadow: "0 0 60px 14px rgba(240,168,120,0.5)" }
                : {
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 45px 8px rgba(240,168,120,0.38)",
                      "0 0 80px 18px rgba(255,214,150,0.6)",
                      "0 0 45px 8px rgba(240,168,120,0.38)",
                    ],
                  }
            }
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* brasas subindo, surgem quando o núcleo já foi revelado */}
        {!reduced &&
          EMBERS.map((e, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 z-[2] h-1.5 w-1.5 rounded-full"
              style={{ background: "rgba(255,214,150,0.9)", marginLeft: e.x }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 1, 0], y: [-2, -110] }}
              transition={{
                delay: revealAt + e.d,
                duration: e.s,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeOut",
              }}
            />
          ))}

        {/* véus sólidos que deslizam pra cima e saem de quadro (clipados) */}
        {VEILS.map((veil, i) => (
          <motion.div
            key={veil.label}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ zIndex: 30 - i, background: VEIL_BG[i] }}
            initial={{ y: 0 }}
            animate={reduced ? { opacity: 0 } : { y: "-104%" }}
            transition={{
              delay: reduced ? 0.06 * i : peelBase + i * step,
              duration: reduced ? 0.2 : 0.85,
              ease: [0.7, 0, 0.84, 0], // ease-in: acelera ao sair (sensação de "puxar")
            }}
          >
            <p className="eyebrow text-rose-suave/90">Camada {veil.n}</p>
            <p className="mt-2 font-serif text-[1.18rem] text-marfim" style={{ fontWeight: 600 }}>
              {veil.label}
            </p>
            <p className="mt-1 font-sans text-[0.82rem] text-nevoa">{veil.hint}</p>
          </motion.div>
        ))}
      </div>

      {/* legenda — fora da cena, sem sobrepor o círculo */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0.1 : revealAt + 0.2, duration: 0.7, ease: DIARY }}
      >
        <p className="font-serif text-[1.05rem] italic text-indigo" style={{ fontWeight: 600 }}>
          Sempre esteve aqui.
        </p>
        <p className="eyebrow mt-1 text-vinho" style={{ fontSize: "0.6rem" }}>
          Vivo · Inteiro · Esperando
        </p>
      </motion.div>
    </div>
  );
}

export function MechanismScreen({ content }: { content: ScreenContent }) {
  const reduced = useReducedMotion();
  const next = useQuiz((s) => s.next);
  const setAnswer = useQuiz((s) => s.setAnswer);
  const answers = useQuiz((s) => s.answers);

  // recibo de personalização (eco das respostas)
  const fingeMuito = answers[10] === "quase-sempre" || answers[10] === "medo";

  function choose(id: string) {
    setAnswer(12, id);
    window.setTimeout(() => next(), reduced ? 120 : 420);
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-6 pb-12 pt-20">
      <Stagger className="flex flex-col gap-5">
        {/* recibo de personalização */}
        <Item>
          <p className="font-serif text-[1.05rem] italic leading-snug text-vinho">
            {fingeMuito
              ? "Você disse que finge quase toda vez. Que sua cabeça foge. Isso tem um nome:"
              : "Tudo que você respondeu até aqui aponta pro mesmo lugar. Isso tem um nome:"}
          </p>
        </Item>

        {content.eyebrow && <Eyebrow>{content.eyebrow}</Eyebrow>}
        <Headline size="md">{content.headline}</Headline>

        {content.body?.map((p, i) => (
          <Item key={i}>
            <p
              className={`font-sans leading-relaxed ${
                p.startsWith("Não falta")
                  ? "font-serif text-[1.4rem] italic text-vinho"
                  : "text-[0.98rem] text-tinta/85"
              }`}
              style={{ fontWeight: p.startsWith("Não falta") ? 600 : 300 }}
            >
              {p}
            </p>
          </Item>
        ))}

        {/* CENA, as camadas saindo */}
        <Item>
          <LayersReveal />
        </Item>

        {/* leitura completa das camadas */}
        <Item>
          <div className="flex flex-col gap-3 rounded-2xl bg-white px-5 py-5 shadow-[0_10px_40px_-18px_rgba(54,57,117,0.4)]">
            <LayerLine>
              <strong className="font-medium">A programação</strong> que a religião, a sua família e a cultura puseram sobre o seu desejo, antes de você ter qualquer escolha.
            </LayerLine>
            <p className="pl-7 font-serif text-[0.95rem] italic text-lavanda">
              “Sexo é pecado.” “Mulher direita não sente.” “Prazer é coisa de homem.”
            </p>
            <LayerLine>
              <strong className="font-medium">A culpa de querer.</strong> O medo de pedir o que você gosta. A vergonha de gozar.
            </LayerLine>
            <LayerLine>
              <strong className="font-medium">O hábito de fingir</strong>, que um dia foi mais fácil que explicar, e virou prisão.
            </LayerLine>
            <p className="pl-7 font-sans text-[0.9rem] text-tinta/70">
              Camada sobre camada sobre camada. Até o tesão sumir de vista, mas nunca de você.
            </p>
          </div>
        </Item>

        {/* o método, a virada */}
        <Item>
          <div className="rounded-2xl border border-rose/40 bg-[#f7e7eb] px-5 py-5">
            <p className="flex gap-2 font-sans text-[0.98rem] leading-relaxed text-tinta">
              <span className="text-rose">✅</span>
              <span>
                <strong className="font-medium">O Método das 3 Camadas faz o contrário de tudo que te venderam.</strong>{" "}
                Ele não põe mais nada em cima. Ele tira. Uma camada por vez. E quando chega no fundo, o tesão já estava lá. Vivo. Inteiro. Esperando.
              </span>
            </p>
          </div>
        </Item>

        <Item>
          <p className="font-serif text-[1.12rem] leading-snug text-indigo" style={{ fontWeight: 600 }}>
            A mulher do outro lado dessas camadas, a que sente, que pede, que goza, que escolhe, você ainda não conhece. Mas ela já é você.
          </p>
        </Item>
        <Item>
          <p className="font-sans text-[0.95rem] text-lavanda" style={{ fontWeight: 300 }}>
            Essa avaliação vai te mostrar quão fundo ela está enterrada.
          </p>
        </Item>

        {/* cards de reação */}
        <div className="mt-2 flex flex-col gap-3">
          {content.options?.map((opt, i) => (
            <Item key={opt.id}>
              <OptionCard option={opt} index={i} selected={false} onSelect={() => choose(opt.id)} />
            </Item>
          ))}
        </div>
      </Stagger>
    </div>
  );
}

function LayerLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex gap-2 font-sans text-[0.96rem] leading-relaxed text-tinta/85" style={{ fontWeight: 300 }}>
      <span className="text-nevoa">❌</span>
      <span>{children}</span>
    </p>
  );
}
