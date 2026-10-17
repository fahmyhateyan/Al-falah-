"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { formatMoney, sponsorshipBillingLabel, sponsorshipTotal, type Frequency } from "@/lib/pricing";
import { Checkbox, DemoBanner, FormAlert, Honeypot, PolicyLinks, SupporterFields, postCheckout, type Errors } from "./shared";

export function SponsorForm({ demo }: { demo: boolean }) {
  const { monthlyAmount, maxChildrenPerCheckout, allowOneMonthSupport } = site.sponsorship;
  const [children, setChildren] = useState(1);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [values, setValues] = useState<Record<string, string>>({});
  const [billingConsent, setBillingConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [alert, setAlert] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const startedAt = useRef(Date.now());
  const alertRef = useRef<HTMLDivElement>(null);

  const total = sponsorshipTotal(children);
  const setChildCount = (n: number) => {
    setChildren(Math.min(maxChildrenPerCheckout, Math.max(1, n)));
    setBillingConsent(false);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);
    const result = await postCheckout({
      kind: "sponsorship",
      children,
      frequency,
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

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-8">
      {demo && <DemoBanner />}

      <fieldset>
        <legend className="mb-3 font-serif text-xl font-bold text-forest-900">How would you like to give?</legend>
        <div className="grid gap-3">
          <label className={`flex cursor-pointer gap-4 rounded-2xl p-4 ring-2 transition ${frequency === "monthly" ? "bg-leaf-100/60 ring-forest-800" : "bg-white ring-forest-900/10 hover:ring-forest-900/25"}`}>
            <input type="radio" name="frequency" value="monthly" checked={frequency === "monthly"} onChange={() => { setFrequency("monthly"); setBillingConsent(false); }} className="mt-1 h-5 w-5 accent-forest-800" />
            <span>
              <span className="flex flex-wrap items-center gap-2 font-semibold text-forest-950">
                Monthly sponsorship
                <span className="rounded-full bg-forest-800 px-2 py-0.5 text-xs font-semibold text-ivory-50">Recommended</span>
              </span>
              <span className="mt-0.5 block text-sm text-forest-900/80">
                {formatMoney(monthlyAmount)} per child, charged every month until you cancel.
              </span>
            </span>
          </label>
          {allowOneMonthSupport && (
            <label className={`flex cursor-pointer gap-4 rounded-2xl p-4 ring-2 transition ${frequency === "one-time" ? "bg-leaf-100/60 ring-forest-800" : "bg-white ring-forest-900/10 hover:ring-forest-900/25"}`}>
              <input type="radio" name="frequency" value="one-time" checked={frequency === "one-time"} onChange={() => { setFrequency("one-time"); setBillingConsent(false); }} className="mt-1 h-5 w-5 accent-forest-800" />
              <span>
                <span className="font-semibold text-forest-950">Support one month</span>
                <span className="mt-0.5 block text-sm text-forest-900/80">
                  A single payment of {formatMoney(monthlyAmount)} per child. No recurring payment.
                </span>
              </span>
            </label>
          )}
        </div>
        {errors.frequency && <p className="field-error">{errors.frequency}</p>}
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-serif text-xl font-bold text-forest-900">How many children?</legend>
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center rounded-full bg-white ring-1 ring-forest-900/15">
            <button type="button" onClick={() => setChildCount(children - 1)} disabled={children <= 1} className="h-12 w-12 rounded-full text-2xl font-semibold text-forest-900 disabled:opacity-30" aria-label="One fewer child">
              −
            </button>
            <label htmlFor="children" className="sr-only">Number of children</label>
            <input
              id="children"
              type="number"
              inputMode="numeric"
              min={1}
              max={maxChildrenPerCheckout}
              value={children}
              onChange={(e) => setChildCount(Number(e.target.value) || 1)}
              aria-invalid={Boolean(errors.children)}
              className="h-12 w-14 border-0 bg-transparent text-center text-xl font-bold text-forest-950 [appearance:textfield] focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button type="button" onClick={() => setChildCount(children + 1)} disabled={children >= maxChildrenPerCheckout} className="h-12 w-12 rounded-full text-2xl font-semibold text-forest-900 disabled:opacity-30" aria-label="One more child">
              +
            </button>
          </div>
          <p className="text-forest-900/80" aria-hidden>
            {children} × {formatMoney(monthlyAmount)} = <strong className="text-forest-950">{formatMoney(total)}</strong>
          </p>
        </div>
        {errors.children && <p className="field-error">{errors.children}</p>}
      </fieldset>

      <div className="rounded-3xl bg-forest-900 p-6 text-ivory-50" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-wider text-leaf-200">Your sponsorship</p>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="font-serif text-4xl font-bold text-gold-300">{formatMoney(total)}</span>
          <span className="text-ivory-100/85">{frequency === "monthly" ? "per month" : "one-off payment"}</span>
        </p>
        <p className="mt-2 text-ivory-100/85">{sponsorshipBillingLabel(children, frequency)}.</p>
      </div>

      <SupporterFields errors={errors} values={values} onChange={(k, v) => setValues((s) => ({ ...s, [k]: v }))} />
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="grid gap-4">
        <Checkbox id="billingConsent" checked={billingConsent} onChange={setBillingConsent} error={errors.billingConsent}>
          {frequency === "monthly" ? (
            <>
              I understand I will be charged <strong>{formatMoney(total)} every month</strong> until I cancel, and that I can cancel at any time.
            </>
          ) : (
            <>
              I understand I will be charged <strong>{formatMoney(total)} once</strong>, and that this is not a recurring payment.
            </>
          )}
        </Checkbox>
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
            : demo
              ? `Continue to demo checkout – ${formatMoney(total)}${frequency === "monthly" ? "/month" : ""}`
              : `Continue to secure payment – ${formatMoney(total)}${frequency === "monthly" ? "/month" : ""}`}
        </button>
        <PolicyLinks />
      </div>
    </form>
  );
}
