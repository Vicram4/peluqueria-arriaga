import { dayNames, schedule, weekOrder, type Slot, type Weekday } from "@/content/schedule";
import type { MadridNow } from "@/lib/madrid-time";

/** «09:30» → 570 minutos desde medianoche. */
export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** «09:30» → «9:30», como se escribe la hora en España. */
export function formatTime(time: string): string {
  return time.replace(/^0/, "");
}

export type OpenStatus =
  | { open: true; closesAt: string }
  /** `daysAhead`: 0 = hoy, 1 = mañana… `weekday`: día en que vuelve a abrir. */
  | { open: false; opensAt: string; daysAhead: number; weekday: Weekday }
  | { open: false; opensAt: null };

/** ¿Está abierto ahora? Si no, cuándo vuelve a abrir. */
export function getOpenStatus(now: Pick<MadridNow, "weekday" | "minutes">): OpenStatus {
  const current = schedule[now.weekday].find(
    (range) => now.minutes >= toMinutes(range.open) && now.minutes < toMinutes(range.close),
  );
  if (current) return { open: true, closesAt: formatTime(current.close) };

  // Busca el siguiente tramo: primero hoy, luego los próximos 7 días.
  for (let offset = 0; offset <= 7; offset++) {
    const weekday = ((now.weekday + offset) % 7) as Weekday;
    const next = schedule[weekday].find(
      (range) => offset > 0 || toMinutes(range.open) > now.minutes,
    );
    if (next) return { open: false, opensAt: formatTime(next.open), daysAhead: offset, weekday };
  }

  return { open: false, opensAt: null };
}

export type BookableDay = {
  /** «AAAA-MM-DD». */
  iso: string;
  weekday: Weekday;
  day: number;
  month: number;
  slots: readonly Slot[];
};

/**
 * Próximos días en los que se puede pedir cita (nunca domingos ni días cerrados). Hoy solo cuenta
 * si queda alguna franja por terminar.
 */
export function getBookableDays(now: MadridNow, count: number): BookableDay[] {
  const days: BookableDay[] = [];

  for (let offset = 0; days.length < count && offset < count * 2; offset++) {
    const date = new Date(Date.UTC(now.year, now.month - 1, now.day + offset));
    const weekday = date.getUTCDay() as Weekday;
    const slots = schedule[weekday]
      .filter((range) => offset > 0 || toMinutes(range.close) > now.minutes)
      .map((range) => range.slot);

    if (slots.length > 0) {
      days.push({
        iso: date.toISOString().slice(0, 10),
        weekday,
        day: date.getUTCDate(),
        month: date.getUTCMonth() + 1,
        slots,
      });
    }
  }

  return days;
}

/** Resumen de una línea para cuando aún no se conoce la hora (HTML estático). */
export function scheduleSummary(): string {
  return weekOrder
    .filter((weekday) => schedule[weekday].length > 0)
    .reduce<{ days: Weekday[]; text: string }[]>((groups, weekday) => {
      const text = schedule[weekday]
        .map((range) => `${formatTime(range.open)}–${formatTime(range.close)}`)
        .join(" y ");
      const last = groups.at(-1);
      if (last && last.text === text) last.days.push(weekday);
      else groups.push({ days: [weekday], text });
      return groups;
    }, [])
    .map(({ days, text }) => {
      const first = dayNames[days[0]].short;
      const range = days.length > 1 ? `${first}–${dayNames[days.at(-1)!].short}` : first;
      return `${range} ${text}`;
    })
    .join(" · ");
}
