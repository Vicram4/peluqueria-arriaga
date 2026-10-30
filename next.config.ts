import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Web 100 % estática (carpeta `out/`): sin servidor, se publica gratis en Vercel.
  output: "export",
  // Sin servidor no hay optimizador de imágenes: las fotos se sirven tal cual
  // (conviene subirlas ya en .webp y a un tamaño razonable).
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
