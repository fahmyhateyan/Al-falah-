import Image from "next/image";
import { approvedMedia, heroSlides } from "@/config/media";
import { Placeholder } from "./MediaFrame";

const HOLD = 6; // seconds each photo is fully visible (including its fade-out)
const FADE = 1.4; // crossfade length in seconds

/**
 * Background slideshow for the home page hero. Pure CSS (no JavaScript), so it
 * works everywhere, pauses with the on-screen button, and is replaced by a
 * single still photo for visitors who prefer reduced motion.
 */
export function HeroSlideshow() {
  const slides = heroSlides.map((id) => approvedMedia(id)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  if (slides.length === 0) {
    return <Placeholder className="absolute inset-0 -z-20" tone="dark" slot="home-hero" label="Hero photograph to come" corner />;
  }
  const n = slides.length;
  const total = n * HOLD;
  const pct = (sec: number) => `${((sec / total) * 100).toFixed(3)}%`;
  const keyframes = `@keyframes hero-fade{0%{opacity:0;transform:scale(1.07)}${pct(FADE)}{opacity:1}${pct(HOLD)}{opacity:1}${pct(HOLD + FADE)}{opacity:0;transform:scale(1)}100%{opacity:0;transform:scale(1)}}`;

  return (
    <>
      {n > 1 && <style>{keyframes}</style>}
      {n > 1 && <input id="hero-pause" type="checkbox" className="peer sr-only" aria-label="Pause background photos" />}
      <div className="hero-slides absolute inset-0 -z-20">
        {slides.map((s, i) => (
          <div
            key={s.src + i}
            className="hero-slide absolute inset-0"
            style={n > 1 ? { animation: `hero-fade ${total}s linear ${i * HOLD - FADE}s infinite` } : undefined}
            aria-hidden={i > 0 ? true : undefined}
          >
            <Image
              src={s.src}
              alt={i === 0 ? s.alt : ""}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: s.focus ?? "50% 50%" }}
            />
          </div>
        ))}
      </div>
      {n > 1 && (
        <label
          htmlFor="hero-pause"
          className="hero-pause-btn absolute bottom-4 right-4 z-20 inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full bg-forest-950/60 px-4 text-sm font-semibold text-mist-50 ring-1 ring-mist-50/30 backdrop-blur-sm hover:bg-forest-950/80 sm:bottom-6 sm:right-6"
        >
          <span className="when-playing inline-flex items-center gap-2">
            <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            Pause photos
          </span>
          <span className="when-paused hidden items-center gap-2">
            <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg>
            Play photos
          </span>
        </label>
      )}
    </>
  );
}
