import Image from "next/image";
import type { Photo } from "@/content/photos";

/**
 * Hueco para una foto propia. Sin `src` muestra un marco de espera con la proporción final,
 * así al añadir la foto no se mueve nada.
 */
export function PhotoSlot({ photo, className = "" }: { photo: Photo; className?: string }) {
  const frame = `relative overflow-hidden rounded-sm border-[3px] border-double border-brass ${className}`;
  const aspectRatio = `${photo.width} / ${photo.height}`;

  if (photo.src) {
    return (
      <div className={frame} style={{ aspectRatio }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="h-full w-full object-cover"
          sizes="(min-width: 64rem) 40vw, 100vw"
        />
      </div>
    );
  }

  return (
    <div className={`${frame} grid place-items-center bg-paper-deep`} style={{ aspectRatio }}>
      {/* Trama diagonal muy suave: se intuye que ahí irá algo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:repeating-linear-gradient(-45deg,var(--color-ink)_0_1px,transparent_1px_12px)] opacity-[0.08]"
      />
      <p className="relative px-6 text-center">
        <span className="block label text-brass-ink">Foto pendiente</span>
        <span className="mt-1 block font-display text-title text-ink-muted">{photo.label}</span>
      </p>
    </div>
  );
}
