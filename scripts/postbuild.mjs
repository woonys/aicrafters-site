// next build 이후: 빌드 SHA 기록 + 보존 파일 해시 검사
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const pinned = JSON.parse(readFileSync(new URL("./legacy-hashes.json", import.meta.url)));
let failed = false;
for (const [file, want] of Object.entries(pinned)) {
  if (file.startsWith("_")) continue;
  const path = `out/${file}`;
  if (!existsSync(path)) {
    console.error(`FAIL missing ${path}`);
    failed = true;
    continue;
  }
  const got = createHash("sha256").update(readFileSync(path)).digest("hex");
  if (got !== want) {
    console.error(`FAIL ${path} sha256 ${got} != pinned ${want}`);
    failed = true;
  } else console.log(`OK   ${path} sha256 matches pinned`);
}
for (const f of ["out/404.html", "out/CNAME", "out/sitemap.xml", "out/robots.txt", "out/index.html"]) {
  if (!existsSync(f)) {
    console.error(`FAIL missing ${f}`);
    failed = true;
  }
}
// 블로그 집합 일치: content/blog = out/blog/<slug>/index.html = sitemap = 허브 링크 = rss
import { readdirSync } from "node:fs";
const want = new Set(readdirSync("content/blog").filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")));
const built = new Set(readdirSync("out/blog", { withFileTypes: true }).filter((d) => d.isDirectory() && existsSync(`out/blog/${d.name}/index.html`)).map((d) => d.name));
const sm = readFileSync("out/sitemap.xml", "utf8");
const inSitemap = new Set([...sm.matchAll(/\/blog\/([a-z0-9-]+)\/</g)].map((m) => m[1]));
const hub = readFileSync("out/blog/index.html", "utf8");
const inHub = new Set([...hub.matchAll(/href="\/blog\/([a-z0-9-]+)\/"/g)].map((m) => m[1]));
const rss = readFileSync("out/rss.xml", "utf8");
const inRss = new Set([...rss.matchAll(/<link>[^<]*\/blog\/([a-z0-9-]+)\/<\/link>/g)].map((m) => m[1]));
const same = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
for (const [name, set] of [["built html", built], ["sitemap", inSitemap], ["hub links", inHub], ["rss", inRss]]) {
  if (!same(want, set)) { console.error(`FAIL blog set mismatch: content=${[...want]} vs ${name}=${[...set]}`); failed = true; }
  else console.log(`OK   blog ${name} = content (${want.size})`);
}
// 글 페이지 JSON-LD: 파싱 가능 + Article/BreadcrumbList 필수, canonical 일치
for (const slug of want) {
  const html = readFileSync(`out/blog/${slug}/index.html`, "utf8");
  const types = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { types.push(JSON.parse(m[1])["@type"]); } catch { console.error(`FAIL ${slug} JSON-LD parse`); failed = true; }
  }
  for (const t of ["Article", "BreadcrumbList", "Organization", "WebSite"]) if (!types.includes(t)) { console.error(`FAIL ${slug} JSON-LD ${t} 없음`); failed = true; }
  if (!html.includes(`<link rel="canonical" href="https://aicrafters.kr/blog/${slug}/"`)) { console.error(`FAIL ${slug} canonical`); failed = true; }
}
if (!failed) console.log(`OK   blog JSON-LD·canonical (${want.size})`);
writeFileSync("out/version.txt", `${process.env.GITHUB_SHA ?? "local"}\n`);
console.log(`OK   out/version.txt = ${process.env.GITHUB_SHA ?? "local"}`);
if (failed) process.exit(1);
