import { MobileMenu } from "@/components/layout/mobile-menu";
import { StripeRule } from "@/components/ui/barber-pole";
import { ButtonLink } from "@/components/ui/button-link";
import { PhoneIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { business } from "@/content/business";
import { navItems, sections } from "@/content/navigation";

/** Cabecera fija: logotipo, navegación, teléfono y «Pedir cita». */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm">
      <div className="shell flex h-18 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="rounded-full px-3 py-2 font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phone.href}
            className="hidden items-center gap-2 rounded-full px-3 py-2 font-semibold tabular-nums md:inline-flex"
          >
            <PhoneIcon className="text-maroon" />
            {business.phone.display}
          </a>
          {/* En móvil, «Pedir cita» está en el menú y en la barra inferior. */}
          <div className="hidden sm:block">
            <ButtonLink href={`#${sections.booking}`}>Pedir cita</ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </div>
      <StripeRule className="h-1.5" />
    </header>
  );
}
