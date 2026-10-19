"use client";

import Image from "next/image";
import { useState } from "react";
import type { VideoConfig } from "@/config/media";
import { IconFilm, IconPlay } from "./Icons";
import { Placeholder } from "./MediaFrame";

type Poster = { src: string; alt: string } | null;

export function VideoPlayer({ video, poster }: { video: VideoConfig; poster: Poster }) {
  const [activated, setActivated] = useState(false);
  const frameBase = "relative w-full overflow-hidden rounded-3xl bg-forest-950 shadow-xl ring-1 ring-forest-900/10";
  const frame = `${frameBase} aspect-video`;

  if (video.type === "none" || !video.src) {
    return (
      <div className={`${frameBase} aspect-[4/3] sm:aspect-video`}>
        {poster ? (
          <Image src={poster.src} alt={poster.alt} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover opacity-60" />
        ) : (
          <Placeholder className="absolute inset-0" tone="dark" label="Poster image to come" slot={video.posterSlot} corner />
        )}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent p-6 sm:p-10">
          <div className="flex items-center gap-4 pb-6 text-mist-50 sm:pb-0">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist-50/15 ring-1 ring-mist-50/30">
              <IconFilm className="h-6 w-6" />
            </span>
            <div>
              <p className="font-serif text-2xl font-bold sm:text-3xl">School video coming soon</p>
              <p className="text-mist-100/80">We are preparing a short film from the school.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (video.type === "mp4") {
    return (
      <div className={frame}>
        <video
          className="h-full w-full object-cover"
          controls
          preload="none"
          playsInline
          poster={poster?.src}
          aria-label={video.title}
        >
          <source src={video.src} type="video/mp4" />
          {video.captionsSrc && <track kind="captions" src={video.captionsSrc} srcLang="en" label={video.captionsLabel} default />}
          Your browser cannot play this video. <a href={video.src}>Download the video</a>.
        </video>
      </div>
    );
  }

  const embedUrl =
    video.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.src)}?autoplay=1&rel=0&cc_load_policy=1`
      : `https://player.vimeo.com/video/${encodeURIComponent(video.src)}?autoplay=1&dnt=1`;

  return (
    <div className={frame}>
      {activated ? (
        <iframe
          src={embedUrl}
          title={video.title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        // A real link to the video, so it still works if scripts are unavailable;
        // with scripts, the click loads the player in place instead.
        <a
          href={video.type === "youtube" ? `https://www.youtube.com/watch?v=${encodeURIComponent(video.src)}` : `https://vimeo.com/${encodeURIComponent(video.src)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            setActivated(true);
          }}
          className="group absolute inset-0 block h-full w-full text-left"
          aria-label={`Play video: ${video.title}`}
        >
          {poster ? (
            <Image src={poster.src} alt="" fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
          ) : (
            <Placeholder className="absolute inset-0" tone="dark" label="Video poster image to come" slot={video.posterSlot} />
          )}
          <span className="absolute inset-0 bg-forest-950/25 transition-colors group-hover:bg-forest-950/35" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-mist-50 text-forest-900 shadow-lg transition-transform group-hover:scale-105 group-focus-visible:scale-105">
            <IconPlay className="ml-1 h-8 w-8" />
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-forest-950/70 px-3 py-1 text-xs text-mist-100">
            Plays from {video.type === "youtube" ? "YouTube" : "Vimeo"} when you press play
          </span>
        </a>
      )}
    </div>
  );
}
