import Link from "next/link";
import { sponsorshipPrice } from "@/lib/pricing";

/**
 * Two-way choice shown at the top of the Sponsor and Donate forms, so visitors
 * can always switch between full sponsorship and a donation of any amount.
 */
export function GiveSwitch({ active }: { active: "sponsor" | "donate" }) {
  const base = "flex min-h-[64px] flex-1 flex-col items-center justify-center rounded-2xl px-3 py-2 text-center transition-colors";
  const on = "bg-forest-800 text-mist-50 shadow-sm";
  const off = "text-forest-900 hover:bg-forest-900/5";
  return (
    <nav aria-label="Choose how to give" className="flex gap-1 rounded-3xl bg-mist-100 p-1 ring-1 ring-forest-900/10">
      <Link href="/sponsor-a-child" aria-current={active === "sponsor" ? "page" : undefined} className={`${base} ${active === "sponsor" ? on : off}`}>
        <span className="font-semibold">Sponsor a child</span>
        <span className={`text-sm ${active === "sponsor" ? "text-leaf-200" : "text-forest-800/75"}`}>{sponsorshipPrice()} a month</span>
      </Link>
      <Link href="/donate" aria-current={active === "donate" ? "page" : undefined} className={`${base} ${active === "donate" ? on : off}`}>
        <span className="font-semibold">Give another amount</span>
        <span className={`text-sm ${active === "donate" ? "text-leaf-200" : "text-forest-800/75"}`}>Any size, one-off or monthly</span>
      </Link>
    </nav>
  );
}
