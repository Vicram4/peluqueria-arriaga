"use client";

import type { ReactNode } from "react";
import { dayNames } from "@/content/schedule";
import { ui } from "@/content/ui";
import { getOpenStatus, scheduleSummary, type OpenStatus as Status } from "@/lib/opening";
import { useMadridNow } from "@/lib/use-madrid-now";

const copy = ui.openStatus;

function whenLabel(status: Extract<Status, { daysAhead: number }>) {
  if (status.daysAhead === 0) return copy.today;
  if (status.daysAhead === 1) return copy.tomorrow;
  return copy.onDay(dayNames[status.weekday].long);
}

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
        <strong className="font-semibold">{copy.open}</strong> · {copy.closesAt(status.closesAt)}
      </>
    );
  } else {
    text = (
      <>
        <strong className="font-semibold">{copy.closed}</strong>
        {status.opensAt !== null && ` · ${copy.opensAt(whenLabel(status), status.opensAt)}`}
      </>
    );
  }

  return (
    <p
      aria-live="polite"
      className={`inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-paper px-4 py-2 text-[0.9375rem] ${className}`}
    >
      <span aria-hidden="true" className="relative flex size-2.5 shrink-0">
        {/* Si está abierto, el punto «late» suavemente, como un cartel encendido. */}
        {status?.open && (
          <span className="absolute inset-0 rounded-full bg-emerald-600 opacity-60 motion-safe:animate-ping" />
        )}
        <span className={`relative size-2.5 rounded-full ${dot}`} />
      </span>
      {/* La clave cambia al calcular la hora: el texto real entra con un fundido suave. */}
      <span
        key={status ? "live" : "static"}
        className={status ? "motion-safe:animate-fade-in" : ""}
      >
        {text}
      </span>
    </p>
  );
}
