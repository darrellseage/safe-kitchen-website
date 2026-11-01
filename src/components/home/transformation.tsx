"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { CalendarDays, Check, Mail, ScanEye, ShoppingBasket, Thermometer } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { paperSheet } from "@/content/demo-data";
import { transformation } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * Section 4, the signature scene: scattered kitchen admin settles into one
 * dashboard as the visitor scrolls. The toggle does the same for anyone who
 * prefers to tap, and is the only control when reduced motion is on.
 */
export function Transformation() {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const followScroll = useRef(true);
  const [showingAfter, setShowingAfter] = useState(false);

  const { scrollYProgress } = useScroll({ target: stage, offset: ["start 0.75", "center 0.4"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce && followScroll.current) progress.set(v);
  });
  useMotionValueEvent(progress, "change", (v) => setShowingAfter(v > 0.5));

  const show = (after: boolean) => {
    followScroll.current = false;
    if (reduce) progress.set(after ? 1 : 0);
    else animate(progress, after ? 1 : 0, { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] });
  };

  return (
    <Section id="how-it-works" labelledBy="transform-title" className="overflow-x-clip">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading id="transform-title" title={transformation.title} intro={transformation.intro} />
        <div role="group" aria-label="Compare before and after" className="grid grid-cols-2 rounded-full border border-line bg-surface p-1 text-[15px] font-bold">
          {[false, true].map((after) => (
            <button
              key={String(after)}
              type="button"
              aria-pressed={showingAfter === after}
              onClick={() => show(after)}
              className={cn(
                "min-h-12 rounded-full px-5 transition-colors",
                showingAfter === after ? "bg-surface-raised text-ink shadow-card" : "text-ink-muted hover:text-ink",
              )}
            >
              {after ? transformation.digitalLabel : transformation.paperLabel}
            </button>
          ))}
        </div>
      </div>

      <div ref={stage} className="relative mx-auto mt-12 h-[620px] max-w-[980px] rounded-[32px] bg-surface sm:h-[520px]">
        <Scattered progress={progress} hidden={showingAfter} />
        <Dashboard progress={progress} hidden={!showingAfter} />
      </div>

    </Section>
  );
}

/** One scattered item: drifts towards the middle and fades as progress grows. */
function Drift({
  progress,
  className,
  rotate,
  toX,
  toY,
  children,
}: {
  progress: MotionValue<number>;
  className: string;
  rotate: number;
  toX: number;
  toY: number;
  children: ReactNode;
}) {
  const x = useTransform(progress, [0, 0.7], [0, toX]);
  const y = useTransform(progress, [0, 0.7], [0, toY]);
  const r = useTransform(progress, [0, 0.7], [rotate, 0]);
  const scale = useTransform(progress, [0, 0.7], [1, 0.7]);
  const opacity = useTransform(progress, [0.2, 0.6], [1, 0]);
  return (
    <motion.div style={{ x, y, rotate: r, scale, opacity }} className={cn("absolute", className)}>
      {children}
    </motion.div>
  );
}

function Scattered({ progress, hidden }: { progress: MotionValue<number>; hidden: boolean }) {
  return (
    <div aria-hidden={hidden} className="absolute inset-0">
      <p className="sr-only">
        Before: a paper temperature sheet with gaps, a photo of the rota sent on WhatsApp, a supplier order email and sticky
        notes.
      </p>
      <Drift progress={progress} rotate={-3} toX={160} toY={90} className="top-6 left-4 w-[78%] sm:top-10 sm:left-8 sm:w-[46%]">
        <div className="bg-paper p-4 text-paper-ink shadow-raised">
          <p className="mb-2 text-xs font-bold tracking-[0.08em] uppercase">{paperSheet.title}</p>
          <table className="w-full border-collapse text-[12.5px]">
            <tbody>
              {paperSheet.rows.map((row) => (
                <tr key={row.unit}>
                  <td className="border border-paper-line px-1.5 py-1">{row.unit}</td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={cn("border border-paper-line px-1.5 py-1 text-paper-pen italic", cell === "" && "bg-danger-100/50")}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Drift>

      <Drift progress={progress} rotate={4} toX={-150} toY={110} className="top-[38%] right-3 w-[62%] sm:top-8 sm:right-10 sm:w-[30%]">
        <div className="rounded-2xl bg-chat p-3 shadow-raised">
          <div className="rounded-lg bg-paper p-2.5 text-[11.5px] text-paper-pen italic">
            <p>Mon Sam 9–5 · Priya 12–10</p>
            <p>Tue Priya 12–10? · Jo 5–11</p>
            <p>Wed Jo 5–11 · Sam off</p>
          </div>
          <p className="mt-2 text-[12.5px] text-ink">New rota pic. Swapped Tue, let me know 👍</p>
          <p className="text-end text-[11px] text-ink-muted">21:47</p>
        </div>
      </Drift>

      <Drift progress={progress} rotate={-2} toX={120} toY={-90} className="bottom-24 left-5 w-[70%] sm:bottom-10 sm:left-14 sm:w-[34%]">
        <div className="rounded-xl border border-line bg-surface-raised p-3.5 text-[13px] shadow-raised">
          <p className="flex items-center gap-2 font-bold">
            <Mail className="size-4 text-ink-muted" />
            Re: Re: order for Thursday
          </p>
          <p className="mt-1 text-ink-muted">Can you add 20 kg chicken? Not sure if Priya already did…</p>
        </div>
      </Drift>

      <Drift progress={progress} rotate={6} toX={-110} toY={-80} className="right-6 bottom-6 w-40 sm:right-16 sm:bottom-12">
        <p className="bg-sticky p-3 text-[13.5px] text-paper-ink italic shadow-raised">{paperSheet.sticky}</p>
      </Drift>

      <Drift progress={progress} rotate={-8} toX={40} toY={-30} className="top-[46%] left-[38%] hidden w-36 sm:block">
        <p className="bg-sticky p-3 text-[13.5px] text-paper-ink italic shadow-raised">Call EHO back re visit??</p>
      </Drift>
    </div>
  );
}

const tiles = [
  { icon: Thermometer, title: "Food safety today", value: "18 of 21 checks", note: "Fridge 2 · afternoon due", tone: "brand" },
  { icon: CalendarDays, title: "Today’s rota", value: "6 on shift", note: "Jo clocks in at 17:00", tone: "accent" },
  { icon: ScanEye, title: "Needs attention", value: "2 items", note: "Why each was flagged", tone: "warning" },
  { icon: ShoppingBasket, title: "Orders", value: "1 arriving Thu", note: "No duplicates", tone: "accent" },
] as const;

function Dashboard({ progress, hidden }: { progress: MotionValue<number>; hidden: boolean }) {
  const opacity = useTransform(progress, [0.4, 0.85], [0, 1]);
  const scale = useTransform(progress, [0.4, 1], [0.94, 1]);
  return (
    <motion.div aria-hidden={hidden} style={{ opacity, scale }} className="absolute inset-3 grid place-items-center sm:inset-8">
      <div className="w-full max-w-[760px] overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-raised">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <p className="text-lg font-extrabold">Main kitchen · Thursday</p>
            <p className="text-[13px] text-ink-muted">Illustrative dashboard · sample data</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success">
            <Check className="size-3.5" aria-hidden="true" />
            Everything in one place
          </span>
        </div>
        <div className="grid gap-3 bg-surface p-4 sm:grid-cols-2">
          {tiles.map((t, i) => (
            <Tile key={t.title} tile={t} index={i} progress={progress} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Tile({ tile, index, progress }: { tile: (typeof tiles)[number]; index: number; progress: MotionValue<number> }) {
  const start = 0.55 + index * 0.07;
  const opacity = useTransform(progress, [start, start + 0.15], [0, 1]);
  const y = useTransform(progress, [start, start + 0.15], [12, 0]);
  const Icon = tile.icon;
  return (
    <motion.div style={{ opacity, y }} className="flex gap-3 rounded-2xl border border-line bg-surface-raised p-4">
      <span
        className={cn(
          "grid size-10 flex-none place-items-center rounded-xl",
          tile.tone === "brand" && "bg-brand-50 text-brand-700",
          tile.tone === "accent" && "bg-accent-100 text-accent-700",
          tile.tone === "warning" && "bg-warning-100 text-warning-ink",
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-[13px] font-bold text-ink-muted">{tile.title}</span>
        <span className="block text-lg leading-tight font-extrabold tabular">{tile.value}</span>
        <span className="block text-[13px] text-ink-muted">{tile.note}</span>
      </span>
    </motion.div>
  );
}
