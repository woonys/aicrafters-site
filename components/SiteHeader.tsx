import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand" aria-label="AI Crafters 홈">
          <span className="brand-mark" aria-hidden="true">AC</span>
          AI Crafters
        </Link>
        <nav className="nav-links" aria-label="주요 메뉴">
          <Link href="/tools/">계산기</Link>
          <Link href="/guides/">가이드</Link>
          <Link href="/about/" className="hide-sm">소개</Link>
        </nav>
      </div>
    </header>
  );
}
