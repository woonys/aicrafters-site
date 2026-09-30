import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사이트 개인정보처리방침",
  description: "aicrafters.kr 웹사이트의 개인정보처리방침",
  alternates: { canonical: "/site-privacy/" },
};

export default function Page() {
  return (
    <article className="doc">
      <h1>사이트 개인정보처리방침</h1>
      <p className="meta">시행일 2026-10-01 · 적용 대상: aicrafters.kr 웹사이트 (쪼밍 앱은 <a href="/privacy.html">별도 방침</a>)</p>
      <h2>1. 계산기 입력값</h2>
      <p>계산기에 입력한 시급·근무시간 등은 이용자 브라우저 안에서만 계산되며, 운영자 서버로 전송되거나 저장되지 않습니다.</p>
      <h2>2. 수집하는 정보</h2>
      <p>
        사이트는 회원가입이 없고 쿠키를 직접 설정하지 않습니다. 사이트를 호스팅하는 GitHub Pages는 보안과 운영을 위해 접속
        IP 주소 등 접속 기록을 처리할 수 있습니다.
      </p>
      <h2>3. 이메일 문의</h2>
      <p>이메일로 문의하면 회신을 위해 이메일 주소와 문의 내용을 받습니다. 처리 완료 후 1년이 지나면 삭제합니다.</p>
      <h2>4. 광고·분석 도구 도입 시</h2>
      <p>
        Google AdSense 등 광고나 방문 분석 도구를 도입하면, 해당 도구가 쿠키를 사용해 관심 기반 광고를 제공하거나 방문
        통계를 수집할 수 있습니다. 도입 전에 이 방침에 도구 이름, 수집 항목, 거부 방법(예: Google 광고 설정)을 추가하고
        시행일을 갱신합니다.
      </p>
      <h2>5. 문의처</h2>
      <p>개인정보 보호책임자: 김재운 (woony.kim@aicrafters.kr)</p>
    </article>
  );
}
