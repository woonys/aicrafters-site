import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "AI Crafters — 사람의 하루를 다듬는 AI 앱을 만듭니다", template: "%s | AI Crafters" },
  description:
    "AI Crafters는 일상의 건강과 습관을 돕는 앱과, 근로자에게 필요한 생활 계산기를 만듭니다.",
  openGraph: { siteName: "AI Crafters", type: "website", locale: "ko_KR" },
  other: { "build-sha": process.env.NEXT_PUBLIC_BUILD_SHA ?? "local" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
