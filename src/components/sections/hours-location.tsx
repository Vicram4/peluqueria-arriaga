import { HoursTable } from "@/components/hours/hours-table";
import { OpenStatus } from "@/components/hours/open-status";
import { ButtonLink } from "@/components/ui/button-link";
import { ExternalIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/content/business";
import { sections } from "@/content/navigation";
import { holidayNote } from "@/content/schedule";
import { hoursCopy } from "@/content/sections";

// Sin mapa incrustado: un iframe de Google Maps pesa cerca de 1 MB y bajaría la nota de
// rendimiento. Un enlace abre la app de mapas del móvil, que es lo que se quiere.
export function HoursLocation() {
  const { address } = business;

  return (
    <section
      id={sections.hours}
      aria-labelledby="hours-title"
      className="border-t-[3px] border-double border-brass bg-paper-deep section-y"
    >
      <div className="shell">
        <SectionHeading id="hours-title" copy={hoursCopy} />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="font-display text-title font-medium">{hoursCopy.hoursTitle}</h3>
            <OpenStatus className="mt-4" />
            <div className="mt-6 rounded-sm bg-paper px-2 py-1">
              <HoursTable />
            </div>
            <p className="mt-3 text-[0.9375rem] text-ink-muted">{holidayNote}</p>
          </div>

          <div>
            <h3 className="font-display text-title font-medium">{hoursCopy.addressTitle}</h3>
            <address className="mt-4 flex gap-3 text-lead not-italic">
              <MapPinIcon className="mt-1 shrink-0 text-maroon" width={24} height={24} />
              <span>
                {address.street}
                <br />
                {address.postalCode} {address.city}
                <br />
                <span className="text-ink-muted">{address.region}</span>
              </span>
            </address>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={business.mapsUrl}>
                <MapPinIcon />
                {hoursCopy.directions}
                <ExternalIcon />
                <span className="sr-only">(se abre Google Maps)</span>
              </ButtonLink>
              <ButtonLink href={business.phone.href} variant="secondary">
                <PhoneIcon />
                {business.phone.display}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
