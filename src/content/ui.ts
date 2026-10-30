/** Textos de interfaz que se repiten por la web: botones, menú, horario, avisos accesibles… */

export const ui = {
  skipToContent: "Saltar al contenido",
  bookCta: "Pedir cita",
  callCta: "Llamar",
  callNumber: (phone: string) => `Llamar al ${phone}`,
  /** Aviso solo para lectores de pantalla en los enlaces que abren Google Maps. */
  opensMaps: "(se abre Google Maps)",
  goHome: (name: string) => `${name}, ir al inicio`,
  nav: {
    main: "Principal",
    footer: "Pie de página",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  footer: {
    where: "Dónde",
    sections: "Secciones",
    notice: "Aviso:",
  },
  rating: {
    outOf: "de 5",
    reviews: (count: number) => `${count} reseñas`,
    onGoogle: "en Google",
    starsLabel: (rating: number) => `${rating} de 5 estrellas`,
  },
  hours: {
    caption: "Horario de apertura semanal",
    day: "Día",
    hours: "Horario",
    closed: "Cerrado",
    today: "Hoy",
  },
  openStatus: {
    open: "Abierto ahora",
    closesAt: (time: string) => `cierra a las ${time}`,
    closed: "Cerrado",
    opensAt: (when: string, time: string) => `abre ${when} a las ${time}`,
    today: "hoy",
    tomorrow: "mañana",
    onDay: (day: string) => `el ${day.toLowerCase()}`,
  },
  photoPending: "Foto pendiente",
};
