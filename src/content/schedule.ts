/**
 * Horario semanal: única fuente para la tabla, el indicador «Abierto ahora» y el formulario.
 * Los días usan la numeración de JavaScript (0 = domingo … 6 = sábado).
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Franja que se puede elegir al pedir cita. */
export type Slot = "morning" | "afternoon";

export type TimeRange = {
  slot: Slot;
  /** Hora local de Madrid, «HH:MM». */
  open: string;
  close: string;
};

const weekdayHours: readonly TimeRange[] = [
  { slot: "morning", open: "09:30", close: "14:00" },
  { slot: "afternoon", open: "16:30", close: "20:30" },
];

export const schedule: Record<Weekday, readonly TimeRange[]> = {
  0: [],
  1: weekdayHours,
  2: weekdayHours,
  3: weekdayHours,
  4: weekdayHours,
  5: weekdayHours,
  6: [{ slot: "morning", open: "09:00", close: "14:00" }],
};

/** Orden de la semana en España: de lunes a domingo. */
export const weekOrder: readonly Weekday[] = [1, 2, 3, 4, 5, 6, 0];

export const dayNames: Record<Weekday, { long: string; short: string }> = {
  0: { long: "Domingo", short: "Dom" },
  1: { long: "Lunes", short: "Lun" },
  2: { long: "Martes", short: "Mar" },
  3: { long: "Miércoles", short: "Mié" },
  4: { long: "Jueves", short: "Jue" },
  5: { long: "Viernes", short: "Vie" },
  6: { long: "Sábado", short: "Sáb" },
};

export const slotNames: Record<Slot, string> = {
  morning: "Mañana",
  afternoon: "Tarde",
};

// PENDIENTE: confirmar cómo trabajan los festivos y si cierran en agosto.
export const holidayNote = "Festivos: consultar por teléfono.";

export const monthNames = {
  short: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  long: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
} as const;
