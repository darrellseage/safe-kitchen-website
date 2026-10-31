import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A product screen sitting on the page: white, hairline border, soft long shadow. */
export function DeviceFrame({
  children,
  kind = "tablet",
  label,
  className,
}: {
  children: ReactNode;
  kind?: "tablet" | "phone";
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative",
        kind === "phone" ? "rounded-[36px] bg-ink p-2.5 shadow-raised" : "rounded-3xl border border-line bg-surface-raised shadow-raised",
        className,
      )}
    >
      {label ? (
        <span className="absolute -top-3 right-5 z-10 rounded-full border border-line bg-surface-raised px-2.5 py-1 text-xs font-bold text-ink-muted shadow-card">
          {label}
        </span>
      ) : null}
      <div className={cn("overflow-hidden bg-surface text-ink", kind === "phone" ? "rounded-[28px]" : "rounded-3xl")}>{children}</div>
    </div>
  );
}
