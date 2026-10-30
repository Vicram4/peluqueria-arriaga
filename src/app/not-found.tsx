import { ButtonLink } from "@/components/ui/button-link";
import { notFoundCopy } from "@/content/sections";

/** Página 404 en español (la de Next.js viene en inglés). */
export default function NotFound() {
  return (
    <section className="shell section-y text-center">
      <p className="font-display text-[clamp(5rem,3rem+8vw,8rem)] leading-none text-maroon">404</p>
      <h1 className="mt-4 font-display text-headline font-medium text-balance">
        {notFoundCopy.title}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lead text-pretty text-ink-muted">
        {notFoundCopy.text}
      </p>
      <ButtonLink href="/" className="mt-8">
        {notFoundCopy.cta}
      </ButtonLink>
    </section>
  );
}
