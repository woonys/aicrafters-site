import { LAST_VERIFIED, SOURCES } from "@/lib/wage";
import { CONTACT_EMAIL } from "@/lib/site";

export function Sources() {
  return (
    <div className="sources">
      <p className="sources-title">근거</p>
      <ul>
        <li><a href={SOURCES.laborStandardsAct55} target="_blank" rel="noopener">근로기준법 제55조 (휴일)</a></li>
        <li><a href={SOURCES.laborStandardsAct18} target="_blank" rel="noopener">근로기준법 제18조 제3항 (단시간근로자)</a></li>
        <li><a href={SOURCES.enforcementDecree30} target="_blank" rel="noopener">근로기준법 시행령 제30조 (주휴일)</a></li>
        <li><a href={SOURCES.minimumWage} target="_blank" rel="noopener">최저임금위원회 연도별 결정현황</a></li>
      </ul>
      <p>
        마지막 확인 {LAST_VERIFIED} · 예상액이며 법률 자문이 아닙니다 ·{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("[계산기] 오류 제보")}`}>오류 제보</a>
      </p>
    </div>
  );
}
