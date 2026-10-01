// 블로그 "알바 주휴수당 시간별 금액표"용 표. calcJuhyu 로 생성해 계산기와 같은 숫자를 쓴다.
// 값 자체의 정확성은 lib/juhyu.test.ts 의 독립 기대값 테스트가 보장한다.
import { calcJuhyu, formatWon } from "./juhyu";
import { MINIMUM_WAGE } from "./wage";

export const TABLE_HOURS = [15, 16, 20, 24, 25, 30, 35, 40] as const;

export function weeklyPayFor(hours: number, wage: number): number | null {
  const r = calcJuhyu({
    hourlyWage: wage,
    weeklyMinutes: hours * 60,
    sameHoursEveryWeek: "yes",
    fullAttendance: "yes",
    employedThroughHoliday: "yes",
  });
  return r.status === "eligible" ? r.weeklyPay : null;
}

export function juhyuTableMarkdown(): string {
  const w26 = MINIMUM_WAGE.find((w) => w.year === 2026)!.hourly;
  const w27 = MINIMUM_WAGE.find((w) => w.year === 2027)!.hourly;
  const rows = TABLE_HOURS.map((h) => {
    const a = weeklyPayFor(h, w26)!;
    const b = weeklyPayFor(h, w27)!;
    return `| 주 ${h}시간 | ${formatWon(a)} | ${formatWon(b)} |`;
  });
  return [
    "| 주 근무시간 | 2026년 (10,320원) | 2027년 (10,700원) |",
    "|---|--:|--:|",
    ...rows,
    `| 15시간 미만 | 대상 아님 | 대상 아님 |`,
  ].join("\n");
}
