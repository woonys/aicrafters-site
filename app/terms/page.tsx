import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "aicrafters.kr 이용약관",
  alternates: { canonical: "/terms/" },
};

export default function Page() {
  return (
    <article className="doc">
      <h1>이용약관</h1>
      <p className="meta">시행일 2026-10-01</p>
      <h2>1. 목적</h2>
      <p>이 약관은 AI Crafters(이하 &lsquo;운영자&rsquo;)가 aicrafters.kr(이하 &lsquo;사이트&rsquo;)에서 제공하는 계산기와 정보의 이용 조건을 정합니다.</p>
      <h2>2. 계산 결과의 성격</h2>
      <p>
        사이트의 계산 결과는 입력값과 공개된 법령·고시를 바탕으로 한 <strong>예상액</strong>이며 법률 자문이 아닙니다. 실제
        지급액은 근로계약, 취업규칙, 개별 사정에 따라 달라질 수 있습니다. 중요한 판단 전에는 고용노동부(1350) 등 공식
        기관에 확인하시기 바랍니다.
      </p>
      <h2>3. 정보의 갱신</h2>
      <p>운영자는 법령·고시가 바뀌면 계산 기준을 갱신하며, 각 페이지에 마지막 확인일을 표시합니다.</p>
      <h2>4. 책임의 제한</h2>
      <p>운영자는 계산 결과를 정확하게 유지하기 위해 노력하지만, 이용자가 결과만을 근거로 내린 결정으로 생긴 손해에 대해서는 고의 또는 중대한 과실이 없는 한 책임지지 않습니다.</p>
      <h2>5. 광고</h2>
      <p>사이트에는 제3자 광고가 게재될 수 있습니다. 광고 내용과 광고주가 제공하는 상품·서비스에 대한 책임은 해당 광고주에게 있습니다.</p>
      <h2>6. 문의</h2>
      <p>woony.kim@aicrafters.kr</p>
    </article>
  );
}
