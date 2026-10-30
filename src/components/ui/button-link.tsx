import type { ComponentProps } from "react";

const variants = {
  primary: "bg-maroon text-paper hover:bg-maroon-deep",
  secondary: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink hover:bg-paper-deep",
  outlineLight: "border-2 border-paper/70 text-paper hover:bg-paper hover:text-ink",
} as const;

export type ButtonVariant = keyof typeof variants;

/** Clases de botón (mínimo 48 px de alto: cómodo con el pulgar). También para `<button>`. */
export function buttonClasses(variant: ButtonVariant = "primary") {
  return `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition-colors ${variants[variant]}`;
}

/** Enlace con aspecto de botón. */
export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return <a className={`${buttonClasses(variant)} ${className}`} {...props} />;
}
