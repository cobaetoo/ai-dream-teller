import AuthClient from "@/components/features/auth/auth-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 | AI Dream Teller",
  description: "AI Dream Teller에 로그인하여 당신의 신비로운 꿈 기록을 보관하세요.",
};

const AuthPage = () => {
  return <AuthClient />;
};

export default AuthPage;
