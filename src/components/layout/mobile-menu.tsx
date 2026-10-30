"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/button-link";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";
import { business } from "@/content/business";
import { navItems, sections } from "@/content/navigation";
import { ui } from "@/content/ui";

/** Menú desplegable para móvil y tableta. Se cierra con Esc, al pulsar fuera o al elegir un enlace. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-12 items-center justify-center rounded-full border-2 border-ink/15 transition-colors hover:border-ink"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        <span className="sr-only">{open ? ui.nav.closeMenu : ui.nav.openMenu}</span>
      </button>

      <nav
        id="mobile-menu"
        aria-label={ui.nav.main}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b-[3px] border-double border-brass bg-paper shadow-lg motion-safe:transition-[opacity,translate] motion-safe:duration-300 motion-safe:ease-(--ease-out-quart) starting:opacity-0 motion-safe:starting:-translate-y-3"
      >
        <ul className="shell flex flex-col py-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={close}
                className="flex min-h-12 items-center border-b border-ink/10 font-display text-title"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-4 grid gap-3 pb-2 sm:grid-cols-2">
            <a href={`#${sections.booking}`} onClick={close} className={buttonClasses("primary")}>
              {ui.bookCta}
            </a>
            <a href={business.phone.href} className={buttonClasses("secondary")}>
              <PhoneIcon />
              {ui.callNumber(business.phone.display)}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
