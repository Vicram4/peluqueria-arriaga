"use client";

import type { ReactNode } from "react";
import { getOpenStatus, scheduleSummary } from "@/lib/opening";
import { useMadridNow } from "@/lib/use-madrid-now";

/**
 * «Abierto ahora · cierra a las 14:00» o «Cerrado · abre mañana a las 9:30», con la hora de
 * Madrid. En el HTML estático (antes de que cargue JavaScript) muestra el horario resumido.
 */
export function OpenStatus({ className = "" }: { className?: string }) {
  const now = useMadridNow();
  const status = now ? getOpenStatus(now) : null;

  const dot = status?.open ? "bg-emerald-700" : status ? "bg-maroon" : "bg-brass";

  let text: ReactNode;
  if (!status) {
    text = scheduleSummary();
  } else if (status.open) {
    text = (
      <>
        <strong className="font-semibold">Abierto ahora</strong> · cierra a las {status.closesAt}
      </>
    );
  } else {
    text = (
      <>
        <strong className="font-semibold">Cerrado</strong>
        {status.opensAt && ` · abre ${status.when} a las ${status.opensAt}`}
      </>
    );
  }

  return (
    <p
      aria-live="polite"
      className={`inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-paper px-4 py-2 text-[0.9375rem] ${className}`}
    >
      <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${dot}`} />
      <span>{text}</span>
    </p>
  );
}
