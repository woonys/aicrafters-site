// 주휴수당 계산 (근로기준법 제55조, 제18조 제3항, 시행령 제30조)
//
// 지원 범위: 매주 소정근로시간이 같고, 통상근로자 기준이 주 5일·40시간인 경우.
// 이 범위를 벗어나면 금액을 내지 않고 "판정 불가"로 돌려준다.
// 금액은 분 단위 정수로 계산해 부동소수 오차를 피하고, 원 미만은 표시상 절사한다.

export type Answer = "yes" | "no" | "unknown";

export interface JuhyuInput {
  hourlyWage: number; // 원, 정수
  weeklyMinutes: number; // 계약상 주 소정근로시간(분). 휴게·연장근로 제외
  sameHoursEveryWeek: Answer; // 4주 평균 판정을 단순화하기 위한 전제
  fullAttendance: Answer; // 소정근로일 개근
  employedThroughHoliday: Answer; // 주휴일까지 근로관계 유지
}

export type JuhyuResult =
  | {
      status: "eligible";
      cappedMinutes: number;
      holidayMinutes: number;
      weeklyPay: number;
      monthlyEstimate: number;
    }
  | { status: "not_eligible"; reason: string }
  | { status: "undetermined"; reason: string };

const FULL_WEEK_MINUTES = 40 * 60;
const THRESHOLD_MINUTES = 15 * 60;
// 주휴수당만의 월평균 추정 계수 (365 / 7 / 12 ≈ 4.345)
const WEEKS_PER_MONTH_X1000 = 4345;

export function calcJuhyu(input: JuhyuInput): JuhyuResult {
  const { hourlyWage, weeklyMinutes } = input;
  if (!Number.isInteger(hourlyWage) || hourlyWage <= 0) throw new RangeError("hourlyWage");
  if (!Number.isInteger(weeklyMinutes) || weeklyMinutes <= 0) throw new RangeError("weeklyMinutes");

  if (input.sameHoursEveryWeek !== "yes") {
    return {
      status: "undetermined",
      reason:
        "주마다 근무시간이 다르면 4주 평균으로 15시간 이상인지 따져야 합니다. 이 계산기는 매주 같은 시간을 일하는 경우만 계산합니다.",
    };
  }
  if (weeklyMinutes < THRESHOLD_MINUTES) {
    return { status: "not_eligible", reason: "주 소정근로시간이 15시간 미만이면 주휴수당 대상이 아닙니다." };
  }
  if (input.fullAttendance === "no") {
    return { status: "not_eligible", reason: "그 주 소정근로일에 결근한 날이 있으면 주휴수당이 생기지 않습니다." };
  }
  if (input.employedThroughHoliday === "no") {
    return { status: "not_eligible", reason: "주휴일 전에 근로관계가 끝나면 그 주 주휴수당은 생기지 않습니다." };
  }
  if (input.fullAttendance === "unknown" || input.employedThroughHoliday === "unknown") {
    return {
      status: "undetermined",
      reason: "개근 여부나 근로관계 유지 여부를 확인해야 판정할 수 있습니다. 지각·조퇴·연차 사용은 결근이 아닙니다.",
    };
  }

  const cappedMinutes = Math.min(weeklyMinutes, FULL_WEEK_MINUTES);
  // 주휴시간 = 주 소정근로시간 / 40 × 8
  const holidayMinutes = (cappedMinutes * 8) / 40;
  // 주휴수당 = 주휴시간 × 시급 = cappedMinutes × 8 × 시급 / 2400 (원 미만 절사)
  const weeklyPay = Math.floor((cappedMinutes * 8 * hourlyWage) / FULL_WEEK_MINUTES);
  const monthlyEstimate = Math.floor((weeklyPay * WEEKS_PER_MONTH_X1000) / 1000);
  return { status: "eligible", cappedMinutes, holidayMinutes, weeklyPay, monthlyEstimate };
}

export type ParseResult = { ok: true; value: number } | { ok: false; error: string };

// 사용자 입력 숫자 파싱. "10,320", " 10320 " 허용. 빈칸·음수·문자·NaN 은 오류.
export function parseNumber(raw: string, opts: { integer?: boolean; min?: number; max?: number } = {}): ParseResult {
  const s = raw.replace(/[,\s]/g, "");
  if (s === "") return { ok: false, error: "값을 입력해 주세요." };
  if (!/^\d+(\.\d+)?$/.test(s)) return { ok: false, error: "숫자만 입력해 주세요." };
  const n = Number(s);
  if (!Number.isFinite(n)) return { ok: false, error: "숫자만 입력해 주세요." };
  if (opts.integer && !Number.isInteger(n)) return { ok: false, error: "소수점 없이 입력해 주세요." };
  if (opts.min !== undefined && n < opts.min) return { ok: false, error: `${opts.min} 이상으로 입력해 주세요.` };
  if (opts.max !== undefined && n > opts.max) return { ok: false, error: `${opts.max} 이하로 입력해 주세요.` };
  return { ok: true, value: n };
}

// 시간(소수 가능) → 분 (정수)
export const hoursToMinutes = (h: number) => Math.round(h * 60);

export const formatWon = (n: number) => `${n.toLocaleString("ko-KR")}원`;

export function formatHours(minutes: number): string {
  const h = minutes / 60;
  return `${Number.isInteger(h) ? h : Number(h.toFixed(2))}시간`;
}
