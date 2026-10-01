import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의",
  description: "계산 오류 제보, 제휴, 앱 관련 문의는 이메일로 받습니다.",
  alternates: { canonical: "/contact/" },
};

export default function Page() {
  return (
    <article className="narrow prose">
      <h1 className="t1">문의</h1>
      <p>
        이메일: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <ul>
        <li><strong>계산 오류 제보:</strong> 계산기 이름, 입력한 값, 기대한 결과와 근거를 함께 보내 주시면 빠르게 확인합니다.</li>
        <li><strong>쪼밍 앱 문의:</strong> 사용 중인 기기와 앱 버전을 적어 주세요.</li>
        <li><strong>제휴·외주:</strong> 원하는 일정과 범위를 적어 주세요.</li>
      </ul>
      <p>평일 기준 2일 안에 답장합니다. 개별 노동 사건에 대한 법률 상담은 제공하지 않으며, 고용노동부 고객상담센터(국번 없이 1350)를 안내해 드립니다.</p>
    </article>
  );
}
