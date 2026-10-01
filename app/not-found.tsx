import Link from "next/link";
import { PageHead } from "@/components/PageHead";

export default function NotFound() {
  return (
    <div className="narrow">
      <PageHead title="페이지를 찾을 수 없어요" caption="주소가 바뀌었거나 없는 페이지예요." />
      <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
        <Link className="btn btn-primary" href="/tools/">계산기 보기</Link>
        <Link className="btn btn-secondary" href="/">홈으로</Link>
      </div>
    </div>
  );
}
