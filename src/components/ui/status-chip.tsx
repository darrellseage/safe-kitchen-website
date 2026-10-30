import { statusLabels, type FeatureStatus } from "@/config/features";
import { cn } from "@/lib/cn";

const tones: Record<FeatureStatus, string> = {
  available: "text-herb-400 border-herb-400/40",
  in_development: "text-herb-400 border-herb-400/35",
  planned: "text-planned border-planned/35",
  exploring: "text-exploring border-exploring/35",
};

export function StatusChip({ status, className }: { status: FeatureStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[13px] leading-none font-semibold whitespace-nowrap",
        tones[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}
