import { Logo } from "@/components/brand/Logo";

// SEÇÃO 1 · HEADER
// Sem menu, sem links: numa página de vendas, todo link que não é o CTA é uma
// porta de saída. Só o logo, centralizado.
export function Header() {
  return (
    <header className="bg-marfim px-5 pt-7 text-center sm:pt-9">
      <Logo className="text-[1.35rem] sm:text-[1.6rem]" />
    </header>
  );
}
