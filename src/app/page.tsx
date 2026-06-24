import { Suspense } from "react";
import { headers, cookies } from "next/headers";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { normalizeVariant, AB_COOKIE } from "@/lib/ab";

export default async function Page() {
  // variante A/B: header injetado pelo proxy (request atual) → cookie → 'a'
  const h = await headers();
  const c = await cookies();
  const variant = normalizeVariant(
    h.get("x-pg-ab") ?? c.get(AB_COOKIE)?.value
  );

  return (
    <Suspense fallback={<div className="min-h-dvh w-full bg-indigo" />}>
      <QuizFlow variant={variant} />
    </Suspense>
  );
}
