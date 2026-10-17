import type { RecordStore } from "./store.ts";
import type { PaymentRecord, PaymentStatus } from "./types.ts";

/* Minimal shape of the Stripe objects we read. */
type StripeObject = Record<string, any>;
export type StripeEvent = { id: string; type: string; data: { object: StripeObject } };

export type ProcessOutcome = "processed" | "duplicate" | "ignored" | "unmatched";

const FINAL: PaymentStatus[] = ["refunded", "cancelled"];

function referenceFromMetadata(obj: StripeObject): string | null {
  return (
    obj?.metadata?.reference ??
    obj?.subscription_details?.metadata?.reference ??
    obj?.parent?.subscription_details?.metadata?.reference ??
    null
  );
}

function subscriptionIdOf(obj: StripeObject): string | null {
  const s = obj?.subscription ?? obj?.parent?.subscription_details?.subscription ?? null;
  return typeof s === "string" ? s : (s?.id ?? null);
}

async function locate(store: RecordStore, event: StripeEvent): Promise<PaymentRecord | null> {
  const obj = event.data.object;
  const byRef = obj.client_reference_id ?? referenceFromMetadata(obj);
  if (byRef) {
    const r = await store.get(byRef);
    if (r) return r;
  }
  if (obj.object === "checkout.session" && obj.id) {
    const r = await store.findBy("providerSessionId", obj.id);
    if (r) return r;
  }
  const sub = obj.object === "subscription" ? obj.id : subscriptionIdOf(obj);
  if (sub) {
    const r = await store.findBy("subscriptionId", sub);
    if (r) return r;
  }
  const pi = typeof obj.payment_intent === "string" ? obj.payment_intent : obj.payment_intent?.id;
  if (pi) return store.findBy("paymentIntentId", pi);
  return null;
}

/** Decide the new status for an event, or null if the event changes nothing. */
function transition(record: PaymentRecord, event: StripeEvent): Partial<PaymentRecord> | null {
  const obj = event.data.object;
  const recurring = record.frequency === "monthly";
  switch (event.type) {
    case "checkout.session.completed": {
      const ids: Partial<PaymentRecord> = {
        providerSessionId: obj.id ?? record.providerSessionId,
        customerId: (typeof obj.customer === "string" ? obj.customer : obj.customer?.id) ?? record.customerId,
        subscriptionId: subscriptionIdOf(obj) ?? record.subscriptionId,
        paymentIntentId:
          (typeof obj.payment_intent === "string" ? obj.payment_intent : obj.payment_intent?.id) ?? record.paymentIntentId,
      };
      if (obj.payment_status === "paid" || obj.payment_status === "no_payment_required") {
        return { ...ids, status: recurring ? "active" : "paid" };
      }
      return { ...ids, status: "pending" };
    }
    case "checkout.session.async_payment_succeeded":
      return { status: recurring ? "active" : "paid" };
    case "checkout.session.async_payment_failed":
      return { status: "failed" };
    case "checkout.session.expired":
      return record.status === "created" ? { status: "expired" } : null;
    case "invoice.paid":
      return recurring && record.status !== "cancelled" ? { status: "active" } : null;
    case "invoice.payment_failed":
      return recurring && record.status !== "cancelled" ? { status: "past_due" } : null;
    case "customer.subscription.deleted":
      // Only a provider-confirmed deletion marks a subscription cancelled.
      return { status: "cancelled" };
    case "charge.refunded": {
      const full = obj.amount_refunded >= obj.amount;
      return { status: full ? "refunded" : "partially_refunded" };
    }
    default:
      return null;
  }
}

/**
 * Applies a VERIFIED Stripe event to the stored record. Idempotent: the same
 * event id is only ever applied once, and terminal states are not reopened.
 */
export async function processStripeEvent(store: RecordStore, event: StripeEvent): Promise<ProcessOutcome> {
  if (await store.hasProcessedEvent(event.id)) return "duplicate";
  const record = await locate(store, event);
  if (!record) {
    // Not ours (or arrived before the record exists). Do not mark processed so
    // a provider retry can still apply it.
    return "unmatched";
  }
  const change = transition(record, event);
  if (change) {
    await store.update(record.reference, (r) => {
      const keepFinal = FINAL.includes(r.status) && change.status && !FINAL.includes(change.status);
      const status = keepFinal ? r.status : (change.status ?? r.status);
      return {
        ...r,
        ...change,
        status,
        history: [...r.history, { eventId: event.id, type: event.type, status, at: new Date().toISOString() }],
      };
    });
  }
  await store.markEventProcessed(event.id);
  return change ? "processed" : "ignored";
}
