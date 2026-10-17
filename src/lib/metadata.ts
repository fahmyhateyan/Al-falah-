import type { Metadata } from "next";
import { site } from "@/config/site";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.fullName}`, description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.fullName}`, description },
  };
}
