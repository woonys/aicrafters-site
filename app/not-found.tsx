import Link from "next/link";

export default function NotFound() {
  return (
    <article className="doc">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소가 바뀌었거나 없는 페이지입니다.</p>
      <p><Link href="/tools/">생활 계산기</Link> · <Link href="/">홈</Link></p>
    </article>
  );
}
