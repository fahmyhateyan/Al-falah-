import Image from "next/image";
import Link from "next/link";
import { mainNav, policyNav, site } from "@/config/site";
import { IconMail, IconPhone, IconPin } from "./Icons";

const socialLabels: Record<keyof typeof site.social, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  x: "X (Twitter)",
  tiktok: "TikTok",
};

export function Footer() {
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[]).filter((k) => site.social[k]);
  const { contact, trust } = site;
  return (
    <footer className="bg-forest-950 text-ivory-100">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="inline-flex rounded-2xl bg-ivory-50 px-5 py-4">
            <Image src="/images/brand/logo-full-transparent.png" alt={`${site.fullName} – ${site.tagline}`} width={505} height={329} className="h-auto w-44" />
          </div>
          <p className="mt-6 max-w-sm text-ivory-200/85">
            A caring home and an education for orphaned and needy boys in {site.location.area}, {site.location.region}. Established in {site.foundedYear}.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-leaf-200">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {mainNav.map((l) => (
              <li key={l.href}><Link className="text-ivory-100/90 hover:text-white hover:underline" href={l.href}>{l.label}</Link></li>
            ))}
            <li><Link className="text-ivory-100/90 hover:text-white hover:underline" href="/donate">Donate</Link></li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-leaf-200">Contact</h2>
          <ul className="mt-4 space-y-3 text-ivory-100/90">
            <li className="flex gap-3"><IconPin className="mt-1 h-5 w-5 shrink-0 text-leaf-400" />{site.location.publicAddress ?? `${site.location.area}, ${site.location.region}`}</li>
            {contact.email && (
              <li className="flex gap-3"><IconMail className="mt-1 h-5 w-5 shrink-0 text-leaf-400" /><a className="hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a></li>
            )}
            {contact.phone && (
              <li className="flex gap-3"><IconPhone className="mt-1 h-5 w-5 shrink-0 text-leaf-400" /><a className="hover:underline" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></li>
            )}
            <li><Link href="/contact" className="font-semibold text-ivory-50 underline decoration-leaf-400 underline-offset-4">Send us a message</Link></li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {socials.map((k) => (
                <li key={k}><a className="rounded-full px-3 py-1.5 text-sm ring-1 ring-ivory-50/30 hover:bg-ivory-50/10" href={site.social[k]!} rel="noopener noreferrer" target="_blank">{socialLabels[k]}</a></li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-leaf-200">The trust</h2>
          <p className="mt-4 text-sm text-ivory-100/85">{trust.summary}</p>
          {trust.publishRegistration && (
            <p className="mt-3 text-sm text-ivory-100/70">
              Registered as &ldquo;{trust.registeredName}&rdquo; under the Trustees (Perpetual Succession) Act, Kenya. Registration&nbsp;no.&nbsp;{trust.registrationNumber}.
            </p>
          )}
          <Link href="/about#trust" className="mt-3 inline-block text-sm font-semibold text-ivory-50 underline decoration-leaf-400 underline-offset-4">How we operate</Link>
        </div>
      </div>
      <div className="border-t border-ivory-50/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-ivory-100/70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.fullName}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {policyNav.map((l) => (
              <li key={l.href}><Link className="hover:text-white hover:underline" href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
