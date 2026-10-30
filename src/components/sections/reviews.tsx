import { ButtonLink } from "@/components/ui/button-link";
import { ExternalIcon, StarIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { business, ratingLabel } from "@/content/business";
import { sections } from "@/content/navigation";
import { reviews, type Review } from "@/content/reviews";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          width={size}
          height={size}
          className={index < Math.round(rating) ? "text-brass" : "text-ink/15"}
        />
      ))}
    </span>
  );
}

/** Opiniones: solo reseñas reales (src/content/reviews.ts). Si no hay, solo la valoración media. */
export function Reviews() {
  return (
    <section
      id={sections.reviews}
      aria-labelledby="reviews-title"
      className="border-y-[3px] border-double border-brass bg-paper-deep section-y"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            id="reviews-title"
            number="04"
            eyebrow="Opiniones"
            title="Lo cuentan mejor los clientes."
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="font-display text-[clamp(5rem,3rem+8vw,8.5rem)] leading-none font-medium">
              {ratingLabel}
              <span className="sr-only"> de 5</span>
            </p>
            <div>
              <Stars rating={business.rating.value} size={26} />
              <p className="mt-2 text-lead">
                <strong className="font-semibold">{business.rating.count} reseñas</strong> en{" "}
                {business.rating.source}
              </p>
            </div>
          </div>

          {reviews.length > 0 && (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={`${review.author}-${review.date}`} review={review} />
              ))}
            </ul>
          )}

          <ButtonLink href={business.mapsUrl} variant="secondary" className="mt-10">
            Leer las reseñas en Google Maps
            <ExternalIcon />
            <span className="sr-only">(se abre Google Maps)</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [year, month] = review.date.split("-").map(Number);
  const date = dateFormatter.format(new Date(Date.UTC(year, month - 1, 1)));

  return (
    <li className="flex flex-col rounded-sm bg-paper p-6">
      <Stars rating={review.rating} />
      <span className="sr-only">{review.rating} de 5 estrellas</span>
      <blockquote className="mt-4 flex-1 text-pretty">
        <p>«{review.text}»</p>
      </blockquote>
      <p className="mt-5 text-sm text-ink-muted">
        <span className="font-semibold text-ink">{review.author}</span> · {date} ·{" "}
        {review.url ? (
          <a href={review.url} className="underline underline-offset-4 hover:text-ink">
            Google Maps
          </a>
        ) : (
          "Google Maps"
        )}
      </p>
    </li>
  );
}
