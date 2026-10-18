import type { MediaId } from "@/config/media";

/**
 * FACILITIES – shown on /school-life/facilities.
 * Descriptions only state what the school's own photos show.
 * `count` is MISSING for now: set a number (e.g. 8) once confirmed and the
 * page shows it, e.g. "8 classrooms". Leave null to hide it.
 */
export type Facility = {
  name: string;
  /** Plural label used with the count, e.g. "classrooms". */
  countLabel?: string;
  count: number | null;
  description: string;
  photo: MediaId | null;
  icon: "mosque" | "classroom" | "quran" | "dining" | "kitchen" | "sports" | "boarding" | "grounds";
};

export const facilities: Facility[] = [
  {
    name: "Mosque",
    count: null,
    description:
      "A spacious, light-filled mosque at the heart of the school, where the boys pray together and gather for Islamic lessons.",
    photo: "facility-mosque",
    icon: "mosque",
  },
  {
    name: "Classrooms",
    countLabel: "classrooms",
    count: null,
    description:
      "Bright, airy classrooms with round tables for group work, colourful wall charts and whiteboards for the Kenyan curriculum.",
    photo: "facility-classrooms",
    icon: "classroom",
  },
  {
    name: "Madrasa rooms",
    countLabel: "madrasa rooms",
    count: null,
    description:
      "Carpeted rooms with low wooden desks, set aside for Qur'an reading, memorisation and Madrasa studies.",
    photo: "facility-madrasa",
    icon: "quran",
  },
  {
    name: "Dining hall",
    count: null,
    description: "A large, airy dining hall where the boys sit down together for their meals each day.",
    photo: "facility-dining",
    icon: "dining",
  },
  {
    name: "Kitchen",
    count: null,
    description: "An on-site kitchen that prepares the boys' meals and serves them straight into the dining hall.",
    photo: null,
    icon: "kitchen",
  },
  {
    name: "Sports ground",
    count: null,
    description: "A fenced grass football pitch with floodlights and seating, where the boys play and watch matches.",
    photo: "facility-sports",
    icon: "sports",
  },
  {
    name: "Boarding accommodation",
    count: null,
    description: "Boarding accommodation on site, so the boys live at the school in the care of its staff.",
    photo: null,
    icon: "boarding",
  },
  {
    name: "Grounds and courtyard",
    count: null,
    description: "Green, landscaped courtyards inside a secure, walled compound, a short distance from the Indian Ocean.",
    photo: "facility-grounds",
    icon: "grounds",
  },
];
