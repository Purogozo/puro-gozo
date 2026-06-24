// Assinatura do logo: "Puro" regular + "Gozo" itálico (itálico SEMPRE na 2ª palavra)
export function Logo({
  className = "",
  tone = "indigo",
}: {
  className?: string;
  tone?: "indigo" | "marfim";
}) {
  const color = tone === "marfim" ? "text-marfim" : "text-indigo";
  return (
    <span
      className={`logo-serif select-none ${color} ${className}`}
      aria-label="Puro Gozo"
    >
      Puro<em>Gozo</em>
    </span>
  );
}
