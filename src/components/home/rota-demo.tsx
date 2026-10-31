"use client";

import { whenLive } from "@/config/features";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Camera, Check, FileSpreadsheet, FileText, Image as ImageIcon, RotateCcw, Send } from "lucide-react";
import { useState } from "react";
import { DeviceFrame } from "@/components/ui/device-frame";
import { rotaDays, rotaDraft, rotaPhotoRows, rotaStaff } from "@/content/demo-data";
import { rotas } from "@/content/home";
import { cn } from "@/lib/cn";
import { confirmShift, matchPerson, peopleToNotify, reviewSummary, type RotaReview } from "@/lib/demos/rota-review";

type Step = "upload" | "reading" | "review" | "confirm" | "published";

const formats = [
  { icon: Camera, label: "Photo" },
  { icon: ImageIcon, label: "Screenshot" },
  { icon: FileText, label: "PDF" },
  { icon: FileSpreadsheet, label: "Excel or CSV" },
];

/**
 * Smart Rotas demo (planned feature). Follows the app's planned review design
 * (DESIGN_SYSTEM.md §9.5a): the import is a draft, uncertain shifts are amber
 * "Check this", unknown names must be matched, and Publish stays disabled
 * until everything is resolved.
 */
export function RotaDemo() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("upload");
  const [review, setReview] = useState<RotaReview>(rotaDraft);
  const summary = reviewSummary(review);

  const read = () => {
    setStep("reading");
    window.setTimeout(() => setStep("review"), reduce ? 0 : 1300);
  };
  const reset = () => {
    setReview(rotaDraft);
    setStep("upload");
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="grid gap-5">
        <figure className="-rotate-2 border border-paper-line bg-paper p-4 shadow-raised" aria-label="Photo of a handwritten rota">
          <table className="w-full border-collapse text-sm text-paper-pen italic">
            <thead>
              <tr>
                <th className="border border-paper-line bg-surface-sunken p-1.5" />
                {rotaDays.map((d) => (
                  <th key={d} className="border border-paper-line bg-surface-sunken p-1.5 text-start text-[12.5px] text-ink not-italic">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rotaPhotoRows.map((r) => (
                <tr key={r.name}>
                  <td className="border border-paper-line p-1.5">{r.name}</td>
                  {r.cells.map((c, i) => (
                    <td key={i} className="border border-paper-line p-1.5">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <figcaption className="mt-2 text-xs text-ink-muted not-italic">The rota on the office wall</figcaption>
        </figure>
        <ul className="flex flex-wrap gap-2" aria-label="Formats you can upload">
          {formats.map((f) => (
            <li key={f.label} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-raised px-3 py-1.5 text-sm font-semibold">
              <f.icon className="size-4 text-brand-700" aria-hidden="true" />
              {f.label}
            </li>
          ))}
        </ul>
      </div>

      <DeviceFrame label={whenLive("Illustrative demo · planned feature", "Interactive demo · sample data")}>
        <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-raised px-4 py-3">
          <div>
            <p className="font-bold">{step === "published" ? "Rota · week of 3 Nov" : "Draft from your photo"}</p>
            <p className="text-[13px] text-ink-muted">Main kitchen</p>
          </div>
          {step !== "upload" ? (
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-ink-muted hover:text-ink">
              <RotateCcw className="size-4" aria-hidden="true" />
              Start again
            </button>
          ) : null}
        </div>

        <div className="min-h-[360px] p-4" aria-live="polite">
          {step === "upload" ? (
            <div className="grid min-h-[330px] place-items-center text-center">
              <div className="grid justify-items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-accent-100 text-accent-700">
                  <Camera className="size-7" aria-hidden="true" />
                </span>
                <p className="max-w-[30ch] text-ink-muted">Snap the rota on the wall, or upload the file you already use.</p>
                <button type="button" onClick={read} className="min-h-13 rounded-full bg-accent-600 px-6 font-bold text-white hover:bg-accent-700">
                  Use this photo
                </button>
              </div>
            </div>
          ) : null}

          {step === "reading" ? (
            <div className="grid min-h-[330px] place-items-center text-center">
              <div className="grid justify-items-center gap-3">
                <span className="size-8 animate-spin rounded-full border-[3px] border-accent-100 border-t-accent-600" aria-hidden="true" />
                <p className="font-semibold">Reading your rota…</p>
              </div>
            </div>
          ) : null}

          {step === "review" || step === "confirm" || step === "published" ? (
            <div className="grid gap-4">
              {step !== "published" ? (
                <div className="flex flex-wrap gap-2 text-[13.5px] font-semibold">
                  <span className="rounded-full border border-line bg-surface-raised px-3 py-1">{summary.found} shifts found</span>
                  <span className={cn("rounded-full px-3 py-1", summary.toCheck ? "bg-warning-100 text-warning-ink" : "bg-success-100 text-success")}>
                    {summary.toCheck ? `${summary.toCheck} to check` : "All shifts checked"}
                  </span>
                  <span className={cn("rounded-full px-3 py-1", summary.toMatch ? "bg-warning-100 text-warning-ink" : "bg-success-100 text-success")}>
                    {summary.toMatch ? `${summary.toMatch} person to match` : "Everyone matched"}
                  </span>
                </div>
              ) : null}

              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] border-separate border-spacing-1 text-[13px]">
                  <thead>
                    <tr>
                      <th className="w-28" />
                      {rotaDays.map((d) => (
                        <th key={d} className="px-1 text-start text-xs font-bold text-ink-muted">
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...new Set(review.shifts.map((s) => s.person))].map((person, row) => (
                      <tr key={row}>
                        <th className="pe-1 text-start font-bold">
                          {review.unmatched.includes(person) ? (
                            <PersonMatcher readName={person} onMatch={(name) => setReview((r) => matchPerson(r, person, name))} />
                          ) : (
                            person
                          )}
                        </th>
                        {rotaDays.map((day, col) => {
                          const shift = review.shifts.find((s) => s.person === person && s.day === day);
                          return (
                            <td key={day}>
                              <motion.div
                                initial={reduce ? false : { opacity: 0, y: -10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: reduce ? 0 : (row * 3 + col) * 0.06 }}
                              >
                                {!shift ? (
                                  <span className="block rounded-lg px-2 py-2 text-ink-subtle">Off</span>
                                ) : shift.state === "check" ? (
                                  <button
                                    type="button"
                                    onClick={() => setReview((r) => confirmShift(r, shift.id))}
                                    className="block min-h-11 w-full rounded-lg bg-warning-100 px-2 text-start font-bold text-warning-ink outline-[1.5px] outline-warning/50 outline-solid hover:bg-warning-100/70"
                                    aria-label={`Check ${person} ${day} ${shift.time}`}
                                  >
                                    Check this
                                    <span className="block text-[11.5px] font-semibold tabular">{shift.time}</span>
                                  </button>
                                ) : (
                                  <span className="block rounded-lg bg-accent-100 px-2 py-2 font-bold text-accent-700 tabular">{shift.time}</span>
                                )}
                              </motion.div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {step === "review" ? (
                <button
                  type="button"
                  disabled={!summary.canPublish}
                  onClick={() => setStep("confirm")}
                  className="inline-flex min-h-13 items-center justify-center gap-2 justify-self-start rounded-full bg-accent-600 px-6 font-bold text-white hover:bg-accent-700 disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-ink-muted"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Publish rota
                </button>
              ) : null}

              <AnimatePresence>
                {step === "confirm" ? (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-3 rounded-2xl border border-line bg-surface-raised p-4 shadow-raised"
                    role="dialog"
                    aria-label="Publish rota"
                  >
                    <p className="font-bold">Publish and notify {peopleToNotify(review).length} staff?</p>
                    <p className="text-sm text-ink-muted">{peopleToNotify(review).join(", ")} will be told their shifts are ready.</p>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => setStep("published")} className="min-h-12 rounded-full bg-accent-600 px-5 font-bold text-white hover:bg-accent-700">
                        Publish and notify
                      </button>
                      <button type="button" onClick={() => setStep("review")} className="min-h-12 rounded-full border-[1.5px] border-line px-5 font-bold hover:border-control-border">
                        Not yet
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {step === "published" ? (
                <p className="flex gap-2.5 rounded-xl bg-success-100 p-3 text-sm text-ink">
                  <Check className="mt-0.5 size-4 flex-none text-success" aria-hidden="true" />
                  <span>
                    <b>Published.</b> {peopleToNotify(review).length} staff notified (demo). They can see their shifts on their phones.
                  </span>
                </p>
              ) : (
                <p className="text-[13px] text-ink-muted">{rotas.note}</p>
              )}
            </div>
          ) : null}
        </div>
      </DeviceFrame>
    </div>
  );
}

/** "Who is this?" for a name the import couldn't match. Never guessed automatically. */
function PersonMatcher({ readName, onMatch }: { readName: string; onMatch: (name: string) => void }) {
  return (
    <label className="grid gap-1">
      <span className="inline-flex w-fit rounded-full bg-warning-100 px-2 py-0.5 text-[12px] font-bold text-warning-ink">“{readName.replace("?", "")}”: who is this?</span>
      <select
        defaultValue=""
        onChange={(e) => e.target.value && onMatch(e.target.value)}
        className="min-h-11 rounded-lg border-[1.5px] border-control-border bg-surface-raised px-2 text-[13px] font-semibold"
      >
        <option value="" disabled>
          Choose a person
        </option>
        {rotaStaff.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </label>
  );
}
