"use client";

import { useId, useRef, useState } from "react";
import { calcJuhyu, formatHours, formatWon, hoursToMinutes, parseNumber, type Answer, type JuhyuResult } from "@/lib/juhyu";
import { MINIMUM_WAGE } from "@/lib/wage";

type Mode = "daily" | "weekly";

function Choices({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: Answer;
  onChange: (v: Answer) => void;
  options: [Answer, string][];
}) {
  return (
    <div className="choices">
      {options.map(([v, label]) => (
        <label key={v} className="choice">
          <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
          <span className="dot" aria-hidden="true" />
          {label}
        </label>
      ))}
    </div>
  );
}

const withCommas = (raw: string) => {
  const p = parseNumber(raw, { integer: true });
  return p.ok ? p.value.toLocaleString("ko-KR") : raw;
};

export function JuhyuCalculator() {
  const id = useId();
  const resultRef = useRef<HTMLDivElement>(null);
  const [wage, setWage] = useState("10,320");
  const [mode, setMode] = useState<Mode>("daily");
  const [dailyHours, setDailyHours] = useState("");
  const [days, setDays] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [same, setSame] = useState<Answer>("yes");
  const [attendance, setAttendance] = useState<Answer>("yes");
  const [employed, setEmployed] = useState<Answer>("yes");
  const [submitted, setSubmitted] = useState(false);
  const [shown, setShown] = useState<{ key: string; wage: number; result: JuhyuResult } | null>(null);

  const wageP = parseNumber(wage, { integer: true, min: 1, max: 1_000_000 });
  const dailyP = parseNumber(dailyHours, { min: 0.5, max: 24 });
  const daysP = parseNumber(days, { integer: true, min: 1, max: 7 });
  const weeklyP = parseNumber(weeklyHours, { min: 0.5, max: 168 });

  let weeklyMinutes: number | null = null;
  if (mode === "daily" && dailyP.ok && daysP.ok) weeklyMinutes = hoursToMinutes(dailyP.value) * daysP.value;
  if (mode === "weekly" && weeklyP.ok) weeklyMinutes = hoursToMinutes(weeklyP.value);

  const key = JSON.stringify([wage, mode, dailyHours, days, weeklyHours, same, attendance, employed]);
  const stale = shown !== null && shown.key !== key;
  const show = (p: ReturnType<typeof parseNumber>) => submitted && !p.ok;
  const hoursErr = mode === "daily" ? (show(dailyP) ? dailyP : show(daysP) ? daysP : null) : show(weeklyP) ? weeklyP : null;
  const selectedYear = MINIMUM_WAGE.find((w) => wageP.ok && w.hourly === wageP.value)?.year;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!wageP.ok || weeklyMinutes === null || weeklyMinutes <= 0) return;
    const result = calcJuhyu({
      hourlyWage: wageP.value,
      weeklyMinutes,
      sameHoursEveryWeek: same,
      fullAttendance: attendance,
      employedThroughHoliday: employed,
    });
    setShown({ key, wage: wageP.value, result });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  }

  const r = shown?.result;
  const summary = !r
    ? ""
    : r.status === "eligible"
      ? `이번 주 주휴수당 예상액은 ${formatWon(r.weeklyPay)}입니다.`
      : r.status === "not_eligible"
        ? `주휴수당 대상이 아닙니다. ${r.reason}`
        : `판정할 수 없습니다. ${r.reason}`;

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <div className="q">
        <label className="t3" htmlFor={`${id}-wage`}>시급이 얼마인가요?</label>
        <p className="caption">세전 시급을 입력하세요. 연도 버튼은 그해 최저시급을 채워 줍니다.</p>
        <div className="field" data-invalid={show(wageP)}>
          <input
            id={`${id}-wage`}
            inputMode="numeric"
            autoComplete="off"
            value={wage}
            onChange={(e) => setWage(e.target.value)}
            onBlur={() => setWage(withCommas(wage))}
            aria-invalid={show(wageP)}
            aria-describedby={show(wageP) ? `${id}-wage-err` : undefined}
          />
          <span className="unit">원</span>
        </div>
        <div className="chips">
          {MINIMUM_WAGE.slice().reverse().map((w) => (
            <button
              key={w.year}
              type="button"
              className="chip"
              aria-pressed={selectedYear === w.year}
              onClick={() => setWage(w.hourly.toLocaleString("ko-KR"))}
            >
              {w.year} 최저 {w.hourly.toLocaleString("ko-KR")}원
            </button>
          ))}
        </div>
        {show(wageP) && !wageP.ok && (
          <p className="err" id={`${id}-wage-err`}>{wageP.error} 예: 10,320</p>
        )}
      </div>

      <fieldset className="q">
        <legend className="t3">계약상 몇 시간 일하나요?</legend>
        <p className="caption">휴게시간과 연장근로는 빼고, 근로계약서에 정한 시간을 넣으세요. 30분은 0.5시간입니다.</p>
        <div className="seg" style={{ marginBottom: 12 }}>
          <label>
            <input type="radio" name={`${id}-mode`} checked={mode === "daily"} onChange={() => setMode("daily")} />
            하루 × 일수
          </label>
          <label>
            <input type="radio" name={`${id}-mode`} checked={mode === "weekly"} onChange={() => setMode("weekly")} />
            주 합계
          </label>
        </div>
        {mode === "daily" ? (
          <div className="fields-row">
            <div className="field" data-invalid={show(dailyP)}>
              <input aria-label="하루 근무시간" inputMode="decimal" placeholder="예) 4" value={dailyHours} onChange={(e) => setDailyHours(e.target.value)} aria-invalid={show(dailyP)} />
              <span className="unit">시간</span>
            </div>
            <span className="times" aria-hidden="true">×</span>
            <div className="field" data-invalid={show(daysP)}>
              <input aria-label="주 근무일수" inputMode="numeric" placeholder="예) 5" value={days} onChange={(e) => setDays(e.target.value)} aria-invalid={show(daysP)} />
              <span className="unit">일</span>
            </div>
          </div>
        ) : (
          <div className="field" data-invalid={show(weeklyP)}>
            <input aria-label="주 총 근무시간" inputMode="decimal" placeholder="예) 20" value={weeklyHours} onChange={(e) => setWeeklyHours(e.target.value)} aria-invalid={show(weeklyP)} />
            <span className="unit">시간</span>
          </div>
        )}
        {hoursErr && !hoursErr.ok && (
          <p className="err">{hoursErr.error} {mode === "daily" ? "예: 하루 4시간 × 5일" : "예: 20"}</p>
        )}
        {weeklyMinutes !== null && weeklyMinutes > 2400 && (
          <p className="helper">40시간을 넘는 부분은 연장근로라 주휴수당 계산에서 빠져요. 40시간으로 계산합니다.</p>
        )}
      </fieldset>

      <fieldset className="q">
        <legend className="t3">매주 근무시간이 같나요?</legend>
        <p className="caption">주마다 다르면 4주 평균으로 따져야 해서 이 계산기로는 판정하지 않아요.</p>
        <Choices name={`${id}-same`} value={same} onChange={setSame} options={[["yes", "네, 매주 같아요"], ["no", "주마다 달라요"]]} />
      </fieldset>

      <fieldset className="q">
        <legend className="t3">이번 주 정해진 날에 모두 출근했나요?</legend>
        <p className="caption">지각·조퇴를 했거나 연차를 쓴 날은 결근이 아니에요.</p>
        <Choices name={`${id}-att`} value={attendance} onChange={setAttendance} options={[["yes", "네, 모두 출근했어요"], ["no", "결근한 날이 있어요"], ["unknown", "잘 모르겠어요"]]} />
      </fieldset>

      <fieldset className="q">
        <legend className="t3">주휴일까지 계속 고용된 상태인가요?</legend>
        <p className="caption">금요일에 마지막으로 출근해도 일요일(주휴일)까지 재직한 것으로 처리되면 &lsquo;네&rsquo;예요.</p>
        <Choices name={`${id}-emp`} value={employed} onChange={setEmployed} options={[["yes", "네"], ["no", "그 전에 퇴사해요"], ["unknown", "잘 모르겠어요"]]} />
      </fieldset>

      <div className="cta-bar">
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          {shown ? "다시 계산하기" : "계산하기"}
        </button>
      </div>

      <div ref={resultRef} style={{ scrollMarginTop: 80 }}>
        <p aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          {summary}
        </p>
        {r && (
          <div key={shown!.key} className={`receipt result-enter${stale ? " stale" : ""}`}>
            <div className="receipt-head">
              <p className="caption">예상 주휴수당 · 1주 기준</p>
              {r.status === "eligible" && <p className="result-amount">{formatWon(r.weeklyPay)}</p>}
              {r.status === "not_eligible" && <p className="result-status no">대상 아님</p>}
              {r.status === "undetermined" && <p className="result-status unk">판정 불가</p>}
              <p className="reason">
                {r.status === "eligible"
                  ? "주 15시간 이상, 개근, 주휴일까지 고용 유지 조건을 모두 채워요."
                  : r.reason}
              </p>
            </div>
            {stale && <p className="stale-note">입력이 바뀌었어요. 다시 계산해 주세요.</p>}
            {r.status === "eligible" && (
              <>
                <dl className="lines">
                  <div className="line"><dt>시급</dt><dd>{formatWon(shown!.wage)}</dd></div>
                  <div className="line"><dt>주 소정근로시간</dt><dd>{formatHours(r.cappedMinutes)}</dd></div>
                  <div className="line"><dt>주휴시간</dt><dd>{formatHours(r.holidayMinutes)}</dd></div>
                  <div className="line total"><dt>주휴수당</dt><dd>{formatWon(r.weeklyPay)}</dd></div>
                  <div className="line"><dt>월평균 추정 (×4.345주)</dt><dd>{formatWon(r.monthlyEstimate)}</dd></div>
                </dl>
                <p className="formula">
                  {formatHours(r.cappedMinutes)} ÷ 40 × 8 = {formatHours(r.holidayMinutes)}
                  <br />
                  {formatHours(r.holidayMinutes)} × {formatWon(shown!.wage)} = {formatWon(r.weeklyPay)}
                  <br />
                  <span className="small">원 미만은 표시상 절사. 월평균 추정은 실제 그 달 지급액과 다를 수 있어요.</span>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
