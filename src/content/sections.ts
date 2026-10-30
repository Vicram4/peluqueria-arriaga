/**
 * Textos de cada sección: titulares, entradillas y avisos. Los datos (servicios, horario,
 * valores…) están en sus propios archivos de esta carpeta.
 */

import { business } from "@/content/business";

export type SectionCopy = {
  number: string;
  eyebrow: string;
  title: string;
  /** Parte del titular que se resalta en granate y cursiva (debe aparecer tal cual en `title`). */
  highlight?: string;
  intro?: string;
};

export const heroCopy = {
  eyebrow: `${business.audience} · ${business.address.city}`,
  title: "Tu peluquería de barrio, de toda la vida.",
  highlight: "de toda la vida",
  lead: `En ${business.name} se corta el pelo con oficio y sin prisas, con el trato cercano de ${business.owner}. Clientes de siempre y los más pequeños de la casa, en la calle Padre Flores.`,
};

export const servicesCopy = {
  number: "02",
  eyebrow: "Servicios",
  title: "Lo de siempre, bien hecho.",
  intro: `Cortes para ${business.audience.toLowerCase()}, barba y color. Pregunta sin compromiso: el precio te lo dicen al momento.`,
  cta: "Preguntar por teléfono",
} satisfies SectionCopy & Record<string, string>;

export const aboutCopy = {
  number: "03",
  eyebrow: "Nosotros",
  title: "Lo que dicen los de siempre.",
  highlight: "siempre",
  intro: `Quien deja una reseña de ${business.name} suele coincidir en estas cuatro cosas.`,
} satisfies SectionCopy;

export const reviewsCopy = {
  number: "04",
  eyebrow: "Opiniones",
  title: "Lo cuentan mejor los clientes.",
  cta: "Leer las reseñas en Google Maps",
} satisfies SectionCopy & Record<string, string>;

export const bookingCopy = {
  number: "05",
  eyebrow: "Pide cita",
  title: "Elige día y franja.",
  intro: "Deja tu nombre y teléfono, y la peluquería te llama para cerrar la hora exacta.",
  callPrompt: "¿Prefieres llamar?",
} satisfies SectionCopy & Record<string, string>;

export const hoursCopy = {
  number: "06",
  eyebrow: "Horario y dirección",
  title: "Dónde y cuándo.",
  hoursTitle: "Horario",
  addressTitle: "Dirección",
  directions: "Cómo llegar",
} satisfies SectionCopy & Record<string, string>;

export const footerCopy = {
  disclaimer:
    "Los datos de contacto y el horario son públicos; los precios y algunos textos están pendientes de confirmar. El formulario de cita es una demostración y no envía datos.",
  credit: "Diseño y desarrollo:",
};

export const notFoundCopy = {
  title: "Esta página no existe.",
  text: "Puede que el enlace esté mal escrito. Toda la información está en la página principal.",
  cta: "Volver al inicio",
};
