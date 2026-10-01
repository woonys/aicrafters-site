import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사이트 개인정보처리방침",
  description: "aicrafters.kr 웹사이트의 개인정보처리방침",
  alternates: { canonical: "/site-privacy/" },
};

export default function Page() {
  return (
    <article className="narrow prose">
      <h1 className="t1">사이트 개인정보처리방침</h1>
      <p className="meta">시행일 2026-10-01 · 적용 대상: aicrafters.kr 웹사이트 (쪼밍 앱은 <a href="/privacy.html">별도 방침</a>)</p>
      <h2>1. 계산기 입력값</h2>
      <p>계산기에 입력한 시급·근무시간 등은 이용자 브라우저 안에서만 계산되며, 운영자 서버로 전송되거나 저장되지 않습니다.</p>
      <h2>2. 수집하는 정보</h2>
      <p>
        사이트는 회원가입이 없고 운영자가 직접 쿠키를 설정하지 않습니다. 광고 쿠키는 4번에서 설명합니다. 사이트를 호스팅하는 GitHub Pages는 보안과 운영을 위해 접속
        IP 주소 등 접속 기록을 처리할 수 있습니다. 글꼴(Pretendard)은 jsDelivr CDN에서 불러오며, 이 과정에서 jsDelivr가 접속 IP를 처리할 수 있습니다.
      </p>
      <h2>3. 이메일 문의</h2>
      <p>이메일로 문의하면 회신을 위해 이메일 주소와 문의 내용을 받습니다. 처리 완료 후 1년이 지나면 삭제합니다.</p>
      <h2>4. 광고 (Google AdSense)</h2>
      <p>
        이 사이트는 Google AdSense 광고를 게재합니다. Google을 포함한 제3자 공급업체는 쿠키를 사용해 이용자가 이 사이트나
        다른 사이트를 방문한 기록을 바탕으로 광고를 게재합니다. Google은 광고 쿠키를 사용해 이용자의 방문 기록에 맞춘
        광고를 제공할 수 있습니다.
      </p>
      <ul>
        <li>
          맞춤 광고는 <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google 광고 설정</a>에서 끌 수 있습니다.
        </li>
        <li>
          제3자 공급업체의 맞춤 광고 쿠키는 <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">aboutads.info</a>에서 거부할 수 있습니다.
        </li>
        <li>
          Google이 파트너 사이트에서 정보를 사용하는 방식:{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">policies.google.com/technologies/partner-sites</a>
        </li>
      </ul>
      <p>계산기에 입력한 값은 광고 스크립트를 포함해 어떤 외부 서비스에도 전달되지 않습니다.</p>
      <h2>5. 문의처</h2>
      <p>개인정보 보호책임자: 김재운 (woony.kim@aicrafters.kr)</p>
    </article>
  );
}
