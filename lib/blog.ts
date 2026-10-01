// 블로그 글 로더 (빌드 타임 전용). content/blog/<slug>.md 를 읽어 HTML 로 렌더한다.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import { juhyuTableMarkdown } from "./juhyu-table";

export interface Faq {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  title: string;
  keyword: string; // 실측 검색어. 타이틀 첫 구절이어야 한다 (계약 테스트)
  description: string;
  date: string; // YYYY-MM-DD 발행일
  updated: string; // YYYY-MM-DD 마지막 내용 변경일 (sitemap lastmod, dateModified)
  cta: { href: string; label: string };
  faq: Faq[];
  sources: { label: string; url: string }[];
  html: string;
  headings: { id: string; text: string }[];
}

const DIR = path.join(process.cwd(), "content", "blog");
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");

// 빌드 타임 치환 토큰. 표를 계산 로직에서 생성해 계산기와 수치가 어긋나지 않게 한다.
const TOKENS: Record<string, () => string> = {
  "{{juhyu-table}}": juhyuTableMarkdown,
};

function render(md: string) {
  const headings: Post["headings"] = [];
  const seen = new Map<string, number>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      // 원시 HTML 은 렌더하지 않고 글자로 보여준다 (콘텐츠는 검수하지만 방어선을 하나 더 둔다)
      html({ text }: Tokens.HTML | Tokens.Tag) {
        return escapeHtml(text);
      },
      heading({ tokens, depth }: Tokens.Heading) {
        const text = this.parser.parseInline(tokens);
        const plain = text.replace(/<[^>]+>/g, "");
        let id = slugify(plain) || `h${depth}`;
        const n = seen.get(id) ?? 0;
        seen.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (depth === 2) headings.push({ id, text: plain });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const text = this.parser.parseInline(tokens);
        if (!/^(https?:\/\/|\/|#|mailto:)/.test(href)) return text; // javascript: 등 차단
        const ext = /^https?:\/\//.test(href) && !href.startsWith("https://aicrafters.kr");
        const t = title ? ` title="${escapeHtml(title)}"` : "";
        return `<a href="${escapeHtml(href)}"${t}${ext ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
      },
      table(token: Tokens.Table) {
        const cell = (c: Tokens.TableCell, tag: "th" | "td") => {
          const al = c.align === "right" ? ' class="num"' : "";
          return `<${tag}${al}>${this.parser.parseInline(c.tokens)}</${tag}>`;
        };
        const head = `<tr>${token.header.map((c) => cell(c, "th")).join("")}</tr>`;
        const body = token.rows.map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("");
        return `<div class="table-wrap"><table><thead>${head}</thead><tbody>${body}</tbody></table></div>\n`;
      },
    },
  });
  let src = md;
  for (const [k, fn] of Object.entries(TOKENS)) src = src.split(k).join(fn());
  const html = marked.parse(src, { async: false }) as string;
  return { html, headings };
}

function load(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const req = ["title", "keyword", "description", "date", "updated", "cta"] as const;
  for (const k of req) if (!data[k]) throw new Error(`[blog] ${file}: frontmatter "${k}" 없음`);
  // gray-matter 는 YYYY-MM-DD 를 Date 로 바꾸므로 문자열로 되돌린다
  const iso = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v));
  const date = iso(data.date);
  const updated = iso(data.updated);
  if (!DATE.test(date) || !DATE.test(updated)) throw new Error(`[blog] ${file}: 날짜 형식은 YYYY-MM-DD`);
  const { html, headings } = render(content);
  return {
    slug,
    title: String(data.title),
    keyword: String(data.keyword),
    description: String(data.description),
    date,
    updated,
    cta: { href: String(data.cta.href), label: String(data.cta.label) },
    faq: Array.isArray(data.faq) ? data.faq.map((f: Faq) => ({ q: String(f.q), a: String(f.a) })) : [],
    sources: Array.isArray(data.sources) ? data.sources : [],
    html,
    headings,
  };
}

let cache: Post[] | null = null;

export function getPosts(): Post[] {
  if (cache) return cache;
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md")) : [];
  cache = files.map(load).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

// 관련 글: 최신순으로 자신을 뺀 2개
export function relatedPosts(slug: string, n = 2): Post[] {
  return getPosts().filter((p) => p.slug !== slug).slice(0, n);
}
