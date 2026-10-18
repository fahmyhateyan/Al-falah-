import Link from "next/link";
import { GivingCta, PageHero, Section, SectionHeading } from "@/components/Blocks";
import { IconBall, IconBed, IconBook, IconBowl, IconDome, IconPencil, IconPot, IconSun } from "@/components/Icons";
import { MediaFrame } from "@/components/MediaFrame";
import { facilities, type Facility } from "@/content/facilities";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Facilities",
  description:
    "Al-Falah's facilities in Kikambala: a mosque, classrooms, madrasa rooms, a dining hall and kitchen, a sports ground, boarding accommodation and green grounds near the ocean.",
  path: "/school-life/facilities",
});

const icons: Record<Facility["icon"], typeof IconDome> = {
  mosque: IconDome,
  classroom: IconPencil,
  quran: IconBook,
  dining: IconBowl,
  kitchen: IconPot,
  sports: IconBall,
  boarding: IconBed,
  grounds: IconSun,
};

export default function FacilitiesPage() {
  const withPhoto = facilities.filter((f) => f.photo);
  const withoutPhoto = facilities.filter((f) => !f.photo);
  return (
    <>
      <PageHero eyebrow="School life" title="Our facilities" media="facility-grounds">
        <p>
          A walled campus in Kikambala, close to the Indian Ocean, with everything the boys need to live, learn and pray in one safe place.
        </p>
        <p className="text-base">
          <Link href="/school-life" className="font-semibold text-forest-800 underline decoration-leaf-500 decoration-2 underline-offset-4">
            Browse our gallery
          </Link>
        </p>
      </PageHero>

      <Section tone="white" labelledBy="facilities-title">
        <SectionHeading eyebrow="On campus" title="What the school has" id="facilities-title">
          <p>From the mosque to the football pitch, every part of the school supports the boys&rsquo; learning, faith and wellbeing.</p>
        </SectionHeading>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {withPhoto.map((f) => {
            const Icon = icons[f.icon];
            return (
              <li key={f.name} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(21,32,14,0.06),0_8px_24px_-12px_rgba(21,32,14,0.12)] ring-1 ring-forest-900/5">
                <MediaFrame id={f.photo!} className="aspect-[3/2] w-full" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-forest-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold">{f.name}</h3>
                  </div>
                  {f.count !== null && f.countLabel && (
                    <p className="mt-3 inline-flex w-fit rounded-full bg-mist-100 px-3 py-1 text-sm font-semibold text-forest-800">
                      {f.count} {f.countLabel}
                    </p>
                  )}
                  <p className="mt-3 text-forest-900/80">{f.description}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {withoutPhoto.length > 0 && (
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {withoutPhoto.map((f) => {
              const Icon = icons[f.icon];
              return (
                <li key={f.name} className="card flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-100 text-forest-800">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{f.name}</h3>
                    {f.count !== null && f.countLabel && (
                      <p className="mt-2 inline-flex rounded-full bg-mist-100 px-3 py-1 text-sm font-semibold text-forest-800">
                        {f.count} {f.countLabel}
                      </p>
                    )}
                    <p className="mt-2 text-forest-900/80">{f.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <GivingCta title="Help keep every part of the school running">
        <p>Your gifts help maintain the classrooms, mosque, kitchen and boarding that the boys rely on every day.</p>
      </GivingCta>
    </>
  );
}
