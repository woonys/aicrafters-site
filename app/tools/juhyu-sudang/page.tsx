import type { Metadata } from "next";
import Link from "next/link";
import { JuhyuCalculator } from "./Calculator";
import { Sources } from "@/components/Sources";

export const metadata: Metadata = {
  title: "주휴수당 계산기 (2026·2027 최저시급 반영)",
  description:
    "시급과 주 근무시간을 넣으면 이번 주 주휴수당 예상액과 대상 여부, 계산식을 보여줍니다. 주 15시간 기준, 개근, 40시간 상한을 반영했습니다.",
  alternates: { canonical: "/tools/juhyu-sudang/" },
};

export default function Page() {
  return (
    <article className="narrow prose">
      <div className="crumbs">
        <Link href="/tools/">생활 계산기</Link> › 주휴수당
      </div>
      <h1 className="t1">주휴수당 계산기</h1>
      <p className="meta">2026 최저시급 10,320원 · 2027 10,700원 반영</p>
      <p className="lead-sm">시급과 계약상 근무시간으로 이번 주 예상 주휴수당과 계산식을 확인하세요.</p>
      <div className="notice notice-sm">
        <strong>매주 근무시간이 같고</strong>, 풀타임 기준이 <strong>주 5일·40시간</strong>인 사업장을 계산해요. 그 밖의 경우는 &lsquo;판정 불가&rsquo;로 안내해요.
      </div>

      <JuhyuCalculator />
      <Sources />

      <h2>계산 방법</h2>
      <p>주휴수당은 &ldquo;주 소정근로시간 ÷ 40 × 8 × 시급&rdquo;으로 계산합니다. 40시간을 넘는 부분은 연장근로라서 넣지 않으므로 최대 8시간분입니다.</p>
      <div className="table-wrap"><table>
        <thead>
          <tr>
            <th>주 근무시간</th>
            <th>주휴시간</th>
            <th>2026 최저시급 기준 주휴수당</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>15시간 (3시간×5일)</td><td>3시간</td><td>30,960원</td></tr>
          <tr><td>20시간 (4시간×5일)</td><td>4시간</td><td>41,280원</td></tr>
          <tr><td>24시간 (8시간×3일)</td><td>4.8시간</td><td>49,536원</td></tr>
          <tr><td>30시간 (6시간×5일)</td><td>6시간</td><td>61,920원</td></tr>
          <tr><td>40시간 (8시간×5일)</td><td>8시간</td><td>82,560원</td></tr>
          <tr><td>14시간</td><td>—</td><td>대상 아님 (15시간 미만)</td></tr>
        </tbody>
      </table></div>

      <h2>받을 수 있는 조건</h2>
      <ol>
        <li>1주 소정근로시간이 15시간 이상 (4주 평균 기준)</li>
        <li>그 주에 정해진 근무일을 모두 출근 (지각·조퇴·연차 사용은 결근 아님)</li>
        <li>주휴일까지 근로관계가 이어짐</li>
      </ol>
      <p>
        자세한 설명은 <Link href="/guides/juhyu-sudang-conditions/">주휴수당 받는 조건 3가지</Link>와{" "}
        <Link href="/guides/juhyu-sudang-under-15-hours/">주 15시간 미만이면 정말 못 받을까</Link>에 정리했습니다.
      </p>
    </article>
  );
}
