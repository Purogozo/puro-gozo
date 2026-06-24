"use client";

import type { Screen, ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { Stagger, Item, Eyebrow, Headline, Subhead } from "../Parts";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

// T11, prova social (prints de mensagens reais, rosto borrado)
export function SocialScreen({
  screen,
  content,
}: {
  screen: Screen;
  content: ScreenContent;
}) {
  const next = useQuiz((s) => s.next);
  const path = useQuiz((s) => s.path());
  const quotes = (path === "A" ? screen.A?.options : screen.B?.options) ?? [];

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-6 pb-12 pt-20">
      <Stagger className="flex flex-col gap-5">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Headline size="md">{content.headline}</Headline>
        {content.body?.[0] && <Subhead>{content.body[0]}</Subhead>}

        <div className="flex flex-col gap-3">
          {quotes.map((q) => (
            <Item key={q.id}>
              <div className="rounded-2xl rounded-bl-sm border border-nevoa/30 bg-white px-5 py-4 shadow-[0_8px_28px_-16px_rgba(54,57,117,0.35)]">
                <p className="font-serif text-[1rem] italic leading-snug text-tinta/90">“{q.label}”</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-gradient-to-br from-rose to-vinho blur-[1px]" />
                  <span className="font-sans text-[0.74rem] text-lavanda">mensagem verificada · rosto preservado</span>
                </div>
              </div>
            </Item>
          ))}
        </div>

        {content.body?.[1] && (
          <Item>
            <p className="text-center font-serif text-[1.08rem] italic text-vinho">{content.body[1]}</p>
          </Item>
        )}

        <Item>
          <div className="mt-2 flex justify-center">
            <PrimaryButton onClick={() => next()}>{content.cta} →</PrimaryButton>
          </div>
        </Item>
      </Stagger>
    </div>
  );
}
