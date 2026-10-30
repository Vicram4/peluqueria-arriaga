import { PhotoSlot } from "@/components/ui/photo-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { sections } from "@/content/navigation";
import { photos } from "@/content/photos";
import { aboutCopy } from "@/content/sections";
import { values } from "@/content/values";

const numerals = ["I", "II", "III", "IV", "V", "VI"] as const;

export function About() {
  return (
    <section id={sections.about} aria-labelledby="about-title" className="section-y">
      <div className="shell">
        <SectionHeading id="about-title" copy={aboutCopy} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-20">
          <PhotoSlot photo={photos.about} className="-rotate-1" />

          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="group reveal border-t-[3px] border-double border-brass pt-5 transition-colors duration-300 hover:border-maroon"
              >
                <p
                  aria-hidden="true"
                  className="inline-block font-display text-3xl text-maroon motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-(--ease-spring) motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
                >
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
