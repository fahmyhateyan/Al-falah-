/**
 * MEDIA MAP – every photograph and video slot on the website.
 * ---------------------------------------------------------------------------
 * To add a photo:
 *   1. Put the optimised file in /public/images/school/ (JPG or WebP,
 *      ideally 2000px on the long edge, under ~500 KB).
 *   2. Set `src` below to its path, e.g. "/images/school/hero.jpg".
 *   3. Write a meaningful `alt` (what the photo shows, for people who cannot
 *      see it) and an optional `caption`.
 *   4. Set `approved: true` ONLY when the photo is approved for public use.
 *      Unapproved photos are never shown; the placeholder appears instead.
 *   5. Adjust `focus` if faces are being cropped (CSS object-position,
 *      e.g. "50% 30%" keeps the upper part of the image in view).
 *
 * Do not use AI-generated pictures of children, or stock photos presented as
 * Al-Falah pupils. Do not put children's names or other identifying details in
 * captions or alt text.
 *
 * Full instructions: docs/ASSETS.md
 * ---------------------------------------------------------------------------
 */

export type MediaSlot = {
  /** Path under /public, or null while the photo is still to come. */
  src: string | null;
  alt: string;
  caption?: string;
  /** CSS object-position used when cropping. Default "50% 50%". */
  focus?: string;
  /** Must be true before the photo is displayed. */
  approved: boolean;
  /** Where the slot is used and what kind of picture works best (for the owner). */
  guidance: string;
};

export const media = {
  // ----- Home -----
  "home-hero": {
    src: null,
    alt: "",
    approved: false,
    focus: "50% 40%",
    guidance: "Home page hero, wide landscape. A warm, dignified view of school life or the school buildings. Shown large behind the main heading.",
  },
  "video-poster": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Still image shown on the school video before it plays (16:9). Ideally a frame from the video itself.",
  },
  "home-about": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Home page 'About Al-Falah' section, portrait or square. The school setting or grounds.",
  },
  "home-sponsor": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Home page sponsorship section, portrait. Everyday care: a meal, study time or boarding life.",
  },
  "home-curriculum": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Home page curriculum section, landscape. A class or Qur'an lesson in progress.",
  },

  // ----- About -----
  "about-hero": {
    src: null,
    alt: "",
    approved: false,
    guidance: "About Us page banner, wide landscape. The school buildings or grounds.",
  },
  "about-story": {
    src: null,
    alt: "",
    approved: false,
    guidance: "About Us 'Our Story' section, portrait or square.",
  },
  "about-education": {
    src: null,
    alt: "",
    approved: false,
    guidance: "About Us 'Education at Al-Falah' section, landscape. Learning in a classroom.",
  },
  "founder-1": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Optional portrait of the first founder (square). Link it via site.founders[0].photo.",
  },
  "founder-2": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Optional portrait of the second founder (square). Link it via site.founders[1].photo.",
  },

  // ----- Curriculum -----
  "curriculum-hero": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Curriculum page banner, wide landscape. A lesson in progress.",
  },
  "curriculum-quran": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Qur'an and Tahfidh section, portrait or square. Qur'an reading or a madrasa class.",
  },
  "curriculum-academic": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Kenyan curriculum section, portrait or square. An academic lesson.",
  },

  // ----- Sponsor / Donate -----
  "sponsor-hero": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Sponsor a Child page, portrait or square. Daily care at the school. Avoid close-ups that make a child identifiable.",
  },
  "donate-hero": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Donate page, portrait or square. The school environment or a group activity.",
  },

  // ----- Contact -----
  "contact-image": {
    src: null,
    alt: "",
    approved: false,
    guidance: "Contact page, landscape. The school entrance or surroundings.",
  },
} satisfies Record<string, MediaSlot>;

export type MediaId = keyof typeof media;

/**
 * SCHOOL LIFE GALLERY – add as many entries as you like.
 * Each entry appears on /school-life (and the first few on the home page)
 * once it has a `src` and `approved: true`.
 */
export type GalleryItem = MediaSlot & {
  category: "Learning" | "Qur'an" | "Meals" | "Daily life" | "Grounds";
};

export const gallery: GalleryItem[] = [
  // Example – copy, fill in and set approved: true:
  // {
  //   src: "/images/school/classroom-morning.jpg",
  //   alt: "Boys working in exercise books at their desks during a morning lesson",
  //   caption: "A morning lesson",
  //   category: "Learning",
  //   approved: true,
  //   guidance: "",
  // },
];

/** Gallery categories the placeholder grid shows while photos are pending. */
export const galleryPlaceholderCategories: GalleryItem["category"][] = [
  "Learning",
  "Qur'an",
  "Meals",
  "Daily life",
  "Grounds",
  "Learning",
];

/**
 * SCHOOL VIDEO
 * ---------------------------------------------------------------------------
 *   type: "none"    – shows a "School video coming soon" panel.
 *   type: "mp4"     – a local file, e.g. src: "/video/al-falah.mp4" (put it in
 *                     /public/video). Optional captions: a WebVTT file such as
 *                     "/video/al-falah.en.vtt".
 *   type: "youtube" – src is the video ID (the part after "v=" in the URL).
 *   type: "vimeo"   – src is the numeric Vimeo video ID.
 * YouTube/Vimeo only load after the visitor presses play. The video never
 * plays automatically.
 */
export type VideoConfig = {
  type: "none" | "mp4" | "youtube" | "vimeo";
  src: string | null;
  captionsSrc: string | null;
  captionsLabel: string;
  title: string;
  posterSlot: MediaId;
};

export const video: VideoConfig = {
  type: "none",
  src: null,
  captionsSrc: null,
  captionsLabel: "English",
  title: "A short film about Al-Falah School, Kikambala",
  posterSlot: "video-poster",
};

export function getMedia(id: MediaId): MediaSlot {
  return media[id];
}

/** Returns the slot only if it has an approved image; otherwise null. */
export function approvedMedia(id: MediaId): (MediaSlot & { src: string }) | null {
  const slot: MediaSlot = media[id];
  return slot.src && slot.approved ? (slot as MediaSlot & { src: string }) : null;
}

export function approvedGallery(): (GalleryItem & { src: string })[] {
  return gallery.filter((g): g is GalleryItem & { src: string } => Boolean(g.src && g.approved));
}
