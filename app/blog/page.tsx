import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { getPosts } from "@/lib/blog";
import { JsonLd, abs } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "블로그 — 근로·지원금 기준 해설",
  description: "최저임금, 주휴수당, 지원금처럼 자주 바뀌는 기준을 공식 출처와 계산 예시로 정리합니다.",
  alternates: { canonical: "/blog/", types: { "application/rss+xml": "/rss.xml" } },
};

export default function Page() {
  const posts = getPosts();
  return (
    <div className="narrow">
      <PageHead title="블로그" caption="자주 바뀌는 근로·지원금 기준을 공식 출처와 계산 예시로 정리해요." />
      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}/`} className="post-item">
              <span className="t4">{p.title}</span>
              <span className="caption">{p.description}</span>
              <span className="small">{p.updated !== p.date ? `${p.updated} 업데이트` : p.date}</span>
            </Link>
          </li>
        ))}
      </ul>
      <JsonLd
        data={{
          "@type": "ItemList",
          itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/blog/${p.slug}/`), name: p.title })),
        }}
      />
    </div>
  );
}
