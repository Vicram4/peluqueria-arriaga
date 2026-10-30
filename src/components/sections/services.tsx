import { ButtonLink } from "@/components/ui/button-link";
import { PhoneIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/content/business";
import { sections } from "@/content/navigation";
import { priceFallback, priceNote, services } from "@/content/services";
import { servicesCopy } from "@/content/sections";

/** Servicios como una tablilla de precios de las de antes: nombre · · · · precio. */
export function Services() {
  return (
    <section
      id={sections.services}
      aria-labelledby="services-title"
      className="on-dark bg-ink section-y text-paper"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeading id="services-title" copy={servicesCopy} tone="dark" />
          <ButtonLink href={business.phone.href} variant="outlineLight" className="mt-8">
            <PhoneIcon />
            {servicesCopy.cta}
          </ButtonLink>
        </div>

        <div className="rounded-sm border-[3px] border-double border-brass p-5 sm:p-8">
          <ul className="divide-y divide-paper/15">
            {services.map((service) => (
              <li key={service.id} className="group reveal py-5 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-title font-medium transition-colors group-hover:text-brass-light motion-safe:transition motion-safe:duration-300 motion-safe:group-hover:translate-x-1.5">
                    {service.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="leader text-brass transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <p className="shrink-0 font-semibold text-brass-light tabular-nums">
                    {service.price ?? priceFallback}
                  </p>
                </div>
                <p className="mt-1.5 max-w-prose text-paper/85">{service.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-paper/15 pt-5 text-sm text-paper/85">
            <span aria-hidden="true" className="text-brass-light">
              ※{" "}
            </span>
            {priceNote}
          </p>
        </div>
      </div>
    </section>
  );
}
