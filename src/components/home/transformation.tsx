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
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { DeviceFrame } from "@/components/ui/device-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { RecordRow, ScreenHeader } from "@/components/product/ui-bits";
import { paperSheet, recordsThursday } from "@/content/demo-data";
import { transformation } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * Section 3: the same week on paper, then in Safe Kitchen. Scrolling moves
 * between the two; the toggle does the same for anyone who prefers to tap,
 * and is the only control when reduced motion is on.
 */
export function Transformation() {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const followScroll = useRef(true);
  const [showingDigital, setShowingDigital] = useState(false);

  const arrowOpacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start 0.8", "center 0.4"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce && followScroll.current) progress.set(v);
  });
  useMotionValueEvent(progress, "change", (v) => setShowingDigital(v > 0.5));

  const show = (digital: boolean) => {
    followScroll.current = false;
    if (reduce) progress.set(digital ? 1 : 0);
    else animate(progress, digital ? 1 : 0, { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] });
  };

  return (
    <section id="how-it-works" aria-labelledby="transform-title" className="scroll-mt-20 overflow-x-clip border-t border-night-700 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading id="transform-title" title={transformation.title} intro={transformation.intro} />
          <div role="group" aria-label="Compare" className="grid grid-cols-2 rounded-full border border-night-700 bg-night-900 p-1 text-[15px] font-semibold">
            {[false, true].map((digital) => (
              <button
                key={String(digital)}
                type="button"
                aria-pressed={showingDigital === digital}
                onClick={() => show(digital)}
                className={cn(
                  "min-h-12 rounded-full px-5 transition-colors",
                  showingDigital === digital ? "bg-herb-400 text-forest-950" : "text-fog-400 hover:text-fog-50",
                )}
              >
                {digital ? transformation.digitalLabel : transformation.paperLabel}
              </button>
            ))}
          </div>
        </div>

        <div ref={stage} className="relative mx-auto mt-14 h-[470px] max-w-[880px] sm:h-[440px]">
          <PaperLayer progress={progress} hidden={showingDigital} />
          <DigitalLayer progress={progress} hidden={!showingDigital} />
          <motion.div
            aria-hidden="true"
            style={{ opacity: arrowOpacity }}
            className="pointer-events-none absolute top-1/2 left-1/2 hidden -translate-1/2 text-herb-400 md:block"
          >
            <ArrowRight className="size-12" strokeWidth={1.5} />
          </motion.div>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {transformation.outcomes.map((o) => (
            <li key={o.title} className="border-t-2 border-herb-400 pt-4">
              <h3 className="font-display text-[22px] leading-tight font-semibold tracking-[-0.015em]">{o.title}</h3>
              <p className="mt-1.5 text-fog-400">{o.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PaperLayer({ progress, hidden }: { progress: MotionValue<number>; hidden: boolean }) {
  const opacity = useTransform(progress, [0, 0.55], [1, 0]);
  const rotate = useTransform(progress, [0, 1], [-1.4, -9]);
  const scale = useTransform(progress, [0, 1], [1, 0.86]);
  const x = useTransform(progress, [0, 1], [0, -60]);
  return (
    <motion.div
      aria-hidden={hidden}
      style={{ opacity, rotate, scale, x }}
      className="absolute inset-x-0 top-4 mx-auto w-full max-w-[560px] md:left-0 md:mx-0"
    >
      <div className="relative bg-paper p-5 text-paper-ink shadow-[0_24px_40px_-14px_rgb(0_0_0/0.7)] sm:p-6">
        <p className="mb-3 text-[15px] font-bold tracking-[0.08em] uppercase">{paperSheet.title}</p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-paper-line bg-paper-line/40 px-2 py-1.5 text-start text-[12.5px]">Unit</th>
              {paperSheet.days.map((d) => (
                <th key={d} className="border border-paper-line bg-paper-line/40 px-2 py-1.5 text-start text-[12.5px]">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paperSheet.rows.map((row) => (
              <tr key={row.unit}>
                <td className="border border-paper-line px-2 py-2">{row.unit}</td>
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={cn(
                      "border border-paper-line px-2 py-2 text-paper-pen italic",
                      cell === "" && "bg-[repeating-linear-gradient(-45deg,transparent_0_6px,rgb(194_65_12/0.08)_6px_12px)]",
                    )}
                  >
                    {cell === "" ? <span className="sr-only">blank</span> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="absolute -right-2 -bottom-8 w-40 rotate-[4deg] bg-sticky p-3 text-[13.5px] text-paper-ink italic shadow-[0_10px_20px_-6px_rgb(0_0_0/0.5)] sm:-right-4">
          {paperSheet.sticky}
        </p>
      </div>
    </motion.div>
  );
}

function DigitalLayer({ progress, hidden }: { progress: MotionValue<number>; hidden: boolean }) {
  const opacity = useTransform(progress, [0.3, 0.8], [0, 1]);
  const y = useTransform(progress, [0.3, 1], [48, 0]);
  return (
    <motion.div
      aria-hidden={hidden}
      style={{ opacity, y }}
      className="absolute inset-x-0 top-0 mx-auto w-full max-w-[460px] md:right-0 md:left-auto md:mx-0"
    >
      <DeviceFrame label="Illustrative demo data">
        <ScreenHeader title="Records · Thursday" subtitle="Main kitchen" />
        <div className="divide-y divide-line">
          {recordsThursday.map((item, i) => (
            <DigitalRow key={item.title} index={i} progress={progress} item={item} />
          ))}
        </div>
      </DeviceFrame>
    </motion.div>
  );
}

function DigitalRow({
  index,
  progress,
  item,
}: {
  index: number;
  progress: MotionValue<number>;
  item: (typeof recordsThursday)[number];
}) {
  const start = 0.45 + index * 0.08;
  const opacity = useTransform(progress, [start, start + 0.15], [0, 1]);
  const x = useTransform(progress, [start, start + 0.15], [16, 0]);
  return (
    <motion.div style={{ opacity, x }}>
      <RecordRow item={item} />
    </motion.div>
  );
}
