import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const routes = ["", "/about", "/curriculum", "/sponsor-a-child", "/donate", "/school-life", "/school-life/facilities", "/contact", "/privacy", "/terms", "/safeguarding"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : ["/sponsor-a-child", "/donate"].includes(r) ? 0.9 : 0.6,
  }));
}
