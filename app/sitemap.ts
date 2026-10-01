import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { PAGES, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// lastmod 는 실제 내용이 바뀐 날짜로 고정한다 (new Date() 금지 — 관상가양반 L4).
const PAGE_UPDATED = "2026-10-01";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: PAGE_UPDATED })),
    ...getPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: p.updated })),
  ];
}
