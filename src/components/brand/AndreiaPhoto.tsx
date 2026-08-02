"use client";

import { useState } from "react";

// Retrato da Andreia — a ponte de reconhecimento com os primeiros 10s do anúncio
// (mesma sexóloga que aparece no criativo). É por isso que ele vive no topo da T1.
//
// COMO TROCAR A FOTO: coloque o arquivo em `public/andreia.jpg` (quadrado,
// rosto centralizado, ~400×400 já otimizado). Nada mais precisa mudar.
// Enquanto o arquivo não existir, aparece o monograma "AF" — o layout não quebra.
//
// Por que <img> e não next/image: esta imagem está no caminho crítico da T1, que
// é servida em SSR pra pintar sem esperar JS; um <img> vai direto no HTML, sem
// passar pelo otimizador, e o onError dá o fallback de graça enquanto o arquivo
// não chega. Quando a foto definitiva entrar, dá pra migrar pra next/image
// com `priority`.
export const ANDREIA_PHOTO_SRC = "/andreia.jpg";

export function AndreiaPhoto({
  className = "",
  monogramClassName = "text-2xl",
}: {
  className?: string;
  monogramClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`relative block overflow-hidden rounded-full border border-rose/40 ${className}`}
      style={{
        background: "radial-gradient(circle at 50% 35%, #c97d90, #6e3350)",
      }}
    >
      {/* monograma por baixo: é o que se vê se a foto faltar ou falhar */}
      <span
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center font-serif italic text-marfim/90 ${monogramClassName}`}
      >
        AF
      </span>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ANDREIA_PHOTO_SRC}
          alt="Andreia Fiamoncini, psicóloga e sexóloga"
          onError={() => setFailed(true)}
          decoding="async"
          className="relative h-full w-full object-cover"
        />
      )}
    </span>
  );
}
