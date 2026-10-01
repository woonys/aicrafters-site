import { getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rfc822 = (d: string) => new Date(`${d}T09:00:00+09:00`).toUTCString();

export function GET() {
  const posts = getPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}/</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Crafters 블로그</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>근로·지원금 기준을 공식 출처와 계산 예시로 정리합니다.</description>
    <language>ko</language>
    ${posts[0] ? `<lastBuildDate>${rfc822(posts[0].updated)}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
