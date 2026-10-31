import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light";

// The app's button styles (DESIGN_SYSTEM.md §5.2).
const variants: Record<Variant, string> = {
  primary: "bg-accent-600 text-white hover:bg-accent-700",
  secondary: "border-[1.5px] border-line bg-surface-raised text-ink hover:border-control-border",
  ghost: "text-accent-600 hover:text-accent-700",
  /** For deep-green bands. */
  light: "bg-surface-raised text-brand-900 hover:bg-brand-50",
};

export const buttonClasses = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-6 text-base font-bold transition-colors duration-200",
    variants[variant],
    className,
  );

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
