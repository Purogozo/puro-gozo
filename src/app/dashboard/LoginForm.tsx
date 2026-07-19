"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [erro, formAction, pending] = useActionState<string | null, FormData>(
    login,
    null
  );

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-2xl bg-marfim p-8 shadow-lg"
    >
      <p className="eyebrow text-lavanda">Puro Gozo</p>
      <h1 className="mt-2 font-serif text-2xl text-indigo">Dashboard</h1>

      <input
        type="password"
        name="senha"
        autoFocus
        autoComplete="current-password"
        placeholder="Senha"
        className="mt-6 w-full rounded-lg border border-nevoa bg-white px-4 py-3 text-tinta outline-none focus:border-rose"
      />

      {erro && <p className="mt-3 text-sm text-vinho">{erro}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-lg bg-indigo px-4 py-3 font-medium text-marfim transition hover:bg-vinho disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
