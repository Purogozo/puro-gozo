"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DASH_COOKIE, passwordMatches, tokenFor } from "@/lib/dashboard-auth";

export async function login(_prev: string | null, formData: FormData) {
  const senha = String(formData.get("senha") ?? "");
  if (!passwordMatches(senha)) return "Senha incorreta.";

  (await cookies()).set(DASH_COOKIE, tokenFor(senha), {
    httpOnly: true, // fora do alcance de JS: XSS não rouba a sessão
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/dashboard",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/dashboard");
}

export async function logout() {
  (await cookies()).delete({ name: DASH_COOKIE, path: "/dashboard" });
  redirect("/dashboard");
}
