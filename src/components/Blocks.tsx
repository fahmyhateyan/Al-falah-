import type { ReactNode } from "react";
import type { MediaId } from "@/config/media";
import { sponsorshipPrice } from "@/lib/pricing";
import { ButtonLink } from "./Button";
import { MediaFrame } from "./MediaFrame";

export function Section({
  children,
  className = "",
  id,
  tone = "mist",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "mist" | "white" | "tint" | "forest";
  labelledBy?: string;
}) {
  const tones = {
    mist: "bg-mist-50",
    white: "bg-white",
    tint: "bg-mist-100",
    forest: "bg-forest-900 text-mist-50",
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-24 py-16 sm:py-24 ${tones[tone]} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  children,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
  children?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className={`h-section ${light ? "text-mist-50" : ""}`}>{title}</h2>
      {children && <div className={`mt-5 text-lg leading-relaxed ${light ? "text-mist-100/85" : "text-forest-900/80"}`}>{children}</div>}
    </div>
  );
}

/** Interior page banner with optional photo. */
export function PageHero({
  eyebrow,
  title,
  children,
  media,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  media?: MediaId;
}) {
  return (
    <section className="relative overflow-hidden bg-mist-100">
      <div className="pattern-dots absolute inset-0 opacity-50" aria-hidden />
      <div className={`container-page relative grid items-center gap-10 py-14 sm:py-20 ${media ? "lg:grid-cols-[1.1fr_1fr]" : ""}`}>
        <div className="reveal max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h-display">{title}</h1>
          {children && <div className="lead mt-6 space-y-4">{children}</div>}
        </div>
        {media && <MediaFrame id={media} priority className="aspect-[4/3] w-full rounded-4xl shadow-lg" sizes="(min-width: 1024px) 45vw, 100vw" />}
      </div>
    </section>
  );
}

export function GivingCta({ title = "Every child deserves a place to grow", children }: { title?: string; children?: ReactNode }) {
  return (
    <section aria-labelledby="giving-cta" className="bg-mist-50 py-16 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-4xl bg-forest-900 px-6 py-12 text-center sm:px-12 sm:py-16">
          <svg aria-hidden className="absolute -right-10 -top-10 h-64 w-64 text-forest-800" viewBox="0 0 200 110" fill="currentColor">
            <path d="M100 0c4 14 18 25 38 40 22 17 34 36 34 58v12h-14V98c0-18-10-32-28-45-14-10-24-19-30-30-6 11-16 20-30 30-18 13-28 27-28 45v12H28V98c0-22 12-41 34-58C82 25 96 14 100 0Z" />
          </svg>
          <div className="relative mx-auto max-w-2xl">
            <h2 id="giving-cta" className="h-section text-mist-50">{title}</h2>
            <div className="mt-5 text-lg text-mist-100/85">
              {children ?? (
                <p>
                  Sponsor a boy&rsquo;s full month of care and learning for {sponsorshipPrice()} a month, or make a gift of any size to the
                  general school fund.
                </p>
              )}
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/sponsor-a-child" variant="accent" size="lg">Sponsor a Child</ButtonLink>
              <ButtonLink href="/donate" variant="outline-light" size="lg">Donate Now</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small banner shown on policy pages whose text is not yet approved. */
export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="mb-10 rounded-2xl border border-sprout-500/40 bg-sprout-300/20 p-5 text-forest-950">
      <p className="font-semibold">Draft – awaiting approval</p>
      <div className="mt-1 text-forest-900/85">{children}</div>
    </div>
  );
}
