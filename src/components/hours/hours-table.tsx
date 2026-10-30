"use client";

import { dayNames, schedule, weekOrder } from "@/content/schedule";
import { formatTime } from "@/lib/opening";
import { useMadridNow } from "@/lib/use-madrid-now";

/** Tabla de horario con el día de hoy (en Madrid) resaltado. */
export function HoursTable() {
  const today = useMadridNow()?.weekday;

  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">Horario de apertura semanal</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Día</th>
          <th scope="col">Horario</th>
        </tr>
      </thead>
      <tbody>
        {weekOrder.map((weekday) => {
          const ranges = schedule[weekday];
          const isToday = weekday === today;

          return (
            <tr
              key={weekday}
              aria-current={isToday ? "date" : undefined}
              className={`border-b border-ink/10 ${isToday ? "bg-ink text-paper" : ""}`}
            >
              <th scope="row" className="py-3.5 pr-4 pl-3 align-top font-semibold">
                {dayNames[weekday].long}
                {isToday && (
                  <span className="ml-2 rounded-full bg-brass-light px-2 py-0.5 align-middle text-xs font-semibold text-ink">
                    Hoy
                  </span>
                )}
              </th>
              <td className="py-3.5 pr-3 text-right tabular-nums">
                {ranges.length === 0 ? (
                  <span className={isToday ? "text-paper/85" : "text-ink-muted"}>Cerrado</span>
                ) : (
                  ranges.map((range) => (
                    <span
                      key={range.open}
                      className="block sm:inline sm:not-last:after:content-['_·_']"
                    >
                      {formatTime(range.open)}–{formatTime(range.close)}
                    </span>
                  ))
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
