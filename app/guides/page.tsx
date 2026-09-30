import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "가이드",
  description: "주휴수당 등 근로자가 자주 헷갈리는 기준을 예시와 함께 정리한 가이드입니다.",
  alternates: { canonical: "/guides/" },
};

export default function Page() {
  return (
    <article className="doc">
      <h1>가이드</h1>
      <div className="toolgrid">
        <Link className="toolcard" href="/guides/juhyu-sudang-conditions/">
          <h3>주휴수당 받는 조건 3가지</h3>
          <p>15시간, 개근, 근로관계 유지. 조건별로 헷갈리는 사례를 정리했습니다.</p>
        </Link>
        <Link className="toolcard" href="/guides/juhyu-sudang-under-15-hours/">
          <h3>주 15시간 미만이면 정말 못 받을까</h3>
          <p>4주 평균으로 판단하는 이유와 계산 예시</p>
        </Link>
      </div>
    </article>
  );
}
