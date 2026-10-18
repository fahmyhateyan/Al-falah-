import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { getStore } from "@/lib/payments/store";
import type { PaymentStatus } from "@/lib/payments/types";

export const metadata: Metadata = { title: "Thank you", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

/**
 * Landing page after the provider redirects back. Arriving here does NOT mark
 * anything as paid – only a verified webhook does. We show the status the
 * webhook has recorded so far (no personal details are displayed).
 */
export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  let status: PaymentStatus | null = null;
  if (ref && /^AF-[0-9A-F]{12}$/.test(ref)) {
    try {
      status = (await getStore().get(ref))?.status ?? null;
    } catch {
      status = null;
    }
  }
  const confirmed = status === "paid" || status === "active";
  const failed = status === "failed" || status === "expired";

  return (
    <section className="bg-mist-100 py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <div className="card" role="status">
          {confirmed ? (
            <>
              <h1 className="text-3xl font-bold sm:text-4xl">Thank you – your gift is confirmed</h1>
              <p className="mt-4 text-lg text-forest-900/85">
                Your payment has been confirmed{status === "active" ? " and your monthly gift is set up" : ""}. A confirmation will be sent to
                your email address.
              </p>
            </>
          ) : failed ? (
            <>
              <h1 className="text-3xl font-bold sm:text-4xl">Your payment was not completed</h1>
              <p className="mt-4 text-lg text-forest-900/85">No payment has been confirmed. You are welcome to try again.</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold sm:text-4xl">Thank you – we are confirming your payment</h1>
              <p className="mt-4 text-lg text-forest-900/85">
                We are waiting for confirmation from our payment provider. This usually takes a moment. You will receive an email once your
                payment has been confirmed.
              </p>
            </>
          )}
          {ref && <p className="mt-4 text-sm text-forest-800/70">Your reference: {ref}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Return home</ButtonLink>
            <ButtonLink href="/school-life" variant="secondary">See school life</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
