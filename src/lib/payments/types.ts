import type { Frequency } from "../pricing.ts";

export type PaymentStatus =
  | "created" // checkout started, nothing paid yet
  | "pending" // provider reports payment in progress (e.g. delayed methods, manual transfer)
  | "paid" // one-off payment confirmed by a verified webhook
  | "active" // recurring payment set up and latest invoice paid
  | "past_due" // a recurring payment failed; provider will retry
  | "failed"
  | "cancelled" // subscription cancellation CONFIRMED by the provider
  | "expired" // checkout abandoned / session expired
  | "refunded"
  | "partially_refunded";

export type PaymentRecord = {
  reference: string;
  kind: "sponsorship" | "donation";
  frequency: Frequency;
  amount: number; // whole currency units per charge
  currency: string;
  children: number | null;
  fund: string | null;
  supporter: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    message: string;
    marketingConsent: boolean;
  };
  provider: string;
  providerSessionId: string | null;
  paymentIntentId: string | null;
  subscriptionId: string | null;
  customerId: string | null;
  status: PaymentStatus;
  /** Provider event ids applied to this record, with timestamps. */
  history: { eventId: string; type: string; status: PaymentStatus; at: string }[];
  createdAt: string;
  updatedAt: string;
};

export type CheckoutResult =
  | { ok: true; redirectUrl: string; mode: "demo" | "live" }
  | { ok: false; error: string; status: number };
