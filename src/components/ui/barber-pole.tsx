/** Poste de barbero en miniatura: el detalle de marca del logotipo. */
export function BarberPole({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pole-spin inline-block w-3 shrink-0 rounded-full barber-stripe ring-2 ring-brass ring-offset-1 ring-offset-paper ${className}`}
    />
  );
}

/** Franja diagonal a lo ancho, para separar bloques. */
export function StripeRule({ className = "h-2" }: { className?: string }) {
  return <div aria-hidden="true" className={`barber-stripe ${className}`} />;
}
