import { NextResponse } from "next/server";
import { verifyStripeSignature } from "@/lib/payments/stripe-signature";
import { getStore } from "@/lib/payments/store";
import { processStripeEvent, type StripeEvent } from "@/lib/payments/webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhooks not configured" }, { status: 503 });

  const payload = await req.text();
  if (!verifyStripeSignature(payload, req.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  let event: StripeEvent;
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  try {
    const outcome = await processStripeEvent(getStore(), event);
    // Log identifiers only – never supporter details.
    console.info(`[webhook] ${event.type} ${event.id}: ${outcome}`);
    return NextResponse.json({ received: true, outcome });
  } catch {
    console.error(`[webhook] Failed to process ${event.id}`);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
