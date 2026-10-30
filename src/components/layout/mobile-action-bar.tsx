"use client";

import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/ui/button-link";
import { CalendarIcon, PhoneIcon } from "@/components/ui/icons";
import { business } from "@/content/business";
import { sections } from "@/content/navigation";

/**
 * Barra inferior en móvil con «Llamar» y «Pedir cita». Aparece al dejar atrás el inicio (que ya
 * tiene esos botones) y se esconde al llegar al formulario, para no duplicarlos.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [sections.home, sections.booking]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const inView = new Set<string>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target.id);
        else inView.delete(entry.target.id);
      }
      setVisible(inView.size === 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      // `inert` evita que los botones ocultos reciban el foco del teclado.
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-double border-brass bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm motion-safe:transition-transform motion-safe:duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-3">
        <a href={business.phone.href} className={buttonClasses("secondary")}>
          <PhoneIcon />
          Llamar
        </a>
        <a href={`#${sections.booking}`} className={buttonClasses("primary")}>
          <CalendarIcon />
          Pedir cita
        </a>
      </div>
    </div>
  );
}
