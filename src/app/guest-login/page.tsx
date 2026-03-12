import { Metadata } from "next";
import { GuestLoginClient } from "@/components/features/guest/guest-login-client";

export const metadata: Metadata = {
  title: "비회원 주문 조회 | AI Dream Teller",
  description: "전화번호와 비밀번호를 입력하여 비회원 주문 내역을 조회하세요.",
};

const GuestLoginPage = () => {
  return <GuestLoginClient />;
};

export default GuestLoginPage;
