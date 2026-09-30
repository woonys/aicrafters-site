import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "생활 계산기",
  description: "주휴수당처럼 법으로 정해진 계산을 기준 그대로 바로 확인하는 계산기 모음입니다.",
  alternates: { canonical: "/tools/" },
};

export default function Page() {
  return (
    <article className="doc">
      <h1>생활 계산기</h1>
      <p>
        근로기준법 같은 공식 기준으로 계산하고, 계산식과 근거를 함께 보여줍니다. 입력값은 브라우저 안에서만 계산하며
        어디에도 저장하거나 전송하지 않습니다.
      </p>
      <div className="toolgrid">
        <Link className="toolcard" href="/tools/juhyu-sudang/">
          <h3>주휴수당 계산기</h3>
          <p>시급·주 근무시간 → 이번 주 주휴수당 예상액과 대상 여부</p>
        </Link>
        <div className="toolcard soon" aria-disabled="true">
          <h3>퇴직금 계산기</h3>
          <p>준비 중</p>
        </div>
        <div className="toolcard soon" aria-disabled="true">
          <h3>연차수당 계산기</h3>
          <p>준비 중</p>
        </div>
      </div>
    </article>
  );
}
