/**
 * Huecos para fotos propias. Mientras `src` esté vacío se muestra un marco con el texto «Foto
 * pendiente». Para añadir una: copia la imagen a `public/fotos/` y pon aquí su ruta
 * (por ejemplo `src: "/fotos/fachada.webp"`), con su ancho y alto reales en píxeles.
 */

export type Photo = {
  /** Qué foto va en el hueco (se muestra mientras falta). */
  label: string;
  alt: string;
  src?: string;
  width: number;
  height: number;
};

export const photos = {
  hero: {
    label: "Fachada o interior del local",
    alt: "Interior de Peluquería Arriaga",
    width: 1200,
    height: 1500,
  },
  about: {
    label: "Julián cortando el pelo",
    alt: "Julián cortando el pelo a un cliente",
    width: 1200,
    height: 900,
  },
} satisfies Record<string, Photo>;
