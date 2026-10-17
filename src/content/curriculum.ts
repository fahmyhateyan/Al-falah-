/**
 * CURRICULUM CONTENT
 * Source: "Integrated Curriculum – Al-Falah Boys School, Kikambala", prepared
 * from the school's curriculum outline dated 2 October 2026 (VERIFIED).
 *
 * Still MISSING (kept off the public page until supplied – see checklist):
 *   - which levels/classes currently run at the school
 *   - daily routine / timetable
 *   - Qur'an memorisation method and targets
 *   - how progress is assessed and reported to families/sponsors
 */

export type Level = {
  name: string;
  translation?: string;
  duration: string | null;
  summary?: string;
  subjects: string[];
};

export const madrasaLevels: Level[] = [
  {
    name: "Ibtidai",
    translation: "Elementary",
    duration: "6 years",
    summary:
      "Builds a foundation in Qur'an recitation, Arabic, Islamic beliefs, worship and good character.",
    subjects: [
      "Tilawatul Qur'an (Qur'an recitation)",
      "Lughatul Arabiyya (Arabic language)",
      "Tawheed",
      "Fiqh",
      "Hadith",
      "Seerah",
      "Adhkar (Akhlaq)",
      "Tajweed",
    ],
  },
  {
    name: "Mutawassit",
    translation: "Intermediate",
    duration: "3 years",
    summary:
      "Develops the foundations further, with deeper study of Islamic subjects and an introduction to Qur'anic explanation (Tafsir).",
    subjects: ["Lughatul Arabiyya", "Tawheed", "Fiqh", "Hadith", "Seerah", "Tajweed", "Tafsir al-Qur'an"],
  },
  {
    name: "Thanawi",
    translation: "Secondary",
    duration: null,
    summary: "More advanced study of Arabic, Islamic teachings and the understanding of the Qur'an.",
    subjects: ["Lughatul Arabiyya", "Tawheed", "Fiqh", "Hadith", "Seerah", "Tajweed", "Tafsir al-Qur'an"],
  },
];

export const tahfidh = {
  name: "Tahfidh al-Qur'an",
  summary:
    "Memorisation of the Qur'an (Hifdh) with Tajweed – the rules of correct pronunciation and recitation. Tahfidh complements the broader Islamic education provided through Ta'lim.",
};

export const cbeLevels: Level[] = [
  {
    name: "Pre-Primary",
    translation: "PP1 and PP2",
    duration: "2 years",
    subjects: [
      "Language Activities",
      "Mathematical Activities",
      "Environmental Activities",
      "Psychomotor and Creative Activities",
      "Religious Activities",
    ],
  },
  {
    name: "Lower Primary",
    translation: "Grades 1–3",
    duration: "3 years",
    subjects: [
      "English Activities",
      "Shughuli za Kiswahili",
      "Religious Education Activities",
      "Mathematics Activities",
      "Creative Activities",
      "Environmental Activities",
    ],
  },
  {
    name: "Upper Primary",
    translation: "Grades 4–6",
    duration: "3 years",
    subjects: [
      "English",
      "Kiswahili",
      "Mathematics",
      "Religious Education",
      "Science and Technology",
      "Agriculture and Nutrition",
      "Social Studies",
      "Creative Arts and Physical Education",
    ],
  },
  {
    name: "Junior School",
    translation: "Grades 7–9",
    duration: "3 years",
    subjects: [
      "English",
      "Kiswahili",
      "Mathematics",
      "Religious Education",
      "Social Studies",
      "Integrated Science",
      "Pre-Technical Studies",
      "Agriculture and Nutrition",
      "Creative Arts and Sports",
    ],
  },
];

export const seniorSchool = {
  name: "Senior School",
  translation: "Grades 10–12",
  duration: "3 years",
  core: ["English", "Kiswahili", "Core Mathematics or Essential Mathematics", "Community Service Learning (CSL)"],
  nonExaminable: ["Information Communication Technology (ICT)", "Physical Education (PE)", "Pastoral Programme Instruction"],
  stemPathway: [
    { track: "Pure Sciences", subjects: ["Biology", "Chemistry", "Physics"] },
    { track: "Applied Sciences", subjects: ["Agriculture", "Computer Studies"] },
    { track: "Technical Studies", subjects: ["Metalwork", "Media Technology", "Marine and Fisheries"] },
  ],
};

/**
 * Editable areas. Leave a value as null until the school supplies it; the
 * public page then shows a neutral sentence instead of a made-up detail.
 */
export const curriculumDetails = {
  levelsCurrentlyOffered: null as string | null,
  dailyRoutine: null as string | null,
  quranApproach: null as string | null,
  classGroups: null as string | null,
  progressReporting: null as string | null,
};
