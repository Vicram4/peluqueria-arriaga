import { BookingForm } from "@/components/booking/booking-form";
import { PhoneIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/content/business";
import { sections } from "@/content/navigation";

export function Booking() {
  return (
    <section id={sections.booking} aria-labelledby="booking-title" className="section-y">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <SectionHeading
            id="booking-title"
            number="05"
            eyebrow="Pide cita"
            title="Elige día y franja."
            intro="Deja tu nombre y teléfono, y la peluquería te llama para cerrar la hora exacta."
          />

          <div className="mt-10 border-l-[3px] border-maroon pl-5">
            <p className="font-semibold">¿Prefieres llamar?</p>
            <a
              href={business.phone.href}
              className="mt-1 inline-flex items-center gap-2 font-display text-title font-semibold tabular-nums underline-offset-4 hover:underline"
            >
              <PhoneIcon className="text-maroon" width={24} height={24} />
              {business.phone.display}
            </a>
          </div>
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
