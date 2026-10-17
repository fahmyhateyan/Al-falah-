import { PolicyPage } from "@/components/PolicyPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Al-Falah collects, uses and protects the personal information of supporters and website visitors.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy policy" intro="How we collect, use and protect your personal information." approved={site.policies.privacyApproved}>
      <h2>Who we are</h2>
      <p>
        This website is operated on behalf of {site.fullName}. {site.trust.summary}
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li><strong>When you give:</strong> your name, email address, optional country and message, the amount, frequency and purpose of your gift, and payment status information from our payment provider.</li>
        <li><strong>When you contact us:</strong> your name, email address, optional phone number, enquiry type and message.</li>
        <li><strong>Card details:</strong> these are entered directly with our payment provider. We never see or store your full card number.</li>
      </ul>
      <h2>How we use your information</h2>
      <ul>
        <li>To process and acknowledge your donation or sponsorship.</li>
        <li>To manage sponsorships, including pairing and sending appropriate updates.</li>
        <li>To reply to your enquiries.</li>
        <li>To send you news about Al-Falah, only if you have given separate consent. You can withdraw consent at any time.</li>
      </ul>
      <h2>Sharing your information</h2>
      <p>
        We share information only with service providers that help us run this website and process payments and email, and only as needed
        for those purposes. We do not sell your personal information.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        This website does not use advertising or analytics cookies. Our payment provider may use cookies that are necessary to process your
        payment securely.
      </p>
      <h2>How long we keep information</h2>
      <p>Retention periods for supporter and enquiry records are to be confirmed and will be set out here.</p>
      <h2>Your rights</h2>
      <p>
        You can ask to see the personal information we hold about you, to correct it, or to have it deleted where we are not required to keep
        it. Please use our contact form to make a request.
      </p>
      <h2>Children&rsquo;s information</h2>
      <p>
        We do not publish identifying information about the children in our care. Photographs are published only with the school&rsquo;s
        approval. See our safeguarding page for more.
      </p>
      <h2>Contact</h2>
      <p>For any privacy question, please <a href="/contact">contact us</a>.</p>
    </PolicyPage>
  );
}
