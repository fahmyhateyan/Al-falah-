import { PolicyPage } from "@/components/PolicyPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { sponsorshipPrice } from "@/lib/pricing";

export const metadata = pageMetadata({
  title: "Donation and Sponsorship Terms",
  description: "Terms for donations and child sponsorship at Al-Falah, including recurring payments, cancellation and refunds.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PolicyPage
      title="Donation and sponsorship terms"
      intro="What to expect when you give to Al-Falah, including how recurring payments and cancellations work."
      approved={site.policies.termsApproved}
    >
      <h2>Full monthly sponsorship</h2>
      <p>
        Full sponsorship is {sponsorshipPrice()} per child per month, charged in {site.sponsorship.currency}. Monthly sponsorship is a
        recurring payment taken each month until you cancel. Sponsorship supports a child&rsquo;s month of care, boarding, food, primary
        education and Qur&rsquo;an learning, including the staff and running costs that make that care possible.
      </p>
      {site.sponsorship.allowOneMonthSupport && (
        <>
          <h3>Support one month</h3>
          <p>&ldquo;Support one month&rdquo; is a single, one-off payment of {sponsorshipPrice()} per child. It does not create a recurring payment.</p>
        </>
      )}
      <h3>Pairing and updates</h3>
      <p>
        Sponsors are paired with a child by school staff. We aim to share periodic, appropriate updates on your sponsored child&rsquo;s
        wellbeing and learning, shared privately. The frequency and format of updates are to be confirmed. Sponsors do not have direct contact
        with children.
      </p>
      <h2>General donations</h2>
      <p>
        Donations to the general school support fund are used for the general costs of running Al-Falah. You can give once or monthly.
      </p>
      <h2>Cancelling a monthly gift</h2>
      <p>
        You can cancel a monthly sponsorship or donation at any time by contacting us. We will confirm when the cancellation has been processed
        by our payment provider. Payments already taken before cancellation are not normally refunded.
      </p>
      <h2>Refunds and mistakes</h2>
      <p>If you have made a mistake with a gift, please contact us as soon as possible. Our refund approach is to be confirmed.</p>
      <h2>Fees and currency</h2>
      <p>
        Payment processing fees are deducted by payment providers. If your card is not in US dollars, your bank may convert the amount and
        charge a fee.
      </p>
      <h2>Tax</h2>
      <p>
        Al-Falah&rsquo;s trust is registered in Kenya. We do not currently claim UK Gift Aid, and gifts are not represented as tax-deductible
        in the US or elsewhere. Receipts are confirmations of your gift, not tax receipts.
      </p>
      <h2>Manual transfers</h2>
      <p>Bank transfers and mobile money gifts are recorded as received only once they have been matched with our account records.</p>
    </PolicyPage>
  );
}
