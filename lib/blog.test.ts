import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { getPosts } from "./blog";
import { juhyuTableMarkdown, weeklyPayFor } from "./juhyu-table";
import { PAGES } from "./site";

const posts = getPosts();

describe("블로그 frontmatter 계약", () => {
  it("글이 1편 이상 있다", () => expect(posts.length).toBeGreaterThan(0));

  it.each(posts.map((p) => [p.slug, p] as const))("%s: 타이틀이 실측 검색어(keyword)로 시작한다", (_, p) => {
    expect(p.title.startsWith(p.keyword)).toBe(true);
  });

  it("slug 는 소문자·숫자·하이픈만", () => {
    for (const p of posts) expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("타이틀과 keyword 는 글끼리 겹치지 않는다 (헤드텀 단독 소유)", () => {
    expect(new Set(posts.map((p) => p.title)).size).toBe(posts.length);
    expect(new Set(posts.map((p) => p.keyword)).size).toBe(posts.length);
  });

  it("블로그 keyword 는 계산기 헤드텀(주휴수당 계산기)을 가져가지 않는다", () => {
    for (const p of posts) expect(p.keyword).not.toBe("주휴수당 계산기");
  });

  it("updated 는 date 이후다", () => {
    for (const p of posts) expect(p.updated >= p.date).toBe(true);
  });

  it("CTA 는 실제 존재하는 페이지로 간다", () => {
    for (const p of posts) expect(PAGES as readonly string[]).toContain(p.cta.href);
  });

  it("본문에 원시 HTML 이 그대로 나가지 않는다", () => {
    for (const p of posts) expect(p.html).not.toMatch(/<script|javascript:|onerror=/i);
  });

  it("H2 가 2개 이상이고 id 가 겹치지 않는다", () => {
    for (const p of posts) {
      expect(p.headings.length).toBeGreaterThanOrEqual(2);
      expect(new Set(p.headings.map((h) => h.id)).size).toBe(p.headings.length);
    }
  });

  it("description 은 120자 이하 (경고 기준은 80자)", () => {
    for (const p of posts) expect(p.description.length).toBeLessThanOrEqual(120);
  });
});

describe("시간별 금액표 (독립 기대값)", () => {
  // 손으로 계산한 값: 시간/40×8×시급
  it.each([
    [15, 10_320, 30_960], [20, 10_320, 41_280], [24, 10_320, 49_536], [40, 10_320, 82_560],
    [15, 10_700, 32_100], [20, 10_700, 42_800], [30, 10_700, 64_200], [40, 10_700, 85_600],
  ])("주 %s시간 × %s원 → %s원", (h, w, won) => {
    expect(weeklyPayFor(h, w)).toBe(won);
  });
  it("표에 15시간 미만 = 대상 아님 행이 있다", () => {
    expect(juhyuTableMarkdown()).toContain("| 15시간 미만 | 대상 아님 | 대상 아님 |");
  });
  it("치환 토큰이 렌더 결과에 남지 않는다", () => {
    for (const p of posts) expect(p.html).not.toContain("{{");
  });
});

describe("글 본문의 2027 수치가 고시값과 일치", () => {
  const post = fs.readFileSync("content/blog/2027-minimum-wage-monthly-salary.md", "utf8");
  it("시급·일급·월급", () => {
    expect(post).toContain("10,700원");
    expect(post).toContain("85,600원");
    expect(post).toContain("2,236,300원");
    expect(10_700 * 209).toBe(2_236_300);
    expect(10_320 * 209).toBe(2_156_880);
  });
});
