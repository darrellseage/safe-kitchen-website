import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Dark hardware frame around a light product screen. */
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
        "relative border border-night-600/70 bg-night-850 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.7)]",
        kind === "tablet" ? "rounded-[26px] p-3" : "rounded-[34px] p-2.5",
        className,
      )}
    >
      {label ? (
        <span className="absolute -top-3 right-5 z-10 rounded-full border border-night-600 bg-night-900 px-2.5 py-1 text-xs font-semibold text-fog-400">
          {label}
        </span>
      ) : null}
      <div
        className={cn(
          "overflow-hidden bg-ui-surface text-ui-ink",
          kind === "tablet" ? "rounded-2xl" : "rounded-[26px]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
