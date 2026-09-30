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
writeFileSync("out/version.txt", `${process.env.GITHUB_SHA ?? "local"}\n`);
console.log(`OK   out/version.txt = ${process.env.GITHUB_SHA ?? "local"}`);
if (failed) process.exit(1);
