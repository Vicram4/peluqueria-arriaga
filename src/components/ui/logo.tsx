import { BarberPole } from "@/components/ui/barber-pole";
import { business } from "@/content/business";
import { concept } from "@/content/concept";
import { sections } from "@/content/navigation";

/** Logotipo tipográfico con la etiqueta «Concepto» siempre visible. */
export function Logo() {
  return (
    <a href={`#${sections.home}`} className="group flex items-center gap-3">
      <BarberPole className="h-9" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.625rem] font-semibold tracking-[0.28em] text-brass-ink uppercase">
          {business.logoPrefix}
        </span>
        <span className="font-display text-[1.75rem] font-semibold tracking-tight">
          {business.shortName}
        </span>
      </span>
      <span className="self-start rounded-full border border-maroon/40 px-2 py-0.5 text-[0.625rem] font-semibold tracking-wider text-maroon uppercase">
        {concept.shortNotice}
      </span>
    </a>
  );
}
