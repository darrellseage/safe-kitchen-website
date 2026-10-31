"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertTriangle, Check, Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatGBP } from "@/config/pricing";
import { orderingDemo } from "@/content/demo-data";
import { ordering } from "@/content/home";
import { cn } from "@/lib/cn";
import { duplicateSpend, findPossibleDuplicate } from "@/lib/demos/order-check";

type Phase = "building" | "warning" | "viewing" | "approval" | "sending" | "sent";

const statusSteps = ["Build", "Check", "Approve", "Send", "Track"] as const;
const stepFor: Record<Phase, number> = { building: 0, warning: 1, viewing: 1, approval: 2, sending: 3, sent: 4 };

/**
 * Smart Ordering demo (planned feature), following the app's planned warning
 * design (DESIGN_SYSTEM.md §9.4): an amber sheet with a plain comparison and
 * clear choices. Prices are examples; "Sent" is never shown as "Accepted".
 */
export function OrderingDemo() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("building");
  const [added, setAdded] = useState(false);
  const [keptBoth, setKeptBoth] = useState(false);
  const timers = useRef<number[]>([]);
  const { newLine, incoming, examplePricePerKg } = orderingDemo;
  const duplicate = findPossibleDuplicate(newLine, incoming);
  const spend = duplicateSpend(newLine.quantity, examplePricePerKg);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const addChicken = () => {
    setAdded(true);
    setPhase(duplicate ? "warning" : "approval");
  };
  const approve = () => {
    setPhase("sending");
    timers.current.push(window.setTimeout(() => setPhase("sent"), reduce ? 0 : 1200));
  };
  const reset = () => {
    setAdded(false);
    setKeptBoth(false);
    setPhase("building");
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-line bg-surface-raised p-5 shadow-raised sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-lg font-extrabold">Order · {orderingDemo.supplier}</p>
            <p className="text-[13px] text-ink-muted">Delivery {orderingDemo.delivery} · example supplier and prices</p>
          </div>
          {phase !== "building" ? (
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-ink-muted hover:text-ink">
              <RotateCcw className="size-4" aria-hidden="true" />
              Start again
            </button>
          ) : null}
        </div>

        <ul className="mt-4 grid gap-2">
          {orderingDemo.basket.map((item) => (
            <li key={item.product} className="flex items-center justify-between gap-3 rounded-xl border border-line px-3.5 py-2.5">
              <span>
                <span className="block font-bold">{item.product}</span>
                <span className="text-[13px] text-ink-muted">{item.detail} · usual order</span>
              </span>
              <span className="flex items-center gap-1.5" aria-hidden="true">
                <span className="grid size-8 place-items-center rounded-lg bg-surface-sunken text-ink-subtle"><Minus className="size-3.5" /></span>
                <b className="w-6 text-center tabular">{item.quantity}</b>
                <span className="grid size-8 place-items-center rounded-lg bg-surface-sunken text-ink-subtle"><Plus className="size-3.5" /></span>
              </span>
            </li>
          ))}
          <li className={cn("flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5", added ? "border-line" : "border-dashed border-control-border")}>
            <span>
              <span className="block font-bold">{newLine.product}</span>
              <span className="text-[13px] text-ink-muted">Example price {formatGBP(examplePricePerKg)}/kg</span>
            </span>
            {added ? (
              <b className="tabular">
                {stepFor[phase] >= 2 && !keptBoth ? "Removed" : `${newLine.quantity} ${newLine.unit}`}
              </b>
            ) : (
              <button type="button" onClick={addChicken} className="min-h-11 rounded-full bg-accent-600 px-4 text-sm font-bold text-white hover:bg-accent-700">
                Add {newLine.quantity} {newLine.unit}
              </button>
            )}
          </li>
        </ul>

        <ol className="mt-5 grid grid-cols-5 gap-1.5 text-center text-[12.5px] font-bold" aria-label="Order progress">
          {statusSteps.map((s, i) => (
            <li
              key={s}
              aria-current={i === stepFor[phase] ? "step" : undefined}
              className={cn(
                "rounded-lg border px-1 py-2 transition-colors",
                i < stepFor[phase] || (phase === "sent" && i === 4)
                  ? "border-transparent bg-accent-100 text-accent-700"
                  : i === stepFor[phase]
                    ? "border-accent-600 bg-surface-raised text-accent-700"
                    : "border-line bg-surface text-ink-muted",
              )}
            >
              {s}
            </li>
          ))}
        </ol>
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {phase === "building" ? (
            <motion.p key="idle" initial={false} exit={{ opacity: 0 }} className="rounded-3xl border border-dashed border-line p-6 text-ink-muted">
              Add the chicken to see Safe Kitchen check the order before anything is sent to your supplier.
            </motion.p>
          ) : null}

          {(phase === "warning" || phase === "viewing") && duplicate ? (
            <motion.div
              key="warning"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="grid gap-4 rounded-3xl border-[1.5px] border-warning/50 bg-warning-100/40 p-5 shadow-raised sm:p-6"
            >
              <p className="flex items-center gap-2 text-lg font-extrabold text-warning-ink">
                <AlertTriangle className="size-5" aria-hidden="true" />
                Possible duplicate order detected
              </p>
              <p>{duplicate.product} is already on an incoming order for the same delivery.</p>
              <div className="grid gap-2.5 text-[14.5px] sm:grid-cols-2">
                <div className={cn("rounded-xl border bg-surface-raised p-3", phase === "viewing" ? "border-accent-600 shadow-[0_0_0_3px_var(--color-accent-100)]" : "border-line")}>
                  <p className="font-bold">Already ordered</p>
                  <p className="tabular">
                    {duplicate.quantity} {duplicate.unit} · arriving {duplicate.delivery}
                  </p>
                  <p className="text-ink-muted">
                    Ordered by {duplicate.orderedBy} on {duplicate.orderedOn}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-surface-raised p-3">
                  <p className="font-bold">This order</p>
                  <p className="tabular">
                    {newLine.quantity} {newLine.unit} · arriving {newLine.delivery}
                  </p>
                  <p className="text-ink-muted">
                    Possible duplicate spend <b className="text-ink tabular">{formatGBP(spend)}</b>
                  </p>
                </div>
              </div>
              <p className="text-[13px] text-ink-muted">
                Illustrative calculation: {newLine.quantity} {newLine.unit} × example price {formatGBP(examplePricePerKg)}/kg. Not a measured saving.
              </p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setPhase("approval")} className="min-h-12 rounded-full bg-accent-600 px-5 font-bold text-white hover:bg-accent-700">
                  Remove from this order
                </button>
                <button type="button" onClick={() => setPhase("viewing")} className="min-h-12 rounded-full border-[1.5px] border-line bg-surface-raised px-5 font-bold hover:border-control-border">
                  View existing order
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setKeptBoth(true);
                    setPhase("approval");
                  }}
                  className="min-h-12 rounded-full border-[1.5px] border-line bg-surface-raised px-5 font-bold hover:border-control-border"
                >
                  Keep both orders
                </button>
              </div>
              <p className="text-[12.5px] text-ink-muted">“Keep both” is only available to people allowed to approve orders, and is noted on the order.</p>
            </motion.div>
          ) : null}

          {phase === "approval" || phase === "sending" || phase === "sent" ? (
            <motion.div
              key="approval"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 rounded-3xl border border-line bg-surface-raised p-5 shadow-raised sm:p-6"
            >
              <p className="text-lg font-extrabold">
                {phase === "approval" ? "Ready for manager approval" : phase === "sending" ? "Sending to supplier…" : "Sent to supplier"}
              </p>
              <p className="text-ink-muted">
                {keptBoth ? "Both chicken orders kept, with a note for the manager." : "Chicken removed: it’s already arriving on Thursday."}
              </p>
              {phase === "approval" ? (
                <button type="button" onClick={approve} className="min-h-12 justify-self-start rounded-full bg-accent-600 px-5 font-bold text-white hover:bg-accent-700">
                  Approve and send
                </button>
              ) : null}
              {phase === "sent" ? (
                <p className="flex gap-2.5 rounded-xl bg-accent-50 p-3 text-sm">
                  <Check className="mt-0.5 size-4 flex-none text-accent-700" aria-hidden="true" />
                  <span>
                    <b>Sent · waiting for the supplier to accept.</b> You’ll see when it’s acknowledged, accepted and delivered.
                  </span>
                </p>
              ) : null}
              <p className="text-[13px] text-ink-muted">{ordering.note}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
