/**
 * Reseñas reales de clientes. NO inventar: pega aquí solo reseñas publicadas, copiadas tal cual,
 * con su autor (o inicial) y la fecha. Mientras la lista esté vacía, la sección muestra solo la
 * valoración media con un enlace a Google Maps.
 *
 * Ejemplo de formato:
 * {
 *   author: "María G.",
 *   date: "2026-05",
 *   rating: 5,
 *   text: "Texto literal de la reseña.",
 *   url: "https://maps.app.goo.gl/…", // opcional: enlace a la reseña
 * },
 */

export type Review = {
  author: string;
  /** Año y mes, «AAAA-MM». */
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  url?: string;
};

export const reviews: readonly Review[] = [];
