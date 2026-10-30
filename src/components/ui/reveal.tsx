import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades and lifts content in as it scrolls into view, using CSS scroll-driven
 * animation only. Content is always visible by default: browsers without
 * support, people who prefer reduced motion, and visits without JavaScript
 * simply see it in place.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  /** Staggers items by starting their animation slightly later (0 to 0.3). */
  delay?: number;
  y?: number;
  className?: string;
}) {
  const style = { "--reveal-y": `${y}px`, "--reveal-start": `${Math.round(delay * 100)}%` } as CSSProperties;
  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
