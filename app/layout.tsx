import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import Script from "next/script";
import { ADSENSE_CLIENT, GA4_MEASUREMENT_ID } from "@/lib/ads";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";
import { JsonLd, ORG_ID, SITE_ID } from "@/lib/jsonld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "AI Crafters — 사람의 하루를 다듬는 AI 앱을 만듭니다", template: "%s | AI Crafters" },
  description:
    "AI Crafters는 일상의 건강과 습관을 돕는 앱과, 근로자에게 필요한 생활 계산기를 만듭니다.",
  openGraph: { siteName: "AI Crafters", type: "website", locale: "ko_KR" },
  other: { "build-sha": process.env.NEXT_PUBLIC_BUILD_SHA ?? "local" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard (SIL OFL). 사용하는 글자만 내려받는 dynamic subset */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {/* GA4: 향상된 측정이 켜져 있어 클라이언트 라우팅(history 변경)도 page_view 로 잡힌다 */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${GA4_MEASUREMENT_ID}");`}
        </Script>
        <JsonLd data={{ "@type": "Organization", "@id": ORG_ID, name: "AI Crafters", alternateName: "에이아이크래프터스", url: SITE_URL, email: CONTACT_EMAIL, founder: { "@type": "Person", name: "김재운" } }} />
        <JsonLd data={{ "@type": "WebSite", "@id": SITE_ID, name: "AI Crafters", url: SITE_URL, inLanguage: "ko-KR", publisher: { "@id": ORG_ID } }} />
      </body>
    </html>
  );
}
