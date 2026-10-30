import type { ReactNode } from "react";

/**
 * Encabezado de sección:
 *
 *   Nº 02 ─── SERVICIOS
 *   Titular grande
 *   Entradilla opcional
 */
export function SectionHeading({
  number,
  eyebrow,
  title,
  intro,
  id,
  tone = "light",
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** id del titular, para `aria-labelledby` en la sección. */
  id: string;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-paper/85" : "text-ink-muted";
  const accent = tone === "dark" ? "text-brass-light" : "text-brass-ink";

  return (
    <header className="max-w-3xl">
      <p className={`flex items-center gap-3 label ${accent}`}>
        <span className="font-display text-base tracking-normal normal-case">Nº {number}</span>
        <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="mt-4 font-display text-headline font-medium text-balance">
        {title}
      </h2>
      {intro && <p className={`mt-5 text-lead text-pretty ${muted}`}>{intro}</p>}
    </header>
  );
}
