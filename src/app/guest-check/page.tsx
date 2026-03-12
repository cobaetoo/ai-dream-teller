import { Metadata } from "next";
import { GuestCheckClient } from "@/components/features/guest/guest-check-client";

export const metadata: Metadata = {
  title: "비회원 주문 내역 | AI Dream Teller",
  description: "비회원 주문 내역을 조회하고 꿈 해석 결과를 확인하세요.",
};

const GuestCheckPage = () => {
  return <GuestCheckClient />;
};

export default GuestCheckPage;
