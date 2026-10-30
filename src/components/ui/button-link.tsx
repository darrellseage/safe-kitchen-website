import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-herb-400 text-forest-950 hover:bg-herb-300",
  ghost: "border border-night-600 text-fog-50 hover:border-fog-400 hover:bg-white/5",
  light: "bg-fog-50 text-night-950 hover:bg-white",
};

export const buttonClasses = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition-colors duration-200",
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
