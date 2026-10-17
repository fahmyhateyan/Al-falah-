import { randomBytes } from "node:crypto";
import { site } from "../../config/site.ts";
import { toMinorUnits } from "../pricing.ts";
import type { DonationRequest, SponsorshipRequest } from "../validation.ts";
import { getStore } from "./store.ts";
import type { CheckoutResult, PaymentRecord } from "./types.ts";

/**
 * PAYMENT PROVIDER BOUNDARY
 * PAYMENT_PROVIDER=demo   (default) – no money moves; a clearly labelled demo page.
 * PAYMENT_PROVIDER=stripe – Stripe Checkout (hosted). Requires STRIPE_SECRET_KEY
 *                           and STRIPE_WEBHOOK_SECRET. Card details never touch
 *                           this server.
 * Other providers (e.g. an M-Pesa aggregator) plug in here – see docs/PAYMENTS.md.
 */
export type ProviderName = "demo" | "stripe";

export function activeProvider(): ProviderName {
  const p = process.env.PAYMENT_PROVIDER;
  if (p === "stripe" && process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET) return "stripe";
  return "demo";
}

export const isDemoMode = (): boolean => activeProvider() === "demo";

export function newReference(): string {
  return `AF-${randomBytes(6).toString("hex").toUpperCase()}`;
}

type Request = SponsorshipRequest | DonationRequest;

function describe(req: Request): string {
  if (req.kind === "sponsorship") {
    return req.frequency === "monthly" ? "Full monthly sponsorship" : "Support one month (one-off)";
  }
  const fund = site.donations.funds.find((f) => f.id === req.fund)?.name ?? "General school support fund";
  return req.frequency === "monthly" ? `Monthly donation – ${fund}` : `Donation – ${fund}`;
}

export async function startCheckout(req: Request, origin: string): Promise<CheckoutResult> {
  if (activeProvider() === "demo") {
    // Demo records are NOT stored with live payment data.
    const params = new URLSearchParams({
      kind: req.kind,
      amount: String(req.amount),
      frequency: req.frequency,
      ...(req.kind === "sponsorship" ? { children: String(req.children) } : {}),
    });
    return { ok: true, mode: "demo", redirectUrl: `/checkout/demo?${params}` };
  }
  return startStripeCheckout(req, origin);
}

async function startStripeCheckout(req: Request, origin: string): Promise<CheckoutResult> {
  const reference = newReference();
  const now = new Date().toISOString();
  const record: PaymentRecord = {
    reference,
    kind: req.kind,
    frequency: req.frequency,
    amount: req.amount,
    currency: req.currency,
    children: req.kind === "sponsorship" ? req.children : null,
    fund: req.kind === "donation" ? req.fund : null,
    supporter: {
      firstName: req.firstName,
      lastName: req.lastName,
      email: req.email,
      country: req.country,
      message: req.message,
      marketingConsent: req.marketingConsent,
    },
    provider: "stripe",
    providerSessionId: null,
    paymentIntentId: null,
    subscriptionId: null,
    customerId: null,
    status: "created",
    history: [],
    createdAt: now,
    updatedAt: now,
  };
  await getStore().create(record);

  const recurring = req.frequency === "monthly";
  const unitAmount = req.kind === "sponsorship" ? site.sponsorship.monthlyAmount : req.amount;
  const quantity = req.kind === "sponsorship" ? req.children : 1;
  const base = process.env.NEXT_PUBLIC_SITE_URL || origin;

  const form = new URLSearchParams();
  form.set("mode", recurring ? "subscription" : "payment");
  form.set("success_url", `${base}/checkout/success?ref=${reference}`);
  form.set("cancel_url", `${base}/checkout/cancelled?kind=${req.kind}`);
  form.set("client_reference_id", reference);
  form.set("customer_email", req.email);
  form.set("line_items[0][quantity]", String(quantity));
  form.set("line_items[0][price_data][currency]", req.currency.toLowerCase());
  form.set("line_items[0][price_data][unit_amount]", String(toMinorUnits(unitAmount)));
  form.set("line_items[0][price_data][product_data][name]", describe(req));
  if (recurring) form.set("line_items[0][price_data][recurring][interval]", "month");
  form.set("metadata[reference]", reference);
  form.set("metadata[kind]", req.kind);
  if (recurring) {
    form.set("subscription_data[metadata][reference]", reference);
  } else {
    form.set("payment_intent_data[metadata][reference]", reference);
    form.set("submit_type", "donate");
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Idempotency-Key": reference,
    },
    body: form,
  });
  const body = (await res.json().catch(() => ({}))) as { id?: string; url?: string; error?: { message?: string } };
  if (!res.ok || !body.url || !body.id) {
    console.error(`[checkout] Stripe session creation failed for ${reference}: HTTP ${res.status}`);
    await getStore().update(reference, (r) => ({ ...r, status: "failed" }));
    return { ok: false, status: 502, error: "We could not start the secure checkout. Please try again shortly." };
  }
  await getStore().update(reference, (r) => ({ ...r, providerSessionId: body.id! }));
  return { ok: true, mode: "live", redirectUrl: body.url };
}
