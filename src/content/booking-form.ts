/** Textos del formulario de cita (maqueta: no envía datos). */

export const bookingFormCopy = {
  demoNotice: {
    lead: "Demostración:",
    text: "este formulario no envía ni guarda ningún dato.",
  },
  fields: {
    name: "Nombre",
    phone: "Teléfono",
    service: "Servicio",
    servicePlaceholder: "Elige un servicio",
    day: "Día",
    dayHint: "Próximos días con horario. Los domingos está cerrado.",
    dayLoading: "Calculando los próximos días…",
    today: "Hoy",
    slot: "Franja",
    slotUnavailable: "No disponible",
  },
  slotHints: {
    noDay: "Elige primero un día. Los sábados solo hay horario de mañana.",
    saturday: "Los sábados solo hay horario de mañana.",
    onlyOneLeft: (slot: string) => `Hoy solo queda la franja de ${slot.toLowerCase()}.`,
    default: "Te llamaremos para concretar la hora exacta.",
  },
  errors: {
    name: "Escribe tu nombre.",
    phone: "Escribe un teléfono español de 9 cifras, por ejemplo 600 123 456.",
    service: "Elige un servicio.",
    day: "Elige un día.",
    slot: "Elige mañana o tarde.",
    slotUnavailable: "Esa franja no está disponible ese día.",
  },
  submit: "Pedir cita (demo)",
  confirmation: {
    title: (name: string) => `Así quedaría tu solicitud, ${name}`,
    service: "Servicio",
    day: "Día",
    slot: "Franja",
    demoLead: "Esto es una demostración: no se ha enviado nada.",
    demoText:
      "Tus datos no han salido de tu navegador. En la web real, aquí la peluquería recibiría la solicitud y te llamaría para confirmarla.",
    reset: "Volver a empezar",
  },
};
