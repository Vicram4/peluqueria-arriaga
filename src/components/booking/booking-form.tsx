"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/button-link";
import { CheckIcon } from "@/components/ui/icons";
import { dayNames, schedule, slotNames, type Slot } from "@/content/schedule";
import { services } from "@/content/services";
import { formatTime, getBookableDays, type BookableDay } from "@/lib/opening";
import { useMadridNow } from "@/lib/use-madrid-now";

/**
 * MAQUETA del formulario de cita: valida en el navegador y, al enviar, solo muestra una
 * confirmación. No hay `action`, ni `fetch`, ni almacenamiento: ningún dato sale del navegador.
 */

const DAYS_SHOWN = 12;

const monthNames = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
] as const;

const monthNamesLong = [
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
] as const;

type Values = { name: string; phone: string; service: string; day: string; slot: Slot | "" };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const emptyValues: Values = { name: "", phone: "", service: "", day: "", slot: "" };
const fieldOrder: readonly Field[] = ["name", "phone", "service", "day", "slot"];

/** Acepta espacios, puntos, guiones y el prefijo +34 / 0034. */
function normalizePhone(phone: string) {
  return phone.replace(/[\s.\-()]/g, "").replace(/^(\+|00)34/, "");
}

function validate(values: Values, days: readonly BookableDay[]): Errors {
  const errors: Errors = {};
  const day = days.find((option) => option.iso === values.day);

  if (values.name.trim().length < 2) errors.name = "Escribe tu nombre.";
  if (!/^[6789]\d{8}$/.test(normalizePhone(values.phone)))
    errors.phone = "Escribe un teléfono español de 9 cifras, por ejemplo 600 123 456.";
  if (!services.some((service) => service.id === values.service))
    errors.service = "Elige un servicio.";
  if (!day) errors.day = "Elige un día.";
  if (!values.slot) errors.slot = "Elige mañana o tarde.";
  else if (day && !day.slots.includes(values.slot))
    errors.slot = "Esa franja no está disponible ese día.";

  return errors;
}

function dayLabel(day: BookableDay) {
  return `${dayNames[day.weekday].long.toLowerCase()} ${day.day} de ${monthNamesLong[day.month - 1]}`;
}

export function BookingForm() {
  const now = useMadridNow();
  const days = now ? getBookableDays(now, DAYS_SHOWN) : [];

  const [values, setValues] = useState<Values>(emptyValues);
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState<Values | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const id = useId();

  // Los errores aparecen tras el primer intento de envío y se actualizan mientras se corrige.
  const errors = attempted ? validate(values, days) : {};
  const selectedDay = days.find((day) => day.iso === values.day);

  function update<K extends Field>(field: K, value: Values[K]) {
    setValues((current) => {
      const next = { ...current, [field]: value };
      // Si el nuevo día no tiene la franja elegida (p. ej., sábado por la tarde), se borra.
      if (field === "day") {
        const day = days.find((option) => option.iso === value);
        if (next.slot && !day?.slots.includes(next.slot)) next.slot = "";
      }
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);

    const found = validate(values, days);
    const firstInvalid = fieldOrder.find((field) => found[field]);
    if (firstInvalid) {
      // Lleva el foco al primer campo con error (en los grupos, a su primera opción activa).
      formRef.current
        ?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]:not(:disabled)`)
        ?.focus();
      return;
    }

    setSubmitted(values);
    requestAnimationFrame(() => confirmationRef.current?.focus());
  }

  function reset() {
    setValues(emptyValues);
    setAttempted(false);
    setSubmitted(null);
    requestAnimationFrame(() => document.getElementById(`${id}-name`)?.focus());
  }

  if (submitted) {
    const service = services.find((option) => option.id === submitted.service);
    const day = days.find((option) => option.iso === submitted.day);

    return (
      <div className="rounded-sm border-[3px] border-double border-brass bg-paper p-6 sm:p-8">
        <p className="inline-flex size-12 items-center justify-center rounded-full bg-ink text-paper">
          <CheckIcon />
        </p>
        <h3
          ref={confirmationRef}
          tabIndex={-1}
          className="mt-5 font-display text-title font-medium"
        >
          Así quedaría tu solicitud, {submitted.name.trim()}
        </h3>
        <dl className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
          <dt className="font-semibold">Servicio</dt>
          <dd>{service?.name}</dd>
          <dt className="font-semibold">Día</dt>
          <dd>{day ? dayLabel(day) : submitted.day}</dd>
          <dt className="font-semibold">Franja</dt>
          <dd>{submitted.slot && slotNames[submitted.slot]}</dd>
        </dl>
        <p className="mt-6 rounded-sm bg-maroon px-4 py-3 text-paper">
          <strong>Esto es una demostración: no se ha enviado nada.</strong> Tus datos no han salido
          de tu navegador. En la web real, aquí la peluquería recibiría la solicitud y te llamaría
          para confirmarla.
        </p>
        <button type="button" onClick={reset} className={`${buttonClasses("secondary")} mt-6`}>
          Volver a empezar
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-describedby={`${id}-demo`}
      className="rounded-sm border-[3px] border-double border-brass bg-paper p-5 sm:p-8"
    >
      <p
        id={`${id}-demo`}
        className="mb-6 rounded-sm bg-paper-deep px-4 py-3 text-[0.9375rem] text-ink-muted"
      >
        <strong className="text-ink">Demostración:</strong> este formulario no envía ni guarda
        ningún dato.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={`${id}-name`}
          field="name"
          label="Nombre"
          autoComplete="given-name"
          value={values.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
        />
        <TextField
          id={`${id}-phone`}
          field="phone"
          label="Teléfono"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={values.phone}
          error={errors.phone}
          onChange={(value) => update("phone", value)}
        />

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-service`} className="block font-semibold">
            Servicio
          </label>
          <select
            id={`${id}-service`}
            data-field="service"
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? `${id}-service-error` : undefined}
            className={`${inputClasses} select-chevron pr-11`}
          >
            <option value="" disabled>
              Elige un servicio
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <FieldError id={`${id}-service-error`}>{errors.service}</FieldError>
        </div>
      </div>

      <fieldset className="mt-7" aria-describedby={errors.day ? `${id}-day-error` : undefined}>
        <legend className="font-semibold">Día</legend>
        <p className="mt-1 text-[0.9375rem] text-ink-muted">
          Próximos días con horario. Los domingos está cerrado.
        </p>
        {days.length === 0 ? (
          <p className="mt-3 text-ink-muted">Calculando los próximos días…</p>
        ) : (
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {days.map((day, index) => {
              const isToday = index === 0 && day.iso === toIso(now);
              return (
                <label key={day.iso} className={`${choiceClasses} flex-col py-2 leading-tight`}>
                  <input
                    type="radio"
                    name={`${id}-day`}
                    value={day.iso}
                    checked={values.day === day.iso}
                    onChange={() => update("day", day.iso)}
                    data-field={index === 0 ? "day" : undefined}
                    aria-label={`${isToday ? "Hoy, " : ""}${dayLabel(day)}`}
                    className="sr-only"
                  />
                  <span aria-hidden="true" className="text-xs font-semibold uppercase">
                    {isToday ? "Hoy" : dayNames[day.weekday].short}
                  </span>
                  <span aria-hidden="true" className="font-display text-2xl font-semibold">
                    {day.day}
                  </span>
                  <span aria-hidden="true" className="text-xs">
                    {monthNames[day.month - 1]}
                  </span>
                </label>
              );
            })}
          </div>
        )}
        <FieldError id={`${id}-day-error`}>{errors.day}</FieldError>
      </fieldset>

      <fieldset
        className="mt-7"
        aria-describedby={[`${id}-slot-hint`, errors.slot && `${id}-slot-error`]
          .filter(Boolean)
          .join(" ")}
      >
        <legend className="font-semibold">Franja</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(["morning", "afternoon"] as const).map((slot) => {
            const available = !selectedDay || selectedDay.slots.includes(slot);
            const range = selectedDay
              ? schedule[selectedDay.weekday].find((option) => option.slot === slot)
              : schedule[1].find((option) => option.slot === slot);
            return (
              <label key={slot} className={`${choiceClasses} flex-col py-3`}>
                <input
                  type="radio"
                  name={`${id}-slot`}
                  value={slot}
                  checked={values.slot === slot}
                  disabled={!available}
                  onChange={() => update("slot", slot)}
                  data-field="slot"
                  className="sr-only"
                />
                <span className="font-semibold">{slotNames[slot]}</span>
                <span className="text-sm tabular-nums">
                  {available && range
                    ? `${formatTime(range.open)}–${formatTime(range.close)}`
                    : "No disponible"}
                </span>
              </label>
            );
          })}
        </div>
        <p id={`${id}-slot-hint`} className="mt-2 text-[0.9375rem] text-ink-muted">
          {slotHint(selectedDay)}
        </p>
        <FieldError id={`${id}-slot-error`}>{errors.slot}</FieldError>
      </fieldset>

      <button type="submit" className={`${buttonClasses("primary")} mt-8 w-full sm:w-auto`}>
        Pedir cita (demo)
      </button>
    </form>
  );
}

function toIso(now: ReturnType<typeof useMadridNow>) {
  if (!now) return "";
  return `${now.year}-${String(now.month).padStart(2, "0")}-${String(now.day).padStart(2, "0")}`;
}

function slotHint(day: BookableDay | undefined) {
  if (!day) return "Elige primero un día. Los sábados solo hay horario de mañana.";
  if (day.weekday === 6) return "Los sábados solo hay horario de mañana.";
  if (day.slots.length === 1)
    return `Hoy solo queda la franja de ${slotNames[day.slots[0]].toLowerCase()}.`;
  return "Te llamaremos para concretar la hora exacta.";
}

const inputClasses =
  "mt-2 block min-h-12 w-full rounded-sm border-2 border-ink/30 bg-paper px-3.5 text-base text-ink transition-colors hover:border-ink/60 focus:border-ink aria-invalid:border-maroon";

/** Opción tipo «ficha» para los grupos de radio: estado elegido, foco y desactivado visibles. */
const choiceClasses =
  "flex cursor-pointer items-center justify-center rounded-sm border-2 border-ink/25 bg-paper text-center transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink has-disabled:cursor-not-allowed has-disabled:border-dashed has-disabled:bg-paper-deep has-disabled:text-ink-muted has-disabled:hover:border-ink/25";

function TextField({
  id,
  field,
  label,
  value,
  error,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  field: Field;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: "text" | "tel";
  inputMode?: "text" | "tel";
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <input
        id={id}
        data-field={field}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClasses}
      />
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex gap-1.5 text-[0.9375rem] font-medium text-maroon">
      <span aria-hidden="true">!</span>
      {children}
    </p>
  );
}
