# Photographs, gallery and video

All media is controlled from **`src/config/media.ts`**. Nothing else needs editing.

## Rules for every image

- Use **real photographs of Al-Falah** only. No AI-generated pictures of children, and no stock photos presented as our pupils.
- Use only photos **approved for public use** by the school.
- **No identifying information about children** – no names, ages, case histories or precise locations in captions, alt text or file names.
- Prefer images where children are not the sole close-up subject (groups, hands at work, from behind, wider shots).

## Adding or replacing a photo

1. Optimise the image: JPG or WebP, about **2000 px on the long edge**, ideally **under 500 KB** (e.g. with squoosh.app).
   The site also resizes and converts images automatically for each device.
2. Save it in **`public/images/school/`** with a plain, descriptive name, e.g. `classroom-morning.jpg`.
3. In `src/config/media.ts`, find the slot and fill it in:

```ts
"home-hero": {
  src: "/images/school/school-grounds.jpg",
  alt: "The Al-Falah school buildings and courtyard in the morning sun",
  caption: "The school grounds",       // optional
  focus: "50% 35%",                    // optional – keeps faces in frame when cropped
  approved: true,                      // REQUIRED – unapproved photos are never shown
  guidance: "…",                       // leave as is
},
```

4. Rebuild/redeploy. Until a slot has `src` **and** `approved: true`, a clearly marked placeholder is shown.

**Alt text** should describe what the picture shows for someone who can't see it ("Boys reading the Qur'an together
in the madrasa"), not "image of…" and never a child's name.

**Cropping:** slots are cropped to fit their frame. If a head is cut off, change `focus` – the first number moves
left/right (0%–100%), the second up/down. `"50% 25%"` keeps the upper part of the photo in view.

### Photo slots

| Slot id | Where it appears | Best shape |
| --- | --- | --- |
| `home-hero` | Home page, behind the main heading | Wide landscape |
| `video-poster` | Still frame on the school video | 16:9 |
| `home-about` | Home – About Al-Falah | Portrait |
| `home-sponsor` | Home – sponsorship section | Portrait |
| `home-curriculum` | Home – curriculum overview | Landscape |
| `about-hero` | About Us banner | Landscape |
| `about-story` | About – Our story | Portrait |
| `about-education` | About – Education at Al-Falah | Landscape |
| `founder-1`, `founder-2` | About – founders (optional). Also set `photo: "founder-1"` on the founder in `site.ts` | Square |
| `curriculum-hero` | Curriculum banner | Landscape |
| `curriculum-quran` | Curriculum – Islamic strand | Landscape |
| `curriculum-academic` | Curriculum – Kenyan strand | Landscape |
| `sponsor-hero` | Sponsor a Child (desktop) | Landscape |
| `donate-hero` | Donate (desktop) | Landscape |
| `contact-image` | Contact (shown until a map is approved) | Landscape |

Tip: in development (`npm run dev`) each placeholder shows its slot id, and hovering shows guidance. To show slot ids
on a production review build, set `NEXT_PUBLIC_SHOW_MEDIA_SLOTS=true`.

## School Life gallery

Add entries to the `gallery` array in `media.ts` – as many as you like. The first five also appear on the home page.

```ts
export const gallery: GalleryItem[] = [
  {
    src: "/images/school/lunch-time.jpg",
    alt: "Boys sharing a meal together at long tables",
    caption: "Lunch together",
    category: "Meals",            // Learning | Qur'an | Meals | Daily life | Grounds
    approved: true,
    guidance: "",
  },
];
```

## The school video

Set the `video` object in `media.ts`:

| Option | Settings |
| --- | --- |
| No video yet | `type: "none"` – shows a "School video coming soon" panel (no play button) |
| Local MP4 | Put the file in `public/video/`, then `type: "mp4", src: "/video/al-falah.mp4"`. Keep it under ~50 MB (H.264, 1080p or 720p). |
| YouTube | `type: "youtube", src: "VIDEO_ID"` (the part after `v=` in the URL) |
| Vimeo | `type: "vimeo", src: "123456789"` |

- **Captions:** for MP4, add a WebVTT file (e.g. `public/video/al-falah.en.vtt`) and set `captionsSrc`.
  For YouTube/Vimeo, add captions on that platform.
- The poster is the `video-poster` slot (falls back to the home hero photo).
- The video never autoplays. YouTube/Vimeo load only after the visitor presses play (privacy-enhanced YouTube domain).

## Logo

The supplied logo is in `public/images/brand/`:
`logo-original.jpg` (as supplied), `logo-full.png` / `logo-full-transparent.png` (cropped lockup), `logo-emblem.png` (emblem only, used in the header),
and `public/icon.png` / `public/apple-icon.png` (browser icons). A higher-resolution or vector (SVG) logo would improve sharpness – replace these files with the same names.
