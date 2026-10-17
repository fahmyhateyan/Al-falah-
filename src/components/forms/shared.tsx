"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export type Errors = Record<string, string>;

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-forest-800/70">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export const describedBy = (id: string, errors: Errors, hint = false) =>
  errors[id] ? `${id}-error` : hint ? `${id}-hint` : undefined;

/** Supporter name/email/country/message fields shared by sponsorship and donation forms. */
export function SupporterFields({ errors, values, onChange }: { errors: Errors; values: Record<string, string>; onChange: (k: string, v: string) => void }) {
  const input = (id: string, label: string, type = "text", autoComplete?: string, optional = false) => (
    <Field id={id} label={label} error={errors[id]} optional={optional}>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={!optional}
        value={values[id] ?? ""}
        onChange={(e) => onChange(id, e.target.value)}
        aria-invalid={Boolean(errors[id])}
        aria-describedby={describedBy(id, errors)}
        className="field-input"
      />
    </Field>
  );
  return (
    <fieldset className="grid gap-5">
      <legend className="mb-1 font-serif text-xl font-bold text-forest-900">Your details</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        {input("firstName", "First name", "text", "given-name")}
        {input("lastName", "Last name", "text", "family-name")}
      </div>
      {input("email", "Email address", "email", "email")}
      {input("country", "Country", "text", "country-name", true)}
      <Field id="message" label="Message" error={errors.message} optional>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={1000}
          value={values.message ?? ""}
          onChange={(e) => onChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", errors)}
          className="field-input"
        />
      </Field>
    </fieldset>
  );
}

export function Checkbox({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 rounded border-forest-900/30 text-forest-800 accent-forest-800"
        />
        <label htmlFor={id} className="text-forest-900/90">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error ml-8">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden honeypot field – real visitors never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function DemoBanner() {
  return (
    <div role="note" className="rounded-2xl border border-gold-500/50 bg-gold-300/25 p-4 text-sm text-forest-950">
      <p className="font-semibold">Demonstration checkout</p>
      <p className="mt-1 text-forest-900/85">
        Online payments are not yet connected. You can try the form, but <strong>no money will be taken</strong> and no payment will be
        recorded.
      </p>
    </div>
  );
}

export function PolicyLinks() {
  return (
    <p className="text-sm text-forest-800/80">
      By continuing you agree to our <Link href="/terms" className="underline underline-offset-2">donation and sponsorship terms</Link> and{" "}
      <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>. Payments are handled by a secure payment provider; we
      never see or store your card details.
    </p>
  );
}

export function FormAlert({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-800/30 bg-red-50 p-4 text-sm font-medium text-red-900">
      {message}
    </div>
  );
}

export async function postCheckout(payload: Record<string, unknown>): Promise<{ redirectUrl?: string; errors?: Errors; error?: string }> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.redirectUrl) return { redirectUrl: data.redirectUrl };
    return { errors: data.errors, error: data.error ?? (data.errors ? "Please check the highlighted fields." : "Something went wrong. Please try again.") };
  } catch {
    return { error: "We could not reach the server. Please check your connection and try again." };
  }
}
