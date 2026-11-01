import type { ReactNode } from "react";
import type { FeatureKey } from "@/config/features";
import { cn } from "@/lib/cn";
import { StatusChip } from "./status-chip";

/**
 * Section heading. `accent` is the second part of the headline, shown in the
 * app's brand green. `status` adds an honest feature label above it.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  accent,
  intro,
  status,
  className,
  size = "lg",
  as: Tag = "h2",
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  intro?: ReactNode;
  status?: FeatureKey;
  className?: string;
  size?: "lg" | "xl";
  /** h3 when the heading sits inside another section. */
  as?: "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow || status ? (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {eyebrow ? <p className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{eyebrow}</p> : null}
          {status ? <StatusChip feature={status} /> : null}
        </div>
      ) : null}
      <Tag
        id={id}
        className={cn(
          "font-extrabold tracking-[-0.035em] text-ink",
          size === "xl" ? "text-[clamp(2.6rem,6vw,5rem)] leading-[0.98]" : "text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.04]",
        )}
      >
        {title}
        {accent ? <span className="text-brand-500"> {accent}</span> : null}
      </Tag>
      {intro ? <p className="mt-5 max-w-[60ch] text-lg text-ink-muted">{intro}</p> : null}
    </div>
  );
}
