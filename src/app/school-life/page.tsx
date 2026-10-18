import Image from "next/image";
import Link from "next/link";
import { GivingCta, PageHero, Section } from "@/components/Blocks";
import { Placeholder } from "@/components/MediaFrame";
import { approvedGallery, galleryCategories, galleryPlaceholderCategories } from "@/config/media";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Gallery",
  description: "Photos of everyday life at Al-Falah School, Kikambala: the mosque and Qur'an lessons, classrooms, the dining hall, sports and the school grounds.",
  path: "/school-life",
});

const slug = (c: string) => c.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function GalleryPage() {
  const photos = approvedGallery();
  const sections = galleryCategories
    .map((c) => ({ category: c, id: slug(c), items: photos.filter((p) => p.category === c) }))
    .filter((s) => s.items.length > 0);

  return (
    <>
      <PageHero eyebrow="School life" title="Our gallery">
        <p>Prayer and Qur&rsquo;an lessons, classrooms, meals together, sport and the grounds: the daily rhythm of the school.</p>
        <p className="text-base">
          <Link href="/school-life/facilities" className="font-semibold text-forest-800 underline decoration-leaf-500 decoration-2 underline-offset-4">
            See our facilities
          </Link>
        </p>
      </PageHero>

      {sections.length > 0 ? (
        <>
          <nav aria-label="Gallery sections" className="sticky top-[72px] z-30 border-b border-forest-900/10 bg-white/95 backdrop-blur">
            <ul className="container-page flex gap-2 overflow-x-auto py-3 text-sm font-medium [scrollbar-width:none]">
              {sections.map((s) => (
                <li key={s.id} className="shrink-0">
                  <a href={`#${s.id}`} className="block rounded-full bg-mist-100 px-4 py-2 text-forest-800 ring-1 ring-forest-900/10 hover:bg-leaf-100">
                    {s.category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {sections.map((s, i) => (
            <Section key={s.id} id={s.id} tone={i % 2 ? "tint" : "white"} labelledBy={`${s.id}-title`} className="!py-14 sm:!py-16">
              <div className="mb-8 flex items-baseline justify-between gap-4">
                <h2 id={`${s.id}-title`} className="h-section">{s.category}</h2>
                <span className="shrink-0 text-sm text-forest-800/70">{s.items.length} {s.items.length === 1 ? "photo" : "photos"}</span>
              </div>
              <ul className={`grid gap-4 sm:grid-cols-2 ${s.items.length % 3 === 0 || s.items.length > 4 ? "lg:grid-cols-3" : ""}`}>
                {s.items.map((p) => (
                  <li key={p.src}>
                    <figure className="h-full overflow-hidden rounded-3xl bg-white ring-1 ring-forest-900/5">
                      <div className="relative aspect-[3/2]">
                        <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" style={{ objectPosition: p.focus ?? "50% 50%" }} loading="lazy" />
                      </div>
                      {p.caption && <figcaption className="px-4 py-3 text-sm text-forest-900">{p.caption}</figcaption>}
                    </figure>
                  </li>
                ))}
              </ul>
            </Section>
          ))}
        </>
      ) : (
        <Section tone="white" labelledBy="gallery-title">
          <h2 id="gallery-title" className="sr-only">Photo gallery</h2>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {galleryPlaceholderCategories.map((c, i) => (
              <li key={i}>
                <Placeholder className="aspect-square h-full w-full rounded-3xl" label={`${c} photo to come`} slot="gallery" />
              </li>
            ))}
          </ul>
        </Section>
      )}
      <GivingCta />
    </>
  );
}
