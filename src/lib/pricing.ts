import { site } from "../config/site.ts";

export type Frequency = "monthly" | "one-time";

export function formatMoney(amount: number, currency: string = site.sponsorship.currency): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** e.g. "$100" */
export const sponsorshipPrice = (): string => formatMoney(site.sponsorship.monthlyAmount);

/** Total for sponsoring `children` children, in whole currency units. */
export function sponsorshipTotal(children: number): number {
  return site.sponsorship.monthlyAmount * children;
}

/** Human-readable billing statement shown beside the checkout button. */
export function sponsorshipBillingLabel(children: number, frequency: Frequency): string {
  const total = formatMoney(sponsorshipTotal(children));
  const who = children === 1 ? "1 child" : `${children} children`;
  return frequency === "monthly"
    ? `${total} charged every month for ${who}, until you cancel`
    : `${total} charged once to support ${who} for one month – no recurring payment`;
}

export function donationBillingLabel(amount: number, frequency: Frequency): string {
  const money = formatMoney(amount, site.donations.currency);
  return frequency === "monthly"
    ? `${money} charged every month, until you cancel`
    : `${money} charged once`;
}

/** Convert whole units to the smallest currency unit (cents) for providers. */
export const toMinorUnits = (amount: number): number => Math.round(amount * 100);
