/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 정적 호스팅. 서버 기능(API route, 이미지 최적화, redirects) 사용 불가.
  output: "export",
  // /tools/ 형태로 디렉터리 index.html 을 만든다. Pages 가 /tools → /tools/ 로 301 해준다.
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BUILD_SHA: process.env.GITHUB_SHA ?? "local" },
};
export default nextConfig;
