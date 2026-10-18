import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { site } from "@/config/site";
import { formatMoney } from "@/lib/pricing";

export const metadata: Metadata = { title: "Demo checkout", robots: { index: false, follow: false } };

export default async function DemoCheckoutPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const p = await searchParams;
  const amount = Number(p.amount);
  const children = Number(p.children);
  const monthly = p.frequency === "monthly";
  const sponsorship = p.kind === "sponsorship";
  const valid = Number.isFinite(amount) && amount > 0;
  return (
    <section className="bg-mist-100 py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <div className="card">
          <p className="inline-flex rounded-full bg-sprout-300/50 px-3 py-1 text-sm font-semibold text-forest-950">Demonstration only</p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">No payment has been taken</h1>
          <p className="mt-4 text-lg text-forest-900/85">
            Online payments for {site.name} are not yet connected, so this is a demonstration of the checkout journey. No money has been
            charged and no payment has been recorded.
          </p>
          {valid && (
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-2xl bg-mist-100 p-5">
              <dt className="font-semibold">Type</dt>
              <dd>{sponsorship ? (monthly ? "Full monthly sponsorship" : "Support one month") : "General donation"}</dd>
              {sponsorship && Number.isInteger(children) && (
                <>
                  <dt className="font-semibold">Children</dt>
                  <dd>{children}</dd>
                </>
              )}
              <dt className="font-semibold">Amount</dt>
              <dd>
                {formatMoney(amount)} {monthly ? "every month (recurring)" : "once (not recurring)"}
              </dd>
            </dl>
          )}
          <p className="mt-6 text-forest-900/80">
            When payments go live, this step will take you to our payment provider&rsquo;s secure page to complete your gift.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={sponsorship ? "/sponsor-a-child" : "/donate"}>Back to the form</ButtonLink>
            <ButtonLink href="/" variant="secondary">Return home</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
