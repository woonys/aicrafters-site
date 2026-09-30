"use client";

import { useId, useState } from "react";
import { calcJuhyu, formatHours, formatWon, hoursToMinutes, parseNumber, type Answer } from "@/lib/juhyu";
import { MINIMUM_WAGE } from "@/lib/wage";

type Mode = "daily" | "weekly";

function Choice({
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
    <div className="seg">
      {options.map(([v, label]) => (
        <label key={v}>
          <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
          {label}
        </label>
      ))}
    </div>
  );
}

export function JuhyuCalculator() {
  const id = useId();
  const [wage, setWage] = useState(String(MINIMUM_WAGE.find((w) => w.year === 2026)!.hourly));
  const [mode, setMode] = useState<Mode>("daily");
  const [dailyHours, setDailyHours] = useState("");
  const [days, setDays] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [same, setSame] = useState<Answer>("yes");
  const [attendance, setAttendance] = useState<Answer>("yes");
  const [employed, setEmployed] = useState<Answer>("yes");
  const [submitted, setSubmitted] = useState(false);

  const wageP = parseNumber(wage, { integer: true, min: 1, max: 1_000_000 });
  const dailyP = parseNumber(dailyHours, { min: 0.5, max: 24 });
  const daysP = parseNumber(days, { integer: true, min: 1, max: 7 });
  const weeklyP = parseNumber(weeklyHours, { min: 0.5, max: 168 });

  let weeklyMinutes: number | null = null;
  if (mode === "daily" && dailyP.ok && daysP.ok) weeklyMinutes = hoursToMinutes(dailyP.value) * daysP.value;
  if (mode === "weekly" && weeklyP.ok) weeklyMinutes = hoursToMinutes(weeklyP.value);

  const valid = wageP.ok && weeklyMinutes !== null && weeklyMinutes > 0;
  const result =
    submitted && valid
      ? calcJuhyu({
          hourlyWage: wageP.value,
          weeklyMinutes: weeklyMinutes!,
          sameHoursEveryWeek: same,
          fullAttendance: attendance,
          employedThroughHoliday: employed,
        })
      : null;

  const err = (p: ReturnType<typeof parseNumber>) => (submitted && !p.ok ? p.error : null);

  return (
    <form
      className="calc"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="field">
        <label htmlFor={`${id}-wage`}>시급</label>
        <div className="row">
          <input
            id={`${id}-wage`}
            className="inp"
            inputMode="numeric"
            value={wage}
            onChange={(e) => setWage(e.target.value)}
            aria-invalid={!!err(wageP)}
            aria-describedby={`${id}-wage-hint ${id}-wage-err`}
          />
          <span>원</span>
        </div>
        <div className="seg" style={{ marginTop: 8 }}>
          {MINIMUM_WAGE.map((w) => (
            <button
              key={w.year}
              type="button"
              className="btn btn-ghost"
              style={{ padding: "8px 12px", fontSize: 14 }}
              onClick={() => setWage(String(w.hourly))}
            >
              {w.year} 최저 {w.hourly.toLocaleString("ko-KR")}원
            </button>
          ))}
        </div>
        <div className="hint" id={`${id}-wage-hint`}>
          버튼은 최저시급을 채워 넣을 뿐입니다. 실제 계약 시급이 다르면 직접 고쳐 주세요.
        </div>
        {err(wageP) && (
          <div className="err" id={`${id}-wage-err`}>
            {err(wageP)}
          </div>
        )}
      </div>

      <fieldset className="field">
        <legend>계약상 근무시간 (휴게·연장근로 제외)</legend>
        <div className="seg" role="radiogroup">
          <label>
            <input type="radio" name={`${id}-mode`} checked={mode === "daily"} onChange={() => setMode("daily")} />
            하루 시간 × 주 일수
          </label>
          <label>
            <input type="radio" name={`${id}-mode`} checked={mode === "weekly"} onChange={() => setMode("weekly")} />
            주 총 시간
          </label>
        </div>
        {mode === "daily" ? (
          <div className="row" style={{ marginTop: 10 }}>
            <input
              aria-label="하루 근무시간"
              className="inp"
              inputMode="decimal"
              placeholder="예: 4"
              value={dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
              aria-invalid={!!err(dailyP)}
            />
            <span>시간 ×</span>
            <input
              aria-label="주 근무일수"
              className="inp"
              inputMode="numeric"
              placeholder="예: 5"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              aria-invalid={!!err(daysP)}
            />
            <span>일</span>
          </div>
        ) : (
          <div className="row" style={{ marginTop: 10 }}>
            <input
              aria-label="주 총 근무시간"
              className="inp"
              inputMode="decimal"
              placeholder="예: 20"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value)}
              aria-invalid={!!err(weeklyP)}
            />
            <span>시간</span>
          </div>
        )}
        <div className="hint">
          실제로 일한 시간이 아니라 근로계약서에 정한 시간입니다. 점심시간 같은 휴게시간과 초과근무는 빼 주세요. 30분은
          0.5로 입력합니다.
        </div>
        {mode === "daily" && (err(dailyP) || err(daysP)) && <div className="err">{err(dailyP) ?? err(daysP)}</div>}
        {mode === "weekly" && err(weeklyP) && <div className="err">{err(weeklyP)}</div>}
        {weeklyMinutes !== null && weeklyMinutes > 2400 && (
          <div className="hint">
            주 40시간을 넘는 부분은 연장근로라서 주휴수당 계산에 넣지 않습니다. 40시간으로 계산합니다.
          </div>
        )}
      </fieldset>

      <fieldset className="field">
        <legend>매주 근무시간이 같나요?</legend>
        <Choice
          name={`${id}-same`}
          value={same}
          onChange={setSame}
          options={[
            ["yes", "네, 매주 같아요"],
            ["no", "주마다 달라요"],
          ]}
        />
      </fieldset>

      <fieldset className="field">
        <legend>이번 주 정해진 근무일에 모두 출근했나요?</legend>
        <Choice
          name={`${id}-att`}
          value={attendance}
          onChange={setAttendance}
          options={[
            ["yes", "네"],
            ["no", "결근한 날이 있어요"],
            ["unknown", "잘 모르겠어요"],
          ]}
        />
        <div className="hint">지각·조퇴를 했거나 연차를 쓴 날은 결근이 아닙니다.</div>
      </fieldset>

      <fieldset className="field">
        <legend>주휴일(보통 일요일)까지 계속 고용된 상태인가요?</legend>
        <Choice
          name={`${id}-emp`}
          value={employed}
          onChange={setEmployed}
          options={[
            ["yes", "네"],
            ["no", "그 전에 퇴사해요"],
            ["unknown", "잘 모르겠어요"],
          ]}
        />
        <div className="hint">금요일까지 일하고 퇴사해도 퇴사일이 주휴일 이후라면 &lsquo;네&rsquo;입니다.</div>
      </fieldset>

      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", minHeight: 52 }}>
        계산하기
      </button>

      <div aria-live="polite" style={{ marginTop: 16 }}>
        {result?.status === "eligible" && (
          <div className="result ok">
            <div className="label">이번 주 주휴수당 예상액</div>
            <div className="big">{formatWon(result.weeklyPay)}</div>
            <div className="formula">
              {formatHours(result.cappedMinutes)} ÷ 40 × 8 = {formatHours(result.holidayMinutes)} ×{" "}
              {formatWon(wageP.ok ? wageP.value : 0)} = {formatWon(result.weeklyPay)}
            </div>
            <p>
              주휴수당만의 월평균 추정(× 4.345주): <strong>{formatWon(result.monthlyEstimate)}</strong>
              <br />
              <small>실제 그 달 지급액과는 다를 수 있습니다. 원 미만은 표시상 절사했습니다.</small>
            </p>
          </div>
        )}
        {result?.status === "not_eligible" && (
          <div className="result no">
            <div className="label">이번 주 주휴수당</div>
            <div className="big">대상 아님</div>
            <p>{result.reason}</p>
          </div>
        )}
        {result?.status === "undetermined" && (
          <div className="result unk">
            <div className="label">이번 주 주휴수당</div>
            <div className="big">판정 불가</div>
            <p>{result.reason}</p>
          </div>
        )}
      </div>
    </form>
  );
}
