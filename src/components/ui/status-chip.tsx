import { featureStatus, statusLabels, type FeatureKey } from "@/config/features";
import { cn } from "@/lib/cn";

const tones = {
  available: "bg-success-100 text-success",
  in_development: "bg-brand-100 text-brand-700",
  planned: "bg-accent-100 text-accent-700",
  vision: "bg-surface-sunken text-ink-muted",
} as const;

/** Honest status label for a feature, driven by src/config/features.ts. */
export function StatusChip({ feature, className }: { feature: FeatureKey; className?: string }) {
  const status = featureStatus[feature];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-[13px] leading-none font-bold whitespace-nowrap",
        tones[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}
