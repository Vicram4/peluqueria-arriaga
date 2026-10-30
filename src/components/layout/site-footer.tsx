import { StripeRule } from "@/components/ui/barber-pole";
import { business } from "@/content/business";
import { concept } from "@/content/concept";
import { navItems } from "@/content/navigation";
import { footerCopy } from "@/content/sections";
import { ui } from "@/content/ui";

export function SiteFooter() {
  const { address } = business;

  return (
    <footer className="on-dark bg-ink text-paper">
      <StripeRule className="h-2" />
      {/* Margen inferior extra en móvil para que la barra de acciones no tape el pie. */}
      <div className="shell grid gap-10 pt-14 pb-28 sm:pb-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-title font-semibold">{business.name}</p>
          <p className="mt-2 text-paper/85">
            {business.audience} · {address.city}
          </p>
        </div>

        <div>
          <h2 className="label text-brass-light">{ui.footer.where}</h2>
          <address className="mt-3 leading-relaxed text-paper/85 not-italic">
            {address.street}
            <br />
            {address.postalCode} {address.city} ({address.region})
            <br />
            <a
              href={business.phone.href}
              className="link-grow font-semibold text-paper tabular-nums"
            >
              {business.phone.display}
            </a>
          </address>
        </div>

        <nav aria-label={ui.nav.footer}>
          <h2 className="label text-brass-light">{ui.footer.sections}</h2>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="link-grow text-paper/85 transition-colors hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-paper/20 pt-8 text-sm leading-relaxed text-paper/85 md:col-span-full">
          <p>
            <strong className="font-semibold text-brass-light">{ui.footer.notice} </strong>
            {concept.notice} {footerCopy.disclaimer}
          </p>
          <p className="mt-3">
            {footerCopy.credit}{" "}
            <a
              href={concept.author.url}
              className="font-semibold text-paper underline underline-offset-4 hover:text-brass-light"
            >
              {concept.author.name} · {concept.author.urlLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
