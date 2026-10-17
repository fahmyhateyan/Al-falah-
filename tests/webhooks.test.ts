import assert from "node:assert/strict";
import { test } from "node:test";
import { signStripePayload, verifyStripeSignature } from "../src/lib/payments/stripe-signature.ts";
import { MemoryStore } from "../src/lib/payments/store.ts";
import type { PaymentRecord } from "../src/lib/payments/types.ts";
import { processStripeEvent } from "../src/lib/payments/webhook.ts";

const secret = "whsec_test_secret";

test("signature verification accepts valid and rejects tampered/stale payloads", () => {
  const payload = JSON.stringify({ id: "evt_1" });
  const header = signStripePayload(payload, secret);
  assert.ok(verifyStripeSignature(payload, header, secret));
  assert.ok(!verifyStripeSignature(payload + " ", header, secret), "tampered body");
  assert.ok(!verifyStripeSignature(payload, header, "whsec_other"), "wrong secret");
  assert.ok(!verifyStripeSignature(payload, null, secret), "missing header");
  const old = signStripePayload(payload, secret, Math.floor(Date.now() / 1000) - 3600);
  assert.ok(!verifyStripeSignature(payload, old, secret), "stale timestamp");
});

function record(overrides: Partial<PaymentRecord> = {}): PaymentRecord {
  const now = new Date().toISOString();
  return {
    reference: "AF-000000000001",
    kind: "sponsorship",
    frequency: "monthly",
    amount: 200,
    currency: "USD",
    children: 2,
    fund: null,
    supporter: { firstName: "A", lastName: "B", email: "a@example.com", country: "", message: "", marketingConsent: false },
    provider: "stripe",
    providerSessionId: "cs_test_1",
    paymentIntentId: null,
    subscriptionId: null,
    customerId: null,
    status: "created",
    history: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

const ev = (id: string, type: string, object: Record<string, unknown>) => ({ id, type, data: { object } });

test("completed subscription checkout becomes active; duplicates are ignored", async () => {
  const store = new MemoryStore();
  await store.create(record());
  const e = ev("evt_a", "checkout.session.completed", {
    object: "checkout.session",
    id: "cs_test_1",
    client_reference_id: "AF-000000000001",
    payment_status: "paid",
    subscription: "sub_1",
    customer: "cus_1",
  });
  assert.equal(await processStripeEvent(store, e), "processed");
  assert.equal(await processStripeEvent(store, e), "duplicate");
  const r = await store.get("AF-000000000001");
  assert.equal(r?.status, "active");
  assert.equal(r?.subscriptionId, "sub_1");
  assert.equal(r?.history.length, 1, "duplicate webhook must not add history");
});

test("unpaid completion stays pending until async success", async () => {
  const store = new MemoryStore();
  await store.create(record({ frequency: "one-time", amount: 100, children: 1 }));
  await processStripeEvent(store, ev("evt_1", "checkout.session.completed", { object: "checkout.session", id: "cs_test_1", client_reference_id: "AF-000000000001", payment_status: "unpaid" }));
  assert.equal((await store.get("AF-000000000001"))?.status, "pending");
  await processStripeEvent(store, ev("evt_2", "checkout.session.async_payment_succeeded", { object: "checkout.session", id: "cs_test_1", client_reference_id: "AF-000000000001" }));
  assert.equal((await store.get("AF-000000000001"))?.status, "paid");
});

test("failed payments, past-due renewals, cancellations and refunds", async () => {
  const store = new MemoryStore();
  await store.create(record({ subscriptionId: "sub_9", status: "active" }));
  await processStripeEvent(store, ev("evt_f", "invoice.payment_failed", { object: "invoice", subscription: "sub_9" }));
  assert.equal((await store.get("AF-000000000001"))?.status, "past_due");
  await processStripeEvent(store, ev("evt_p", "invoice.paid", { object: "invoice", subscription: "sub_9" }));
  assert.equal((await store.get("AF-000000000001"))?.status, "active");
  await processStripeEvent(store, ev("evt_d", "customer.subscription.deleted", { object: "subscription", id: "sub_9" }));
  assert.equal((await store.get("AF-000000000001"))?.status, "cancelled");
  // A late invoice event must not reopen a confirmed cancellation.
  await processStripeEvent(store, ev("evt_late", "invoice.paid", { object: "invoice", subscription: "sub_9" }));
  assert.equal((await store.get("AF-000000000001"))?.status, "cancelled");

  const s2 = new MemoryStore();
  await s2.create(record({ frequency: "one-time", status: "paid", paymentIntentId: "pi_1" }));
  await processStripeEvent(s2, ev("evt_r", "charge.refunded", { object: "charge", payment_intent: "pi_1", amount: 10000, amount_refunded: 10000 }));
  assert.equal((await s2.get("AF-000000000001"))?.status, "refunded");
});

test("failed async payment and expired sessions", async () => {
  const store = new MemoryStore();
  await store.create(record({ frequency: "one-time" }));
  await processStripeEvent(store, ev("evt_x", "checkout.session.expired", { object: "checkout.session", id: "cs_test_1" }));
  assert.equal((await store.get("AF-000000000001"))?.status, "expired");

  const s2 = new MemoryStore();
  await s2.create(record({ frequency: "one-time", status: "pending" }));
  await processStripeEvent(s2, ev("evt_y", "checkout.session.async_payment_failed", { object: "checkout.session", id: "cs_test_1" }));
  assert.equal((await s2.get("AF-000000000001"))?.status, "failed");
});

test("unknown records are left unprocessed so retries can apply later", async () => {
  const store = new MemoryStore();
  const e = ev("evt_u", "checkout.session.completed", { object: "checkout.session", id: "cs_unknown", payment_status: "paid" });
  assert.equal(await processStripeEvent(store, e), "unmatched");
  assert.equal(await store.hasProcessedEvent("evt_u"), false);
});
