import Link from "next/link";
import type { FaqItem } from "@/components/Faq";
import { site } from "@/config/site";
import { formatMoney, sponsorshipPrice, sponsorshipTotal } from "@/lib/pricing";

/**
 * FAQ answers must reflect what is actually implemented and confirmed.
 * Update these when pairing, update and cancellation processes are approved.
 */

const price = sponsorshipPrice();

const inclusions = (
  <p>
    Full monthly sponsorship ({price} a month per child) supports one boy&rsquo;s month of care at Al-Falah: boarding, daily meals,
    primary education and Qur&rsquo;an learning, within a safe and supportive environment.
  </p>
);

const updates = (
  <p>
    We intend to share periodic, appropriate updates on your sponsored child&rsquo;s wellbeing and learning. To protect the children&rsquo;s
    privacy, updates are prepared and approved by school staff and shared privately – never published. We are finalising the details of
    how and how often updates are sent, and will explain them when you sponsor.
  </p>
);

const cancellation = (
  <p>
    You can stop a monthly sponsorship or donation at any time by <Link href="/contact">contacting us</Link>. We will tell you once the
    cancellation has been confirmed by our payment provider; no further monthly payments will be taken after that point. Full details are
    in our <Link href="/terms">donation and sponsorship terms</Link>.
  </p>
);

export const homeFaq: FaqItem[] = [
  {
    q: "How much does it cost to sponsor a child?",
    a: (
      <p>
        Full sponsorship is {price} a month per child. You can sponsor more than one boy – two children is{" "}
        {formatMoney(sponsorshipTotal(2))} a month, three is {formatMoney(sponsorshipTotal(3))}, and so on.
      </p>
    ),
  },
  { q: "What does sponsorship include?", a: inclusions },
  {
    q: "Can I make a one-off donation instead?",
    a: (
      <p>
        Yes. A <Link href="/donate">one-off donation</Link> of any amount supports the general school fund, which helps with the everyday
        costs of care and learning. You can also choose to give monthly.
      </p>
    ),
  },
  {
    q: "Can I give from outside Kenya?",
    a: (
      <p>
        Yes. Al-Falah welcomes supporters in Kenya, the UK, the US and around the world. Online gifts are charged in US dollars; your card
        provider may apply its own currency conversion fee. Al-Falah&rsquo;s trust is registered in Kenya, and we cannot currently offer tax relief
        schemes such as UK Gift Aid or US tax deductions.
      </p>
    ),
  },
  { q: "Will I receive updates about my sponsored child?", a: updates },
];

export const sponsorFaq: FaqItem[] = [
  { q: "What does my sponsorship cover?", a: inclusions },
  {
    q: "How am I paired with a child?",
    a: (
      <p>
        Pairing is managed by school staff, who match each new sponsor with a boy in the school&rsquo;s care. We do not publish profiles of
        children or ask sponsors to choose from a list – this protects the boys&rsquo; dignity and privacy.
        {!site.sponsorship.pairingProcessConfirmed && " We will contact you after your first payment to explain the next steps."}
      </p>
    ),
  },
  { q: "Will I receive updates?", a: updates },
  {
    q: "Can I sponsor more than one child?",
    a: (
      <p>
        Yes. Choose the number of children on this page and the total updates automatically: {price} for one child,{" "}
        {formatMoney(sponsorshipTotal(2))} for two, and so on, up to {site.sponsorship.maxChildrenPerCheckout} children in a single
        sponsorship. For more, please <Link href="/contact">get in touch</Link>.
      </p>
    ),
  },
  ...(site.sponsorship.allowOneMonthSupport
    ? [
        {
          q: "What is “Support one month”?",
          a: (
            <p>
              &ldquo;Support one month&rdquo; is a single payment of {price} per child that covers one month of a boy&rsquo;s care and
              learning. It is charged once and does not set up a recurring payment.
            </p>
          ),
        },
      ]
    : []),
  { q: "How do I cancel?", a: cancellation },
  {
    q: "Can I write to or visit my sponsored child?",
    a: (
      <p>
        To keep children safe, sponsors do not contact children directly. Any contact is managed by school staff in line
        with our <Link href="/safeguarding">safeguarding approach</Link>.
      </p>
    ),
  },
];
