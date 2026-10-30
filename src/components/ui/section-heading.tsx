import type { SectionCopy } from "@/content/sections";

/** Pinta `text` con la parte `highlight` en granate y cursiva. */
export function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <em className="text-maroon">{highlight}</em>
      {text.slice(index + highlight.length)}
    </>
  );
}

/**
 * Encabezado de sección:
 *
 *   Nº 02 ─── SERVICIOS
 *   Titular grande
 *   Entradilla opcional
 */
export function SectionHeading({
  copy,
  id,
  tone = "light",
}: {
  copy: SectionCopy;
  /** id del titular, para `aria-labelledby` en la sección. */
  id: string;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-paper/85" : "text-ink-muted";
  const accent = tone === "dark" ? "text-brass-light" : "text-brass-ink";

  return (
    <header className="max-w-3xl">
      <p className={`flex items-center gap-3 label ${accent}`}>
        <span className="font-display text-base tracking-normal normal-case">Nº {copy.number}</span>
        <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
        <span>{copy.eyebrow}</span>
      </p>
      <h2 id={id} className="mt-4 font-display text-headline font-medium text-balance">
        <Highlighted text={copy.title} highlight={copy.highlight} />
      </h2>
      {copy.intro && <p className={`mt-5 text-lead text-pretty ${muted}`}>{copy.intro}</p>}
    </header>
  );
}
