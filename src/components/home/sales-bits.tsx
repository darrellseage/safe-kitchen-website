import Link from "next/link";
import { Check } from "lucide-react";
import { section } from "@/content/navigation";
import type { ReactNode } from "react";

/** Chips listing what a feature helps catch. */
export function Catches({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="mt-8">
      <p className="text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{label}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-raised px-3.5 py-1.5 text-[14.5px] font-semibold">
            <Check className="size-4 text-brand-500" aria-hidden="true" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A one-line worked money example, always labelled as illustrative, linking to the calculators. */
export function ExampleLine({ amount, text, note }: { amount: string; text: string; note?: string }) {
  const [before, after] = text.split("{amount}");
  return (
    <p className="mt-6 max-w-3xl text-[16.5px] text-ink-muted">
      {before}
      <b className="font-extrabold text-ink tabular">{amount}</b>
      {after}
      {note ? ` ${note}` : ""}{" "}
      <Link href={section("savings")} className="font-bold whitespace-nowrap text-accent-600 underline underline-offset-2">
        Work out your own numbers
      </Link>
    </p>
  );
}

/** Labelled number input used by the sales calculators. */
export function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  hint?: ReactNode;
}) {
  return (
    <div className="grid content-start gap-1.5">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <div className="flex min-h-13 items-center gap-2 rounded-lg border-[1.5px] border-control-border bg-surface-raised px-4 focus-within:border-accent-600 focus-within:shadow-[0_0_0_3px_var(--color-accent-100)]">
        {prefix ? <span className="text-ink-muted">{prefix}</span> : null}
        <input
          id={id}
          type="number"
          inputMode={step < 1 ? "decimal" : "numeric"}
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="min-w-0 flex-1 self-stretch bg-transparent text-lg font-semibold tabular outline-none"
        />
        {suffix ? <span className="text-ink-muted">{suffix}</span> : null}
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export const gbp = (n: number, pence = false) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: pence ? 2 : 0, minimumFractionDigits: pence ? 2 : 0 }).format(n);

/** Parses a calculator input; blank or unreadable becomes 0. */
export const num = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
