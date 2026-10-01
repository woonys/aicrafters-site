import type { Metadata } from "next";
import { ListRow } from "@/components/ListRow";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "가이드",
  description: "주휴수당 등 근로자가 자주 헷갈리는 기준을 예시와 함께 정리한 가이드입니다.",
  alternates: { canonical: "/guides/" },
};

export default function Page() {
  return (
    <div className="narrow">
      <PageHead title="가이드" caption="자주 헷갈리는 기준을 법 조문과 계산 예시로 정리했어요." />
      <div className="list" style={{ marginTop: 24 }}>
        <ListRow href="/guides/juhyu-sudang-conditions/" icon="book" title="주휴수당 받는 조건 3가지" desc="15시간·개근·근로관계 유지와 헷갈리는 사례" />
        <ListRow href="/guides/juhyu-sudang-under-15-hours/" icon="clock" title="주 15시간 미만이면 정말 못 받을까" desc="4주 평균으로 판단하는 이유와 계산 예시" />
      </div>
    </div>
  );
}
