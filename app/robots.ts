import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// 검색·AI 검색 크롤러를 명시적으로 허용한다 (Yeti = 네이버, OAI-SearchBot = ChatGPT 검색).
const BOTS = ["Googlebot", "Yeti", "Bingbot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...BOTS.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
