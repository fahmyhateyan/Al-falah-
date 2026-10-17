# Payments setup

## How it works now (demo mode)

With no credentials (`PAYMENT_PROVIDER=demo`, the default), both forms validate fully and then go to
`/checkout/demo`, which says plainly that **no money was taken and nothing was recorded**. Demo checkouts are never
written to the payment record store. The forms also show a "Demonstration checkout" notice.

## Architecture

```
Form (client) ──POST /api/checkout──► validation (server: amount ALWAYS recalculated from config)
                                       └► provider boundary  src/lib/payments/provider.ts
                                            ├─ demo   → /checkout/demo
                                            └─ stripe → record "created" in store → Stripe hosted Checkout
Stripe ──POST /api/webhooks/stripe──► signature verified → idempotent status update (src/lib/payments/webhook.ts)
Visitor returns to /checkout/success?ref=… → shows whatever the webhook has recorded (never marks paid itself)
```

Card details are entered only on Stripe's hosted page – this server never sees them.

### Recorded for each payment
Reference, kind (sponsorship/donation), frequency, amount, currency, number of children or fund, supporter name,
email, country, optional message, marketing consent, Stripe session / payment intent / subscription / customer IDs,
status, and an event history.

### Statuses handled
`created` → `pending` (delayed payment methods) → `paid` (one-off) / `active` (subscription) · `past_due`
(renewal failed) · `failed` · `expired` (checkout abandoned) · `cancelled` (only when Stripe confirms the
subscription was deleted) · `refunded` / `partially_refunded`. Duplicate webhooks are ignored by event ID, and a
confirmed cancellation/refund is never reopened by a late event.

## Connecting Stripe

Stripe supports international cards and USD settlement, but **check that Stripe is available to the organisation's
legal entity and bank account** at stripe.com/global. If Stripe cannot onboard the Kenyan trust, an alternative such
as Paystack, Flutterwave or Pesapal (or an account held by an eligible partner organisation) may be needed – see
"Other providers".

1. Create a Stripe account for the organisation and complete verification.
2. In **Developers → API keys**, copy the secret key (`sk_test_…` for sandbox first).
3. In **Developers → Webhooks**, add an endpoint `https://YOUR-DOMAIN/api/webhooks/stripe` with these events:
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`,
   `checkout.session.expired`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`, `charge.refunded`.
   Copy the signing secret (`whsec_…`).
4. Set environment variables: `PAYMENT_PROVIDER=stripe`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
   `NEXT_PUBLIC_SITE_URL`, `DATA_DIR`.
5. In **Settings → Customer emails**, turn on emails for successful payments (the site tells donors they will get an
   email confirmation). Do not describe them as tax receipts.
6. Optional: enable the **Customer portal** so supporters can cancel themselves; until then, cancellations are
   handled by staff in the Stripe dashboard (Subscriptions → Cancel).

### Sandbox testing (required before going live)
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe   # prints a whsec_ secret for local testing
stripe trigger checkout.session.completed
```
Test: card `4242 4242 4242 4242` (success), `4000 0000 0000 0341` (attaches but renewal fails),
`4000 0000 0000 9995` (declined). Re-send an event from the dashboard to confirm duplicates are ignored.
Unit tests (`npm test`) already cover signature checks, duplicates, failures, cancellation and refunds.

### Storage
The default store is a JSON file in `DATA_DIR` (created with owner-only permissions). It suits a single server.
**On serverless hosting (e.g. Vercel) the filesystem is not persistent** – implement the `RecordStore` interface in
`src/lib/payments/store.ts` with a database (e.g. Postgres/Supabase) before live payments. Keep `DATA_DIR` out of
any public folder and back it up. Stripe's dashboard remains the authoritative record of money received.

## Other providers (M-Pesa, Kenyan cards)

Add a provider in `src/lib/payments/provider.ts` (`startCheckout`) and a webhook route under
`src/app/api/webhooks/<provider>/route.ts` that verifies the provider's signature and updates the same record
store. Candidates: Safaricom Daraja (M-Pesa STK push – needs a Paybill/Till and Daraja production credentials),
Paystack, Flutterwave or Pesapal (cards + M-Pesa). Requirements are the same: hosted/secure payment page,
signed server-side callbacks, idempotent processing, no success state from a return URL alone.

## Bank transfer and M-Pesa Paybill (manual)

Fill `manualGiving` in `site.ts` and set `verified: true` only after checking the details against the account.
Manual gifts are not recorded by the website; staff should mark them received only after they appear on the
statement – a donor's reference alone is not proof of payment.

## Staff workflow (first version – no custom dashboard)

1. **New gift:** Stripe emails the organisation and the donor; the record appears in Stripe and in the store.
2. **New sponsorship:** filter Stripe subscriptions by product "Full monthly sponsorship". The quantity is the number
   of children. Contact the sponsor, pair them with a child through the agreed internal process, and note the pairing
   in a private register (not on the website).
3. **Updates:** prepare approved updates and send them privately (email). Never include identifying details beyond
   what the safeguarding policy allows.
4. **Failed renewals:** Stripe retries automatically and emails the supporter (enable in Settings → Billing).
5. **Cancellations/refunds:** action them in Stripe; the webhook updates the record. Confirm to the supporter only
   after Stripe shows the subscription cancelled.
