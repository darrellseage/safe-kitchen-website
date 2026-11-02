"use client";

import { SiteLink } from "@/components/site/site-link";
import Script from "next/script";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { completeEnquiry, getCallSlots, startEnquiry, type EarlyAccessState } from "@/app/actions/early-access";
import type { Slot } from "@/lib/booking/slots";
import { pageHref } from "@/content/navigation";
import { businessTypes, interests, MARKETING_CONSENT, siteCounts, type EarlyAccessField } from "@/lib/early-access/schema";
import { HONEYPOT_FIELD, STARTED_FIELD } from "@/lib/early-access/spam";
import { cn } from "@/lib/cn";

const hashToInterest: Record<string, string> = { "#book-a-call": "call", "#request-demo": "demo" };
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const labels: Record<EarlyAccessField, string> = {
  id: "Enquiry",
  name: "Your name",
  email: "Email",
  business: "Business name (optional)",
  businessType: "Type of business",
  sites: "Number of sites",
  interest: "What would you like?",
  message: "What’s your biggest admin headache? (optional)",
  marketing: "Product news",
  slot: "Choose a time for your call",
};

const continueLabel: Record<string, string> = { early_access: "Join early access", demo: "Continue", call: "Continue" };

const inputClass =
  "min-h-13 w-full rounded-lg border-[1.5px] border-control-border bg-surface-raised px-4 text-base text-ink outline-none transition-colors focus:border-accent-600 focus:shadow-[0_0_0_3px_var(--color-accent-100)] aria-[invalid=true]:border-danger";

const submitClass =
  "inline-flex min-h-14 items-center justify-center rounded-full bg-accent-600 px-8 text-[17px] font-bold text-white transition-colors hover:bg-accent-700 disabled:opacity-60 max-sm:w-full";

/** Submits without React's automatic form reset, so answers stay in place if something needs correcting. */
function submitWith(action: (data: FormData) => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };
}

/**
 * Early access, demo or call request in two short steps (conversion review R10).
 * Step 1 (email and choice) is saved as soon as it's sent, and the form says so
 * first. Step 2 adds business details: optional for early access, needed to
 * arrange a demo or call.
 */
export function EarlyAccessForm() {
  const [startState, start, starting] = useActionState<EarlyAccessState, FormData>(startEnquiry, { status: "idle" });
  const [detailsState, complete, completing] = useActionState<EarlyAccessState, FormData>(completeEnquiry, { status: "idle" });
  const [skipped, setSkipped] = useState(false);
  const [interest, setInterest] = useState("early_access");

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

  if (detailsState.status === "sent") return <Done interest={detailsState.interest} slotLabel={detailsState.slotLabel} />;
  if (startState.status === "started" && skipped) return <Done interest="early_access" />;
  if (startState.status === "started") {
    return <DetailsStep started={startState} state={detailsState} action={complete} pending={completing} onSkip={() => setSkipped(true)} />;
  }
  return <StartStep state={startState} action={start} pending={starting} interest={interest} setInterest={setInterest} />;
}

function StartStep({
  state,
  action,
  pending,
  interest,
  setInterest,
}: {
  state: EarlyAccessState;
  action: (data: FormData) => void;
  pending: boolean;
  interest: string;
  setInterest: (v: string) => void;
}) {
  const id = useId();
  // When the person first started filling in the form, for the spam check. Kept in a ref, not a hidden
  // field: React resets a hidden field's value when the form re-renders (for example to show an error),
  // which made a quick correction look like a bot and silently dropped a genuine sign-up.
  const startedAt = useRef<number | null>(null);
  const errors = state.status === "invalid" ? state.errors : {};
  const markStarted = () => {
    startedAt.current ??= Date.now();
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set(STARTED_FIELD, startedAt.current ? String(startedAt.current) : "");
    startTransition(() => action(data));
  };
  const emailId = `${id}-email`;

  return (
    <form
      action={action}
      noValidate
      className="relative grid gap-6 rounded-3xl border border-line bg-surface-raised p-6 shadow-raised sm:p-8"
      onSubmit={onSubmit}
      // Spam check: note when a person first starts filling in the form. Any
      // interaction counts, including browser autofill, which may not focus a field.
      onFocusCapture={markStarted}
      onPointerDownCapture={markStarted}
      onInputCapture={markStarted}
      onChangeCapture={markStarted}
    >
      <span id="book-a-call" className="sr-only" />
      <span id="request-demo" className="sr-only" />
      <StepLabel step={1} />
      <ErrorSummary state={state} fieldId={(f) => `${id}-${f}`} />

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

      <Field id={emailId} label={labels.email} error={errors.email}>
        <input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={`${id}-notice${errors.email ? ` ${emailId}-error` : ""}`}
          className={inputClass}
        />
      </Field>

      <label className="flex cursor-pointer items-start gap-3 text-[15px]">
        <input type="checkbox" name="marketing" className="mt-0.5 size-5 flex-none accent-accent-600" />
        <span>{MARKETING_CONSENT.text}</span>
      </label>

      {/* Spam checks: people never see or fill the hidden field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-hp`}>Leave this empty</label>
        <input id={`${id}-hp`} name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>
      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />
        </>
      ) : null}

      <div className="grid gap-4">
        <button type="submit" disabled={pending} className={cn(submitClass, "w-fit")}>
          {pending ? "Saving…" : continueLabel[interest]}
        </button>
        <p id={`${id}-notice`} className="max-w-[60ch] text-sm text-ink-muted">
          Free, with no payment card and no commitment. When you press the button we save your email address and your choice, so we can contact you about
          it. Product news is separate and only sent if you tick the box. Read our{" "}
          <SiteLink href={pageHref("privacy")} className="font-semibold text-accent-600 underline underline-offset-2">
            privacy notice
          </SiteLink>
          .
        </p>
      </div>
    </form>
  );
}

function DetailsStep({
  started,
  state,
  action,
  pending,
  onSkip,
}: {
  started: { id: string; email: string; interest: string };
  state: EarlyAccessState;
  action: (data: FormData) => void;
  pending: boolean;
  onSkip: () => void;
}) {
  const id = useId();
  const heading = useRef<HTMLParagraphElement>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slot, setSlot] = useState("");
  const errors = state.status === "invalid" ? state.errors : {};
  const optional = started.interest === "early_access";
  const fieldId = (f: EarlyAccessField) => `${id}-${f}`;
  const describedBy = (f: EarlyAccessField) => (errors[f] ? `${fieldId(f)}-error` : undefined);

  useEffect(() => heading.current?.focus(), []);

  // Load real free slots for "Book a call", and again after a clash.
  useEffect(() => {
    if (started.interest !== "call") return;
    let cancelled = false;
    getCallSlots()
      .then((s) => !cancelled && setSlots(s))
      .catch(() => !cancelled && setSlots([]));
    return () => {
      cancelled = true;
    };
  }, [started.interest, state]);

  const days = slots ? [...new Set(slots.map((s) => s.dayLabel))] : [];
  const title = optional
    ? "You’re on the early-access list."
    : started.interest === "demo"
      ? "Thanks. One more step to arrange your demo."
      : "Thanks. One more step to book your call.";

  return (
    <form action={action} noValidate onSubmit={submitWith(action)} className="grid gap-6 rounded-3xl border border-line bg-surface-raised p-6 shadow-raised sm:p-8">
      <input type="hidden" name="id" value={started.id} />
      <input type="hidden" name="email" value={started.email} />
      <input type="hidden" name="interest" value={started.interest} />
      <StepLabel step={2} />
      <div className="flex gap-3">
        {optional ? <CheckCircle2 className="mt-1 size-6 flex-none text-success" aria-hidden="true" /> : null}
        <div>
          <p ref={heading} tabIndex={-1} role="status" className="text-2xl font-extrabold tracking-[-0.02em] outline-none">
            {title}
          </p>
          <p className="mt-1 text-ink-muted">
            {optional
              ? "Tell us a little about your kitchen so we can prepare for you. It’s optional and takes about a minute."
              : "A few details about your business, so we can make the most of your time."}
          </p>
        </div>
      </div>
      <ErrorSummary state={state} fieldId={fieldId} />

      {started.interest === "call" ? (
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
        <Field id={fieldId("business")} label={labels.business} error={errors.business}>
          <input id={fieldId("business")} name="business" autoComplete="organization" aria-invalid={!!errors.business} aria-describedby={describedBy("business")} className={inputClass} />
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

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={submitClass}>
          {pending ? "Sending…" : started.interest === "call" ? (slot ? "Book my call" : "Request a call") : started.interest === "demo" ? "Request my demo" : "Send details"}
        </button>
        {optional ? (
          <button type="button" onClick={onSkip} className="min-h-12 rounded-full px-5 font-bold text-accent-600 hover:text-accent-700 max-sm:w-full">
            Skip for now
          </button>
        ) : null}
      </div>
    </form>
  );
}

function Done({ interest, slotLabel }: { interest: string; slotLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const message =
    interest === "call"
      ? slotLabel
        ? `Your call is booked for ${slotLabel} (UK time). We’ll email you to confirm.`
        : "Thanks. We’ll email you to arrange a call."
      : interest === "demo"
        ? "Thanks. We’ll email you to arrange your demo."
        : "You’re on the early-access list. We’ll be in touch personally.";
  return (
    <div ref={ref} tabIndex={-1} role="status" className="flex gap-4 rounded-3xl border border-line bg-surface-raised p-6 shadow-raised outline-none sm:p-8">
      <CheckCircle2 className="size-7 flex-none text-success" aria-hidden="true" />
      <div>
        <p className="text-2xl font-extrabold">{message}</p>
        <p className="mt-2 text-ink-muted">Keep an eye on your inbox, including your spam folder.</p>
      </div>
    </div>
  );
}

function StepLabel({ step }: { step: 1 | 2 }) {
  return (
    <p className="flex items-center gap-2 text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">
      Step {step} of 2
      <span aria-hidden="true" className="flex gap-1">
        <span className="h-1.5 w-6 rounded-full bg-accent-600" />
        <span className={cn("h-1.5 w-6 rounded-full", step === 2 ? "bg-accent-600" : "bg-line")} />
      </span>
    </p>
  );
}

function ErrorSummary({ state, fieldId }: { state: EarlyAccessState; fieldId: (f: EarlyAccessField) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status === "invalid" || state.status === "error") ref.current?.focus();
  }, [state]);
  const errorList = state.status === "invalid" ? (Object.entries(state.errors) as Array<[EarlyAccessField, string]>) : [];
  if (state.status !== "error" && errorList.length === 0) return null;
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="rounded-2xl border border-danger/50 bg-danger-100 p-4">
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
