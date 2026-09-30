import Link from "next/link";

export function SiteHeader() {
  return (
    <header>
      <div className="wrap">
        <nav>
          <Link href="/" className="brand" style={{ textDecoration: "none" }}>
            <span className="logo">AC</span> AI&nbsp;Crafters
          </Link>
          <div className="navlinks">
            <Link href="/tools/">생활 계산기</Link>
            <Link href="/guides/">가이드</Link>
            <Link href="/about/">소개</Link>
            <Link href="/contact/">문의</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
