import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";

/** Header lockup: the logo emblem used intact, with the school name set beside it. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={`${site.fullName} – ${site.tagline} – home`}>
      <span className={`flex h-10 w-12 shrink-0 sm:h-12 sm:w-14 items-center justify-center rounded-xl ${light ? "bg-ivory-50 p-1.5" : ""}`}>
        <Image src="/images/brand/logo-emblem.png" alt="" width={237} height={195} className="h-auto w-full" priority />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-xl font-bold ${light ? "text-ivory-50" : "text-forest-900"}`}>{site.name}</span>
        <span className={`mt-1 hidden text-[0.7rem] font-semibold min-[400px]:block uppercase tracking-[0.18em] ${light ? "text-leaf-200" : "text-forest-600"}`}>
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
