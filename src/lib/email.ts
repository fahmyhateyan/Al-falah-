import type { ContactRequest } from "./validation.ts";

/**
 * Sends contact-form enquiries by email through Resend's HTTP API.
 * Required environment variables:
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * Another provider can be swapped in by replacing sendEnquiry().
 */
export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEnquiry(enquiry: ContactRequest): Promise<boolean> {
  if (!emailConfigured()) return false;
  const text = [
    `Enquiry type: ${enquiry.enquiryType}`,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "—"}`,
    "",
    enquiry.message,
  ].join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
      reply_to: enquiry.email,
      subject: `Website enquiry: ${enquiry.enquiryType}`,
      text,
      html: `<pre style="font-family:inherit;white-space:pre-wrap">${escape(text)}</pre>`,
    }),
  });
  if (!res.ok) console.error(`[contact] Email provider returned HTTP ${res.status}`);
  return res.ok;
}
