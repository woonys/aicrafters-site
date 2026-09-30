import { LAST_VERIFIED, SOURCES } from "@/lib/wage";
import { CONTACT_EMAIL } from "@/lib/site";

export function Sources() {
  return (
    <div className="srcbox">
      근거: <a href={SOURCES.laborStandardsAct55} target="_blank" rel="noopener">근로기준법 제55조</a> ·{" "}
      <a href={SOURCES.laborStandardsAct18} target="_blank" rel="noopener">제18조 제3항</a> ·{" "}
      <a href={SOURCES.enforcementDecree30} target="_blank" rel="noopener">시행령 제30조</a> ·{" "}
      <a href={SOURCES.minimumWage} target="_blank" rel="noopener">최저임금위원회 연도별 결정현황</a>
      <br />
      마지막 확인: {LAST_VERIFIED}. 이 계산은 예상액이며 법률 자문이 아닙니다. 틀린 곳을 발견하면{" "}
      <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("[주휴수당 계산기] 오류 제보")}`}>제보해 주세요</a>.
    </div>
  );
}
