import Image from "next/image";
import { GivingCta, PageHero, Section } from "@/components/Blocks";
import { Placeholder } from "@/components/MediaFrame";
import { approvedGallery, galleryPlaceholderCategories } from "@/config/media";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "School Life",
  description: "A glimpse of everyday life at Al-Falah School, Kikambala – learning, Qur'an lessons, meals and the school grounds.",
  path: "/school-life",
});

export default function SchoolLifePage() {
  const photos = approvedGallery();
  return (
    <>
      <PageHero eyebrow="School life" title="Everyday life at Al-Falah">
        <p>Learning, Qur&rsquo;an lessons, meals together and time with friends – the daily rhythm of the school.</p>
      </PageHero>
      <Section tone="white" labelledBy="gallery-title">
        <h2 id="gallery-title" className="sr-only">Photo gallery</h2>
        {photos.length > 0 ? (
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
            {photos.map((p) => (
              <li key={p.src} className="break-inside-avoid">
                <figure className="overflow-hidden rounded-3xl bg-forest-50">
                  <Image src={p.src} alt={p.alt} width={1200} height={900} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-auto w-full" loading="lazy" />
                  {(p.caption || p.category) && (
                    <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                      <span className="text-forest-900">{p.caption}</span>
                      <span className="shrink-0 rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-semibold text-forest-800">{p.category}</span>
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="mb-8 max-w-2xl text-forest-900/80">
              Photographs from the school will appear here soon. Every image is approved by the school before it is published, to protect
              the privacy of the children.
            </p>
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {galleryPlaceholderCategories.map((c, i) => (
                <li key={i} className={i === 0 ? "col-span-2 row-span-2 lg:col-span-2" : ""}>
                  <Placeholder className="aspect-square h-full w-full rounded-3xl" label={`${c} photo to come`} slot="gallery" />
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>
      <GivingCta />
    </>
  );
}
