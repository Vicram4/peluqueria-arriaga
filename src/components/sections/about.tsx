import { PhotoSlot } from "@/components/ui/photo-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/content/business";
import { sections } from "@/content/navigation";
import { photos } from "@/content/photos";
import { values } from "@/content/values";

const numerals = ["I", "II", "III", "IV", "V", "VI"] as const;

export function About() {
  return (
    <section id={sections.about} aria-labelledby="about-title" className="section-y">
      <div className="shell">
        <SectionHeading
          id="about-title"
          number="03"
          eyebrow="Nosotros"
          title={
            <>
              Lo que dicen los de <em className="text-maroon">siempre</em>.
            </>
          }
          intro={`Quien deja una reseña de ${business.name} suele coincidir en estas cuatro cosas.`}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-20">
          <PhotoSlot photo={photos.about} className="-rotate-1" />

          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {values.map((value, index) => (
              <li key={value.title} className="border-t-[3px] border-double border-brass pt-5">
                <p aria-hidden="true" className="font-display text-3xl text-maroon">
                  {numerals[index]}
                </p>
                <h3 className="mt-2 font-display text-title font-medium">{value.title}</h3>
                <p className="mt-2 text-pretty text-ink-muted">{value.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
