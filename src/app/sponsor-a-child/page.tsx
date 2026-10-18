import Link from "next/link";
import { GivingCta, Section, SectionHeading } from "@/components/Blocks";
import { Faq } from "@/components/Faq";
import { GiveSwitch } from "@/components/GiveSwitch";
import { SponsorForm } from "@/components/forms/SponsorForm";
import { IconBook, IconBowl, IconCheck, IconHome, IconPencil, IconShield } from "@/components/Icons";
import { MediaFrame } from "@/components/MediaFrame";
import { site } from "@/config/site";
import { sponsorFaq } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";
import { isDemoMode } from "@/lib/payments/provider";
import { formatMoney, sponsorshipPrice, sponsorshipTotal } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Sponsor a Child",
  description: `Sponsor a boy at Al-Falah for ${sponsorshipPrice()} a month – a full month of care, boarding, food, primary education and Qur'an learning in Kikambala, Kenya.`,
  path: "/sponsor-a-child",
});

const steps = [
  { title: "Choose your sponsorship", text: "Decide how many children you would like to sponsor and whether to give monthly." },
  { title: "Enter your details", text: "Tell us your name and email so we can confirm your sponsorship and keep in touch." },
  { title: "Pay securely", text: "Complete payment through our secure payment provider. We never see your card details." },
  { title: "Receive confirmation", text: "Once your payment is confirmed, you will receive an email confirmation." },
  { title: "Be paired by our staff", text: "School staff pair you with a boy in our care and explain how you will hear about his progress." },
];

export default function SponsorPage() {
  const price = sponsorshipPrice();
  return (
    <>
      <section className="relative overflow-hidden bg-ivory-100">
        <div className="pattern-dots absolute inset-0 opacity-50" aria-hidden />
        <div className="container-page relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">Sponsor a child</p>
            <h1 className="h-display">Sponsor a child for {price} a month</h1>
            <p className="lead mt-6">
              Your sponsorship supports a full month of care for one boy at Al-Falah – a safe place to sleep, daily meals, a primary
              education and Qur&rsquo;an learning. It is full monthly sponsorship: one gift that covers a child&rsquo;s whole month.
            </p>
            <p className="mt-4 text-forest-900/85">
              Would you like to give a different amount?{" "}
              <Link href="/donate" className="font-semibold text-forest-800 underline decoration-leaf-500 decoration-2 underline-offset-4">
                Make a donation of any size
              </Link>
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                [IconHome, "Care and boarding"],
                [IconBowl, "Food every day"],
                [IconPencil, "Primary education"],
                [IconBook, "Qur'an learning"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof IconHome;
                return (
                  <li key={label as string} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-forest-900/5">
                    <I className="h-6 w-6 text-forest-700" />
                    <span className="font-semibold">{label as string}</span>
                  </li>
                );
              })}
            </ul>
            <MediaFrame id="sponsor-hero" className="mt-8 hidden aspect-[16/10] w-full rounded-4xl lg:block" />
          </div>
          <div id="sponsor-form" className="scroll-mt-24">
            <div className="card lg:sticky lg:top-24">
              <GiveSwitch active="sponsor" />
              <h2 className="mt-6 text-2xl font-bold">Start your sponsorship</h2>
              <p className="mt-1 text-forest-900/80">
                1 child {price}/month · 2 children {formatMoney(sponsorshipTotal(2))}/month · and so on
              </p>
              <div className="mt-6">
                <SponsorForm demo={isDemoMode()} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="how-it-works" tone="white" labelledBy="how-title">
        <SectionHeading eyebrow="How sponsorship works" title="From your first gift to staff-managed pairing" id="how-title">
          <p>A simple, careful process designed around the wellbeing of the children.</p>
        </SectionHeading>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-3xl bg-ivory-100 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 font-serif font-bold text-ivory-50">{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-forest-900/80">{s.text}</p>
            </li>
          ))}
        </ol>
        {!site.sponsorship.pairingProcessConfirmed && (
          <p className="mt-6 text-sm text-forest-800/80">
            We are finalising the details of pairing and updates, and will explain them personally after you sponsor.
          </p>
        )}
      </Section>

      <Section tone="cream" labelledBy="privacy-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-800 text-ivory-50">
              <IconShield className="h-7 w-7" />
            </span>
            <h2 id="privacy-title" className="h-section mt-6">Protecting every child&rsquo;s privacy</h2>
            <p className="mt-5 text-lg text-forest-900/80">
              We do not publish profiles, names, birthdays or personal stories of the boys in our care, and we do not ask sponsors to choose a
              child from a list. Pairing is handled by staff who know the children, so that every boy is supported with dignity.
            </p>
          </div>
          <ul className="grid content-start gap-4">
            {[
              "Updates are periodic and appropriate, prepared and approved by school staff.",
              "Any information about your sponsored child is shared privately and securely – never published.",
              "Sponsors do not contact children directly; any contact is managed by the school.",
              "Your sponsorship supports the full cost of a child's month at Al-Falah, including the care and running costs that make it possible.",
            ].map((t) => (
              <li key={t} className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-forest-900/5">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="ivory" labelledBy="sfaq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading eyebrow="Questions" title="Sponsorship FAQs" id="sfaq-title">
            <p>
              Prefer to give a different amount? <Link href="/donate" className="font-semibold text-forest-800 underline underline-offset-4">Make a general donation</Link>.
            </p>
          </SectionHeading>
          <Faq items={sponsorFaq} />
        </div>
      </Section>

      <GivingCta title="Ready to sponsor?">
        <p>
          {price} a month gives one boy a full month of care and learning.{" "}
          <a href="#sponsor-form" className="font-semibold text-ivory-50 underline decoration-leaf-400 underline-offset-4">Start now</a>
        </p>
      </GivingCta>
    </>
  );
}
