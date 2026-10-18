import Image from "next/image";
import Link from "next/link";
import { GivingCta, Section, SectionHeading } from "@/components/Blocks";
import { ButtonLink } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { IconBook, IconBowl, IconCheck, IconHeart, IconHome, IconPencil, IconShield } from "@/components/Icons";
import { MediaFrame, Placeholder } from "@/components/MediaFrame";
import { VideoPlayer } from "@/components/VideoPlayer";
import { approvedGallery, approvedMedia, galleryPlaceholderCategories, video } from "@/config/media";
import { founderNames, site } from "@/config/site";
import { homeFaq } from "@/content/faq";
import { hadiths, quranVerse } from "@/content/sacred-texts";
import { sponsorshipPrice } from "@/lib/pricing";

const provisions = [
  {
    icon: IconHome,
    title: "Care and boarding",
    text: "A safe, settled place to live, with caring adults looking after the boys day and night.",
  },
  {
    icon: IconBowl,
    title: "Nutritious meals",
    text: "Regular, wholesome meals every day – the foundation for health, growth and concentration in class.",
  },
  {
    icon: IconPencil,
    title: "Primary education",
    text: "Lessons in the core subjects of the Kenyan curriculum, building literacy, numeracy and confidence.",
  },
  {
    icon: IconBook,
    title: "Qur'an and Hifdh",
    text: "Qur'an reading and memorisation, with Tajweed, alongside wider Islamic studies.",
  },
  {
    icon: IconHeart,
    title: "A supportive environment",
    text: "Good character, manners and values nurtured in a community where every boy is known and encouraged.",
  },
];

export default function HomePage() {
  const hero = approvedMedia("home-hero");
  const posterSlot = approvedMedia(video.posterSlot) ?? hero;
  const poster = posterSlot ? { src: posterSlot.src, alt: posterSlot.alt } : null;
  const gallery = approvedGallery().slice(0, 5);
  const price = sponsorshipPrice();

  return (
    <>
      {/* 1. HERO */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-forest-950">
        <HeroSlideshow />
        <div className="absolute inset-0 -z-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/55 to-forest-950/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
        </div>
        <div className="container-page flex min-h-[540px] items-center py-16 sm:min-h-[600px] lg:min-h-[min(72vh,660px)]">
          <div className="reveal max-w-2xl text-mist-50">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-mist-50/10 px-4 py-1.5 text-sm font-medium text-leaf-200 ring-1 ring-mist-50/20 backdrop-blur-sm">
              {site.location.area}, {site.location.region}
            </p>
            <h1 id="hero-title" className="h-display text-mist-50">
              Success in this life and the next begins with knowledge.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist-100/90 sm:text-xl">
              Qur&rsquo;an and Islamic learning alongside a full school education, for orphaned and needy boys in {site.location.area}.
              Established in {site.foundedYear}, Al-Falah also gives every boy a safe home and good food each day.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/sponsor-a-child" variant="accent" size="lg">
                Sponsor a Child
              </ButtonLink>
              <ButtonLink href="/donate" variant="ghost-light" size="lg">
                Donate Now
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VIDEO – must stay directly after the hero */}
      <section aria-labelledby="video-title" className="bg-mist-50 pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our school</p>
            <h2 id="video-title" className="h-section">Step inside Al-Falah</h2>
            <p className="mt-4 text-lg text-forest-900/80">
              See where the boys live, learn and pray – and meet the community that cares for them each day.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <VideoPlayer video={video} poster={poster} />
          </div>
        </div>
      </section>

      {/* 3. ABOUT */}
      <Section tone="white" labelledBy="about-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MediaFrame id="home-about" className="aspect-[4/5] w-full rounded-4xl sm:aspect-[4/3] lg:aspect-[4/5]" />
          <div>
            <SectionHeading eyebrow="About Al-Falah" title="A school and a home, founded in 2024" id="about-title">
              <p>
                Al-Falah was founded in {site.foundedYear} by {founderNames()} to care for and educate orphaned and needy boys in{" "}
                {site.location.area}, on the Kenyan coast near Mombasa.
              </p>
              <p className="mt-4">
                The school brings daily welfare, learning and Islamic development together in one place. Boys board at the school, eat
                together, attend lessons and learn the Qur&rsquo;an – supported by staff who know each of them well.
              </p>
            </SectionHeading>
            <Link href="/about" className="link-arrow mt-8">
              Read our story
            </Link>
          </div>
        </div>
      </Section>

      {/* 4. WHAT CHILDREN RECEIVE */}
      <Section tone="tint" labelledBy="provide-title">
        <SectionHeading eyebrow="What we provide" title="Everything a child needs to thrive" id="provide-title" align="center">
          <p>Each boy at Al-Falah receives care for the whole person – body, mind and character.</p>
        </SectionHeading>
        <ul className="mt-12 flex flex-wrap justify-center gap-5">
          {provisions.map(({ icon: Icon, title, text }) => (
            <li key={title} className="card w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-100 text-forest-800">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-forest-900/80">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4b. WHY IT MATTERS – Qur'an and hadith (see src/content/sacred-texts.ts) */}
      <section aria-labelledby="faith-title" className="relative overflow-hidden bg-mist-50 py-16 sm:py-24">
        <div className="pattern-dots absolute inset-0 opacity-40" aria-hidden />
        <div className="container-page relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Why it matters</p>
            <h2 id="faith-title" className="h-section">
              Caring for the orphan
            </h2>
          </div>
          <figure className="mx-auto mt-10 max-w-3xl text-center">
            <p lang="ar" dir="rtl" className="font-arabic text-3xl leading-[1.9] text-forest-900 sm:text-4xl">
              {quranVerse.arabic}
            </p>
            <blockquote className="mt-6 font-serif text-xl italic leading-relaxed text-forest-900 sm:text-2xl">
              &ldquo;{quranVerse.english}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-forest-700">
              {quranVerse.reference}
              <span className="block pt-1 text-xs font-normal normal-case tracking-normal text-forest-800/70">Translation: {quranVerse.translation}</span>
            </figcaption>
          </figure>
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            {hadiths.map((h) => (
              <figure key={h.reference} className="card flex flex-col">
                <span aria-hidden className="font-serif text-5xl leading-none text-sprout-500">&ldquo;</span>
                <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-forest-900">{h.english}</blockquote>
                <figcaption className="mt-5 border-t border-forest-900/10 pt-4 text-sm">
                  <span className="font-semibold text-forest-900">{h.reference}</span>
                  <span className="block text-forest-800/75">{h.narrator}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SPONSORSHIP */}
      <section aria-labelledby="sponsor-title" className="bg-forest-900 py-16 text-mist-50 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <MediaFrame id="home-sponsor" tone="dark" className="order-last aspect-[4/3] w-full rounded-4xl lg:order-first lg:aspect-[4/5]" />
          <div>
            <p className="eyebrow eyebrow-light">Sponsor a child</p>
            <h2 id="sponsor-title" className="h-section text-mist-50">
              Give one boy a full month of care and learning
            </h2>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-6xl font-bold text-sprout-300 sm:text-7xl">{price}</span>
              <span className="text-xl text-mist-100/85">per month</span>
            </p>
            <p className="mt-6 text-lg text-mist-100/85">
              Full monthly sponsorship covers a child&rsquo;s month of care, boarding, food, education and Qur&rsquo;an learning. Your
              regular support gives the school the stability to plan ahead and to keep each boy in its care.
            </p>
            <ul className="mt-6 grid gap-2 text-mist-100/90 sm:grid-cols-2">
              {["Care and boarding", "Daily meals", "Primary education", "Qur'an learning"].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <IconCheck className="h-5 w-5 text-leaf-400" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l-2 border-sprout-500 pl-4 text-mist-100/80">
              Caring for orphans holds a special place in Islam. Many supporters also hope that a child&rsquo;s education and Qur&rsquo;an
              learning – carried with him through life – may be a form of sadaqah jariyah, a continuing charity.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/sponsor-a-child" variant="accent" size="lg">
                Sponsor a Child
              </ButtonLink>
              <Link href="/sponsor-a-child#how-it-works" className="inline-flex min-h-[48px] items-center px-2 font-semibold text-mist-50 underline decoration-leaf-400 decoration-2 underline-offset-[6px]">
                How sponsorship works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CURRICULUM */}
      <Section tone="mist" labelledBy="curriculum-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our curriculum" title="Two strands of learning, side by side" id="curriculum-title">
              <p>
                Al-Falah combines the Kenyan Competency-Based Education curriculum with a full Islamic education. The two are studied
                together throughout a boy&rsquo;s schooling, so academic progress and faith grow hand in hand.
              </p>
            </SectionHeading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 ring-1 ring-forest-900/5">
                <p className="font-serif text-lg font-bold">Primary education</p>
                <p className="mt-1 text-forest-900/80">English, Kiswahili, Mathematics, Science, Social Studies and more.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 ring-1 ring-forest-900/5">
                <p className="font-serif text-lg font-bold">Qur&rsquo;an and Islamic studies</p>
                <p className="mt-1 text-forest-900/80">Madrasa (Ta&rsquo;lim), Arabic and Qur&rsquo;an memorisation (Tahfidh).</p>
              </div>
            </div>
            <Link href="/curriculum" className="link-arrow mt-8">
              View our curriculum
            </Link>
          </div>
          <MediaFrame id="home-curriculum" className="aspect-[4/3] w-full rounded-4xl" />
        </div>
      </Section>

      {/* 7. SCHOOL LIFE */}
      <Section tone="white" labelledBy="life-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="School life" title="A day at Al-Falah" id="life-title">
            <p>Lessons, meals, prayer and play – a glimpse of the everyday rhythm of the school.</p>
          </SectionHeading>
          <Link href="/school-life" className="link-arrow shrink-0">
            See the school life gallery
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {gallery.length > 0
            ? gallery.map((g, i) => (
                <li key={g.src} className={`relative overflow-hidden rounded-3xl ${i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square"}`}>
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" style={{ objectPosition: g.focus ?? "50% 50%" }} />
                </li>
              ))
            : galleryPlaceholderCategories.slice(0, 5).map((c, i) => (
                <li key={i} className={`${i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square"}`}>
                  <Placeholder className="h-full w-full rounded-3xl" label={`${c} photo to come`} slot="gallery" />
                </li>
              ))}
        </ul>
      </Section>

      {/* 8. TRUST & ACCOUNTABILITY */}
      <Section tone="tint" labelledBy="trust-title">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-forest-800 text-mist-50">
            <IconShield className="h-8 w-8" />
          </span>
          <div className="max-w-3xl">
            <SectionHeading eyebrow="Trust and accountability" title="Support that sustains the work" id="trust-title">
              <p>
                {site.trust.summary} The trust&rsquo;s registered objects are to raise funds to educate needy and orphaned children – the
                purpose your gifts are given for.
              </p>
              <p className="mt-4">
                We are committed to using every gift carefully, to being open with supporters about how the school is run, and to
                protecting the privacy and dignity of the children in our care.
              </p>
            </SectionHeading>
            <Link href="/about#trust" className="link-arrow mt-8">
              The trust and how we operate
            </Link>
          </div>
        </div>
      </Section>

      {/* 9. FAQ */}
      <Section tone="mist" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" id="faq-title">
            <p>
              Can&rsquo;t find what you need? <Link href="/contact" className="font-semibold text-forest-800 underline underline-offset-4">Contact us</Link> and we will be glad to help.
            </p>
          </SectionHeading>
          <Faq items={homeFaq} />
        </div>
      </Section>

      {/* 10. GIVING */}
      <GivingCta title="Help a boy grow in knowledge and faith" />
    </>
  );
}
