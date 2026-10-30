import { OpenStatus } from "@/components/hours/open-status";
import { ButtonLink } from "@/components/ui/button-link";
import { CalendarIcon, PhoneIcon, StarIcon } from "@/components/ui/icons";
import { PhotoSlot } from "@/components/ui/photo-slot";
import { business, ratingLabel } from "@/content/business";
import { sections } from "@/content/navigation";
import { photos } from "@/content/photos";

export function Hero() {
  return (
    <section id={sections.home} aria-labelledby="hero-title" className="overflow-hidden">
      <div className="shell grid items-center gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <p className="flex items-center gap-3 label text-brass-ink">
            <span aria-hidden="true" className="h-px w-10 bg-brass" />
            {business.audience} · {business.address.city}
          </p>

          <h1 id="hero-title" className="mt-5 font-display text-display font-medium text-balance">
            Tu peluquería de barrio, <em className="text-maroon">de toda la vida</em>.
          </h1>

          <p className="mt-6 max-w-xl text-lead text-pretty text-ink-muted">
            En {business.name} se corta el pelo con oficio y sin prisas, con el trato cercano de{" "}
            {business.owner}. Clientes de siempre y los más pequeños de la casa, en la calle Padre
            Flores.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`#${sections.booking}`}>
              <CalendarIcon />
              Pedir cita
            </ButtonLink>
            <ButtonLink href={business.phone.href} variant="secondary">
              <PhoneIcon />
              Llamar al {business.phone.display}
            </ButtonLink>
          </div>

          <OpenStatus className="mt-6" />
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <PhotoSlot photo={photos.hero} className="rotate-1" />

          {/* Sello de valoración, como una placa de latón sobre la foto. */}
          <a
            href={`#${sections.reviews}`}
            className="absolute -bottom-6 -left-3 flex size-32 -rotate-6 flex-col items-center justify-center rounded-full border-[3px] border-double border-brass-light bg-ink text-center text-paper shadow-xl transition-transform hover:-rotate-3 sm:-left-8 sm:size-36"
          >
            <span className="font-display text-4xl leading-none font-semibold sm:text-5xl">
              {ratingLabel}
            </span>
            <span aria-hidden="true" className="mt-1 flex text-brass-light">
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon key={index} width={14} height={14} />
              ))}
            </span>
            <span className="mt-1 text-xs leading-tight">
              <span className="sr-only">de 5, </span>
              {business.rating.count} reseñas
              <br />
              en Google
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
