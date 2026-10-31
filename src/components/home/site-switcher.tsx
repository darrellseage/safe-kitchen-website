"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { siteSnapshots } from "@/content/demo-data";
import { cn } from "@/lib/cn";

/** A manager switching between sites; the numbers change with the site. Sample data. */
export function SiteSwitcher() {
  const reduce = useReducedMotion();
  const [siteId, setSiteId] = useState<(typeof siteSnapshots)[number]["id"]>("main");
  const site = siteSnapshots.find((s) => s.id === siteId)!;
  const tiles = [
    { label: "Checks today", value: site.checks },
    { label: "On shift now", value: String(site.onShift) },
    { label: "Needs attention", value: String(site.attention), warn: site.attention > 0 },
    { label: "Orders", value: site.orders },
  ];
  return (
    <div className="rounded-3xl border border-line bg-surface-raised p-5 shadow-raised sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-lg font-extrabold">Your sites</p>
        <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-bold text-ink-muted">Sample data</span>
      </div>
      <div role="group" aria-label="Choose a site" className="mt-4 flex flex-wrap gap-1 rounded-2xl border border-line bg-surface p-1">
        {siteSnapshots.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === siteId}
            onClick={() => setSiteId(s.id)}
            className={cn(
              "min-h-11 flex-1 rounded-xl px-3 text-sm font-bold whitespace-nowrap transition-colors",
              s.id === siteId ? "bg-surface-raised text-ink shadow-card" : "text-ink-muted hover:text-ink",
            )}
          >
            {s.name}
          </button>
        ))}
      </div>
      <motion.dl
        key={site.id}
        initial={reduce ? false : { opacity: 0.2, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 grid grid-cols-2 gap-2.5"
        aria-live="polite"
      >
        {tiles.map((t) => (
          <div key={t.label} className={cn("rounded-xl p-3.5", t.warn ? "bg-warning-100" : "bg-surface")}>
            <dd className="text-xl font-extrabold tabular">{t.value}</dd>
            <dt className="text-[13px] text-ink-muted">{t.label}</dt>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}
