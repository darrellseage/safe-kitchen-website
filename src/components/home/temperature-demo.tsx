"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertTriangle, Check, Clock, Flame, Keyboard, Minus, Plus, RotateCcw, Snowflake, Thermometer, Refrigerator } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { DeviceFrame } from "@/components/ui/device-frame";
import { SavedPill } from "@/components/product/ui-bits";
import { demo } from "@/content/home";
import { cn } from "@/lib/cn";
import {
  clampToScale,
  formatReading,
  parseReading,
  positionOfValue,
  valueAtPosition,
  type Scale,
} from "@/lib/temperature-scale";

/**
 * Section 4: illustrative temperature check. There are no verified limits yet
 * (app SFBB_CONTENT_MATRIX.md), so the demo never judges a reading as safe or
 * unsafe. The "problem" path is chosen by the visitor and shows no number.
 */

type DemoCheck = { id: string; name: string; kind: string; icon: typeof Thermometer; scale: Scale };

const checks: DemoCheck[] = [
  { id: "walk-in", name: "Walk-in fridge", kind: "Fridge", icon: Refrigerator, scale: { min: -5, max: 15 } },
  { id: "freezer", name: "Freezer 1", kind: "Freezer", icon: Snowflake, scale: { min: -30, max: 0 } },
  { id: "hot-hold", name: "Hot holding: curry", kind: "Hot hold", icon: Flame, scale: { min: 40, max: 100 } },
  { id: "probe", name: "Cooked chicken", kind: "Probe", icon: Thermometer, scale: { min: 0, max: 100 } },
];

const happened = ["Reading higher than expected", "Door left open", "Unit not working properly"];
const actions = ["Checked the reading again", "Moved food to another unit", "Told the manager", "Called for a repair"];

type Method = "slider" | "keypad";
type LogEntry = { id: number; name: string; reading: string; time: string; method: Method; review?: boolean };

const startingLog: LogEntry[] = [
  { id: 2, name: "Walk-in fridge", reading: "Recorded", time: "10:02", method: "slider" },
  { id: 1, name: "Opening checks", reading: "6 of 6", time: "09:41", method: "slider" },
];

function londonTime() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" });
}

export function TemperatureDemo() {
  const [check, setCheck] = useState<DemoCheck>(checks[0]);
  const [value, setValue] = useState<number | null>(null);
  const [method, setMethod] = useState<Method>("slider");
  const [keypad, setKeypad] = useState(false);
  const [typed, setTyped] = useState("");
  const [typedError, setTypedError] = useState(false);
  const [saved, setSaved] = useState<LogEntry | null>(null);
  const [problem, setProblem] = useState<"off" | "choosing" | "sent">("off");
  const [picked, setPicked] = useState<string[]>([]);
  const [log, setLog] = useState<LogEntry[]>(startingLog);
  const nextId = useRef(3);
  const reduce = useReducedMotion();

  const choose = (c: DemoCheck) => {
    setCheck(c);
    setValue(null);
    setTyped("");
    setTypedError(false);
    setSaved(null);
    setProblem("off");
    setPicked([]);
  };

  const setFromSlider = (v: number) => {
    setValue(v);
    setMethod("slider");
    setSaved(null);
  };

  const save = () => {
    if (value === null) return;
    const entry: LogEntry = {
      id: nextId.current++,
      name: check.name,
      reading: `${formatReading(value)} °C`,
      time: londonTime(),
      method,
    };
    setSaved(entry);
    setProblem("off");
    setPicked([]);
    setLog((l) => [entry, ...l].slice(0, 5));
  };

  const sendProblem = () => {
    if (!saved) return;
    setProblem("sent");
    setLog((l) => l.map((e) => (e.id === saved.id ? { ...e, review: true } : e)));
  };

  const reset = () => {
    choose(checks[0]);
    setLog(startingLog);
  };

  const toggle = (item: string) => setPicked((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]));

  const step = saved ? 3 : value === null ? 1 : 2;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.12fr_0.88fr]">
      <DeviceFrame label={demo.flag} className="mt-3">
        <div className="grid gap-4 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <ol className="flex flex-1 gap-1.5" aria-label={`Step ${step} of 3`}>
              {[1, 2, 3].map((n) => (
                <li key={n} className={cn("h-1.5 flex-1 rounded-full", n <= step ? "bg-accent-600" : "bg-line")} />
              ))}
            </ol>
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-ink-muted hover:text-ink">
              <RotateCcw className="size-4" aria-hidden="true" />
              Start again
            </button>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-ink-muted">1. Choose a check</legend>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {checks.map((c) => {
                const Icon = c.icon;
                const active = c.id === check.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => choose(c)}
                    className={cn(
                      "grid min-h-24 content-between gap-2 rounded-2xl border-[1.5px] p-3 text-start text-[14px] leading-tight font-semibold transition-[background-color,border-color,box-shadow]",
                      active
                        ? "border-accent-600 bg-accent-100 shadow-[0_0_0_3px_rgb(15_124_122/0.15)]"
                        : "border-line bg-surface-raised hover:border-control-border",
                    )}
                  >
                    <Icon className={cn("size-5", active ? "text-accent-600" : "text-ink-muted")} aria-hidden="true" />
                    <span>
                      {c.name}
                      <span className="block text-xs font-medium text-ink-muted">{c.kind}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="rounded-2xl border border-line bg-surface-raised p-4">
            <p className="text-sm font-semibold text-ink-muted">2. Enter the reading</p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="font-display text-[clamp(2.6rem,6vw,3.6rem)] leading-none font-extrabold tracking-tight tabular" aria-live="polite">
                {value === null ? <span className="text-control-border">––.–</span> : formatReading(value)}
                <span className="ms-1 text-xl font-semibold text-ink-muted">°C</span>
              </p>
              <div className="flex gap-2">
                <NudgeButton label="Lower by 0.1" disabled={value === null} onClick={() => value !== null && setFromSlider(clampToScale(value - 0.1, check.scale))}>
                  <Minus className="size-5" aria-hidden="true" />
                </NudgeButton>
                <NudgeButton label="Raise by 0.1" disabled={value === null} onClick={() => value !== null && setFromSlider(clampToScale(value + 0.1, check.scale))}>
                  <Plus className="size-5" aria-hidden="true" />
                </NudgeButton>
              </div>
            </div>

            <ScaleSlider key={check.id} label={`${check.name} reading`} scale={check.scale} value={value} onChange={setFromSlider} />

            <p className="mt-2 text-[13px] text-ink-muted">
              {value === null ? "Tap the scale to set the reading. " : ""}
              The scale is not a safety limit.
            </p>

            <div className="mt-3">
              <button
                type="button"
                aria-expanded={keypad}
                onClick={() => setKeypad((k) => !k)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-accent-600 hover:text-accent-700"
              >
                <Keyboard className="size-4" aria-hidden="true" />
                {keypad ? "Hide keypad" : "Type the exact reading"}
              </button>
              {keypad ? (
                <KeypadEntry
                  check={check}
                  typed={typed}
                  error={typedError}
                  onType={(t) => {
                    setTyped(t);
                    const n = parseReading(t);
                    setTypedError(t.trim() !== "" && n === null);
                    if (n !== null) {
                      setValue(n);
                      setMethod("keypad");
                      setSaved(null);
                    }
                  }}
                />
              ) : null}
            </div>
          </div>

          <button
            type="button"
            onClick={save}
            disabled={value === null}
            className="min-h-15 rounded-2xl bg-accent-600 text-[17px] font-bold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-ink-muted"
          >
            Save reading
          </button>

          <div aria-live="polite">
            {saved ? (
              <SavedResult
                entry={saved}
                problem={problem}
                picked={picked}
                onToggle={toggle}
                onStartProblem={() => setProblem("choosing")}
                onSend={sendProblem}
              />
            ) : (
              <p className="rounded-2xl border-[1.5px] border-dashed border-line p-4 text-center text-sm text-ink-muted">
                3. Your saved record appears here.
              </p>
            )}
          </div>
        </div>
      </DeviceFrame>

      <div className="grid gap-8">
        <div className="rounded-3xl border border-line bg-surface-raised p-5 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold tracking-[0.08em] text-brand-700 uppercase">Manager view · today</p>
            <span className="text-xs text-ink-muted">Updates as you save</span>
          </div>
          <ul className="grid gap-2">
            <AnimatePresence initial={false}>
              {log.map((e) => (
                <motion.li
                  key={e.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-[1fr_auto] gap-x-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm"
                >
                  <span className="font-semibold">{e.name}</span>
                  <span className={cn("font-semibold tabular", e.review ? "text-warning-ink" : "text-ink")}>
                    {e.review ? "Waiting for review" : e.reading}
                  </span>
                  <span className="col-span-2 text-xs text-ink-muted tabular">
                    {e.id > 2 ? "Sam (demo)" : "Sam"} · {e.time} · {e.method}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <ul className="grid gap-6">
          {demo.why.map((w) => (
            <li key={w.title} className="border-s-2 border-accent-600 ps-4">
              <h3 className="text-xl leading-snug font-extrabold tracking-[-0.01em]">{w.title}</h3>
              <p className="text-[15.5px] text-ink-muted">{w.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function NudgeButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-14 place-items-center rounded-2xl border-[1.5px] border-line bg-surface-sunken text-ink transition-colors hover:border-control-border disabled:opacity-40"
    >
      {children}
    </button>
  );
}

/** Tap-anywhere scale with a 48px handle; full keyboard support. Starts empty. */
function ScaleSlider({ label, scale, value, onChange }: { label: string; scale: Scale; value: number | null; onChange: (v: number) => void }) {
  const track = useRef<HTMLDivElement>(null);

  const fromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const rect = track.current?.getBoundingClientRect();
    if (!rect) return;
    onChange(valueAtPosition((e.clientX - rect.left) / rect.width, scale));
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = value ?? (scale.min + scale.max) / 2;
    const moves: Record<string, number> = {
      ArrowRight: current + 0.1,
      ArrowUp: current + 0.1,
      ArrowLeft: current - 0.1,
      ArrowDown: current - 0.1,
      PageUp: current + 1,
      PageDown: current - 1,
      Home: scale.min,
      End: scale.max,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    onChange(clampToScale(value === null && e.key.startsWith("Arrow") ? current : moves[e.key], scale));
  };

  const pos = value === null ? null : positionOfValue(value, scale);

  return (
    <div className="mt-4 px-6">
      <div
        ref={track}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={scale.min}
        aria-valuemax={scale.max}
        aria-valuenow={value ?? undefined}
        aria-valuetext={value === null ? "No reading yet" : `${formatReading(value)} degrees Celsius`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e);
        }}
        onKeyDown={onKey}
        className="relative h-16 cursor-pointer touch-none rounded-2xl border border-line bg-[linear-gradient(90deg,var(--color-scale-cold),var(--color-surface-sunken)_50%,var(--color-scale-warm))] outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent-600"
      >
        {pos !== null ? (
          <span
            className="absolute top-1/2 size-12 -translate-1/2 rounded-full border-4 border-accent-600 bg-surface-raised shadow-md"
            style={{ left: `${pos * 100}%` }}
          />
        ) : null}
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-ink-muted tabular" aria-hidden="true">
        <span>{formatReading(scale.min)}°</span>
        <span>{formatReading(scale.max)}°</span>
      </div>
    </div>
  );
}

function KeypadEntry({ check, typed, error, onType }: { check: DemoCheck; typed: string; error: boolean; onType: (t: string) => void }) {
  const id = useId();
  return (
    <div className="mt-2 grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        Reading for {check.name} (°C)
      </label>
      <input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        value={typed}
        onChange={(e) => onType(e.target.value)}
        aria-invalid={error}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder="e.g. 3.4"
        className="min-h-13 rounded-xl border-[1.5px] border-control-border bg-surface-raised px-4 text-lg font-semibold tabular focus:border-accent-600 focus:outline-none"
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm font-semibold text-danger">
          Enter a number with up to one decimal place, like 3.4 or −18.
        </p>
      ) : null}
    </div>
  );
}

function SavedResult({
  entry,
  problem,
  picked,
  onToggle,
  onStartProblem,
  onSend,
}: {
  entry: LogEntry;
  problem: "off" | "choosing" | "sent";
  picked: string[];
  onToggle: (item: string) => void;
  onStartProblem: () => void;
  onSend: () => void;
}) {
  const rows: Array<[string, string]> = [
    ["Check", entry.name],
    ["Reading", entry.reading],
    ["Recorded by", `Sam (demo) · ${entry.time}`],
    ["Device · method", `Kitchen tablet · ${entry.method}`],
  ];
  return (
    <div className="grid gap-3 rounded-2xl border border-line bg-surface-raised p-4 text-sm">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Saved record</p>
        <SavedPill />
      </div>
      <dl className="grid gap-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 border-t border-line pt-2">
            <dt className="text-ink-muted">{k}</dt>
            <dd className="text-end font-semibold tabular">{v}</dd>
          </div>
        ))}
      </dl>

      {problem === "off" ? (
        <>
          <p className="flex gap-2.5 rounded-xl bg-accent-100 p-3 text-[13.5px] text-accent-700">
            <Check className="mt-0.5 size-4 flex-none" aria-hidden="true" />
            <span>
              <b>Recorded.</b> In Safe Kitchen, each reading is compared with the limit in your approved safe method. This
              demo has no real limits.
            </span>
          </p>
          <button
            type="button"
            onClick={onStartProblem}
            className="min-h-12 rounded-xl border-[1.5px] border-line font-semibold text-ink hover:border-control-border"
          >
            See what happens with a problem reading
          </button>
        </>
      ) : null}

      {problem === "choosing" ? (
        <div className="grid gap-3">
          <p className="flex gap-2.5 rounded-xl bg-danger-100 p-3 text-[13.5px] text-danger">
            <AlertTriangle className="mt-0.5 size-4 flex-none" aria-hidden="true" />
            <span>
              <b>Outside your limit (example).</b> Pick what happened and what you did. Nothing is typed unless you want to.
            </span>
          </p>
          <ChipGroup legend="What happened?" items={happened} picked={picked} onToggle={onToggle} />
          <ChipGroup legend="What did you do?" items={actions} picked={picked} onToggle={onToggle} />
          <button
            type="button"
            onClick={onSend}
            disabled={picked.length === 0}
            className="min-h-13 rounded-xl bg-ink font-bold text-white disabled:opacity-40"
          >
            Confirm and send to manager
          </button>
          <p className="text-xs text-ink-muted">By sending, staff confirm they did the things they ticked.</p>
        </div>
      ) : null}

      {problem === "sent" ? (
        <p className="flex gap-2.5 rounded-xl bg-warning-100 p-3 text-[13.5px] text-ink">
          <Clock className="mt-0.5 size-4 flex-none text-warning" aria-hidden="true" />
          <span>
            <b>Waiting for manager review.</b> It’s never approved automatically, and the original reading stays in the
            record. In the real app, guidance on what to do comes only from reviewed food safety content.
          </span>
        </p>
      ) : null}
    </div>
  );
}

function ChipGroup({ legend, items, picked, onToggle }: { legend: string; items: string[]; picked: string[]; onToggle: (i: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-1.5 font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const on = picked.includes(item);
          return (
            <button
              key={item}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(item)}
              className={cn(
                "min-h-11 rounded-full border-[1.5px] px-3.5 text-[13.5px] font-semibold transition-colors",
                on ? "border-accent-600 bg-accent-100 text-accent-700" : "border-line bg-surface-raised text-ink hover:border-control-border",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
