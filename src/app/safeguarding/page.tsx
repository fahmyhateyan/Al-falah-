import { PolicyPage } from "@/components/PolicyPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Safeguarding",
  description: "How Al-Falah protects the safety, privacy and dignity of the children in its care.",
  path: "/safeguarding",
});

export default function SafeguardingPage() {
  return (
    <PolicyPage
      title="Safeguarding"
      intro="The safety, privacy and dignity of every child in our care come first."
      approved={site.policies.safeguardingApproved}
    >
      <h2>Our commitment</h2>
      <p>
        Al-Falah is committed to keeping the children in its care safe from harm, and to treating each child with dignity and respect.
      </p>
      <h2>Children&rsquo;s privacy online</h2>
      <ul>
        <li>We do not publish children&rsquo;s names, dates of birth, personal histories or precise locations.</li>
        <li>Photographs are published only after approval by the school.</li>
        <li>We do not offer a public list of children for sponsors to choose from.</li>
      </ul>
      <h2>Sponsors and visitors</h2>
      <ul>
        <li>Sponsors do not contact children directly. Any contact is managed by school staff.</li>
        <li>Information shared with sponsors is prepared and approved by staff.</li>
        <li>Arrangements for visitors to the school are to be confirmed.</li>
      </ul>
      <h2>Staff and volunteers</h2>
      <p>Details of safer recruitment, training and supervision are to be confirmed and will be published here.</p>
      <h2>Raising a concern</h2>
      <p>
        If you have a concern about the safety or wellbeing of a child connected with Al-Falah, please <a href="/contact">contact us</a>{" "}
        straight away. A dedicated safeguarding contact is to be confirmed. If a child is in immediate danger, contact the local emergency services.
      </p>
    </PolicyPage>
  );
}
