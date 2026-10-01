export const SITE_URL = "https://aicrafters.kr";
export const CONTACT_EMAIL = "woony.kim@aicrafters.kr";

// 사이트맵에 들어가는 고정 페이지 (블로그 글은 lib/blog.ts 에서 자동 추가). 새 페이지를 만들면 여기에도 추가한다 (스모크 테스트가 이 목록을 검사).
export const PAGES = [
  "/",
  "/tools/",
  "/tools/juhyu-sudang/",
  "/guides/",
  "/blog/",
  "/guides/juhyu-sudang-conditions/",
  "/guides/juhyu-sudang-under-15-hours/",
  "/about/",
  "/contact/",
  "/terms/",
  "/site-privacy/",
] as const;
