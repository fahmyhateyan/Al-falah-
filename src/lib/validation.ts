import { site } from "../config/site.ts";
import { sponsorshipTotal, type Frequency } from "./pricing.ts";

export type FieldErrors = Record<string, string>;
export type Result<T> = { ok: true; value: T } | { ok: false; errors: FieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

export function isEmail(v: string): boolean {
  return v.length <= 254 && EMAIL_RE.test(v);
}

export type SupporterDetails = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  message: string;
  marketingConsent: boolean;
};

function validateSupporter(input: Record<string, unknown>, errors: FieldErrors): SupporterDetails {
  const firstName = str(input.firstName);
  const lastName = str(input.lastName);
  const email = str(input.email).toLowerCase();
  const country = str(input.country);
  const message = str(input.message);
  if (!firstName) errors.firstName = "Please enter your first name.";
  else if (firstName.length > 80) errors.firstName = "First name is too long.";
  if (!lastName) errors.lastName = "Please enter your last name.";
  else if (lastName.length > 80) errors.lastName = "Last name is too long.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (country.length > 80) errors.country = "Country is too long.";
  if (message.length > 1000) errors.message = "Please keep your message under 1,000 characters.";
  return { firstName, lastName, email, country, message, marketingConsent: input.marketingConsent === true };
}

function parseFrequency(v: unknown): Frequency | null {
  return v === "monthly" || v === "one-time" ? v : null;
}

export type SponsorshipRequest = SupporterDetails & {
  kind: "sponsorship";
  children: number;
  frequency: Frequency;
  amount: number;
  currency: string;
};

export function validateSponsorship(input: Record<string, unknown>): Result<SponsorshipRequest> {
  const errors: FieldErrors = {};
  const children = Number(input.children);
  const max = site.sponsorship.maxChildrenPerCheckout;
  if (!Number.isInteger(children) || children < 1 || children > max) {
    errors.children = `Please choose between 1 and ${max} children.`;
  }
  const frequency = parseFrequency(input.frequency);
  if (!frequency) errors.frequency = "Please choose how often you would like to give.";
  else if (frequency === "one-time" && !site.sponsorship.allowOneMonthSupport) {
    errors.frequency = "One-month support is not currently available.";
  }
  if (input.billingConsent !== true) {
    errors.billingConsent = "Please confirm you understand the amount and how often you will be charged.";
  }
  const supporter = validateSupporter(input, errors);
  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      ...supporter,
      kind: "sponsorship",
      children,
      frequency: frequency!,
      // Amount is always derived server-side from configuration, never trusted from the client.
      amount: sponsorshipTotal(children),
      currency: site.sponsorship.currency,
    },
  };
}

export type DonationRequest = SupporterDetails & {
  kind: "donation";
  amount: number;
  frequency: Frequency;
  fund: string;
  currency: string;
};

export function parseDonationAmount(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number(str(v).replace(/[,\s$]/g, ""));
  if (!Number.isFinite(n)) return null;
  // At most two decimal places.
  if (Math.round(n * 100) !== n * 100) return null;
  return n;
}

export function validateDonation(input: Record<string, unknown>): Result<DonationRequest> {
  const errors: FieldErrors = {};
  const { minAmount, maxAmount, allowMonthly, funds, currency } = site.donations;
  const amount = parseDonationAmount(input.amount);
  if (amount === null) errors.amount = "Please enter an amount in dollars, for example 25.";
  else if (amount < minAmount) errors.amount = `The minimum donation is $${minAmount}.`;
  else if (amount > maxAmount) errors.amount = `For gifts over $${maxAmount.toLocaleString("en-GB")}, please contact us.`;
  const frequency = parseFrequency(input.frequency);
  if (!frequency) errors.frequency = "Please choose one-off or monthly.";
  else if (frequency === "monthly" && !allowMonthly) errors.frequency = "Monthly donations are not currently available.";
  const fund = str(input.fund) || "general";
  if (!funds.some((f) => f.id === fund && f.enabled)) errors.fund = "Please choose an available fund.";
  if (frequency === "monthly" && input.billingConsent !== true) {
    errors.billingConsent = "Please confirm you understand this is a monthly payment.";
  }
  const supporter = validateSupporter(input, errors);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { ...supporter, kind: "donation", amount: amount!, frequency: frequency!, fund, currency } };
}

export const ENQUIRY_TYPES = ["General enquiry", "Sponsorship", "Donations", "Partnerships", "Curriculum"] as const;

export type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  enquiryType: (typeof ENQUIRY_TYPES)[number];
  message: string;
};

export function validateContact(input: Record<string, unknown>): Result<ContactRequest> {
  const errors: FieldErrors = {};
  const name = str(input.name);
  const email = str(input.email).toLowerCase();
  const phone = str(input.phone);
  const enquiryType = str(input.enquiryType) as ContactRequest["enquiryType"];
  const message = str(input.message);
  if (!name) errors.name = "Please enter your name.";
  else if (name.length > 120) errors.name = "Name is too long.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (phone && !/^[+()\d\s-]{6,25}$/.test(phone)) errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (!ENQUIRY_TYPES.includes(enquiryType)) errors.enquiryType = "Please choose an enquiry type.";
  if (message.length < 10) errors.message = "Please write a message of at least 10 characters.";
  else if (message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { name, email, phone, enquiryType, message } };
}
