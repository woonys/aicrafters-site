import type { Metadata } from "next";
import Link from "next/link";
import { Sources } from "@/components/Sources";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "주 15시간 미만 알바, 주휴수당 정말 못 받을까 (4주 평균 계산 예시)",
  description:
    "15시간 기준은 한 주가 아니라 4주 평균으로 판단합니다. 10·20·10·20시간처럼 주마다 시간이 다른 경우와 계약 시간이 기준인 이유를 예시로 설명합니다.",
  alternates: { canonical: "/guides/juhyu-sudang-under-15-hours/" },
};

export default function Page() {
  return (
    <article className="narrow prose">
      <div className="crumbs">
        <Link href="/guides/">가이드</Link> › 15시간 미만
      </div>
      <h1 className="t1">주 15시간 미만 알바, 주휴수당 정말 못 받을까</h1>
      <p className="meta">2026-10-01 기준 · 근로기준법 제18조 제3항</p>

      <p>
        근로기준법 제18조 제3항은 &ldquo;4주 동안(4주 미만으로 근로하는 경우에는 그 기간)을 평균하여 1주 동안의
        소정근로시간이 15시간 미만인 근로자&rdquo;에게 주휴일 규정을 적용하지 않는다고 정합니다. 기준은 두 가지입니다.
        하나, <strong>한 주가 아니라 4주 평균</strong>으로 본다. 둘, <strong>실제 일한 시간이 아니라 계약상 시간</strong>(소정근로시간)으로 본다.
      </p>

      <h2>4주 평균 예시</h2>
      <div className="table-wrap"><table>
        <thead>
          <tr><th>1주</th><th>2주</th><th>3주</th><th>4주</th><th>평균</th><th>주휴 규정</th></tr>
        </thead>
        <tbody>
          <tr><td>14</td><td>14</td><td>14</td><td>14</td><td>14시간</td><td>적용 안 됨</td></tr>
          <tr><td>10</td><td>20</td><td>10</td><td>20</td><td>15시간</td><td>적용 (15시간 미만이 아님)</td></tr>
          <tr><td>10</td><td>15</td><td>10</td><td>15</td><td>12.5시간</td><td>적용 안 됨</td></tr>
          <tr><td>16</td><td>16</td><td>16</td><td>16</td><td>16시간</td><td>적용</td></tr>
        </tbody>
      </table></div>
      <p>
        둘째 줄처럼 어떤 주가 15시간보다 적어도 4주 평균이 15시간 이상이면 주휴 규정이 적용됩니다. 이렇게 주마다 시간이
        다른 경우에는 각 주의 금액 계산 방식이 사업장마다 다를 수 있습니다. 그래서{" "}
        <Link href="/tools/juhyu-sudang/">주휴수당 계산기</Link>는 이 경우 금액을 내지 않고 &lsquo;판정 불가&rsquo;로
        안내합니다. 고용노동부 고객상담센터(국번 없이 1350)에서 근무표를 들고 확인하세요.
      </p>

      <AdSlot />

      <h2>계약은 14시간인데 실제로는 매주 16시간 일하면?</h2>
      <p>
        법 기준은 소정근로시간, 즉 계약상 시간입니다. 계약이 주 14시간이면 원칙적으로 15시간 미만입니다. 하지만 추가
        근무가 매주 반복돼 사실상 근무시간이 바뀌었다면 실제 근로 형태를 따져볼 여지가 있습니다. 근무 기록(출퇴근
        기록, 근무표, 메시지)을 보관해 두세요.
      </p>

      <h2>15시간 미만이면 함께 빠지는 것들</h2>
      <p>
        4주 평균 주 15시간 미만인 근로자에게는 주휴일(제55조)과 연차휴가(제60조) 규정이 적용되지 않습니다(제18조 제3항). 최저임금은 근무시간과 상관없이 적용됩니다.
      </p>
      <Sources />
    </article>
  );
}
