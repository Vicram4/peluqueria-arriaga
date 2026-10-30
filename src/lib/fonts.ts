import { Fraunces, Inter } from "next/font/google";

// next/font descarga las fuentes al compilar y las sirve desde el propio dominio:
// sin peticiones a Google y sin saltos de diseño mientras cargan.

/** Titulares: serif de rótulo antiguo con tamaño óptico (opsz). */
// Sin el eje SOFT a propósito: la fuente pasa de 121 KB a 67 KB y el titular aparece antes.
const display = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
});

/** Texto: sans muy legible en pantallas pequeñas. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const fontVariables = [display.variable, sans.variable].join(" ");
