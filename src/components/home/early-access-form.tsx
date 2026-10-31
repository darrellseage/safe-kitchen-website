"use client";

import Link from "next/link";
import Script from "next/script";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { getCallSlots, submitEarlyAccess, type EarlyAccessState } from "@/app/actions/early-access";
import type { Slot } from "@/lib/booking/slots";
import { pageHref } from "@/content/navigation";
import { businessTypes, interests, siteCounts, type EarlyAccessField } from "@/lib/early-access/schema";
import { HONEYPOT_FIELD, STARTED_FIELD } from "@/lib/early-access/spam";
import { cn } from "@/lib/cn";

const hashToInterest: Record<string, string> = { "#book-a-call": "call", "#request-demo": "demo" };
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const labels: Record<EarlyAccessField, string> = {
  name: "Your name",
  email: "Email",
  business: "Business name",
  businessType: "Type of business",
  sites: "Number of sites",
  interest: "What would you like?",
  message: "What’s your biggest admin headache? (optional)",
  marketing: "Product updates",
  slot: "Choose a time for your call",
};

const inputClass =
  "min-h-13 w-full rounded-lg border-[1.5px] border-control-border bg-surface-raised px-4 text-base text-ink outline-none transition-colors focus:border-accent-600 focus:shadow-[0_0_0_3px_var(--color-accent-100)] aria-[invalid=true]:border-danger";

/** Early access, demo or call request, with real call slots and layered spam protection. */
export function EarlyAccessForm() {
  const [state, action, pending] = useActionState<EarlyAccessState, FormData>(submitEarlyAccess, { status: "idle" });
  const [interest, setInterest] = useState("early_access");
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slot, setSlot] = useState("");
  const startedInput = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const id = useId();
  const errors = state.status === "invalid" ? state.errors : {};
  const errorList = Object.entries(errors) as Array<[EarlyAccessField, string]>;
  const markStarted = () => {
    if (startedInput.current && !startedInput.current.value) startedInput.current.value = String(Date.now());
  };

  useEffect(() => {
    const pick = () => {
      const fromHash = hashToInterest[window.location.hash];
      if (fromHash) setInterest(fromHash);
    };
    const frame = requestAnimationFrame(pick);
    window.addEventListener("hashchange", pick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", pick);
    };
  }, []);

  // Load real free slots when "Book a call" is chosen, and again after a clash.
  useEffect(() => {
    if (interest !== "call") return;
    let cancelled = false;
    getCallSlots()
      .then((s) => !cancelled && setSlots(s))
      .catch(() => !cancelled && setSlots([]));
    return () => {
      cancelled = true;
    };
  }, [interest, state]);

  useEffect(() => {
    if (state.status === "invalid" || state.status === "error") summary.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    const message =
      state.interest === "call"
        ? state.slotLabel
          ? `Your call is booked for ${state.slotLabel} (UK time). We’ll email you to confirm.`
          : "Thanks. We’ll email you to arrange a call."
        : state.interest === "demo"
          ? "Thanks. We’ll email you to arrange your demo."
          : "You’re on the early-access list. We’ll be in touch personally.";
    return (
      <div role="status" className="flex gap-4 rounded-3xl border border-line bg-surface-raised p-6 shadow-raised sm:p-8">
        <CheckCircle2 className="size-7 flex-none text-success" aria-hidden="true" />
        <div>
          <p className="text-2xl font-extrabold">{message}</p>
          <p className="mt-2 text-ink-muted">Keep an eye on your inbox, including your spam folder.</p>
        </div>
      </div>
    );
  }

  const fieldId = (f: EarlyAccessField) => `${id}-${f}`;
  const describedBy = (f: EarlyAccessField) => (errors[f] ? `${fieldId(f)}-error` : undefined);
  const days = slots ? [...new Set(slots.map((s) => s.dayLabel))] : [];

  return (
    <form
      action={action}
      noValidate
      className="relative grid gap-6 rounded-3xl border border-line bg-surface-raised p-6 shadow-raised sm:p-8"
      onSubmit={(e) => {
        // Submit without React's automatic form reset, so answers stay in place
        // if something needs correcting. Without JavaScript, the action still works.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      // Spam check: note when a person first starts filling in the form. Any
      // interaction counts, including browser autofill, which may not focus a field.
      onFocusCapture={markStarted}
      onPointerDownCapture={markStarted}
      onInputCapture={markStarted}
      onChangeCapture={markStarted}
    >
      <span id="book-a-call" className="sr-only" />
      <span id="request-demo" className="sr-only" />

      {errorList.length > 0 || state.status === "error" ? (
        <div ref={summary} tabIndex={-1} role="alert" className="rounded-2xl border border-danger/50 bg-danger-100 p-4">
          {state.status === "error" ? (
            <p className="font-semibold">{state.message}</p>
          ) : (
            <>
              <p className="font-semibold">Please check {errorList.length === 1 ? "this answer" : `these ${errorList.length} answers`}:</p>
              <ul className="mt-2 list-disc ps-5">
                {errorList.map(([field, message]) => (
                  <li key={field}>
                    <a href={`#${fieldId(field)}`} className="underline underline-offset-2">
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : null}

      <fieldset className="grid gap-2">
        <legend className="mb-2 font-bold">{labels.interest}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {interests.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex min-h-13 cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 font-bold transition-colors",
                interest === opt.value ? "border-accent-600 bg-accent-50" : "border-line hover:border-control-border",
              )}
            >
              <input type="radio" name="interest" value={opt.value} checked={interest === opt.value} onChange={() => setInterest(opt.value)} className="size-5 accent-accent-600" />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      {interest === "call" ? (
        <fieldset className="grid gap-3 rounded-2xl border border-line bg-surface p-4" aria-describedby={describedBy("slot")}>
          <legend className="flex items-center gap-2 px-1 font-bold">
            <CalendarDays className="size-5 text-accent-600" aria-hidden="true" />
            {labels.slot}
          </legend>
          {slots === null ? (
            <p className="text-ink-muted">Loading available times…</p>
          ) : slots.length === 0 ? (
            <p className="text-ink-muted">There are no free call times in the next two weeks. Send the form anyway and we’ll email you some times.</p>
          ) : (
            <div className="grid gap-4">
              {days.map((day) => (
                <div key={day}>
                  <p className="mb-2 text-sm font-bold text-ink-muted">{day}</p>
                  <div className="flex flex-wrap gap-2">
                    {slots
                      .filter((s) => s.dayLabel === day)
                      .map((s) => (
                        <label
                          key={s.start}
                          className={cn(
                            "flex min-h-12 cursor-pointer items-center rounded-xl border-[1.5px] px-4 font-bold tabular transition-colors",
                            slot === s.start ? "border-accent-600 bg-accent-600 text-white" : "border-line bg-surface-raised hover:border-control-border",
                          )}
                        >
                          <input type="radio" name="slot" value={s.start} checked={slot === s.start} onChange={() => setSlot(s.start)} className="sr-only" />
                          {s.timeLabel}
                        </label>
                      ))}
                  </div>
                </div>
              ))}
              <p className="text-[13px] text-ink-muted">UK time. Calls last about 30 minutes. Only genuinely free times are shown.</p>
            </div>
          )}
          {errors.slot ? (
            <p id={`${fieldId("slot")}-error`} className="text-sm font-semibold text-danger">
              {errors.slot}
            </p>
          ) : null}
        </fieldset>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fieldId("name")} label={labels.name} error={errors.name}>
          <input id={fieldId("name")} name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={inputClass} />
        </Field>
        <Field id={fieldId("email")} label={labels.email} error={errors.email}>
          <input id={fieldId("email")} name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={inputClass} />
        </Field>
        <Field id={fieldId("business")} label={labels.business} error={errors.business}>
          <input id={fieldId("business")} name="business" autoComplete="organization" required aria-invalid={!!errors.business} aria-describedby={describedBy("business")} className={inputClass} />
        </Field>
        <Field id={fieldId("businessType")} label={labels.businessType} error={errors.businessType}>
          <select id={fieldId("businessType")} name="businessType" required defaultValue="" aria-invalid={!!errors.businessType} aria-describedby={describedBy("businessType")} className={inputClass}>
            <option value="" disabled>
              Choose one
            </option>
            {businessTypes.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={fieldId("sites")} label={labels.sites} error={errors.sites}>
          <select id={fieldId("sites")} name="sites" required defaultValue="" aria-invalid={!!errors.sites} aria-describedby={describedBy("sites")} className={inputClass}>
            <option value="" disabled>
              Choose one
            </option>
            {siteCounts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={fieldId("message")} label={labels.message} error={errors.message} className="sm:col-span-2">
          <textarea id={fieldId("message")} name="message" rows={3} maxLength={1000} aria-invalid={!!errors.message} aria-describedby={describedBy("message")} className={cn(inputClass, "py-3")} />
        </Field>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-[15px]">
        <input type="checkbox" name="marketing" className="mt-0.5 size-5 flex-none accent-accent-600" />
        <span>Send me occasional product updates by email. You can unsubscribe at any time.</span>
      </label>

      {/* Spam checks: people never see or fill the hidden field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-hp`}>Leave this empty</label>
        <input id={`${id}-hp`} name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedInput} type="hidden" name={STARTED_FIELD} defaultValue="" />
      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />
        </>
      ) : null}

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-accent-600 px-8 text-[17px] font-bold text-white transition-colors hover:bg-accent-700 disabled:opacity-60"
        >
          {pending ? "Sending…" : interest === "call" ? (slot ? "Book my call" : "Request a call") : interests.find((i) => i.value === interest)?.label}
        </button>
        <p className="max-w-[56ch] text-sm text-ink-muted">
          We’ll use your details only to reply to you. Product updates are separate and optional. Read our{" "}
          <Link href={pageHref("privacy")} className="font-semibold text-accent-600 underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, className, children }: { id: string; label: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("grid content-start gap-2", className)}>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
