"use client";

import { useRef, useState } from "react";
import { ENQUIRY_TYPES } from "@/lib/validation";
import { Field, FormAlert, Honeypot, describedBy, type Errors } from "./shared";

type Status = "idle" | "sending" | "sent";

export function ContactForm({ initialType }: { initialType?: string }) {
  const startType = ENQUIRY_TYPES.find((t) => t === initialType) ?? "General enquiry";
  const [values, setValues] = useState<Record<string, string>>({ enquiryType: startType });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [alert, setAlert] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(Date.now());
  const statusRef = useRef<HTMLDivElement>(null);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setAlert(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        setErrors({});
      } else {
        setErrors(data.errors ?? {});
        setAlert(data.error ?? (data.errors ? "Please check the highlighted fields." : "Sorry, your message could not be sent."));
        setStatus("idle");
      }
    } catch {
      setAlert("We could not reach the server, so your message has not been sent. Please try again.");
      setStatus("idle");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-3xl bg-leaf-100 p-8 outline-none">
        <h2 className="text-2xl font-bold">Thank you – your message has been sent</h2>
        <p className="mt-3 text-forest-900/85">We have received your enquiry and will reply to {values.email} as soon as we can.</p>
      </div>
    );
  }

  const text = (id: string, label: string, type: string, autoComplete: string, optional = false) => (
    <Field id={id} label={label} error={errors[id]} optional={optional}>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        required={!optional}
        value={values[id] ?? ""}
        onChange={(e) => set(id, e.target.value)}
        aria-invalid={Boolean(errors[id])}
        aria-describedby={describedBy(id, errors)}
        className="field-input"
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      {text("name", "Your name", "text", "name")}
      <div className="grid gap-5 sm:grid-cols-2">
        {text("email", "Email address", "email", "email")}
        {text("phone", "Phone", "tel", "tel", true)}
      </div>
      <Field id="enquiryType" label="What is your enquiry about?" error={errors.enquiryType}>
        <select
          id="enquiryType"
          value={values.enquiryType}
          onChange={(e) => set("enquiryType", e.target.value)}
          aria-invalid={Boolean(errors.enquiryType)}
          aria-describedby={describedBy("enquiryType", errors)}
          className="field-input"
        >
          {ENQUIRY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field id="contactMessage" label="Message" error={errors.message}>
        <textarea
          id="contactMessage"
          rows={6}
          required
          maxLength={5000}
          value={values.message ?? ""}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contactMessage-error" : undefined}
          className="field-input"
        />
      </Field>
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div ref={statusRef} tabIndex={-1} className="outline-none">
        {alert && <FormAlert message={alert} />}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-forest-800 px-8 text-lg font-semibold text-ivory-50 transition-colors hover:bg-forest-900 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-forest-800/80">
          We use your details only to reply to your enquiry. See our <a href="/privacy" className="underline underline-offset-2">privacy policy</a>.
        </p>
      </div>
    </form>
  );
}
