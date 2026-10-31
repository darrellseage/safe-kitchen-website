"use client";

import { Tabs } from "radix-ui";
import { StatusChip } from "@/components/ui/status-chip";
import { inspectionTabs } from "@/content/demo-data";

/**
 * Inspection Mode (app DECISIONS.md D-040 and D-065): every record the EHO may
 * ask for, one tap apart. Each tab carries its own honest status label.
 */
export function InspectionModeDemo() {
  return (
    <Tabs.Root defaultValue="records" className="overflow-hidden rounded-2xl border border-line bg-surface-raised text-sm shadow-raised">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink px-5 pt-5 pb-3 sm:px-7">
        <p className="text-xl font-extrabold">Inspection Mode · Main kitchen</p>
        <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-bold text-ink-muted">Illustrative demo · sample data</span>
      </div>
      <Tabs.List aria-label="Inspection records" className="flex gap-1 overflow-x-auto border-b border-line bg-surface px-3 py-2 sm:px-5">
        {inspectionTabs.map((t) => (
          <Tabs.Trigger
            key={t.id}
            value={t.id}
            className="min-h-11 flex-none rounded-full px-4 font-bold whitespace-nowrap text-ink-muted transition-colors hover:text-ink data-[state=active]:bg-surface-raised data-[state=active]:text-ink data-[state=active]:shadow-card"
          >
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {inspectionTabs.map((t) => (
        <Tabs.Content key={t.id} value={t.id} className="grid gap-4 p-5 sm:p-7">
          <StatusChip feature={t.status} />
          {t.attention.length ? (
            <div className="rounded-lg border border-warning/40 bg-warning-100/70 p-3">
              <p className="text-[13px] font-bold tracking-[0.06em] uppercase">Needs attention</p>
              <ul className="mt-1 list-disc ps-5">
                {t.attention.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-[13.5px]">
              <thead>
                <tr className="text-xs tracking-[0.06em] text-ink-muted uppercase">
                  {t.head.map((h) => (
                    <th key={h} className="border-b border-line px-1 py-1.5 text-start font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r.a + r.b}>
                    <td className="border-b border-line px-1 py-2 tabular">{r.a}</td>
                    <td className="border-b border-line px-1 py-2">{r.b}</td>
                    <td className="border-b border-line px-1 py-2">{r.c}</td>
                    <td className="border-b border-line px-1 py-2">
                      {"corrected" in r && r.corrected ? (
                        <>
                          <s className="text-ink-muted">Entered by mistake</s> · corrected
                        </>
                      ) : (
                        r.d
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="flex flex-wrap justify-between gap-2 text-[12.5px] text-ink-muted">
            <span>Show on screen or print</span>
            <span>Save as one PDF</span>
          </p>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
