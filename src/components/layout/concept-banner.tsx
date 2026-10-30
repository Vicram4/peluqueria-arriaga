import { concept } from "@/content/concept";

/** Franja superior que deja claro, desde el primer vistazo, que la web es un concepto. */
export function ConceptBanner() {
  return (
    <div className="on-dark bg-ink text-paper">
      <p className="shell py-2 text-center text-[0.8125rem] leading-snug">
        <strong className="font-semibold text-brass-light">{concept.shortNotice} · </strong>
        {concept.notice}
      </p>
    </div>
  );
}
