import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "운영자 소개",
  description: "aicrafters.kr을 운영하는 AI Crafters(에이아이크래프터스) 소개와 계산기 제작 원칙.",
  alternates: { canonical: "/about/" },
};

export default function Page() {
  return (
    <article className="narrow prose">
      <h1 className="t1">운영자 소개</h1>
      <div className="table-wrap"><table>
        <tbody>
          <tr><th>상호</th><td>AI Crafters (에이아이크래프터스)</td></tr>
          <tr><th>대표</th><td>김재운</td></tr>
          <tr><th>소재지</th><td>서울특별시 성동구</td></tr>
          <tr><th>업종</th><td>응용 소프트웨어 개발 및 공급</td></tr>
          <tr><th>이메일</th><td><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></td></tr>
        </tbody>
      </table></div>
      <p>
        AI Crafters는 일상의 건강과 습관을 돕는 모바일 앱(쪼밍 등)을 만드는 앱 스튜디오입니다. 대표는 백엔드·AI 플랫폼
        개발자로 일해 왔고, 그 경험으로 사람들이 자주 헷갈리는 계산을 정확하게 해 주는 생활 계산기를 만들고 있습니다.
      </p>
      <h2>계산기를 만드는 원칙</h2>
      <ol>
        <li>법령·고시 등 공식 기준만 씁니다. 각 계산기 아래에 근거 조문과 마지막 확인일을 적습니다.</li>
        <li>계산식을 결과와 함께 보여줍니다. 숫자만 던지지 않습니다.</li>
        <li>기준이 애매해 정확히 계산할 수 없는 경우에는 금액 대신 &lsquo;판정 불가&rsquo;로 안내합니다.</li>
        <li>계산 로직은 공식 예시값으로 자동 테스트한 뒤 공개합니다.</li>
        <li>입력값은 브라우저 안에서만 계산하고 저장·전송하지 않습니다.</li>
      </ol>
      <p>틀린 내용을 발견하면 이메일로 알려 주세요. 확인 후 고치고 확인일을 갱신합니다.</p>
    </article>
  );
}
