import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  white: "bg-surface-raised",
  warm: "bg-surface",
  green: "bg-brand-50",
} as const;

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
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 md:py-28", tones[tone], className)}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">{children}</div>
    </section>
  );
}
