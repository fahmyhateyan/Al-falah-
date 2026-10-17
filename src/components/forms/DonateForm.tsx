"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { site } from "@/config/site";
import { donationBillingLabel, formatMoney, type Frequency } from "@/lib/pricing";
import { parseDonationAmount } from "@/lib/validation";
import { Checkbox, DemoBanner, FormAlert, Honeypot, PolicyLinks, SupporterFields, postCheckout, type Errors } from "./shared";

export function DonateForm({ demo }: { demo: boolean }) {
  const { suggestedAmounts, minAmount, maxAmount, allowMonthly, funds, currency } = site.donations;
  const enabledFunds = funds.filter((f) => f.enabled);
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [preset, setPreset] = useState<number | "custom">(suggestedAmounts[1] ?? suggestedAmounts[0]);
  const [custom, setCustom] = useState("");
  const [fund] = useState(enabledFunds[0]?.id ?? "general");
  const [values, setValues] = useState<Record<string, string>>({});
  const [billingConsent, setBillingConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [alert, setAlert] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const startedAt = useRef(Date.now());
  const alertRef = useRef<HTMLDivElement>(null);

  const amount = preset === "custom" ? parseDonationAmount(custom) : preset;
  const amountValid = amount !== null && amount >= minAmount && amount <= maxAmount;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);
    const result = await postCheckout({
      kind: "donation",
      amount: preset === "custom" ? custom : preset,
      frequency,
      fund,
      billingConsent,
      marketingConsent,
      ...values,
      website: honeypot,
      startedAt: startedAt.current,
    });
    if (result.redirectUrl) {
      window.location.assign(result.redirectUrl);
      return;
    }
    setErrors(result.errors ?? {});
    setAlert(result.error ?? null);
    setSubmitting(false);
    requestAnimationFrame(() => alertRef.current?.focus());
  }

  const tab = (value: Frequency, label: string) => (
    <label className={`choice flex min-h-[48px] flex-1 cursor-pointer items-center justify-center rounded-full px-4 text-center font-semibold transition ${frequency === value ? "bg-forest-800 text-ivory-50 shadow-sm" : "text-forest-900 hover:bg-forest-900/5"}`}>
      <input type="radio" name="frequency" value={value} checked={frequency === value} onChange={() => { setFrequency(value); setBillingConsent(false); }} className="sr-only" />
      {label}
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-8">
      {demo && <DemoBanner />}

      {enabledFunds.length === 1 ? (
        <div className="rounded-2xl bg-ivory-100 p-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-forest-700">Your gift supports</p>
          <p className="mt-1 font-serif text-lg font-bold text-forest-950">{enabledFunds[0].name}</p>
          <p className="text-sm text-forest-900/80">{enabledFunds[0].description}</p>
        </div>
      ) : null}

      <fieldset>
        <legend className="mb-3 font-serif text-xl font-bold text-forest-900">How often?</legend>
        <div className="flex gap-1 rounded-full bg-white p-1 ring-1 ring-forest-900/15">
          {tab("one-time", "One-off")}
          {allowMonthly && tab("monthly", "Monthly")}
        </div>
        {errors.frequency && <p className="field-error">{errors.frequency}</p>}
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-serif text-xl font-bold text-forest-900">Amount ({currency})</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {suggestedAmounts.map((a) => (
            <label key={a} className={`choice flex min-h-[56px] cursor-pointer items-center justify-center rounded-2xl text-lg font-bold ring-2 transition ${preset === a ? "bg-leaf-100/60 text-forest-950 ring-forest-800" : "bg-white text-forest-900 ring-forest-900/10 hover:ring-forest-900/25"}`}>
              <input type="radio" name="amount" value={a} checked={preset === a} onChange={() => setPreset(a)} className="sr-only" />
              {formatMoney(a, currency)}
            </label>
          ))}
          <label className={`choice col-span-2 flex min-h-[56px] cursor-pointer items-center justify-center rounded-2xl font-bold ring-2 transition sm:col-span-1 ${preset === "custom" ? "bg-leaf-100/60 text-forest-950 ring-forest-800" : "bg-white text-forest-900 ring-forest-900/10 hover:ring-forest-900/25"}`}>
            <input type="radio" name="amount" value="custom" checked={preset === "custom"} onChange={() => setPreset("custom")} className="sr-only" />
            Other
          </label>
        </div>
        {preset === "custom" && (
          <div className="mt-4">
            <label htmlFor="customAmount" className="field-label">Your amount in US dollars</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-forest-800">$</span>
              <input
                id="customAmount"
                inputMode="decimal"
                autoFocus
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? "customAmount-error" : "customAmount-hint"}
                className="field-input pl-9 text-lg"
                placeholder="e.g. 40"
              />
            </div>
            {errors.amount ? (
              <p id="customAmount-error" className="field-error">{errors.amount}</p>
            ) : (
              <p id="customAmount-hint" className="field-hint">
                Between {formatMoney(minAmount, currency)} and {formatMoney(maxAmount, currency)}.
              </p>
            )}
          </div>
        )}
        {preset !== "custom" && errors.amount && <p className="field-error">{errors.amount}</p>}
      </fieldset>

      <div className="rounded-3xl bg-forest-900 p-6 text-ivory-50" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-wider text-leaf-200">Your gift</p>
        {amountValid ? (
          <>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
              <span className="font-serif text-4xl font-bold text-gold-300">{formatMoney(amount!, currency)}</span>
              <span className="text-ivory-100/85">{frequency === "monthly" ? "per month" : "one-off"}</span>
            </p>
            <p className="mt-2 text-ivory-100/85">{donationBillingLabel(amount!, frequency)}.</p>
          </>
        ) : (
          <p className="mt-2 text-ivory-100/85">Enter an amount between {formatMoney(minAmount, currency)} and {formatMoney(maxAmount, currency)}.</p>
        )}
        <p className="mt-4 border-t border-ivory-50/15 pt-4 text-sm text-ivory-100/80">
          Want to support one boy fully?{" "}
          <Link href="/sponsor-a-child" className="font-semibold text-ivory-50 underline decoration-leaf-400 underline-offset-4">
            Sponsor a child for {formatMoney(site.sponsorship.monthlyAmount)} a month
          </Link>
        </p>
      </div>

      <SupporterFields errors={errors} values={values} onChange={(k, v) => setValues((s) => ({ ...s, [k]: v }))} />
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="grid gap-4">
        {frequency === "monthly" && (
          <Checkbox id="billingConsent" checked={billingConsent} onChange={setBillingConsent} error={errors.billingConsent}>
            I understand I will be charged <strong>{amountValid ? formatMoney(amount!, currency) : "this amount"} every month</strong> until I cancel, and that I can cancel at any time.
          </Checkbox>
        )}
        <Checkbox id="marketingConsent" checked={marketingConsent} onChange={setMarketingConsent}>
          I would like to receive occasional news from Al-Falah by email. <span className="text-forest-800/70">(Optional – you can unsubscribe at any time.)</span>
        </Checkbox>
      </div>

      <div ref={alertRef} tabIndex={-1} className="outline-none">
        {alert && <FormAlert message={alert} />}
      </div>

      <div className="grid gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-forest-800 px-8 text-lg font-semibold text-ivory-50 shadow-sm transition-colors hover:bg-forest-900 disabled:opacity-60"
        >
          {submitting
            ? "Starting checkout…"
            : `${demo ? "Continue to demo checkout" : "Continue to secure payment"}${amountValid ? ` – ${formatMoney(amount!, currency)}${frequency === "monthly" ? "/month" : ""}` : ""}`}
        </button>
        <PolicyLinks />
      </div>
    </form>
  );
}
