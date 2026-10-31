"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, Download, KeyRound, MapPin, QrCode } from "lucide-react";
import { useRef, useState } from "react";
import { DeviceFrame } from "@/components/ui/device-frame";
import { attendanceToday, weekHours } from "@/content/demo-data";
import { cn } from "@/lib/cn";
import { hoursDifference, minutesLate } from "@/lib/demos/attendance";

type Method = "location" | "qr" | "pin";
type Phase = "ready" | "checking" | "in" | "failed";

const methods: Array<{ id: Method; label: string; icon: typeof MapPin; checking: string; note: string; via: string }> = [
  {
    id: "location",
    label: "Location",
    icon: MapPin,
    checking: "Checking you’re at The Olive Tree…",
    note: "Your location is checked only at the moment you clock in. No tracking during your shift.",
    via: "location confirmed",
  },
  {
    id: "qr",
    label: "QR code",
    icon: QrCode,
    checking: "Checking the QR code…",
    note: "Scan the code on the kitchen screen. It changes regularly, so a photo of it won’t work later.",
    via: "QR code",
  },
  {
    id: "pin",
    label: "Tablet PIN",
    icon: KeyRound,
    checking: "Checking your PIN…",
    note: "No location needed. Clock in on the shared kitchen tablet with your own PIN.",
    via: "kitchen tablet PIN",
  },
];

/**
 * Clock-In & Attendance demo (planned feature), following the app's planned
 * design (DESIGN_SYSTEM.md §9.6): one clear flow, calm failure states, and a
 * no-location alternative. Nothing here is a real location check.
 */
export function ClockInDemo() {
  const reduce = useReducedMotion();
  const [method, setMethod] = useState<Method>("location");
  const [phase, setPhase] = useState<Phase>("ready");
  const [exported, setExported] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const current = methods.find((m) => m.id === method)!;
  const clockedAt = "16:56";

  const clockIn = (succeed = true) => {
    window.clearTimeout(timer.current);
    setPhase("checking");
    timer.current = window.setTimeout(() => setPhase(succeed ? "in" : "failed"), reduce ? 0 : 1100);
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[320px_1fr]">
      <DeviceFrame kind="phone" className="mx-auto w-full max-w-[320px]">
        <div className="grid min-h-[500px] content-start gap-4 px-4 py-6">
          <span className="w-fit rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-bold text-ink-muted">Illustrative demo · planned feature</span>
          <div role="group" aria-label="How to clock in" className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-surface-raised p-1">
            {methods.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={method === m.id}
                disabled={phase === "checking"}
                onClick={() => {
                  setMethod(m.id);
                  if (phase !== "in") setPhase("ready");
                }}
                className={cn(
                  "grid min-h-14 justify-items-center gap-0.5 rounded-lg text-[12.5px] font-bold transition-colors",
                  method === m.id ? "bg-accent-100 text-accent-700" : "text-ink-muted hover:text-ink",
                )}
              >
                <m.icon className="size-4" aria-hidden="true" />
                {m.label}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-line bg-surface-raised p-4">
            <p className="text-[13px] text-ink-muted">Today’s shift · Jo</p>
            <p className="text-xl font-extrabold tabular">17:00–23:00</p>
            <p className="text-[13px] text-ink-muted">The Olive Tree · Main kitchen</p>
          </div>

          {phase === "in" ? (
            <button type="button" onClick={() => setPhase("ready")} className="min-h-16 rounded-2xl border-[1.5px] border-line bg-surface-raised text-lg font-extrabold hover:border-control-border">
              Clock out
            </button>
          ) : (
            <button
              type="button"
              onClick={() => clockIn(true)}
              disabled={phase === "checking"}
              className="min-h-16 rounded-2xl bg-accent-600 text-lg font-extrabold text-white hover:bg-accent-700 disabled:opacity-60"
            >
              Clock in
            </button>
          )}

          <div aria-live="polite" className="grid gap-2">
            {phase === "checking" ? (
              <p className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-raised p-3 text-sm text-ink-muted">
                <span className="size-4 flex-none animate-spin rounded-full border-2 border-accent-100 border-t-accent-600" aria-hidden="true" />
                {current.checking}
              </p>
            ) : null}
            {phase === "in" ? (
              <p className="flex gap-2.5 rounded-xl bg-success-100 p-3 text-sm text-ink">
                <Check className="mt-0.5 size-4 flex-none text-success" aria-hidden="true" />
                <span>
                  <b>Clocked in · {clockedAt}</b>
                  <br />
                  Server time · {current.via}
                </span>
              </p>
            ) : null}
            {phase === "failed" ? (
              <div className="grid gap-2 rounded-xl bg-warning-100 p-3 text-sm text-ink">
                <p>
                  <b>We couldn’t confirm your location.</b> This can happen indoors or with a weak signal.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => clockIn(true)} className="min-h-11 rounded-full bg-accent-600 px-4 font-bold text-white">
                    Try again
                  </button>
                  <button type="button" onClick={() => {
                      setMethod("pin");
                      setPhase("ready");
                    }} className="min-h-11 rounded-full border-[1.5px] border-line bg-surface-raised px-4 font-bold">
                    Use the tablet PIN
                  </button>
                </div>
                <p className="text-[12.5px] text-ink-muted">Or ask your manager to approve an exception.</p>
              </div>
            ) : null}
          </div>

          <p className="text-[12.5px] text-ink-muted">{current.note}</p>
          {method === "location" && phase === "ready" ? (
            <button type="button" onClick={() => clockIn(false)} className="min-h-11 justify-self-start text-[13px] font-bold text-accent-600 underline underline-offset-2">
              What if my location can’t be confirmed?
            </button>
          ) : null}
        </div>
      </DeviceFrame>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4">
        <div className="rounded-2xl border border-line bg-surface-raised p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-extrabold">Who’s in · Main kitchen</p>
            <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-bold text-ink-muted">Manager view · sample data</span>
          </div>
          <ul className="mt-3 grid gap-2">
            {attendanceToday.map((a) => {
              const late = minutesLate(a.shift, a.actual);
              return (
                <li key={a.person} className="flex flex-wrap justify-between gap-x-3 gap-y-1 rounded-xl border border-line px-3.5 py-2.5 text-[15px]">
                  <span>
                    {a.person} · {a.shift} shift
                  </span>
                  <span className={cn("font-bold tabular", late ? "text-warning-ink" : "text-success")}>
                    {late ? `In ${a.actual} · ${late} min late` : `✓ In ${a.actual}`}
                  </span>
                </li>
              );
            })}
            <motion.li
              key={phase === "in" ? "in" : "out"}
              initial={reduce || phase !== "in" ? false : { scale: 0.97, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn(
                "flex flex-wrap justify-between gap-x-3 gap-y-1 rounded-xl border px-3.5 py-2.5 text-[15px]",
                phase === "in" ? "border-accent-600 shadow-[0_0_0_3px_var(--color-accent-100)]" : "border-line",
              )}
            >
              <span>Jo · 17:00 shift</span>
              <span className={cn("font-bold tabular", phase === "in" ? "text-success" : "text-ink-muted")}>
                {phase === "in" ? `✓ In ${clockedAt}` : "Not clocked in yet"}
              </span>
            </motion.li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-surface-raised p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-extrabold">Rota vs actual · this week</p>
            <button
              type="button"
              onClick={() => setExported(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-line px-4 text-sm font-bold hover:border-control-border"
            >
              <Download className="size-4" aria-hidden="true" />
              Export timesheet
            </button>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[380px] border-collapse text-[14.5px]">
              <thead>
                <tr className="text-xs tracking-[0.06em] text-ink-muted uppercase">
                  {["Person", "Rota", "Actual", "Difference"].map((h) => (
                    <th key={h} className="border-b border-line px-1 py-2 text-start font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekHours.map((w) => (
                  <tr key={w.person}>
                    <td className="border-b border-line px-1 py-2.5">{w.person}</td>
                    <td className="border-b border-line px-1 py-2.5 tabular">{w.scheduled.toFixed(1)} h</td>
                    <td className="border-b border-line px-1 py-2.5 tabular">{w.actual.toFixed(1)} h</td>
                    <td className={cn("border-b border-line px-1 py-2.5 tabular", w.late ? "text-warning-ink" : false)}>
                      {hoursDifference(w.scheduled, w.actual)}
                      {w.late ? ` · ${w.late} late` : ""}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-1 py-2.5">Jo</td>
                  <td className="px-1 py-2.5 tabular">18.0 h</td>
                  <td className="px-1 py-2.5 tabular">12.0 h</td>
                  <td className="px-1 py-2.5 text-ink-muted">{phase === "in" ? "Shift in progress" : "Next shift 17:00"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p aria-live="polite" className="mt-2 min-h-5 text-[13px] text-ink-muted">
            {exported ? "Timesheet ready as Excel or CSV for your payroll (demo: nothing was downloaded)." : "Managers can correct disputed or missing clock-ins. Every change is kept."}
          </p>
        </div>
      </div>
    </div>
  );
}
