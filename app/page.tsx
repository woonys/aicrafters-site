import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">App Studio · Seoul</span>
          <h1>
            사람의 하루를
            <br />
            <span className="accent">다듬는 AI 앱</span>을 만듭니다
          </h1>
          <p className="lead">
            AI Crafters는 AI 기술로 일상의 건강과 습관을 돕는 모바일 앱을 만드는 앱 스튜디오입니다. 작지만 매일 쓰게 되는,
            다정한 제품을 지향합니다.
          </p>
          <div className="cta">
            <Link className="btn btn-primary" href="/tools/">
              생활 계산기
            </Link>
            <a className="btn btn-ghost" href="#products">
              제품 보기
            </a>
          </div>
        </div>
      </section>

      <section id="tools">
        <div className="wrap">
          <div className="sec-title">생활 계산기</div>
          <h2>
            헷갈리는 돈 계산,
            <br />
            법 기준 그대로 바로.
          </h2>
          <div className="toolgrid">
            <Link className="toolcard" href="/tools/juhyu-sudang/">
              <h3>주휴수당 계산기</h3>
              <p>시급과 주 근무시간으로 이번 주 주휴수당 예상액과 대상 여부를 확인합니다. 2026·2027 최저시급 반영.</p>
            </Link>
            <Link className="toolcard" href="/guides/juhyu-sudang-conditions/">
              <h3>가이드: 주휴수당 받는 조건</h3>
              <p>15시간, 개근, 근로관계 유지. 세 가지 조건과 계산 예시를 표로 정리했습니다.</p>
            </Link>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="wrap">
          <div className="sec-title">무엇을 하나요</div>
          <h2>
            습관이 되는 건강 앱을,
            <br />
            빠르고 정성스럽게.
          </h2>
          <div className="grid">
            <div className="card">
              <div className="ico" style={{ background: "#fff0e8" }}>🧩</div>
              <h3>앱 스튜디오</h3>
              <p>기획부터 디자인·개발·출시·운영까지 한 팀이 책임지고 완성합니다. 아이디어를 빠르게 실제 제품으로 만듭니다.</p>
            </div>
            <div className="card">
              <div className="ico" style={{ background: "#eafaf4" }}>🌱</div>
              <h3>건강 &amp; 습관</h3>
              <p>매일의 작은 실천이 쌓이도록. 운동·웰니스 영역에서 꾸준함을 돕는 경험을 설계합니다.</p>
            </div>
            <div className="card">
              <div className="ico" style={{ background: "#fff7dd" }}>✨</div>
              <h3>다정한 디자인</h3>
              <p>명령이 아니라 응원하는 톤. 캐릭터와 부드러운 인터랙션으로 부담 없이 이어가게 합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="products">
        <div className="wrap">
          <div className="sec-title">제품</div>
          <div className="product">
            <div className="pelly">🐤</div>
            <div>
              <div className="tag">iOS · 건강 &amp; 피트니스</div>
              <h3>쪼밍 (JJOMING)</h3>
              <p>
                Pelly 마스코트와 함께하는 케겔 운동 습관 관리 앱. 차분한 호흡 가이드, 연속 스트릭, 저녁 리마인더로 매일의
                골반저근 운동을 이어가게 돕습니다.
              </p>
              <a className="btn btn-primary" href="https://apps.apple.com/app/id6741137991" target="_blank" rel="noopener">
                App Store에서 보기 →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap">
          <div className="contact">
            <div className="sec-title" style={{ color: "#8a90a0" }}>Contact</div>
            <h2>함께 만들 이야기가 있다면</h2>
            <p>제휴·문의는 이메일로 편하게 연락 주세요.</p>
            <a className="mail" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
