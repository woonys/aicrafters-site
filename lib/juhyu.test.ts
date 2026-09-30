import { describe, expect, it } from "vitest";
import { calcJuhyu, hoursToMinutes, parseNumber, type JuhyuInput } from "./juhyu";

const base = (h: number, over: Partial<JuhyuInput> = {}): JuhyuInput => ({
  hourlyWage: 10_320,
  weeklyMinutes: hoursToMinutes(h),
  sameHoursEveryWeek: "yes",
  fullAttendance: "yes",
  employedThroughHoliday: "yes",
  ...over,
});

const pay = (h: number, over: Partial<JuhyuInput> = {}) => {
  const r = calcJuhyu(base(h, over));
  if (r.status !== "eligible") throw new Error(`expected eligible, got ${r.status}`);
  return r;
};

// 기대값은 계산기와 독립적으로 "시간/40×8×시급" 을 손으로 계산한 값이다.
describe("주휴수당 금액 (2026 최저시급 10,320원)", () => {
  it.each([
    [15, 30_960], // 15/40×8 = 3h
    [24, 49_536], // 4.8h
    [22.5, 46_440], // 4.5h
    [40, 82_560], // 8h
    [52, 82_560], // 40시간 상한
    [39.9, 82_353], // 7.98h × 10,320 = 82,353.6 → 절사
  ])("주 %s시간 → %s원", (h, won) => {
    expect(pay(h).weeklyPay).toBe(won);
  });

  it("2027 최저시급 10,700원, 주 40시간 → 85,600원 (고시 일급과 동일)", () => {
    expect(pay(40, { hourlyWage: 10_700 }).weeklyPay).toBe(85_600);
  });

  it("월평균 추정 = 주휴수당 × 4.345 절사", () => {
    expect(pay(40).monthlyEstimate).toBe(358_723); // 82,560 × 4.345 = 358,723.2
  });

  it("40시간 초과 입력은 상한 적용 사실을 돌려준다", () => {
    expect(pay(52).cappedMinutes).toBe(2400);
  });
});

describe("대상 여부", () => {
  it("15시간 직전은 대상 아님", () => {
    expect(calcJuhyu(base(14.5)).status).toBe("not_eligible");
    expect(calcJuhyu(base(14 + 59 / 60)).status).toBe("not_eligible");
  });
  it("정확히 15시간은 대상", () => {
    expect(calcJuhyu(base(15)).status).toBe("eligible");
  });
  it("결근이 있으면 대상 아님", () => {
    expect(calcJuhyu(base(40, { fullAttendance: "no" })).status).toBe("not_eligible");
  });
  it("주휴일 전에 근로관계가 끝나면 대상 아님", () => {
    expect(calcJuhyu(base(40, { employedThroughHoliday: "no" })).status).toBe("not_eligible");
  });
  it("개근 여부를 모르면 판정 불가 (0원으로 보여주지 않음)", () => {
    expect(calcJuhyu(base(40, { fullAttendance: "unknown" })).status).toBe("undetermined");
  });
  it("주마다 시간이 다르면 판정 불가", () => {
    expect(calcJuhyu(base(40, { sameHoursEveryWeek: "no" })).status).toBe("undetermined");
  });
  it("15시간 미만이면 다른 답과 상관없이 대상 아님", () => {
    expect(calcJuhyu(base(10, { fullAttendance: "unknown" })).status).toBe("not_eligible");
  });
});

describe("잘못된 호출은 예외", () => {
  it.each([0, -1, 10.5, Number.NaN])("시급 %s", (w) => {
    expect(() => calcJuhyu(base(40, { hourlyWage: w }))).toThrow(RangeError);
  });
});

describe("parseNumber", () => {
  it("쉼표와 공백 허용", () => {
    expect(parseNumber(" 10,320 ", { integer: true })).toEqual({ ok: true, value: 10320 });
  });
  it.each(["", "  ", "-5", "abc", "1e3", "NaN", "10.5.1"])("%j 는 오류", (raw) => {
    expect(parseNumber(raw).ok).toBe(false);
  });
  it("정수 요구 시 소수 거부", () => {
    expect(parseNumber("10320.5", { integer: true }).ok).toBe(false);
  });
  it("범위 검사", () => {
    expect(parseNumber("8", { max: 7 }).ok).toBe(false);
  });
});
