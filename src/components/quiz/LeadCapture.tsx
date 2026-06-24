"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useQuiz } from "@/lib/store";
import { trackEvent } from "@/lib/tracking";
import { DIARY } from "@/lib/motion";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

// Captura de lead no pico de investimento (logo após o resultado)
export function LeadCapture({
  onDone,
  path,
  profile,
}: {
  onDone: () => void;
  path: string;
  profile: string;
}) {
  const setLead = useQuiz((s) => s.setLead);
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [touched, setTouched] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function submit() {
    setTouched(true);
    if (!emailOk) return;
    setLead({ email, whatsapp });
    trackEvent("lead_capture", { path, profile, email, whatsapp });
    onDone();
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-tinta/70 px-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl bg-marfim px-6 py-7 shadow-2xl"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: DIARY }}
      >
        <p className="eyebrow text-rose">Quase lá</p>
        <h2 className="mt-2 font-serif text-[1.5rem] leading-tight text-indigo" style={{ fontWeight: 700 }}>
          Pra onde eu envio o seu plano?
        </h2>
        <p className="mt-2 font-sans text-[0.9rem] leading-relaxed text-lavanda" style={{ fontWeight: 300 }}>
          Seu diagnóstico e a próxima etapa vão pro seu e-mail. Discreto e privado — só você vê.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="eyebrow text-lavanda" style={{ fontSize: "0.62rem" }}>E-mail</span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className={`rounded-xl border bg-white px-4 py-3 font-sans text-[0.95rem] text-tinta outline-none transition-colors focus:border-rose ${
                touched && !emailOk ? "border-vinho" : "border-nevoa/50"
              }`}
            />
            {touched && !emailOk && (
              <span className="font-sans text-[0.76rem] text-vinho">Confirma o e-mail pra eu te enviar o plano.</span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className="eyebrow text-lavanda" style={{ fontSize: "0.62rem" }}>WhatsApp (opcional)</span>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="(00) 00000-0000"
              className="rounded-xl border border-nevoa/50 bg-white px-4 py-3 font-sans text-[0.95rem] text-tinta outline-none transition-colors focus:border-rose"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <PrimaryButton full onClick={submit}>VER MEU PLANO →</PrimaryButton>
          <button
            type="button"
            onClick={onDone}
            className="font-sans text-[0.8rem] text-lavanda underline-offset-2 hover:underline"
          >
            Pular por agora
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
