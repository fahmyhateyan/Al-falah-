import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = { title: "Checkout cancelled", robots: { index: false, follow: false } };

export default async function CancelledPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { kind } = await searchParams;
  return (
    <section className="bg-mist-100 py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <div className="card">
          <h1 className="text-3xl font-bold sm:text-4xl">Checkout cancelled</h1>
          <p className="mt-4 text-lg text-forest-900/85">You left the payment page before completing it, so no payment has been taken.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={kind === "sponsorship" ? "/sponsor-a-child" : "/donate"}>Try again</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Ask us a question</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
