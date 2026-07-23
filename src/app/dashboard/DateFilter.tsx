"use client";

// Filtro de data do dashboard. Escreve o intervalo na URL (?range=...) e deixa
// o Server Component recarregar com os dados do período. Nada de estado global:
// a URL é a fonte da verdade, então dá pra compartilhar/marcar o link.

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PRESETS = [
  { key: "hoje", label: "Hoje" },
  { key: "7d", label: "7 dias" },
  { key: "mes", label: "Mês atual" },
] as const;

export default function DateFilter() {
  const router = useRouter();
  const sp = useSearchParams();
  const range = sp.get("range") ?? "7d";
  const [from, setFrom] = useState(sp.get("from") ?? "");
  const [to, setTo] = useState(sp.get("to") ?? "");
  const [open, setOpen] = useState(range === "custom");

  const go = (next: string) => router.push(`/dashboard?range=${next}`);

  const applyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) return;
    // ordena caso o usuário inverta as datas
    const [a, b] = from <= to ? [from, to] : [to, from];
    router.push(`/dashboard?range=custom&from=${a}&to=${b}`);
  };

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm transition ${
      active
        ? "bg-rose text-indigo"
        : "bg-marfim/10 text-nevoa hover:bg-marfim/20 hover:text-marfim"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((p) => (
        <button key={p.key} onClick={() => go(p.key)} className={chip(range === p.key)}>
          {p.label}
        </button>
      ))}
      <button
        onClick={() => setOpen((v) => !v)}
        className={chip(range === "custom")}
        aria-expanded={open}
      >
        Personalizado
      </button>

      {open && (
        <form onSubmit={applyCustom} className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={from}
            max={to || undefined}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-lg bg-marfim/10 px-2.5 py-1.5 text-sm text-marfim [color-scheme:dark]"
            aria-label="Data inicial"
          />
          <span className="text-nevoa">→</span>
          <input
            type="date"
            value={to}
            min={from || undefined}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-lg bg-marfim/10 px-2.5 py-1.5 text-sm text-marfim [color-scheme:dark]"
            aria-label="Data final"
          />
          <button
            type="submit"
            disabled={!from || !to}
            className="rounded-full bg-rose px-3.5 py-1.5 text-sm text-indigo disabled:opacity-40"
          >
            Aplicar
          </button>
        </form>
      )}
    </div>
  );
}
