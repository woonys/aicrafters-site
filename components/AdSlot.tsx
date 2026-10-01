"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, SLOT_IN_CONTENT } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// 본문 사이 광고. 계산 입력·버튼·결과 영역 안에는 두지 않는다 (DESIGN.md 광고 규칙).
// 광고가 채워지지 않으면 CSS로 자리 전체를 숨겨 빈 칸을 남기지 않는다.
export function AdSlot({ slot = SLOT_IN_CONTENT }: { slot?: string }) {
  const pushed = useRef(false);
  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // 광고 차단기 등으로 스크립트가 없으면 조용히 넘어간다.
    }
  }, []);
  return (
    <aside className="ad-slot" aria-label="광고">
      <span className="ad-label">광고</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
