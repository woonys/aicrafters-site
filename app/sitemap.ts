import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: "2026-10-01" }));
}
