import type { Weekday } from "@/content/schedule";

/** Fecha y hora actuales en Madrid, sea cual sea la zona horaria del visitante. */
export type MadridNow = {
  year: number;
  month: number;
  day: number;
  weekday: Weekday;
  /** Minutos desde medianoche (9:30 → 570). */
  minutes: number;
  /** Identifica el minuto: dos lecturas del mismo minuto son iguales. */
  key: string;
};

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Madrid",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

export function getMadridNow(date = new Date()): MadridNow {
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);

  return {
    year,
    month,
    day,
    weekday: weekdayOf(year, month, day),
    minutes,
    key: `${year}-${month}-${day} ${minutes}`,
  };
}

/** Día de la semana de una fecha de calendario (sin depender de la zona horaria). */
export function weekdayOf(year: number, month: number, day: number): Weekday {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay() as Weekday;
}
