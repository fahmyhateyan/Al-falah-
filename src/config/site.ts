/**
 * CENTRAL SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every fact the website states about Al-Falah lives here, so it can be
 * changed in one place. Each value is marked with its verification status:
 *
 *   VERIFIED  – supplied by the owner in the website brief or legal documents.
 *   CONFIRM   – supplied, but the exact wording/spelling needs owner sign-off.
 *   MISSING   – not yet supplied. Leave as null; the site hides it until set.
 *
 * Never fill a MISSING value with a guess. See docs/PRELAUNCH-CHECKLIST.md.
 * ---------------------------------------------------------------------------
 */

export type Founder = {
  /** Display name with title, e.g. "Dr. Fuad Abdallah". */
  name: string;
  /** Optional approved role description. Do not invent. */
  role: string | null;
  /** Optional approved short biography. Do not invent. */
  bio: string | null;
  /** Media slot id from src/config/media.ts, or null for no photo. */
  photo: string | null;
};

export const site = {
  // VERIFIED (logo reads "Al-Falah school-kikambala"). CONFIRM preferred public
  // name: the curriculum document uses "Al-Falah Boys School, Kikambala".
  name: "Al-Falah",
  fullName: "Al-Falah School, Kikambala",
  tagline: "Success is in Knowledge", // VERIFIED – from the logo
  // MISSING – set to the live domain before launch (used for sitemap/metadata).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  foundedYear: 2024, // VERIFIED
  location: {
    // VERIFIED – general location only. Do not add a street address until a
    // public address is approved.
    area: "Kikambala",
    region: "coastal Kenya, near Mombasa",
    country: "Kenya",
    publicAddress: null as string | null, // MISSING
    mapEmbedUrl: null as string | null, // MISSING – only once address approved
  },

  // CONFIRM – working English spellings from the brief. The registered trust
  // documents give the trustees as "Fuad Abdallah Mohamed" and
  // "Durra F Abdallah" / "Durra Fuad Abdallah". The brief gives the second
  // founder as "Dr. Durra Said Sherman" (and elsewhere "Dr. Dora").
  // The owner must confirm the exact public names and titles.
  founders: [
    { name: "Dr. Fuad Abdallah", role: null, bio: null, photo: null },
    { name: "Dr. Durra Said Sherman", role: null, bio: null, photo: null },
  ] satisfies Founder[],

  sponsorship: {
    // VERIFIED – instructed in the brief. All totals and copy derive from this.
    monthlyAmount: 100,
    currency: "USD",
    maxChildrenPerCheckout: 10,
    // When true, a one-off "Support one month" payment is offered. It never
    // creates a subscription.
    allowOneMonthSupport: true,
    // CONFIRM – how sponsors are paired and updated must be approved before
    // live launch. Set to true once the process is agreed.
    pairingProcessConfirmed: false,
  },

  donations: {
    currency: "USD",
    suggestedAmounts: [10, 25, 50, 100],
    minAmount: 5,
    maxAmount: 10000,
    allowMonthly: true,
    // Only the general fund is enabled. Restricted campaigns stay disabled
    // until their purpose and handling policy are confirmed.
    funds: [
      {
        id: "general",
        name: "General school support fund",
        description:
          "Helps meet the everyday costs of running the school: care, boarding, meals, teaching and learning materials.",
        enabled: true,
      },
    ],
  },

  trust: {
    // Interim wording from the brief, used wherever the trust is mentioned.
    summary:
      "Al-Falah's work is supported through a trust structure intended to sustain the school's educational and welfare mission.",
    // VERIFIED from the supplied Certificate of Incorporation (Trustees
    // (Perpetual Succession) Act, Cap. 164). CONFIRM that the owner is happy
    // for these to be published. Set publishRegistration to false to hide.
    registeredName: "Al Falah Charitable Trust Deed",
    legalForm: "Registered trustees incorporated under the Trustees (Perpetual Succession) Act (Cap. 164), Laws of Kenya",
    registrationNumber: "TPS-AJCJPAB",
    registrationDate: "17 September 2026",
    trustDeedDate: "23 June 2026",
    // VERIFIED – clause 4 of the trust deed.
    objects: ["To raise funds to educate needy and orphaned children."],
    publishRegistration: true,
    // CONFIRM – trustee names exactly as registered. Hidden until the owner
    // confirms the public spelling (see founders note above).
    trustees: ["Fuad Abdallah Mohamed", "Durra F Abdallah"],
    publishTrustees: false,
    // MISSING – relationship between trust and school, governance
    // responsibilities, and any redacted document approved for publication.
    relationshipToSchool: null as string | null,
    governance: null as string | null,
    publishedDocument: null as { label: string; href: string } | null,
  },

  contact: {
    // All MISSING. The site shows each item only once it is set here.
    email: null as string | null,
    phone: null as string | null,
    whatsapp: null as string | null, // international format, digits only, e.g. "2547..."
  },

  social: {
    // All MISSING. Add full URLs once confirmed.
    facebook: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
    x: null as string | null,
    tiktok: null as string | null,
  },

  /**
   * Bank / M-Pesa details. Display ONLY after the details have been supplied
   * and verified against the organisation's account. Manual transfers stay
   * "pending" until reconciled by staff.
   */
  manualGiving: {
    bankTransfer: null as null | {
      accountName: string;
      bankName: string;
      accountNumber: string;
      branch?: string;
      swift?: string;
      currency: string;
    },
    mpesaPaybill: null as null | { paybill: string; accountReference: string },
    verified: false,
  },

  policies: {
    // Set each to true once the owner has approved final policy text.
    privacyApproved: false,
    termsApproved: false,
    safeguardingApproved: false,
  },
} as const;

export type SiteConfig = typeof site;

/** Main navigation, in order. */
export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/curriculum", label: "Our Curriculum" },
  { href: "/sponsor-a-child", label: "Sponsor a Child" },
  { href: "/school-life", label: "School Life" },
  { href: "/contact", label: "Contact" },
] as const;

export const policyNav = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Donation & sponsorship terms" },
  { href: "/safeguarding", label: "Safeguarding" },
] as const;

export function founderNames(): string {
  const names = site.founders.map((f) => f.name);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
