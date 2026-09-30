// 연도별 최저시급. 출처: 최저임금위원회 "연도별 최저임금 결정현황"
// https://www.minimumwage.go.kr/minWage/policy/decisionMain.do (2026-10-01 확인)
export const MINIMUM_WAGE = [
  { year: 2027, hourly: 10_700, noticeDate: "2026-08-05" },
  { year: 2026, hourly: 10_320, noticeDate: "2025-08-05" },
] as const;

export type WageYear = (typeof MINIMUM_WAGE)[number]["year"];

export const SOURCES = {
  minimumWage: "https://www.minimumwage.go.kr/minWage/policy/decisionMain.do",
  laborStandardsAct55: "https://www.law.go.kr/법령/근로기준법/제55조",
  laborStandardsAct18: "https://www.law.go.kr/법령/근로기준법/제18조",
  enforcementDecree30: "https://www.law.go.kr/법령/근로기준법시행령/제30조",
} as const;

export const LAST_VERIFIED = "2026-10-01";
