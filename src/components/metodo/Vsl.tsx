// VSL do bloco 0 — player do VTurb (converteai), entregue pelo cliente em
// 16/09/2026. O embed original era um <vturb-smartplayer> + um <script>
// inline que injeta o player.js no <head>.
//
// PERFORMANCE (Lighthouse de 16/09/2026, Moto G / 4G lento: LCP 8,8 s com
// "atraso no carregamento do recurso" de 3,1 s). O vídeo É o LCP da página,
// e o player só nasce depois que o player.js roda. Na primeira versão o
// script entrava por next/script afterInteractive — ou seja, só depois da
// hidratação do React, que num celular fraco leva segundos. Agora:
//  - o <script async src> é renderizado direto no JSX: o React 19 iça pra
//    <head> e o preload scanner do navegador descobre a URL no parse do
//    HTML, em paralelo com o CSS e os chunks do Next (é o que o embed
//    original do VTurb fazia);
//  - <link rel="preconnect"> pras origens do VTurb (script, CDN do vídeo e
//    licença), que o Lighthouse apontou como ~300 ms cada de handshake.
//
// O player dita a PRÓPRIA altura: o player.js injeta um div com
// padding-top de 133,33% (vídeo 3:4, vertical). Medido em 16/09: forçar a
// caixa a 16:9 deixava o vídeo pequeno no meio com barras laterais, e
// forçar altura mínima abria uma faixa escura embaixo. Por isso a caixa só
// limita a LARGURA (formato de celular no desktop; largura toda no mobile)
// e não mexe em altura. Antes do player.js baixar a caixa tem altura zero —
// aceito: é o topo da página e o script é afterInteractive.
//
// Sem fundo, borda arredondada ou sombra em volta (16/09): a caixa escura
// sobrava embaixo do vídeo e parecia um placeholder. Só o player, limpo.
//
// Pra trocar de vídeo/teste A/B: só o `id` e o `script` em metodo-copy.ts.
// Registra o custom element do VTurb no JSX (React 19 aceita custom
// elements; o TypeScript só precisa saber que a tag existe).
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export function Vsl({ id, script }: { id: string; script: string }) {
  return (
    <div className="mx-auto w-full max-w-[28rem]">
      <link rel="preconnect" href="https://scripts.converteai.net" />
      <link rel="preconnect" href="https://cdn.converteai.net" />
      <link rel="preconnect" href="https://license.vturb.com" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <vturb-smartplayer
        id={id}
        style={{ display: "block", margin: "0 auto", width: "100%" }}
      />
      {/* async + src: o React 19 iça pro <head> e deduplica */}
      <script async src={script} />
    </div>
  );
}
