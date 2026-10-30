"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/button-link";
import { CheckIcon } from "@/components/ui/icons";
import { bookingFormCopy as copy } from "@/content/booking-form";
import { dayNames, monthNames, schedule, slotNames, type Slot } from "@/content/schedule";
import { services } from "@/content/services";
import { formatTime, getBookableDays, type BookableDay } from "@/lib/opening";
import { useMadridNow } from "@/lib/use-madrid-now";

/**
 * MAQUETA del formulario de cita: valida en el navegador y, al enviar, solo muestra una
 * confirmación. No hay `action`, ni `fetch`, ni almacenamiento: ningún dato sale del navegador.
 */

const DAYS_SHOWN = 12;

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

  if (values.name.trim().length < 2) errors.name = copy.errors.name;
  if (!/^[6789]\d{8}$/.test(normalizePhone(values.phone))) errors.phone = copy.errors.phone;
  if (!services.some((service) => service.id === values.service))
    errors.service = copy.errors.service;
  if (!day) errors.day = copy.errors.day;
  if (!values.slot) errors.slot = copy.errors.slot;
  else if (day && !day.slots.includes(values.slot)) errors.slot = copy.errors.slotUnavailable;

  return errors;
}

function dayLabel(day: BookableDay) {
  return `${dayNames[day.weekday].long.toLowerCase()} ${day.day} de ${monthNames.long[day.month - 1]}`;
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
        <p className="inline-flex size-12 items-center justify-center rounded-full bg-ink text-paper motion-safe:animate-[pop_0.5s_var(--ease-spring)]">
          <CheckIcon className="check-draw" />
        </p>
        <h3
          ref={confirmationRef}
          tabIndex={-1}
          className="mt-5 font-display text-title font-medium"
        >
          {copy.confirmation.title(submitted.name.trim())}
        </h3>
        <dl className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
          <dt className="font-semibold">{copy.confirmation.service}</dt>
          <dd>{service?.name}</dd>
          <dt className="font-semibold">{copy.confirmation.day}</dt>
          <dd>{day ? dayLabel(day) : submitted.day}</dd>
          <dt className="font-semibold">{copy.confirmation.slot}</dt>
          <dd>{submitted.slot && slotNames[submitted.slot]}</dd>
        </dl>
        <p className="mt-6 rounded-sm bg-maroon px-4 py-3 text-paper">
          <strong>{copy.confirmation.demoLead}</strong> {copy.confirmation.demoText}
        </p>
        <button type="button" onClick={reset} className={`${buttonClasses("secondary")} mt-6`}>
          {copy.confirmation.reset}
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
        <strong className="text-ink">{copy.demoNotice.lead}</strong> {copy.demoNotice.text}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={`${id}-name`}
          field="name"
          label={copy.fields.name}
          autoComplete="given-name"
          value={values.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
        />
        <TextField
          id={`${id}-phone`}
          field="phone"
          label={copy.fields.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={values.phone}
          error={errors.phone}
          onChange={(value) => update("phone", value)}
        />

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-service`} className="block font-semibold">
            {copy.fields.service}
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
              {copy.fields.servicePlaceholder}
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
        <legend className="font-semibold">{copy.fields.day}</legend>
        <p className="mt-1 text-[0.9375rem] text-ink-muted">{copy.fields.dayHint}</p>
        {days.length === 0 ? (
          <p className="mt-3 text-ink-muted">{copy.fields.dayLoading}</p>
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
                    aria-label={`${isToday ? `${copy.fields.today}, ` : ""}${dayLabel(day)}`}
                    className="sr-only"
                  />
                  <span aria-hidden="true" className="text-xs font-semibold uppercase">
                    {isToday ? copy.fields.today : dayNames[day.weekday].short}
                  </span>
                  <span aria-hidden="true" className="font-display text-2xl font-semibold">
                    {day.day}
                  </span>
                  <span aria-hidden="true" className="text-xs">
                    {monthNames.short[day.month - 1]}
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
        <legend className="font-semibold">{copy.fields.slot}</legend>
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
                    : copy.fields.slotUnavailable}
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
        {copy.submit}
      </button>
    </form>
  );
}

function toIso(now: ReturnType<typeof useMadridNow>) {
  if (!now) return "";
  return `${now.year}-${String(now.month).padStart(2, "0")}-${String(now.day).padStart(2, "0")}`;
}

function slotHint(day: BookableDay | undefined) {
  if (!day) return copy.slotHints.noDay;
  if (day.weekday === 6) return copy.slotHints.saturday;
  if (day.slots.length === 1) return copy.slotHints.onlyOneLeft(slotNames[day.slots[0]]);
  return copy.slotHints.default;
}

const inputClasses =
  "mt-2 block min-h-12 w-full rounded-sm border-2 border-ink/30 bg-paper px-3.5 text-base text-ink transition-colors hover:border-ink/60 focus:border-ink aria-invalid:border-maroon";

/**
 * Opción tipo «ficha» para los grupos de radio: estado elegido, foco y desactivado visibles.
 * Con movimiento permitido, la ficha se eleva al pasar el ratón y se «hunde» al pulsarla.
 */
const choiceClasses =
  "flex cursor-pointer items-center justify-center rounded-sm border-2 border-ink/25 bg-paper text-center transition duration-200 hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink has-disabled:cursor-not-allowed has-disabled:border-dashed has-disabled:bg-paper-deep has-disabled:text-ink-muted has-disabled:hover:border-ink/25 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md motion-safe:active:translate-y-0 motion-safe:active:scale-95 motion-safe:has-disabled:hover:translate-y-0 motion-safe:has-disabled:hover:shadow-none";

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

/** Mensaje de error; con movimiento permitido, entra con un pequeño temblor para llamar la atención. */
function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p
      id={id}
      className="mt-2 flex gap-1.5 text-[0.9375rem] font-medium text-maroon motion-safe:animate-[shake_0.35s_ease-in-out]"
    >
      <span aria-hidden="true">!</span>
      {children}
    </p>
  );
}
