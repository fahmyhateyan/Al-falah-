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
    src: "/images/school/aerial-coastline.jpg",
    alt: "Aerial view of the Al-Falah school buildings, courtyard and mosque, surrounded by green land near the Kikambala coastline",
    focus: "50% 45%",
    approved: true,
    guidance: "Home page hero, wide landscape. A warm, dignified view of school life or the school buildings. Shown large behind the main heading.",
  },
  "video-poster": {
    src: "/images/school/school-courtyard.jpg",
    alt: "The Al-Falah school courtyard and buildings from above, with the Indian Ocean beyond",
    focus: "50% 55%",
    approved: true,
    guidance: "Still image shown on the school video before it plays (16:9). Ideally a frame from the video itself.",
  },
  "home-about": {
    src: "/images/school/boys-walking.jpg",
    alt: "Boys in green robes walking in a line past the school buildings",
    focus: "62% 60%",
    approved: true,
    guidance: "Home page 'About Al-Falah' section, portrait or square. The school setting or grounds.",
  },
  "home-sponsor": {
    src: "/images/school/lunch-table.jpg",
    alt: "Boys in green uniforms sharing a meal at a long white table",
    focus: "40% 50%",
    approved: true,
    guidance: "Home page sponsorship section, portrait. Everyday care: a meal, study time or boarding life.",
  },
  "home-curriculum": {
    src: "/images/school/classroom-lesson.jpg",
    alt: "A classroom of boys at round tables while their teacher writes on the whiteboard",
    focus: "50% 50%",
    approved: true,
    guidance: "Home page curriculum section, landscape. A class or Qur'an lesson in progress.",
  },

  // ----- About -----
  "about-hero": {
    src: "/images/school/aerial-ocean-view.jpg",
    alt: "Aerial view of the Kenyan coastline with the Al-Falah school close to the ocean",
    focus: "50% 70%",
    approved: true,
    guidance: "About Us page banner, wide landscape. The school buildings or grounds.",
  },
  "about-story": {
    src: "/images/school/mosque-boys-seated.jpg",
    alt: "Boys in green and white robes sitting together on the carpet of the school mosque",
    focus: "35% 50%",
    approved: true,
    guidance: "About Us 'Our Story' section, portrait or square.",
  },
  "about-education": {
    src: "/images/school/classroom-lesson.jpg",
    alt: "A classroom of boys at round tables while their teacher writes on the whiteboard",
    focus: "50% 50%",
    approved: true,
    guidance: "About Us 'Education at Al-Falah' section, landscape. Learning in a classroom.",
  },
  "founder-1": {
    src: "/images/school/founder-fuad-abdallah.jpg",
    alt: "Portrait of Dr Fuwad Abdallah, co-founder of Al-Falah",
    focus: "50% 35%",
    approved: true,
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
    src: "/images/school/phonics-classroom.jpg",
    alt: "A bright classroom decorated with phonics charts, with boys seated at round tables",
    focus: "50% 50%",
    approved: true,
    guidance: "Curriculum page banner, wide landscape. A lesson in progress.",
  },
  "curriculum-quran": {
    src: "/images/school/quran-lesson.jpg",
    alt: "A teacher listening as a boy reads from the Qur'an during a lesson",
    focus: "55% 50%",
    approved: true,
    guidance: "Qur'an and Tahfidh section, portrait or square. Qur'an reading or a madrasa class.",
  },
  "curriculum-academic": {
    src: "/images/school/maths-lesson-whiteboard.jpg",
    alt: "A pupil working through an addition example on the whiteboard during a mathematics lesson",
    focus: "45% 45%",
    approved: true,
    guidance: "Kenyan curriculum section, portrait or square. An academic lesson.",
  },

  // ----- Sponsor / Donate -----
  "sponsor-hero": {
    src: "/images/school/lunch-dining-hall.jpg",
    alt: "Boys eating lunch together at white tables in the dining hall",
    focus: "40% 50%",
    approved: true,
    guidance: "Sponsor a Child page, portrait or square. Daily care at the school. Avoid close-ups that make a child identifiable.",
  },
  "donate-hero": {
    src: "/images/school/dining-hall-meal.jpg",
    alt: "The school dining hall at mealtime, with rows of boys eating together",
    focus: "50% 50%",
    approved: true,
    guidance: "Donate page, portrait or square. The school environment or a group activity.",
  },

  // ----- Contact -----
  "contact-image": {
    src: "/images/school/school-courtyard.jpg",
    alt: "The Al-Falah school courtyard and buildings from above, with the Indian Ocean beyond",
    focus: "50% 55%",
    approved: true,
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
  {
    src: "/images/school/quran-lesson.jpg",
    alt: "A teacher listening as a boy reads from the Qur'an during a lesson",
    caption: "Qur'an lesson",
    category: "Qur'an",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/congregational-prayer.jpg",
    alt: "Boys and staff in prostration together during prayer in the school mosque",
    caption: "Prayer together",
    category: "Qur'an",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/phonics-classroom.jpg",
    alt: "A bright classroom decorated with phonics charts, with boys seated at round tables",
    caption: "Our phonics classroom",
    category: "Learning",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/football-match.jpg",
    alt: "Boys playing football on the school's grass pitch while friends and staff watch",
    caption: "Match day on the school pitch",
    category: "Daily life",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/maths-lesson-whiteboard.jpg",
    alt: "A pupil working through an addition example on the whiteboard during a mathematics lesson",
    caption: "Mathematics: learning addition",
    category: "Learning",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/lunch-table.jpg",
    alt: "Boys in green uniforms sharing a meal at a long white table",
    caption: "Lunch together",
    category: "Meals",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/boys-walking.jpg",
    alt: "Boys in green robes walking in a line past the school buildings",
    caption: "On the way to class",
    category: "Daily life",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/mosque-prayer-hall.jpg",
    alt: "The bright prayer hall at Al-Falah, with boys seated at the front and staff standing behind them",
    caption: "The school mosque",
    category: "Grounds",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/assembly-line-up.jpg",
    alt: "Boys in green Al-Falah School Kikambala tracksuits lining up outside the school building",
    caption: "Lining up in the morning",
    category: "Daily life",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/dining-hall-meal.jpg",
    alt: "The school dining hall at mealtime, with rows of boys eating together",
    caption: "The dining hall",
    category: "Meals",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/mosque-gathering-teachers.jpg",
    alt: "Boys seated on the mosque carpet with their teachers standing behind them",
    caption: "Gathering in the mosque",
    category: "Qur'an",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/classroom-lesson.jpg",
    alt: "A classroom of boys at round tables while their teacher writes on the whiteboard",
    caption: "A lesson in progress",
    category: "Learning",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/football-kick-off.jpg",
    alt: "A boy in a red kit kicking off a football match on the school pitch",
    caption: "Kick-off",
    category: "Daily life",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/lunch-dining-hall.jpg",
    alt: "Boys eating lunch together at white tables in the dining hall",
    caption: "Mealtime",
    category: "Meals",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/mosque-boys-seated.jpg",
    alt: "Boys in green and white robes sitting together on the carpet of the school mosque",
    caption: "In the mosque",
    category: "Qur'an",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/dining-hall-boys.jpg",
    alt: "Boys in green robes seated at the white tables of the dining hall",
    caption: "Together in the dining hall",
    category: "Meals",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/aerial-coastline.jpg",
    alt: "Aerial view of the Al-Falah school buildings, courtyard and mosque near the Kikambala coastline",
    caption: "Al-Falah from above",
    category: "Grounds",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/school-courtyard.jpg",
    alt: "The Al-Falah school courtyard and buildings from above, with the Indian Ocean beyond",
    caption: "The school courtyard",
    category: "Grounds",
    approved: true,
    guidance: "",
  },
  {
    src: "/images/school/aerial-ocean-view.jpg",
    alt: "Aerial view of the Kenyan coastline with the Al-Falah school close to the ocean",
    caption: "By the Indian Ocean",
    category: "Grounds",
    approved: true,
    guidance: "",
  },
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
