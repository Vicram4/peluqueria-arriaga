import { Fraunces, Inter } from "next/font/google";

// next/font descarga las fuentes al compilar y las sirve desde el propio dominio:
// sin peticiones a Google y sin saltos de diseño mientras cargan.

/** Titulares: serif de rótulo antiguo con ejes de suavidad (SOFT) y tamaño óptico (opsz). */
const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

/** Texto: sans muy legible en pantallas pequeñas. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const fontVariables = [display.variable, sans.variable].join(" ");
