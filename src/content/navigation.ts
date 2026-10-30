/** Anclas de la página única, en el orden en que aparecen. */

export const sections = {
  home: "inicio",
  services: "servicios",
  about: "nosotros",
  reviews: "opiniones",
  booking: "cita",
  hours: "horario",
} as const;

export const navItems = [
  { id: sections.services, label: "Servicios" },
  { id: sections.about, label: "Nosotros" },
  { id: sections.reviews, label: "Opiniones" },
  { id: sections.hours, label: "Horario" },
] as const;
