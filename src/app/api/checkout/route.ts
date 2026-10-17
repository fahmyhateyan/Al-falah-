import { NextResponse } from "next/server";
import { startCheckout } from "@/lib/payments/provider";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";
import { validateDonation, validateSponsorship } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let input: Record<string, unknown>;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (looksLikeBot(input, 1500)) {
    return NextResponse.json({ ok: false, error: "Checkout could not be started. Please try again." }, { status: 400 });
  }
  if (rateLimited(`checkout:${clientIp(req.headers)}`, 15)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Please wait a few minutes." }, { status: 429 });
  }
  const result =
    input.kind === "sponsorship"
      ? validateSponsorship(input)
      : input.kind === "donation"
        ? validateDonation(input)
        : ({ ok: false, errors: { kind: "Unknown checkout type." } } as const);
  if (!result.ok) return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });

  try {
    const checkout = await startCheckout(result.value, new URL(req.url).origin);
    if (!checkout.ok) return NextResponse.json({ ok: false, error: checkout.error }, { status: checkout.status });
    return NextResponse.json({ ok: true, redirectUrl: checkout.redirectUrl, mode: checkout.mode });
  } catch {
    console.error("[checkout] Unexpected error starting checkout");
    return NextResponse.json({ ok: false, error: "Checkout could not be started. Please try again." }, { status: 500 });
  }
}
