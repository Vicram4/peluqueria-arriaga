/**
 * Datos del negocio. Todo lo marcado con «PENDIENTE» está por confirmar con Peluquería Arriaga
 * (lista completa en el README).
 */

const address = {
  street: "C. Padre Flores, 1",
  postalCode: "28805",
  city: "Alcalá de Henares",
  region: "Madrid",
} as const;

export const business = {
  name: "Peluquería Arriaga",
  shortName: "Arriaga",
  /** Palabra pequeña sobre el nombre en el logotipo. */
  logoPrefix: "Peluquería",
  // PENDIENTE: confirmar el nombre del dueño.
  owner: "Julián",
  audience: "Caballeros y niños",
  address,
  phone: {
    display: "912 80 80 96",
    href: "tel:+34912808096",
  },
  // Enlace de búsqueda (no hace falta el enlace exacto de la ficha). PENDIENTE: sustituirlo por
  // el enlace «Compartir» de su ficha de Google Maps cuando lo tengamos.
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Peluquería Arriaga, ${address.street}, ${address.postalCode} ${address.city}`,
  )}`,
  // Valoración pública en Google Maps (consultada en octubre de 2026). Actualizar a mano.
  rating: {
    value: 4.9,
    count: 74,
    source: "Google Maps",
  },
} as const;

/** Formato español: 4.9 → «4,9». */
export const ratingLabel = business.rating.value.toLocaleString("es-ES", {
  minimumFractionDigits: 1,
});
