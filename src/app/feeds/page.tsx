import { FeedsClient } from "@/components/features/feeds/feeds-client";

export const metadata = {
  title: "꿈 해몽 피드 | AI Dream Teller",
  description:
    "다른 사람들의 꿈 이야기와 AI 해몽 결과를 구경해보세요. 프로이트, 칼 융, 신경과학, 게슈탈트 전문 관점의 꿈 해석 피드입니다.",
};

const FeedsPage = () => {
  return <FeedsClient />;
};

export default FeedsPage;
