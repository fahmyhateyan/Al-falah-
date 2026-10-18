import Link from "next/link";
import { Section, SectionHeading } from "@/components/Blocks";
import { DonateForm } from "@/components/forms/DonateForm";
import { GiveSwitch } from "@/components/GiveSwitch";
import { IconHeart } from "@/components/Icons";
import { MediaFrame } from "@/components/MediaFrame";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { isDemoMode } from "@/lib/payments/provider";
import { sponsorshipPrice } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Donate",
  description:
    "Make a one-off or monthly gift to Al-Falah's general school support fund, helping provide care, boarding, meals and education for orphaned and needy boys in Kikambala, Kenya.",
  path: "/donate",
});

export default function DonatePage() {
  const { manualGiving } = site;
  const demo = isDemoMode();
  const showManual = manualGiving.verified && (manualGiving.bankTransfer || manualGiving.mpesaPaybill);
  return (
    <>
      <section className="relative overflow-hidden bg-mist-100">
        <div className="pattern-dots absolute inset-0 opacity-50" aria-hidden />
        <div className="container-page relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">Donate</p>
            <h1 className="h-display">Give to the general school fund</h1>
            <p className="lead mt-6">
              A gift of any size helps meet the everyday costs of running Al-Falah – caring for the boys, feeding them, and keeping them
              learning in the classroom and in Qur&rsquo;an lessons.
            </p>
            <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-forest-900/5">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-leaf-100 text-forest-800">
                  <IconHeart className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-xl font-bold">Donation or sponsorship?</h2>
                  <p className="mt-2 text-forest-900/80">
                    A <strong>donation</strong> supports the school as a whole, in any amount. <strong>Full sponsorship</strong> is{" "}
                    {sponsorshipPrice()} a month and covers one boy&rsquo;s entire month of care and learning.
                  </p>
                  <Link href="/sponsor-a-child" className="link-arrow mt-4">
                    Sponsor a child instead
                  </Link>
                </div>
              </div>
            </div>
            <MediaFrame id="donate-hero" className="mt-8 hidden aspect-[16/10] w-full rounded-4xl lg:block" />
          </div>
          <div className="card h-fit lg:sticky lg:top-24">
            <GiveSwitch active="donate" />
            <h2 className="mt-6 text-2xl font-bold">Make a donation</h2>
            <div className="mt-6">
              <DonateForm demo={demo} />
            </div>
          </div>
        </div>
      </section>

      <Section tone="white" labelledBy="ways-title">
        <SectionHeading eyebrow="Ways to give" title="Giving from Kenya and abroad" id="ways-title">
          <p>
            {demo
              ? "Online card giving is being set up. When it opens, gifts will be taken in US dollars through a secure payment provider."
              : "Online gifts are taken in US dollars by card through a secure payment provider."}{" "}
            If your card is in another currency, your bank may convert the amount and charge its own fee.
          </p>
        </SectionHeading>
        {showManual ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {manualGiving.bankTransfer && (
              <div className="card">
                <h3 className="text-xl font-bold">Bank transfer</h3>
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                  <dt className="font-semibold">Account name</dt><dd>{manualGiving.bankTransfer.accountName}</dd>
                  <dt className="font-semibold">Bank</dt><dd>{manualGiving.bankTransfer.bankName}</dd>
                  <dt className="font-semibold">Account no.</dt><dd>{manualGiving.bankTransfer.accountNumber}</dd>
                  {manualGiving.bankTransfer.branch && (<><dt className="font-semibold">Branch</dt><dd>{manualGiving.bankTransfer.branch}</dd></>)}
                  {manualGiving.bankTransfer.swift && (<><dt className="font-semibold">SWIFT</dt><dd>{manualGiving.bankTransfer.swift}</dd></>)}
                  <dt className="font-semibold">Currency</dt><dd>{manualGiving.bankTransfer.currency}</dd>
                </dl>
              </div>
            )}
            {manualGiving.mpesaPaybill && (
              <div className="card">
                <h3 className="text-xl font-bold">M-Pesa</h3>
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                  <dt className="font-semibold">Paybill</dt><dd>{manualGiving.mpesaPaybill.paybill}</dd>
                  <dt className="font-semibold">Account</dt><dd>{manualGiving.mpesaPaybill.accountReference}</dd>
                </dl>
              </div>
            )}
            <p className="text-sm text-forest-800/80 md:col-span-2">
              Transfers are confirmed once they have been matched with our account records. Please <Link href="/contact?type=Donations" className="underline">let us know</Link> when you have sent a transfer so we can thank you.
            </p>
          </div>
        ) : (
          <p className="mt-8 max-w-2xl text-forest-900/80">
            We are setting up bank transfer and M-Pesa options. In the meantime, if you would prefer to give by another method, please{" "}
            <Link href="/contact?type=Donations" className="font-semibold text-forest-800 underline underline-offset-4">contact us</Link>.
          </p>
        )}
      </Section>
    </>
  );
}
