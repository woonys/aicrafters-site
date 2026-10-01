import Link from "next/link";
import { ListRow } from "@/components/ListRow";
import { Icon } from "@/components/Icon";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">AI Crafters · 앱 스튜디오</p>
          <h1 className="t-display" style={{ marginTop: 12 }}>
            사람의 하루를
            <br />
            <span className="accent">다듬는 도구</span>를 만듭니다
          </h1>
          <p className="lead">
            일상의 건강과 습관을 돕는 앱, 그리고 일하는 사람이 자주 헷갈리는 돈 계산을 법 기준 그대로 정확하게 해 주는
            계산기를 만듭니다.
          </p>
          <div className="actions">
            <Link className="btn btn-primary btn-lg" href="/tools/juhyu-sudang/">주휴수당 계산하기</Link>
            <a className="btn btn-secondary btn-lg" href="#products">앱 보기</a>
          </div>
        </div>
      </section>

      <section className="section alt" id="tools">
        <div className="mid">
          <div className="sec-head">
            <p className="eyebrow">생활 계산기</p>
            <h2 className="t2">헷갈리는 돈 계산, 근거까지 한 번에</h2>
          </div>
          <div className="list">
            <ListRow href="/tools/juhyu-sudang/" icon="calculator" title="주휴수당 계산기" desc="시급·근무시간으로 이번 주 예상액과 대상 여부" />
            <ListRow href="/guides/juhyu-sudang-conditions/" icon="book" title="주휴수당 받는 조건 3가지" desc="15시간·개근·근로관계 유지, 헷갈리는 사례 정리" />
            <ListRow icon="briefcase" title="퇴직금 계산기" desc="곧 열어요" soon />
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">무엇을 하나요</p>
            <h2 className="t2">매일 쓰게 되는 작은 제품을, 정성스럽게</h2>
          </div>
          <div className="features">
            <div className="feature">
              <div className="icon"><Icon name="layers" /></div>
              <h3 className="t4">앱 스튜디오</h3>
              <p>기획부터 디자인·개발·출시·운영까지 한 팀이 책임지고 완성합니다.</p>
            </div>
            <div className="feature">
              <div className="icon"><Icon name="sprout" /></div>
              <h3 className="t4">건강 &amp; 습관</h3>
              <p>운동·웰니스 영역에서 매일의 작은 실천이 쌓이도록 경험을 설계합니다.</p>
            </div>
            <div className="feature">
              <div className="icon"><Icon name="ruler" /></div>
              <h3 className="t4">정확한 계산</h3>
              <p>공식 기준과 계산식을 함께 보여주고, 애매하면 금액 대신 판정 불가로 안내합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="products" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="product">
            <div className="mascot" aria-hidden="true">🐤</div>
            <div>
              <p className="eyebrow">iOS · 건강 &amp; 피트니스</p>
              <h3 className="t2" style={{ marginTop: 4 }}>쪼밍 (JJOMING)</h3>
              <p>
                Pelly 마스코트와 함께하는 케겔 운동 습관 앱. 차분한 호흡 가이드, 연속 스트릭, 저녁 리마인더로 매일의
                골반저근 운동을 이어가게 돕습니다.
              </p>
              <a className="btn btn-primary" href="https://apps.apple.com/app/id6741137991" target="_blank" rel="noopener">
                App Store에서 보기
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="contact" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="contact-card">
            <h2 className="t2">함께 만들 이야기가 있다면</h2>
            <p>제휴·문의는 이메일로 편하게 연락 주세요.</p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>
      </section>
    </>
  );
}
