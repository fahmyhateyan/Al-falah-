import { NextResponse } from "next/server";
import { emailConfigured, sendEnquiry } from "@/lib/email";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";
import { validateContact } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let input: Record<string, unknown>;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (looksLikeBot(input)) {
    return NextResponse.json({ ok: false, error: "Your message could not be sent. Please try again." }, { status: 400 });
  }
  if (rateLimited(`contact:${clientIp(req.headers)}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages from this connection. Please try again later." },
      { status: 429 },
    );
  }
  const result = validateContact(input);
  if (!result.ok) return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });

  if (!emailConfigured()) {
    // Never pretend a message was delivered.
    return NextResponse.json(
      { ok: false, error: "Our contact form is not connected yet, so your message has not been sent." },
      { status: 503 },
    );
  }
  try {
    const sent = await sendEnquiry(result.value);
    if (!sent) throw new Error("send failed");
  } catch {
    return NextResponse.json(
      { ok: false, error: "Sorry, your message could not be sent just now. Please try again later." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
