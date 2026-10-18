import Link from "next/link";
import { GivingCta, PageHero, Section, SectionHeading } from "@/components/Blocks";
import { MediaFrame } from "@/components/MediaFrame";
import { cbeLevels, curriculumDetails, madrasaLevels, seniorSchool, tahfidh, type Level } from "@/content/curriculum";
import { pageMetadata } from "@/lib/metadata";
import { sponsorshipPrice } from "@/lib/pricing";

export const metadata = pageMetadata({
  title: "Our Curriculum",
  description:
    "Al-Falah combines the Kenyan Competency-Based Education curriculum with Madrasa studies (Ta'lim) and Qur'an memorisation (Tahfidh), learned side by side.",
  path: "/curriculum",
});

function LevelCard({ level, accent }: { level: Level; accent: "leaf" | "sprout" }) {
  return (
    <li className="card flex flex-col">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-xl font-bold">{level.name}</h4>
        {level.duration && (
          <span className={`rounded-full px-3 py-0.5 text-sm font-semibold ${accent === "leaf" ? "bg-leaf-100 text-forest-800" : "bg-sprout-300/40 text-sprout-700"}`}>
            {level.duration}
          </span>
        )}
      </div>
      {level.translation && <p className="text-sm font-semibold uppercase tracking-wider text-forest-700">{level.translation}</p>}
      {level.summary && <p className="mt-3 text-forest-900/80">{level.summary}</p>}
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${level.name} subjects`}>
        {level.subjects.map((s) => (
          <li key={s} className="rounded-lg bg-mist-100 px-2.5 py-1 text-sm text-forest-900">
            {s}
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Editable detail areas – each shows a neutral sentence until the school supplies the detail. */
const detailAreas: { key: keyof typeof curriculumDetails; title: string; fallback: string }[] = [
  {
    key: "levelsCurrentlyOffered",
    title: "Classes and age groups",
    fallback: "Information about the classes currently running at the school is available on request – please contact us.",
  },
  {
    key: "quranApproach",
    title: "Qur'an reading and memorisation",
    fallback: "Boys learn to read the Qur'an and to memorise it, with careful attention to Tajweed – the rules of correct pronunciation and recitation.",
  },
  {
    key: "dailyRoutine",
    title: "The daily learning routine",
    fallback: "Islamic and academic studies are timetabled alongside each other, so that neither is learned at the expense of the other.",
  },
  {
    key: "progressReporting",
    title: "Following each boy's progress",
    fallback: "If you would like to know how pupils' progress is followed in both strands of learning, please get in touch.",
  },
];

export default function CurriculumPage() {
  return (
    <>
      <PageHero eyebrow="Our curriculum" title="Learning for this life and for faith" media="curriculum-hero">
        <p>
          At Al-Falah, the Kenyan education curriculum and a comprehensive Islamic education are learned together. Academic and Islamic
          studies run alongside one another throughout a boy&rsquo;s education.
        </p>
      </PageHero>

      <Section tone="white" labelledBy="balance-title">
        <SectionHeading eyebrow="Our approach" title="A balanced education" id="balance-title" align="center">
          <p>
            We aim for a balance of academic learning, Qur&rsquo;an memorisation, Islamic values and personal development – so that boys
            leave with knowledge, skills, faith and good character.
          </p>
        </SectionHeading>
        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Academic learning", "Literacy, numeracy, science and more through the Kenyan CBE curriculum."],
            ["Qur'an memorisation", "Tahfidh with Tajweed, the rules of correct recitation."],
            ["Islamic values", "Belief, worship and the example of the Prophet ﷺ through Madrasa studies."],
            ["Personal development", "Good character, manners and responsibility in daily school life."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-3xl bg-mist-100 p-6">
              <span className="font-serif text-3xl font-bold text-leaf-600" aria-hidden>
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-bold">{t}</h3>
              <p className="mt-1 text-forest-900/80">{d}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* STRAND A – ISLAMIC */}
      <Section tone="tint" id="islamic" labelledBy="islamic-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <SectionHeading eyebrow="Strand A" title="Islamic curriculum: Madrasa and Tahfidh" id="islamic-title">
            <p>
              <strong className="font-semibold text-forest-900">Ta&rsquo;lim</strong> means education or teaching. Here it refers to the
              structured study of Islam and Arabic through elementary, intermediate and secondary levels.
            </p>
            <p className="mt-4">
              <strong className="font-semibold text-forest-900">{tahfidh.name}</strong> – {tahfidh.summary}
            </p>
          </SectionHeading>
          <MediaFrame id="curriculum-quran" className="aspect-[4/3] w-full rounded-4xl" />
        </div>

        <h3 className="mt-14 text-2xl font-bold">Ta&rsquo;lim – Madrasa levels</h3>
        <ol className="mt-6 grid gap-5 lg:grid-cols-3">
          {madrasaLevels.map((l) => (
            <LevelCard key={l.name} level={l} accent="sprout" />
          ))}
        </ol>

        <div className="mt-8 rounded-3xl bg-forest-900 p-6 text-mist-50 sm:p-8">
          <h3 className="text-2xl font-bold text-mist-50">Tahfidh al-Qur&rsquo;an</h3>
          <p className="mt-3 max-w-3xl text-mist-100/85">{tahfidh.summary}</p>
        </div>
      </Section>

      {/* STRAND B – KENYAN CBE */}
      <Section tone="white" id="academic" labelledBy="academic-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <MediaFrame id="curriculum-academic" className="order-last aspect-[4/3] w-full rounded-4xl lg:order-first" />
          <SectionHeading eyebrow="Strand B" title="Kenyan education curriculum" id="academic-title">
            <p>
              The general academic curriculum follows Kenya&rsquo;s Competency-Based Education (CBE). The levels and learning areas below set
              out the pathway as described in the school&rsquo;s curriculum outline.
            </p>
            {curriculumDetails.levelsCurrentlyOffered && <p className="mt-4">{curriculumDetails.levelsCurrentlyOffered}</p>}
          </SectionHeading>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-2">
          {cbeLevels.map((l) => (
            <LevelCard key={l.name} level={l} accent="leaf" />
          ))}
        </ol>

        <div className="card mt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h4 className="text-xl font-bold">{seniorSchool.name}</h4>
            <span className="rounded-full bg-leaf-100 px-3 py-0.5 text-sm font-semibold text-forest-800">{seniorSchool.duration}</span>
          </div>
          <p className="text-sm font-semibold uppercase tracking-wider text-forest-700">{seniorSchool.translation}</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <div>
              <h5 className="font-sans font-semibold text-forest-900">Compulsory (core) subjects</h5>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-forest-900/85">
                {seniorSchool.core.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h5 className="font-sans font-semibold text-forest-900">Non-examinable</h5>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-forest-900/85">
                {seniorSchool.nonExaminable.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h5 className="font-sans font-semibold text-forest-900">STEM pathway</h5>
              <dl className="mt-2 space-y-2 text-forest-900/85">
                {seniorSchool.stemPathway.map((t) => (
                  <div key={t.track}>
                    <dt className="font-medium text-forest-900">{t.track}</dt>
                    <dd>{t.subjects.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* CONCURRENT STUDY */}
      <Section tone="tint" labelledBy="together-title">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Learning together</p>
          <h2 id="together-title" className="h-section">
            One coordinated timetable
          </h2>
          <p className="mt-5 text-lg text-forest-900/80">
            Learners study the Kenyan education curriculum alongside the Madrasa and Tahfidh programmes, with a coordinated timetable that
            supports progress in both Islamic and general academic learning.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {detailAreas.map((d) => (
            <li key={d.key} className="card">
              <h3 className="text-lg font-bold">{d.title}</h3>
              <p className="mt-2 text-forest-900/80">{curriculumDetails[d.key] ?? d.fallback}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-forest-900/80">
          Questions about the curriculum?{" "}
          <Link href="/contact?type=Curriculum" className="font-semibold text-forest-800 underline underline-offset-4">
            Contact the school
          </Link>
        </p>
      </Section>

      <GivingCta title="Help a boy learn – in school and in faith">
        <p>
          Full monthly sponsorship of {sponsorshipPrice()} covers a boy&rsquo;s care, boarding, food, education and Qur&rsquo;an
          learning for a month.
        </p>
      </GivingCta>
    </>
  );
}
