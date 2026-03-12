import MyPageClient from "@/components/features/my-page/my-page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지 | AI Dream Teller",
  description: "나의 지난 꿈 기록과 해몽 분석 결과를 한눈에 확인하세요.",
};

const MyPage = () => {
  return <MyPageClient />;
};

export default MyPage;
