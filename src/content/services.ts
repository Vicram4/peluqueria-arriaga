/**
 * Servicios. `price: null` se muestra como «Consultar».
 * PENDIENTE: confirmar la lista y los precios con el negocio.
 */

export type Service = {
  id: string;
  name: string;
  description: string;
  /** Precio orientativo ya formateado («12 €», «desde 30 €»…) o `null` para «Consultar». */
  price: string | null;
};

export const services: readonly Service[] = [
  {
    id: "corte-caballero",
    name: "Corte de caballero",
    description: "A tijera o a máquina, clásico o actual: el corte que te sienta bien.",
    price: null,
  },
  {
    id: "corte-infantil",
    name: "Corte infantil",
    description: "Con paciencia y sin prisas, para que ir a la peluquería no dé miedo.",
    price: null,
  },
  {
    id: "barba",
    name: "Arreglo de barba",
    description: "Perfilado y rebaje para mantener la forma entre corte y corte.",
    price: null,
  },
  {
    id: "lavado-peinado",
    name: "Lavado y peinado",
    description: "Lavado y peinado para salir listo.",
    price: null,
  },
  {
    id: "color",
    name: "Color",
    description: "Tinte y cobertura de canas, con un resultado natural.",
    price: null,
  },
];

export const priceNote = "Precios orientativos, pendientes de confirmar con la peluquería.";
