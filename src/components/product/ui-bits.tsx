import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Pieces of the app's own light interface, used inside product mock-ups. */

export function SavedPill({ children = "Saved" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ui-success">
      <span className="size-1.5 rounded-full bg-ui-success" aria-hidden="true" />
      {children}
    </span>
  );
}

export function ScreenHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-ui-line bg-ui-raised px-4 py-3">
      <div>
        <p className="text-base font-bold">{title}</p>
        {subtitle ? <p className="text-[13px] font-medium text-ui-muted">{subtitle}</p> : null}
      </div>
      {right ?? <SavedPill />}
    </div>
  );
}

export type TaskState = "done" | "now" | "todo";

export function TaskRow({
  title,
  meta,
  right,
  state,
  compact,
}: {
  title: string;
  meta: string;
  right: string;
  state: TaskState;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border bg-ui-raised",
        compact ? "min-h-12 px-2.5 py-2" : "min-h-15 px-3 py-2.5",
        state === "now" ? "animate-glow border-ui-teal shadow-[0_0_0_3px_rgb(15_124_122/0.14)]" : "border-ui-line",
      )}
    >
      <span
        className={cn(
          "grid place-items-center rounded-full border-2",
          compact ? "size-7" : "size-8",
          state === "done" ? "border-ui-success bg-ui-success text-white" : state === "now" ? "border-ui-teal" : "border-ui-control",
        )}
        aria-hidden="true"
      >
        {state === "done" ? <Check className="size-4" strokeWidth={3} /> : null}
      </span>
      <span className="min-w-0">
        <span className="block leading-tight font-semibold">{title}</span>
        <span className="block text-[12.5px] text-ui-muted">{meta}</span>
      </span>
      <span className={cn("text-end text-[13px] font-semibold tabular", state === "now" ? "text-ui-teal" : "text-ui-muted")}>
        {right}
      </span>
    </div>
  );
}

export type RecordItem = { title: string; value: string; meta: string; missing?: boolean };

export function RecordRow({ item }: { item: RecordItem }) {
  return (
    <div className={cn("grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 px-4 py-3 text-sm", item.missing && "bg-ui-warning-100/60")}>
      <span className="font-semibold">{item.title}</span>
      <span className={cn("font-bold tabular", item.missing ? "text-ui-warning" : "text-ui-ink")}>{item.value}</span>
      <span className="col-span-2 text-[12.5px] text-ui-muted">{item.meta}</span>
    </div>
  );
}
