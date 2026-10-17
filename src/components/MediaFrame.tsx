import Image from "next/image";
import { approvedMedia, getMedia, type MediaId } from "@/config/media";
import { IconCamera } from "./Icons";

const showSlotIds = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_MEDIA_SLOTS === "true";

/**
 * Renders an approved photograph from the media map, or a clearly marked
 * placeholder when the photo has not been supplied/approved yet.
 * The parent controls the size; this fills it.
 */
export function MediaFrame({
  id,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  tone = "light",
  showCaption = false,
}: {
  id: MediaId;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "dark";
  showCaption?: boolean;
}) {
  const photo = approvedMedia(id);
  if (photo) {
    return (
      <figure className={`relative overflow-hidden ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: photo.focus ?? "50% 50%" }}
        />
        {showCaption && photo.caption && (
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/80 to-transparent px-4 pb-3 pt-8 text-sm text-ivory-50">
            {photo.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  return <Placeholder slot={id} guidance={getMedia(id).guidance} className={className} tone={tone} />;
}

export function Placeholder({
  slot,
  guidance,
  className = "",
  tone = "light",
  label = "School photograph to come",
  corner = false,
}: {
  slot?: string;
  guidance?: string;
  className?: string;
  tone?: "light" | "dark";
  label?: string;
  /** Show the label as a small chip in the corner (for slots with text laid over them). */
  corner?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      title={showSlotIds && guidance ? guidance : undefined}
      className={`${className.includes("absolute") ? "" : "relative"} flex items-center justify-center overflow-hidden ${
        dark ? "bg-forest-900 text-forest-200" : "bg-forest-50 text-forest-700"
      } ${className}`}
    >
      <div className={`absolute inset-0 ${dark ? "opacity-20" : "opacity-60"} pattern-dots`} aria-hidden />
      <svg aria-hidden className={`absolute -bottom-8 left-1/2 w-[70%] max-w-md -translate-x-1/2 ${dark ? "text-forest-800" : "text-forest-100"}`} viewBox="0 0 200 110" fill="currentColor">
        <path d="M100 0c4 14 18 25 38 40 22 17 34 36 34 58v12h-14V98c0-18-10-32-28-45-14-10-24-19-30-30-6 11-16 20-30 30-18 13-28 27-28 45v12H28V98c0-22 12-41 34-58C82 25 96 14 100 0Z" />
      </svg>
      <div className={corner ? "absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-forest-950/70 px-3 py-1.5 text-xs text-ivory-100" : "relative flex flex-col items-center gap-2 px-6 text-center"}>
        <IconCamera className={corner ? "h-4 w-4" : "h-7 w-7"} />
        <span className={corner ? "font-medium" : "text-sm font-semibold"}>{label}</span>
        {showSlotIds && slot && (
          <code className={`rounded-md px-2 py-0.5 text-xs ${dark ? "bg-forest-950/60" : "bg-white/80"}`}>media: {slot}</code>
        )}
      </div>
    </div>
  );
}
