import type { Metadata } from "next";
import { ListRow } from "@/components/ListRow";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "생활 계산기",
  description: "주휴수당처럼 법으로 정해진 계산을 기준 그대로 바로 확인하는 계산기 모음입니다.",
  alternates: { canonical: "/tools/" },
};

export default function Page() {
  return (
    <div className="narrow">
      <PageHead title="생활 계산기" caption="공식 기준으로 계산하고 계산식과 근거를 함께 보여줘요. 입력값은 브라우저 안에서만 계산하고 어디에도 저장하지 않아요." />
      <div className="list" style={{ marginTop: 24 }}>
        <ListRow href="/tools/juhyu-sudang/" icon="calculator" title="주휴수당 계산기" desc="시급·근무시간 → 이번 주 예상액과 대상 여부" />
        <ListRow icon="briefcase" title="퇴직금 계산기" desc="곧 열어요" soon />
        <ListRow icon="sun" title="연차수당 계산기" desc="곧 열어요" soon />
      </div>
    </div>
  );
}
