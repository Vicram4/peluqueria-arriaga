"use client";

import { useSyncExternalStore } from "react";
import { getMadridNow, type MadridNow } from "@/lib/madrid-time";

// Una sola lectura compartida por todos los componentes; cambia como mucho una vez por minuto,
// así React no vuelve a pintar si la hora no ha cambiado.
let snapshot: MadridNow | null = null;

function read(): MadridNow {
  const now = getMadridNow();
  if (snapshot?.key !== now.key) snapshot = now;
  return snapshot;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  // Al volver a la pestaña (por ejemplo, tras bloquear el móvil) se actualiza al momento.
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onChange);
  };
}

/**
 * Hora actual de Madrid. Devuelve `null` en el HTML estático y durante la hidratación, así el
 * servidor y el navegador pintan lo mismo y no hay errores de hidratación.
 */
export function useMadridNow(): MadridNow | null {
  return useSyncExternalStore(subscribe, read, () => null);
}
