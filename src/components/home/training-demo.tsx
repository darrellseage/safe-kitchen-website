"use client";

import { motion, useReducedMotion } from "motion/react";
import { Award, Bell, Check, FileText, RotateCcw, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DeviceFrame } from "@/components/ui/device-frame";
import { courseLessons, staffCertificates, trainingQuestion } from "@/content/demo-data";
import { courseName } from "@/content/home";
import { cn } from "@/lib/cn";

type Step = "add" | "invited" | "learning" | "test" | "certified";

/**
 * Staff training demo (planned feature, app DECISIONS.md D-064 and D-065).
 * The lessons and question are examples only, not the real course content.
 */
export function TrainingDemo() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("add");
  const [done, setDone] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(timer.current), []);

  const startLessons = () => {
    setStep("learning");
    if (reduce) {
      setDone(courseLessons.length);
      return;
    }
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      setDone(n);
      if (n >= courseLessons.length) window.clearInterval(timer.current);
    }, 420);
  };

  const reset = () => {
    window.clearInterval(timer.current);
    setStep("add");
    setDone(0);
    setAnswer(null);
  };

  const correct = answer === trainingQuestion.correct;
  const certified = step === "certified";

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[1fr_320px]">
      <div className="grid min-w-0 gap-4">
        <div className="rounded-3xl border border-line bg-surface-raised p-5 shadow-raised sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-lg font-extrabold">Add employee</p>
            <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-bold text-ink-muted">Manager view · illustrative demo</span>
          </div>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-line px-3.5 py-2.5">
              <dt className="text-[13px] text-ink-muted">Name</dt>
              <dd className="font-bold">Sam Patel</dd>
            </div>
            <div className="rounded-xl border border-line px-3.5 py-2.5">
              <dt className="text-[13px] text-ink-muted">Job role</dt>
              <dd className="font-bold">Kitchen assistant</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-50 p-3.5">
            <p className="text-[15px]">
              <span className="block text-[13px] font-bold text-brand-700">Recommended for this role</span>
              {courseName}
            </p>
            {step === "add" ? (
              <button type="button" onClick={() => setStep("invited")} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-600 px-5 font-bold text-white hover:bg-accent-700">
                <Send className="size-4" aria-hidden="true" />
                Send course to Sam
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-success">
                <Check className="size-4" aria-hidden="true" />
                Sent to Sam’s phone
              </span>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface-raised p-5 shadow-card sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-lg font-extrabold">Staff certificates</p>
            <span className="text-[13px] font-semibold text-ink-muted">Two taps away in Inspection Mode</span>
          </div>
          <ul className="mt-3 grid gap-2" aria-live="polite">
            {staffCertificates.map((c) => (
              <li key={c.name} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-line px-3.5 py-2.5 text-[15px]">
                <span>
                  <b>{c.name}</b> · {c.role}
                  <span className="block text-[13px] text-ink-muted">{c.detail}</span>
                </span>
                <span className={cn("text-sm font-bold", c.tone === "warn" ? "text-warning-ink" : "text-success")}>{c.status}</span>
              </li>
            ))}
            <motion.li
              key={step}
              initial={reduce || !certified ? false : { scale: 0.97, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn(
                "flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border px-3.5 py-2.5 text-[15px]",
                certified ? "border-accent-600 shadow-[0_0_0_3px_var(--color-accent-100)]" : "border-line",
              )}
            >
              <span>
                <b>Sam Patel</b> · Kitchen assistant
                <span className="block text-[13px] text-ink-muted">{courseName}</span>
              </span>
              <span className={cn("inline-flex items-center gap-1.5 text-sm font-bold", certified ? "text-success" : "text-ink-muted")}>
                {certified ? (
                  <>
                    <FileText className="size-4" aria-hidden="true" />
                    Certificate saved
                  </>
                ) : step === "add" ? (
                  "Not started"
                ) : step === "invited" ? (
                  "Invited"
                ) : (
                  `In progress · ${Math.round((done / courseLessons.length) * 100)}%`
                )}
              </span>
            </motion.li>
          </ul>
        </div>
      </div>

      <DeviceFrame kind="phone" className="mx-auto w-full max-w-[320px]">
        <div className="grid min-h-[540px] content-start gap-4 px-4 py-6" aria-live="polite">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-bold text-ink-muted">Sam’s phone · demo</span>
            {step !== "add" ? (
              <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1 rounded-lg px-1 text-[13px] font-semibold text-ink-muted hover:text-ink">
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Start again
              </button>
            ) : null}
          </div>

          {step === "add" ? (
            <p className="mt-16 text-center text-ink-muted">Send the course from the manager view to see it arrive here.</p>
          ) : null}

          {step === "invited" ? (
            <motion.div initial={reduce ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
              <div className="flex gap-3 rounded-2xl border border-line bg-surface-raised p-3.5 shadow-card">
                <Bell className="mt-0.5 size-5 flex-none text-accent-600" aria-hidden="true" />
                <p className="text-sm">
                  <b>Safe Kitchen</b>
                  <br />
                  Your manager has added you to the {courseName}.
                </p>
              </div>
              <button type="button" onClick={startLessons} className="min-h-14 rounded-2xl bg-accent-600 font-extrabold text-white hover:bg-accent-700">
                Start the course
              </button>
            </motion.div>
          ) : null}

          {step === "learning" ? (
            <div className="grid gap-3">
              <p className="font-extrabold">{courseName}</p>
              <div className="h-2 overflow-hidden rounded-full bg-surface-sunken" aria-hidden="true">
                <div className="h-full rounded-full bg-accent-600 transition-[width] duration-300" style={{ width: `${(done / courseLessons.length) * 100}%` }} />
              </div>
              <ul className="grid gap-1.5">
                {courseLessons.map((l, i) => (
                  <li key={l} className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm">
                    <span className={cn("grid size-6 flex-none place-items-center rounded-full border-2", i < done ? "border-success bg-success text-white" : "border-control-border")}>
                      {i < done ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : null}
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={done < courseLessons.length}
                onClick={() => setStep("test")}
                className="min-h-13 rounded-2xl bg-accent-600 font-extrabold text-white hover:bg-accent-700 disabled:bg-surface-sunken disabled:text-ink-muted"
              >
                Take the test
              </button>
            </div>
          ) : null}

          {step === "test" ? (
            <fieldset className="grid gap-2.5">
              <legend className="mb-1 font-extrabold">{trainingQuestion.question}</legend>
              {trainingQuestion.options.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={answer === i}
                  onClick={() => setAnswer(i)}
                  className={cn(
                    "min-h-13 rounded-xl border-[1.5px] px-3.5 text-start text-[15px] font-semibold",
                    answer === i ? (i === trainingQuestion.correct ? "border-success bg-success-100" : "border-warning bg-warning-100") : "border-line bg-surface-raised",
                  )}
                >
                  {o}
                </button>
              ))}
              {answer !== null && !correct ? <p className="text-sm text-warning-ink">Not quite. Have another look.</p> : null}
              <button
                type="button"
                disabled={!correct}
                onClick={() => setStep("certified")}
                className="min-h-13 rounded-2xl bg-accent-600 font-extrabold text-white hover:bg-accent-700 disabled:bg-surface-sunken disabled:text-ink-muted"
              >
                Finish the test
              </button>
              <p className="text-[12px] text-ink-muted">Example question for this demo, not the real course content.</p>
            </fieldset>
          ) : null}

          {certified ? (
            <motion.div initial={reduce ? false : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid gap-3">
              <div className="grid justify-items-center gap-2 rounded-2xl border-2 border-brand-100 bg-surface-raised p-5 text-center">
                <Award className="size-10 text-brand-500" aria-hidden="true" />
                <p className="text-xs font-bold tracking-[0.08em] text-brand-700 uppercase">Certificate · sample</p>
                <p className="font-extrabold">Sam Patel</p>
                <p className="text-sm">{courseName}</p>
                <p className="text-[12.5px] text-ink-muted tabular">Completed 31 Oct 2026 · No. SK-DEMO-0001</p>
              </div>
              <p className="flex gap-2 rounded-xl bg-success-100 p-3 text-sm">
                <Check className="mt-0.5 size-4 flex-none text-success" aria-hidden="true" />
                Saved to Sam’s record. Your manager can see it straight away.
              </p>
            </motion.div>
          ) : null}
        </div>
      </DeviceFrame>
    </div>
  );
}
