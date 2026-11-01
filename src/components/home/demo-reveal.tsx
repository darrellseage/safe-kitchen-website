"use client";

import { ChevronDown, MonitorPlay } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Long interactive demos sit behind a "Try the demo" button on phones, so the
 * selling points, prices and calls to action stay close together. From the
 * md breakpoint up the demo is always shown and the button is hidden.
 * Nothing is removed: the demo is the same component either way.
 */
export function DemoReveal({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={cn("mt-10 md:mt-12", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border-[1.5px] border-accent-600 bg-surface-raised px-5 text-start font-bold text-accent-700 shadow-card md:hidden",
          open && "mb-4",
        )}
      >
        <span className="flex items-center gap-2.5">
          <MonitorPlay className="size-5 flex-none" aria-hidden="true" />
          {open ? "Hide the demo" : label}
        </span>
        <ChevronDown className={cn("size-5 flex-none transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <div id={id} className={cn(open ? "block" : "hidden", "md:block")}>
        {children}
      </div>
    </div>
  );
}
