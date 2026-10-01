// 스모크 테스트. BASE_URL 이 없으면 out/ 을 로컬 정적 서버로 띄워 검사하고, 있으면 라이브를 검사한다.
//   node scripts/smoke.mjs                       # 로컬 out/
//   BASE_URL=https://aicrafters.kr EXPECT_SHA=<sha> node scripts/smoke.mjs   # 라이브
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";

const pinned = JSON.parse(readFileSync(new URL("./legacy-hashes.json", import.meta.url)));
const PAGES = [
  "/", "/tools/", "/tools/juhyu-sudang/", "/guides/", "/guides/juhyu-sudang-conditions/",
  "/guides/juhyu-sudang-under-15-hours/", "/blog/", "/about/", "/contact/", "/terms/", "/site-privacy/",
];
const TYPES = { ".html": "text/html; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };

let base = process.env.BASE_URL;
let server;
if (!base) {
  server = createServer((req, res) => {
    let p = join("out", decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
    if (!existsSync(p)) {
      res.writeHead(404, { "content-type": TYPES[".html"] });
      return res.end(readFileSync("out/404.html"));
    }
    res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" });
    res.end(readFileSync(p));
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://127.0.0.1:${server.address().port}`;
}

let failed = 0;
const check = (ok, msg) => {
  console.log(`${ok ? "OK  " : "FAIL"} ${msg}`);
  if (!ok) failed++;
};
const get = async (path) => {
  const r = await fetch(base + path, { redirect: "follow", headers: { "cache-control": "no-cache" } });
  return { status: r.status, type: r.headers.get("content-type") ?? "", body: Buffer.from(await r.arrayBuffer()), url: r.url };
};

for (const p of PAGES) {
  const r = await get(p);
  check(r.status === 200 && r.body.includes("</html>"), `${p} ${r.status}`);
}
const calc = await get("/tools/juhyu-sudang/");
check(calc.body.toString().includes("주휴수당 계산기"), "/tools/juhyu-sudang/ 본문에 제목 존재");

for (const [file, want] of Object.entries(pinned)) {
  if (file.startsWith("_")) continue;
  const r = await get(`/${file}`);
  const got = createHash("sha256").update(r.body).digest("hex");
  check(r.status === 200 && got === want, `/${file} ${r.status} sha256 ${got === want ? "matches" : `MISMATCH ${got}`}`);
}
const adsTxt = await get("/ads.txt");
check(adsTxt.status === 200 && adsTxt.body.toString().includes("pub-6190216749397593, DIRECT"), `/ads.txt ${adsTxt.status} pub ID 포함`);
const home = (await get("/")).body.toString();
check(home.includes("adsbygoogle.js?client=ca-pub-6190216749397593") && home.includes('name="google-adsense-account"'), "AdSense 스크립트·인증 메타 존재");
check(home.includes("googletagmanager.com/gtag/js?id=G-2382S0SJFK"), "GA4 태그 존재");
const ads = await get("/app-ads.txt");
check(ads.type.startsWith("text/plain"), `/app-ads.txt content-type ${ads.type}`);

const missing = await get("/this-page-does-not-exist-9f3a/");
check(missing.status === 404, `없는 경로 → ${missing.status}`);

const rssRes = await get("/rss.xml");
check(rssRes.status === 200 && rssRes.body.toString().includes("<rss"), `/rss.xml ${rssRes.status}`);
const sm = (await get("/sitemap.xml")).body.toString();
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
check(locs.length >= PAGES.length + 1, `sitemap URL ${locs.length}개 (고정 ${PAGES.length} + 블로그 글)`);
for (const p of PAGES) check(locs.includes(p), `sitemap 에 ${p} 포함`);
for (const p of locs) check((await get(p)).status === 200, `sitemap ${p}`);

if (process.env.EXPECT_SHA) {
  const v = (await get("/version.txt")).body.toString().trim();
  check(v === process.env.EXPECT_SHA, `version.txt ${v} == ${process.env.EXPECT_SHA}`);
}

server?.close();
console.log(failed ? `\n${failed} FAILED` : "\nALL PASSED");
process.exit(failed ? 1 : 0);
