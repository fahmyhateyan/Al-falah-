import Image from "next/image";
import Link from "next/link";
import { GivingCta, PageHero, Section, SectionHeading } from "@/components/Blocks";
import { MediaFrame } from "@/components/MediaFrame";
import { approvedMedia, type MediaId } from "@/config/media";
import { founderNames, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description: `Founded in ${site.foundedYear}, Al-Falah cares for and educates orphaned and needy boys in ${site.location.area}, Kenya. Our story, founders, mission and the trust that supports our work.`,
  path: "/about",
});

const subnav = [
  { href: "#story", label: "Our story" },
  { href: "#founders", label: "Our founders" },
  { href: "#mission", label: "Our mission" },
  { href: "#trust", label: "The trust" },
  { href: "#education", label: "Education" },
];

export default function AboutPage() {
  const { trust } = site;
  return (
    <>
      <PageHero eyebrow="About us" title="Care, learning and faith – together under one roof" media="about-hero">
        <p>
          Al-Falah began in {site.foundedYear} with a simple aim: to give orphaned and needy boys in {site.location.area} a home, an
          education and a firm grounding in their faith.
        </p>
      </PageHero>

      <nav aria-label="On this page" className="sticky top-[72px] z-30 border-b border-forest-900/10 bg-white/95 backdrop-blur">
        <ul className="container-page flex gap-1 overflow-x-auto py-2 text-sm font-medium [scrollbar-width:none]">
          {subnav.map((s) => (
            <li key={s.href} className="shrink-0">
              <a href={s.href} className="block rounded-full px-4 py-2 text-forest-800 hover:bg-forest-50">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="story" tone="white" labelledBy="story-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our story" title="How Al-Falah began" id="story-title">
              <p>
                Al-Falah was founded in {site.foundedYear} by {founderNames()}. They set out to support orphaned and needy boys through two
                things that change a child&rsquo;s life: dependable daily care and a good education.
              </p>
              <p className="mt-4">
                The school is in {site.location.area}, a coastal community north of Mombasa. Here, boys board at the school, where they are
                fed, cared for and taught – combining primary education with Qur&rsquo;an learning and the wider teachings of Islam.
              </p>
              <p className="mt-4">
                The name Al-Falah speaks of success and true well-being, and the school&rsquo;s motto – &ldquo;{site.tagline}&rdquo; – sums up
                its belief that knowledge, of this world and of faith, opens the way to a good life.
              </p>
            </SectionHeading>
          </div>
          <MediaFrame id="about-story" className="aspect-[4/3] w-full rounded-4xl lg:aspect-[4/5]" />
        </div>
      </Section>

      <Section id="founders" tone="cream" labelledBy="founders-title">
        <SectionHeading eyebrow="Our founders" title="The people behind Al-Falah" id="founders-title">
          <p>Al-Falah was founded by a husband and wife committed to the welfare and education of children in need.</p>
        </SectionHeading>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {site.founders.map((f) => {
            const photo = f.photo ? approvedMedia(f.photo as MediaId) : null;
            return (
              <li key={f.name} className="card flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-leaf-100">
                  {photo ? (
                    <Image src={photo.src} alt={photo.alt} fill sizes="112px" className="object-cover" style={{ objectPosition: photo.focus ?? "50% 50%" }} />
                  ) : (
                    <div aria-hidden className="flex h-full w-full items-center justify-center bg-forest-800 font-serif text-2xl text-ivory-50">
                      {f.name.replace(/^Dr\.?\s*/, "").split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{f.name}</h3>
                  <p className="text-forest-800/80">{f.role ?? "Co-founder"}</p>
                  {f.bio && <p className="mt-2 text-forest-900/80">{f.bio}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="mission" tone="white" labelledBy="mission-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Our mission" title="A secure childhood, a sound education, strong character" id="mission-title" />
          <div className="space-y-6 text-lg text-forest-900/85">
            <p>
              Our mission is to give orphaned and needy boys the security, learning and values they need for a good future. We do this
              through:
            </p>
            <ul className="grid gap-4">
              {[
                ["Daily welfare", "boarding, regular meals and attentive care, so that every boy is safe and settled."],
                ["Learning", "a primary education following the Kenyan curriculum, building the skills every child needs."],
                ["Islamic development", "Qur'an reading and memorisation, Islamic studies, and the nurturing of good character, manners and values."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-2xl bg-ivory-100 p-5">
                  <span className="font-serif font-bold text-forest-900">{t}</span> – {d}
                </li>
              ))}
            </ul>
            <p>
              Caring for orphans holds a special place in Islam, and it sits at the heart of why Al-Falah exists. We hope the knowledge and
              Qur&rsquo;an learning each boy gains here will benefit him, his family and his community for the rest of his life.
            </p>
          </div>
        </div>
      </Section>

      <Section id="trust" tone="cream" labelledBy="trust-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="The trust and how we operate" title="A trust structure for the long term" id="trust-title">
            <p>{trust.summary}</p>
          </SectionHeading>
          <div className="space-y-6">
            {trust.publishRegistration && (
              <dl className="card grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold uppercase tracking-wider text-forest-700">Registered name</dt>
                  <dd className="mt-1 font-serif text-lg font-bold">{trust.registeredName}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold uppercase tracking-wider text-forest-700">Legal form</dt>
                  <dd className="mt-1">{trust.legalForm}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-forest-700">Registration number</dt>
                  <dd className="mt-1">{trust.registrationNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-forest-700">Registered</dt>
                  <dd className="mt-1">{trust.registrationDate}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold uppercase tracking-wider text-forest-700">Objects of the trust</dt>
                  <dd className="mt-1">
                    <ul className="list-disc pl-5">
                      {trust.objects.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                {trust.publishTrustees && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-semibold uppercase tracking-wider text-forest-700">Trustees</dt>
                    <dd className="mt-1">{trust.trustees.join(", ")}</dd>
                  </div>
                )}
              </dl>
            )}
            <div className="space-y-4 text-lg text-forest-900/85">
              <p>
                The trust provides a stable framework for raising and managing funds for the school&rsquo;s educational and welfare work.
                Gifts made through this website support Al-Falah&rsquo;s work with the children in its care.
              </p>
              {trust.relationshipToSchool && <p>{trust.relationshipToSchool}</p>}
              {trust.governance && <p>{trust.governance}</p>}
              <p>
                If you would like more information about how Al-Falah is governed, please <Link href="/contact" className="font-semibold text-forest-800 underline underline-offset-4">contact us</Link>.
              </p>
            </div>
            {trust.publishedDocument && (
              <a href={trust.publishedDocument.href} className="link-arrow">
                {trust.publishedDocument.label}
              </a>
            )}
          </div>
        </div>
      </Section>

      <Section id="education" tone="white" labelledBy="education-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MediaFrame id="about-education" className="aspect-[4/3] w-full rounded-4xl" />
          <div>
            <SectionHeading eyebrow="Education at Al-Falah" title="Academic learning and Islamic education, side by side" id="education-title">
              <p>
                Al-Falah combines primary education under the Kenyan Competency-Based Education curriculum with a comprehensive Islamic
                education: Madrasa studies (Ta&rsquo;lim), Arabic, and Qur&rsquo;an reading and memorisation (Tahfidh) with Tajweed.
              </p>
              <p className="mt-4">
                Both strands run concurrently, so that each boy grows in knowledge, faith and good character together.
              </p>
            </SectionHeading>
            <Link href="/curriculum" className="link-arrow mt-8">
              Explore our curriculum
            </Link>
          </div>
        </div>
      </Section>

      <GivingCta title="Be part of Al-Falah's story">
        <p>Your support keeps boys in care and in school. Choose full monthly sponsorship or a gift of any size.</p>
      </GivingCta>
    </>
  );
}

