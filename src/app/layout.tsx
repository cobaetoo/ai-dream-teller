import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#09090b", // Deep dark background
};

export const metadata: Metadata = {
  title: {
    template: "%s | AI Dream Teller",
    default: "AI Dream Teller - 신비로운 AI 꿈 해몽 서비스",
  },
  description: "당신의 꿈을 인공지능이 분석하여 심층적인 해몽과 이미지를 제공합니다. 프로이트, 칼 융, 신경과학 등 전문 분야를 선택하여 해몽을 받아보세요.",
  keywords: ["AI 꿈 해몽", "꿈 해석", "프로이트", "칼 융", "몽환적인", "AI 이미지"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://aidreamteller.com", // TODO: 실제 프로덕션 URL
    siteName: "AI Dream Teller",
    title: "AI Dream Teller - 당신의 무의식을 비추는 거울",
    description: "당신의 꿈을 가장 세심하고 정확하게 분석하는 AI 꿈 해몽",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <main className="flex-1 flex flex-col relative w-full overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
