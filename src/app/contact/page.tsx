import { PageHero, Section } from "@/components/Blocks";
import { ContactForm } from "@/components/forms/ContactForm";
import { IconMail, IconPhone, IconPin } from "@/components/Icons";
import { MediaFrame } from "@/components/MediaFrame";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Get in touch with Al-Falah School, Kikambala about sponsorship, donations, partnerships or general enquiries.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const { contact, location, social } = site;
  const socials = Object.entries(social).filter(([, v]) => v) as [string, string][];
  return (
    <>
      <PageHero eyebrow="Contact us" title="We would love to hear from you">
        <p>Whether you have a question about sponsorship, giving, partnerships or the school itself, send us a message and we will reply.</p>
      </PageHero>
      <Section tone="white" labelledBy="form-title">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 id="form-title" className="text-2xl font-bold">Send an enquiry</h2>
            <div className="mt-6">
              <ContactForm initialType={type} />
            </div>
          </div>
          <aside className="space-y-6">
            <div className="card space-y-4">
              <h2 className="text-xl font-bold">Where we are</h2>
              <p className="flex gap-3">
                <IconPin className="mt-1 h-5 w-5 shrink-0 text-forest-700" />
                <span>{location.publicAddress ?? `${location.area}, ${location.region}, ${location.country}`}</span>
              </p>
              {contact.email && (
                <p className="flex gap-3">
                  <IconMail className="mt-1 h-5 w-5 shrink-0 text-forest-700" />
                  <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              )}
              {contact.phone && (
                <p className="flex gap-3">
                  <IconPhone className="mt-1 h-5 w-5 shrink-0 text-forest-700" />
                  <a className="underline underline-offset-4" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                </p>
              )}
              {contact.whatsapp && (
                <a className="inline-flex min-h-[44px] items-center rounded-full bg-forest-800 px-5 font-semibold text-mist-50" href={`https://wa.me/${contact.whatsapp}`} rel="noopener noreferrer" target="_blank">
                  Message us on WhatsApp
                </a>
              )}
              {socials.length > 0 && (
                <ul className="flex flex-wrap gap-2 pt-2">
                  {socials.map(([k, v]) => (
                    <li key={k}><a href={v} className="rounded-full px-3 py-1.5 text-sm capitalize ring-1 ring-forest-900/20 hover:bg-forest-50" rel="noopener noreferrer" target="_blank">{k}</a></li>
                  ))}
                </ul>
              )}
            </div>
            {location.mapEmbedUrl ? (
              <iframe src={location.mapEmbedUrl} title="Map showing the location of Al-Falah" loading="lazy" className="aspect-[4/3] w-full rounded-3xl border-0" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <MediaFrame id="contact-image" className="aspect-[4/3] w-full rounded-3xl" sizes="(min-width: 1024px) 35vw, 100vw" />
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
