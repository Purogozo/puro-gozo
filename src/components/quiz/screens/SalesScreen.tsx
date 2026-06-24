"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { PROFILES, buildReceipt } from "@/lib/screens";
import { OFFER } from "@/lib/config";
import { Logo } from "@/components/brand/Logo";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const ANTES_DEPOIS: [string, string][] = [
  ["Você finge orgasmo pra ele não desconfiar", "Você goza de verdade e ele sente a diferença na hora"],
  ["Inventa desculpa pra não transar", "Sente vontade, e o sexo volta a ser seu também"],
  ["Transa por obrigação, contando os minutos", "Transa porque quer chegar lá"],
  ["A cama esfriou, e o casamento foi esfriando junto", "O tesão volta, e a vida volta com ele"],
  ['"Eu sou fria, comigo não tem jeito"', '"Não tinha nada de errado comigo. Só tinham me calado."'],
];

const DEPOIMENTOS = [
  "Voltei a sentir tesão pelo meu marido depois de 12 anos. Ele perguntou o que mudou em mim.",
  "Parei de fingir. Semana passada gozei de verdade, e chorei de alívio.",
  "Depois do divórcio achei que tinha acabado pra mim. Hoje sinto mais sozinha do que senti em 20 anos de casada.",
];

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    // prazo persistido, não reseta no refresh (credibilidade da urgência)
    const KEY = "pg-offer-deadline";
    let deadline = Number(localStorage.getItem(KEY));
    if (!deadline || Number.isNaN(deadline) || deadline < Date.now()) {
      deadline = Date.now() + seconds * 1000;
      localStorage.setItem(KEY, String(deadline));
    }
    const tick = () =>
      setLeft(Math.max(0, Math.round((deadline - Date.now()) / 1000)));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, [seconds]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function SalesScreen({
  content,
  onCheckout,
}: {
  content: ScreenContent;
  onCheckout: () => void;
}) {
  const profileKey = useQuiz((s) => s.profile());
  const profile = PROFILES[profileKey];
  const answers = useQuiz((s) => s.answers);
  const receipt = buildReceipt(answers);
  const timer = useCountdown(OFFER.timerSeconds);

  return (
    <div className="min-h-dvh w-full bg-marfim pb-20">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-12 px-6 pt-10">
        {/* TOPO */}
        <Section className="flex flex-col items-center gap-4 text-center">
          <Logo className="text-2xl" />
          <p className="eyebrow text-rose">Perfil: {profile.name}</p>
          <h1 className="font-serif text-[1.7rem] leading-tight text-indigo" style={{ fontWeight: 700 }}>
            {content.headline}
          </h1>
          {receipt && (
            <p className="max-w-md font-serif text-[1rem] italic leading-snug text-vinho">
              {receipt} Isso não é frieza, é represa.
            </p>
          )}
          <div className="mt-2 flex items-center gap-2 rounded-full bg-vinho px-5 py-2 font-sans text-[0.85rem] text-marfim">
            <span>⏳ Essa condição expira em:</span>
            <span className="font-mono tabular-nums">{timer}</span>
          </div>
        </Section>

        {/* ANTES E DEPOIS */}
        <Section className="flex flex-col gap-3">
          <h2 className="font-serif text-[1.4rem] text-indigo" style={{ fontWeight: 600 }}>
            O antes e o <em className="italic">depois</em>
          </h2>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-nevoa/30 bg-nevoa/20">
            <div className="bg-white px-3 py-2 text-center eyebrow text-lavanda">Hoje</div>
            <div className="bg-indigo px-3 py-2 text-center eyebrow text-marfim">Depois do método</div>
            {ANTES_DEPOIS.map(([antes, depois], i) => (
              <div key={i} className="contents">
                <div className="bg-white px-4 py-3 font-sans text-[0.86rem] text-tinta/70">{antes}</div>
                <div className="bg-[#f7e7eb] px-4 py-3 font-sans text-[0.86rem] text-vinho">{depois}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* DEPOIMENTOS */}
        <Section className="flex flex-col gap-3">
          <h2 className="font-serif text-[1.4rem] text-indigo" style={{ fontWeight: 600 }}>
            Depoimentos reais de alunas
          </h2>
          <div className="flex flex-col gap-3">
            {DEPOIMENTOS.map((d, i) => (
              <div key={i} className="rounded-2xl rounded-bl-sm border border-nevoa/30 bg-white px-5 py-4">
                <p className="font-serif text-[1rem] italic text-tinta/90">“{d}”</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-gradient-to-br from-rose to-vinho blur-[1px]" />
                  <span className="font-sans text-[0.72rem] text-lavanda">print verificado · rosto borrado</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ENTREGÁVEIS / PREÇO */}
        <Section className="flex flex-col gap-4 rounded-3xl border border-rose/40 bg-white px-6 py-7 shadow-[0_20px_60px_-30px_rgba(110,51,80,0.5)]">
          <p className="eyebrow text-rose">Seu plano personalizado está pronto</p>
          <div className="flex flex-col gap-2.5">
            {OFFER.itens.map((it, i) => (
              <div key={i} className="flex items-start justify-between gap-3 border-b border-nevoa/20 pb-2.5">
                <span className="flex gap-2 font-sans text-[0.88rem] text-tinta/85">
                  <span className="text-rose">✓</span>
                  {it.nome}
                </span>
                <span className="shrink-0 font-sans text-[0.82rem] text-lavanda line-through">{it.valor}</span>
              </div>
            ))}
          </div>

          <div className="mt-2 flex flex-col items-center gap-1">
            <span className="font-sans text-[0.85rem] text-lavanda">
              Tudo que recebe <span className="line-through">{OFFER.de}</span>
            </span>
            <span className="font-sans text-[0.8rem] uppercase tracking-widest text-rose">Somente agora</span>
            <span className="font-serif text-5xl text-indigo" style={{ fontWeight: 700 }}>{OFFER.por}</span>
            <span className="font-sans text-[0.85rem] text-lavanda">{OFFER.parcelado}</span>
          </div>

          <PrimaryButton pulse full onClick={onCheckout} className="mt-2">
            {content.cta} →
          </PrimaryButton>
          <p className="text-center font-sans text-[0.74rem] text-lavanda">
            🔒 Pagamento 100% seguro · Acesso imediato · Pix ou cartão
          </p>
          <p className="text-center font-sans text-[0.74rem] text-lavanda">
            Compra discreta: não aparece o nome do curso na fatura
          </p>
        </Section>

        {/* GARANTIA */}
        <Section className="rounded-2xl bg-indigo px-6 py-6 text-marfim">
          <p className="eyebrow text-rose-suave">Garantia incondicional · 30 dias</p>
          <p className="mt-2 font-sans text-[0.92rem] leading-relaxed text-marfim/90" style={{ fontWeight: 300 }}>
            Entre e faça o nosso método completo. Se você não resolver as suas relações sexuais, é só pedir e devolvemos 100% do seu investimento. Sem perguntas, sem burocracia, sem ter que explicar nada pra ninguém. A responsabilidade é toda nossa. O risco é zero pra você.
          </p>
        </Section>

        {/* URGÊNCIA */}
        <Section className="text-center">
          <p className="font-sans text-[0.86rem] font-medium uppercase tracking-wider text-vinho">
            🔴 Válido apenas enquanto essa página estiver aberta
          </p>
        </Section>

        {/* CTA FINAL */}
        <Section className="flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-[1.3rem] italic leading-snug text-indigo">
            Você já se reprimiu por tempo demais. A mulher do outro lado está cansada de esperar.
          </p>
          <p className="font-sans text-[0.9rem] text-lavanda">
            Plano Puro Gozo <span className="line-through">{OFFER.de}</span> → <strong className="text-vinho">{OFFER.por}</strong> à vista
          </p>
          <PrimaryButton pulse full onClick={onCheckout}>
            GARANTIR MEU ACESSO AGORA →
          </PrimaryButton>
          <p className="font-sans text-[0.72rem] text-lavanda">
            🔒 Pagamento 100% seguro · Acesso imediato · Compra discreta · Pix ou cartão
          </p>
        </Section>

        <footer className="border-t border-nevoa/30 pt-6 text-center">
          <Logo className="text-lg" />
          <p className="mt-2 font-sans text-[0.72rem] text-lavanda">
            Copyright © 2026, todos os direitos reservados. Puro Gozo, por Andreia Fiamoncini.
          </p>
        </footer>
      </div>
    </div>
  );
}
