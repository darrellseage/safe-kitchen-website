import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section backgrounds, all from the app's palette. Alternating them blocks
 * the page into clear sections while keeping it light.
 */
const tones = {
  white: "bg-surface-raised",
  warm: "bg-surface",
  /** Lightest green (brand-50). */
  mint: "bg-brand-50",
  /** Stronger light green (brand-100). */
  sage: "bg-brand-100",
  /** Soft teal-green (accent-100). */
  seafoam: "bg-accent-100",
  /** Kept for older call sites: same as mint. */
  green: "bg-brand-50",
} as const;

export type SectionTone = keyof typeof tones;

/** Page section with the site's width, spacing and background rhythm. */
export function Section({
  id,
  labelledBy,
  tone = "white",
  className,
  children,
}: {
  id?: string;
  labelledBy: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 md:py-28", tones[tone], className)}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">{children}</div>
    </section>
  );
}
