"use client";

import { motion } from "motion/react";
import type { ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { useReducedMotion, DIARY } from "@/lib/motion";
import { Stagger, Item, Eyebrow, Headline } from "../Parts";
import { OptionCard } from "@/components/ui/OptionCard";

// As 3 camadas (rótulos curtos para a cena; texto completo no corpo abaixo)
const LAYERS = [
  { label: "O Hábito de Fingir", hint: "que virou prisão" },
  { label: "A Culpa · o Medo · a Vergonha", hint: "de querer, de pedir, de gozar" },
  { label: "A Programação", hint: "religião, família, cultura" },
];

// Cena: camadas empilhadas que se retiram uma a uma, revelando o núcleo vivo
function LayersReveal() {
  const reduced = useReducedMotion();
  const peelStart = 0.6;

  return (
    <div className="relative mx-auto my-8 h-64 w-full max-w-sm">
      {/* núcleo vivo — o tesão intacto, pulsando com luz quente */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduced ? 0 : peelStart + LAYERS.length * 0.85, duration: 0.9, ease: DIARY }}
      >
        <motion.div
          className="relative flex h-44 w-44 items-center justify-center rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, #ffd9a8 0%, #e79a7d 28%, #c97d90 55%, #6e3350 100%)",
            boxShadow: "0 0 70px 14px rgba(231,154,125,0.45)",
          }}
          animate={
            reduced
              ? {}
              : { scale: [1, 1.06, 1], boxShadow: [
                  "0 0 60px 10px rgba(231,154,125,0.40)",
                  "0 0 90px 20px rgba(231,154,125,0.60)",
                  "0 0 60px 10px rgba(231,154,125,0.40)",
                ] }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: reduced ? 0 : peelStart + LAYERS.length * 0.85 }}
        >
          <span className="px-6 text-center font-serif text-[0.95rem] italic leading-snug text-white drop-shadow">
            Vivo. Inteiro. Esperando.
          </span>
        </motion.div>
      </motion.div>

      {/* camadas que se retiram (peeling/dissolve) */}
      {LAYERS.map((layer, i) => (
        <motion.div
          key={layer.label}
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-nevoa/40 px-6 text-center"
          style={{
            zIndex: 10 + i,
            background: `linear-gradient(155deg, rgba(54,57,117,${0.96 - i * 0.04}), rgba(110,51,80,${0.94 - i * 0.04}))`,
          }}
          initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          animate={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, y: -38 - i * 6, filter: "blur(10px)", scale: 1.04 }
          }
          transition={{
            delay: reduced ? 0.1 * i : peelStart + i * 0.85,
            duration: reduced ? 0.2 : 0.95,
            ease: DIARY,
          }}
        >
          <p className="eyebrow text-rose-suave/90">Camada {LAYERS.length - i}</p>
          <p className="mt-2 font-serif text-[1.15rem] text-marfim" style={{ fontWeight: 600 }}>
            {layer.label}
          </p>
          <p className="mt-1 font-sans text-[0.82rem] text-nevoa">{layer.hint}</p>
        </motion.div>
      ))}
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
              ? "Você disse que finge quase toda vez. Que sua cabeça foge. Isso tem um nome —"
              : "Tudo que você respondeu até aqui aponta pro mesmo lugar. Isso tem um nome —"}
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

        {/* CENA — as camadas saindo */}
        <Item>
          <LayersReveal />
        </Item>

        {/* leitura completa das camadas */}
        <Item>
          <div className="flex flex-col gap-3 rounded-2xl bg-white px-5 py-5 shadow-[0_10px_40px_-18px_rgba(54,57,117,0.4)]">
            <LayerLine>
              <strong className="font-medium">A programação</strong> que a religião, a sua família e a cultura puseram sobre o seu desejo — antes de você ter qualquer escolha.
            </LayerLine>
            <p className="pl-7 font-serif text-[0.95rem] italic text-lavanda">
              “Sexo é pecado.” “Mulher direita não sente.” “Prazer é coisa de homem.”
            </p>
            <LayerLine>
              <strong className="font-medium">A culpa de querer.</strong> O medo de pedir o que você gosta. A vergonha de gozar.
            </LayerLine>
            <LayerLine>
              <strong className="font-medium">O hábito de fingir</strong> — que um dia foi mais fácil que explicar, e virou prisão.
            </LayerLine>
            <p className="pl-7 font-sans text-[0.9rem] text-tinta/70">
              Camada sobre camada sobre camada. Até o tesão sumir de vista, mas nunca de você.
            </p>
          </div>
        </Item>

        {/* o método — a virada */}
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
            A mulher do outro lado dessas camadas — a que sente, que pede, que goza, que escolhe — você ainda não conhece. Mas ela já é você.
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
