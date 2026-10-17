import assert from "node:assert/strict";
import { test } from "node:test";
import { site } from "../src/config/site.ts";
import { donationBillingLabel, formatMoney, sponsorshipBillingLabel, sponsorshipTotal } from "../src/lib/pricing.ts";
import { parseDonationAmount, validateContact, validateDonation, validateSponsorship } from "../src/lib/validation.ts";

const supporter = { firstName: "Amina", lastName: "Hassan", email: "amina@example.com" };

test("sponsorship totals derive from configured monthly amount", () => {
  const m = site.sponsorship.monthlyAmount;
  assert.equal(sponsorshipTotal(1), m);
  assert.equal(sponsorshipTotal(2), 2 * m);
  assert.equal(sponsorshipTotal(5), 5 * m);
  assert.equal(formatMoney(sponsorshipTotal(2)), "$200");
});

test("billing labels state frequency explicitly", () => {
  assert.match(sponsorshipBillingLabel(2, "monthly"), /\$200 charged every month for 2 children, until you cancel/);
  assert.match(sponsorshipBillingLabel(1, "one-time"), /charged once .* no recurring payment/);
  assert.equal(donationBillingLabel(25, "one-time"), "$25 charged once");
  assert.equal(donationBillingLabel(10.5, "monthly"), "$10.50 charged every month, until you cancel");
});

test("sponsorship validation computes amount server-side and requires consent", () => {
  const ok = validateSponsorship({ ...supporter, children: 3, frequency: "monthly", billingConsent: true, amount: 1 });
  assert.ok(ok.ok);
  if (ok.ok) {
    assert.equal(ok.value.amount, 300, "client-supplied amount must be ignored");
    assert.equal(ok.value.marketingConsent, false, "marketing consent defaults to false");
  }
  const noConsent = validateSponsorship({ ...supporter, children: 1, frequency: "monthly" });
  assert.ok(!noConsent.ok && noConsent.errors.billingConsent);
  for (const bad of [0, -1, 1.5, site.sponsorship.maxChildrenPerCheckout + 1, "abc"]) {
    const r = validateSponsorship({ ...supporter, children: bad, frequency: "monthly", billingConsent: true });
    assert.ok(!r.ok && r.errors.children, `children=${bad} should fail`);
  }
  const badFreq = validateSponsorship({ ...supporter, children: 1, frequency: "weekly", billingConsent: true });
  assert.ok(!badFreq.ok && badFreq.errors.frequency);
});

test("donation amount parsing and limits", () => {
  assert.equal(parseDonationAmount("25"), 25);
  assert.equal(parseDonationAmount("$1,000"), 1000);
  assert.equal(parseDonationAmount("12.50"), 12.5);
  assert.equal(parseDonationAmount("12.345"), null);
  assert.equal(parseDonationAmount("abc"), null);
  const min = site.donations.minAmount;
  const tooSmall = validateDonation({ ...supporter, amount: min - 1, frequency: "one-time" });
  assert.ok(!tooSmall.ok && tooSmall.errors.amount);
  const tooBig = validateDonation({ ...supporter, amount: site.donations.maxAmount + 1, frequency: "one-time" });
  assert.ok(!tooBig.ok && tooBig.errors.amount);
  const ok = validateDonation({ ...supporter, amount: "50", frequency: "one-time" });
  assert.ok(ok.ok && ok.value.amount === 50 && ok.value.fund === "general");
});

test("monthly donations need billing consent; one-off do not", () => {
  const monthly = validateDonation({ ...supporter, amount: 10, frequency: "monthly" });
  assert.ok(!monthly.ok && monthly.errors.billingConsent);
  const monthlyOk = validateDonation({ ...supporter, amount: 10, frequency: "monthly", billingConsent: true });
  assert.ok(monthlyOk.ok);
});

test("disabled funds are rejected", () => {
  const r = validateDonation({ ...supporter, amount: 10, frequency: "one-time", fund: "building" });
  assert.ok(!r.ok && r.errors.fund);
});

test("supporter and contact validation", () => {
  const r = validateDonation({ firstName: "", lastName: "X", email: "not-an-email", amount: 10, frequency: "one-time" });
  assert.ok(!r.ok && r.errors.firstName && r.errors.email);
  const c = validateContact({ name: "Sam", email: "sam@example.com", enquiryType: "Sponsorship", message: "Hello, I would like to know more." });
  assert.ok(c.ok);
  const bad = validateContact({ name: "", email: "x", enquiryType: "Spam", message: "hi", phone: "abc" });
  assert.ok(!bad.ok && bad.errors.name && bad.errors.email && bad.errors.enquiryType && bad.errors.message && bad.errors.phone);
});
