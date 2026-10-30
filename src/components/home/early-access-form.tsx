"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { submitEarlyAccess, type EarlyAccessState } from "@/app/actions/early-access";
import { businessTypes, interests, siteCounts, type EarlyAccessField } from "@/lib/early-access/schema";
import { HONEYPOT_FIELD, STARTED_FIELD } from "@/lib/early-access/spam";
import { cn } from "@/lib/cn";

const hashToInterest: Record<string, string> = { "#book-a-call": "call", "#request-demo": "demo" };

const sentMessages: Record<string, string> = {
  early_access: "You’re on the early-access list. We’ll be in touch personally.",
  demo: "Thanks. We’ll email you to arrange your demo.",
  call: "Thanks. We’ll email you to arrange a call.",
};

const labels: Record<EarlyAccessField, string> = {
  name: "Your name",
  email: "Email",
  business: "Business name",
  businessType: "Type of business",
  sites: "Number of sites",
  interest: "What would you like?",
  message: "What’s your biggest paperwork headache? (optional)",
  marketing: "Marketing updates",
};

export function EarlyAccessForm() {
  const [state, action, pending] = useActionState<EarlyAccessState, FormData>(submitEarlyAccess, { status: "idle" });
  const [interest, setInterest] = useState("early_access");
  const startedInput = useRef<HTMLInputElement>(null);
  const id = useId();
  const summary = useRef<HTMLDivElement>(null);
  const errors = state.status === "invalid" ? state.errors : {};
  const errorList = Object.entries(errors) as Array<[EarlyAccessField, string]>;

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

  useEffect(() => {
    if (state.status === "invalid" || state.status === "error") summary.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div role="status" className="flex gap-4 rounded-3xl border border-herb-400/40 bg-forest-900/60 p-6 sm:p-8">
        <CheckCircle2 className="size-7 flex-none text-herb-400" aria-hidden="true" />
        <div>
          <p className="font-display text-2xl font-bold">{sentMessages[state.interest] ?? sentMessages.early_access}</p>
          <p className="mt-2 text-mist-300">Keep an eye on your inbox, including your spam folder.</p>
        </div>
      </div>
    );
  }

  const fieldId = (f: EarlyAccessField) => `${id}-${f}`;
  const describedBy = (f: EarlyAccessField) => (errors[f] ? `${fieldId(f)}-error` : undefined);

  return (
    <form
      action={action}
      noValidate
      className="relative grid gap-6"
      onSubmit={(e) => {
        // Submit without React's automatic form reset, so answers stay in place
        // if something needs correcting. Without JavaScript, the action still works.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      onFocusCapture={() => {
        // Spam check: note when a person first starts filling in the form.
        if (startedInput.current && !startedInput.current.value) startedInput.current.value = String(Date.now());
      }}
    >
      <span id="book-a-call" className="sr-only" />
      <span id="request-demo" className="sr-only" />

      {errorList.length > 0 || state.status === "error" ? (
        <div ref={summary} tabIndex={-1} role="alert" className="rounded-2xl border border-ui-danger/60 bg-ui-danger/10 p-4">
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
        <legend className="mb-2 font-semibold">{labels.interest}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {interests.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex min-h-13 cursor-pointer items-center gap-3 rounded-xl border px-4 font-semibold transition-colors",
                interest === opt.value ? "border-herb-400 bg-herb-400/10" : "border-night-600 hover:border-fog-400",
              )}
            >
              <input
                type="radio"
                name="interest"
                value={opt.value}
                checked={interest === opt.value}
                onChange={() => setInterest(opt.value)}
                className="size-5 accent-herb-400"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

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
        <input type="checkbox" name="marketing" className="mt-0.5 size-5 flex-none accent-herb-400" />
        <span>Send me occasional product updates by email. You can unsubscribe at any time.</span>
      </label>

      {/* Spam checks: people never see or fill the hidden field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-hp`}>Leave this empty</label>
        <input id={`${id}-hp`} name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedInput} type="hidden" name={STARTED_FIELD} defaultValue="" />

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-herb-400 px-8 text-[17px] font-semibold text-forest-950 transition-colors hover:bg-herb-300 disabled:opacity-60"
        >
          {pending ? "Sending…" : interests.find((i) => i.value === interest)?.label}
        </button>
        <p className="max-w-[56ch] text-sm text-mist-300">
          We’ll use your details only to reply to you. Product updates are separate and optional. Read our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-fog-50">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

const inputClass =
  "min-h-13 w-full rounded-xl border border-night-600 bg-night-950/70 px-4 text-base text-fog-50 outline-none transition-colors focus:border-herb-400 aria-[invalid=true]:border-ui-danger";

function Field({ id, label, error, className, children }: { id: string; label: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("grid content-start gap-2", className)}>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-semibold text-error-on-dark">
          {error}
        </p>
      ) : null}
    </div>
  );
}
