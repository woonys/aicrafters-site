import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { getPost, getPosts, relatedPosts } from "@/lib/blog";
import { JsonLd, ORG_ID, PERSON, abs } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: { type: "article", title: p.title, description: p.description, publishedTime: p.date, modifiedTime: p.updated },
  };
}

export default async function Page({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const url = abs(`/blog/${p.slug}/`);
  const related = relatedPosts(p.slug);
  return (
    <article className="narrow prose">
      <div className="crumbs">
        <Link href="/blog/">블로그</Link> ›
      </div>
      <h1 className="t1">{p.title}</h1>
      <p className="meta">
        {p.date} 작성{p.updated !== p.date ? ` · ${p.updated} 업데이트` : ""} · <Link href="/about/">김재운</Link>
      </p>

      <div className="post-body" dangerouslySetInnerHTML={{ __html: p.html }} />

      <div className="cta-card">
        <p className="t4">{p.cta.label}</p>
        <Link className="btn btn-primary btn-block" href={p.cta.href}>
          바로 계산하기
        </Link>
      </div>

      {p.faq.length > 0 && (
        <>
          <h2>자주 묻는 질문</h2>
          {p.faq.map((f) => (
            <div key={f.q} className="faq">
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </>
      )}

      {p.sources.length > 0 && (
        <div className="sources">
          <p className="sources-title">출처 · {p.updated} 기준</p>
          <ul>
            {p.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AdSlot />

      {related.length > 0 && (
        <>
          <h2>함께 보면 좋은 글</h2>
          <ul className="post-list">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}/`} className="post-item">
                  <span className="t4">{r.title}</span>
                  <span className="caption">{r.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <JsonLd
        data={{
          "@type": "Article",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.updated,
          author: PERSON,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: url,
          inLanguage: "ko-KR",
        }}
      />
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "블로그", item: abs("/blog/") },
            { "@type": "ListItem", position: 2, name: p.title, item: url },
          ],
        }}
      />
      {p.faq.length > 0 && (
        <JsonLd
          data={{
            "@type": "FAQPage",
            mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </article>
  );
}
