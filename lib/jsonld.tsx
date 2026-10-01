import { SITE_URL } from "./site";

// JSON-LD 를 script 태그로. "<" 를 이스케이프해 </script> 주입을 막는다. 타입별로 태그를 분리해서 쓴다.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
export const PERSON = { "@type": "Person", name: "김재운", url: `${SITE_URL}/about/` };
export const abs = (p: string) => `${SITE_URL}${p}`;
