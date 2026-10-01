import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <nav className="links" aria-label="사이트 정보">
          <Link href="/blog/">블로그</Link>
          <a href="/rss.xml">RSS</a>
          <Link href="/about/">운영자 소개</Link>
          <Link href="/contact/">문의</Link>
          <Link href="/terms/">이용약관</Link>
          <Link href="/site-privacy/">사이트 개인정보처리방침</Link>
          <a href="/privacy.html">쪼밍 앱 개인정보처리방침</a>
        </nav>
        <p className="small">
          AI Crafters (에이아이크래프터스) · 대표 김재운 · {CONTACT_EMAIL}
          <br />© 2026 AI Crafters. 계산 결과는 예상액이며 법률 자문이 아닙니다.
        </p>
      </div>
    </footer>
  );
}
