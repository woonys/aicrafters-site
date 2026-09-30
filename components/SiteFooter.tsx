import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>© 2026 AI Crafters (에이아이크래프터스). All rights reserved.</div>
          <div className="links">
            <Link href="/about/">운영자 소개</Link>
            <Link href="/contact/">문의</Link>
            <Link href="/terms/">이용약관</Link>
            <Link href="/site-privacy/">사이트 개인정보처리방침</Link>
            <a href="/privacy.html">쪼밍 앱 개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
