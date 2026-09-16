import { METODO } from "@/lib/metodo-copy";
import { Logo } from "@/components/brand/Logo";

// 21 · RODAPÉ
// Os únicos links pra fora da página. CNPJ só renderiza quando existir
// (não inventar). padding-bottom extra pra sticky bar não cobrir o legal.
export function Rodape() {
  const { rodape: c, marca } = METODO;

  return (
    <footer className="bg-tinta px-5 pb-28 pt-14 text-center sm:px-8 sm:pb-32 sm:pt-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5">
        <Logo tone="marfim" className="text-[1.3rem]" />
        <span className="sr-only">{marca}</span>

        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {c.links.map((link, i) => (
            <span key={link.rotulo} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-nevoa/40">
                  ·
                </span>
              )}
              <a
                href={link.href}
                className="font-sans text-[0.82rem] font-light text-nevoa underline-offset-4 transition-colors hover:text-marfim hover:underline"
              >
                {link.rotulo}
              </a>
            </span>
          ))}
        </nav>

        {c.cnpj && (
          <p className="font-sans text-[0.78rem] font-light text-nevoa/80">CNPJ {c.cnpj}</p>
        )}
        <p className="font-sans text-[0.78rem] font-light text-nevoa/80">{c.copyright}</p>

        <div className="max-w-xl border-t border-white/10 pt-5">
          {c.avisos.map((a) => (
            <p key={a} className="font-sans text-[0.74rem] font-light leading-relaxed text-nevoa/80">
              {a}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
