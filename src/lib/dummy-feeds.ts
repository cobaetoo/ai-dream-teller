import { faker } from "@faker-js/faker/locale/ko";

// 꿈 해몽 피드 아이템 타입
export interface FeedItem {
  id: string;
  // 사용자 정보
  userName: string;
  userAvatar: string;
  // 해몽 내용
  expertType: "freud" | "jung" | "neuro" | "gestalt";
  expertLabel: string;
  dreamTitle: string;
  dreamSummary: string;
  analysisExcerpt: string;
  // 이미지 (옵션)
  imageUrl: string | null;
  // 인터랙션 수치 (페이스북 스타일)
  likeCount: number;
  commentCount: number;
  shareCount: number;
  // 시간
  createdAt: Date;
}

// 전문 관점 매핑
const EXPERT_TYPES: Array<{
  type: FeedItem["expertType"];
  label: string;
  colorClass: string;
}> = [
  { type: "freud", label: "프로이트 분석", colorClass: "bg-pink-100 text-pink-700" },
  { type: "jung", label: "칼 융 분석", colorClass: "bg-purple-100 text-purple-700" },
  { type: "neuro", label: "신경과학 분석", colorClass: "bg-sky-100 text-sky-700" },
  { type: "gestalt", label: "게슈탈트 분석", colorClass: "bg-amber-100 text-amber-700" },
];

// 꿈 제목 풀 - 실제 서비스처럼 보이는 다양한 꿈 제목
const DREAM_TITLES = [
  "하늘을 자유롭게 나는 꿈",
  "끝없이 이어지는 깊은 바다 속",
  "숲 속에서 길을 잃은 꿈",
  "거울 속에 비친 낯선 나",
  "시간이 거꾸로 가는 시계탑",
  "사라진 기차를 쫓아가는 꿈",
  "빛나는 보석이 가득한 동굴",
  "말하는 고양이와 대화한 꿈",
  "끝없이 올라가는 회전 계단",
  "폭풍우 속에서 춤을 추는 꿈",
  "어린 시절 살던 집에 다시 간 꿈",
  "하얀 산봉우리 위의 뜨거운 태양",
  "바다 위를 걸어 지평선까지 간 꿈",
  "꽃이 만발한 정원에서 나비를 쫓던 꿈",
  "유리로 된 건물이 무너지는 꿈",
  "자전거를 타고 구름 위를 달리는 꿈",
  "과거와 현재가 동시에 존재하는 꿈",
  "사막 한가운데 오아시스를 찾은 꿈",
  "밤하늘에 떠다니는 거대한 달",
  "깊은 우물 속에서 별을 본 꿈",
];

// 꿈 요약 풀
const DREAM_SUMMARIES = [
  "꿈에서 저는 넓은 바다 위를 걸어가고 있었어요. 발 아래엔 물결이 있었지만 빠지지 않고 계속 걸을 수 있었습니다.",
  "어렸을 때 살던 집에 다시 가봤는데, 모든 것이 그대로였지만 집 안이 훨씬 넓어져 있었어요.",
  "높은 산꼭대기에서 구름을 바라보며 앉아있었는데 갑자기 몸이 떠오르기 시작했습니다.",
  "이상한 도서관에 들어갔는데, 모든 책에 제 이름이 적혀있었어요. 책을 열면 제가 겪은 일들이 쓰여있었습니다.",
  "폭풍우가 몰아치는 바다 위에서 작은 배를 타고 있었어요. 두려움보다는 이상하게 평온함을 느꼈습니다.",
  "거대한 나무 앞에 서 있었어요. 나무에서 빛이 반짝거렸는데, 가까이 가니 나뭇잎이 모두 보석이었습니다.",
  "오래된 시계탑에 들어갔더니 시계가 거꾸로 돌아가고 있었어요. 밖으로 나가니 모든 것이 어린 시절로 돌아가 있었습니다.",
  "밤하늘에 달이 두 개 떠 있는 꿈을 꿨어요. 하나는 빨간색이고 하나는 파란색이었는데, 저를 아래에서 비추고 있었습니다.",
  "숲 속에서 길을 잃었는데, 빛나는 반딧불이들이 나타나 길을 안내해줬어요. 따라가니 아름다운 호수가 있었습니다.",
  "끊임없이 이어지는 계단을 올라가고 있었어요. 정상에 도착하면 또 다른 계단이 나타났고, 그래도 올라가고 싶었습니다.",
];

// 분석 결과 풀
const ANALYSIS_EXCERPTS = [
  "이 꿈은 당신의 잠재의식이 현재 감정적 안정을 갈구하고 있음을 보여줍니다. 물 위를 걷는 행위는 스스로 통제할 수 있다는 자신감의 표현이며, 동시에 무의식 속에 숨겨진 불안을 극복하고 있다는 긍정적 신호입니다.",
  "어린 시절 공간의 재방문은 자아 정체성 재탐색의 상징입니다. 넓어진 공간은 성장한 당신의 내면 세계를 투영하며, 과거와 화해하려는 무의식적 시도로 해석됩니다.",
  "상승하는 신체 경험은 현재 삶에서 도전을 향한 열망과 높은 목표를 설정하고자 하는 욕구를 반영합니다. 구름을 바라보는 평온한 태도는 그 과정에서의 심리적 안정감을 나타냅니다.",
  "자신의 이름이 적힌 책들은 아직 발견하지 못한 자아의 다양한 측면을 의미합니다. 이 꿈은 자기 탐색의 시기에 진입했다는 강력한 신호이며, 내면의 지혜에 귀를 기울이라는 메시지입니다.",
  "폭풍 속의 평온함은 현재 겪고 있는 외부적 혼란에도 불구하고, 내면의 중심을 유지하고 있다는 것을 보여주는 매우 건강한 심리 상태의 반영입니다.",
  "빛나는 보석 나뭇잎은 일상 속에 숨겨진 가치를 발견하라는 무의식의 메시지입니다. 자연과 보석의 결합은 물질적 가치와 정신적 가치의 조화를 상징합니다.",
  "시간의 역행은 과거에 대한 미련이 아닌, 과거의 경험에서 교훈을 얻고자 하는 성숙한 심리 상태를 반영합니다. 어린 시절로의 회귀는 순수하고 핵심적인 자아와의 재연결을 의미합니다.",
  "두 개의 달은 삶에서 직면한 이중적 선택이나 감정적 갈등을 상징합니다. 빨강과 파랑은 각각 열정과 이성을 대표하며, 두 가지 사이에서 균형을 찾아야 한다는 메시지를 담고 있습니다.",
  "길 안내자로서의 반딧불이는 어려운 상황에서도 직관을 믿으라는 무의식의 조언입니다. 호수의 발견은 내면의 평화와 자기 수용이라는 최종 목표를 상징합니다.",
  "끝없는 계단은 끊임없는 성장과 발전에 대한 욕구를 나타냅니다. 정상에 도달해도 새로운 도전을 기꺼이 받아들이는 태도는 당신의 강한 내적 동기를 보여줍니다.",
];

/**
 * Faker.js를 사용하여 리얼한 더미 피드 데이터를 생성합니다.
 * @param count - 생성할 피드 아이템 수
 * @returns FeedItem 배열
 */
export const generateDummyFeeds = (count: number): FeedItem[] => {
  // 시드를 고정하여 일관된 더미 데이터 생성 (SSR/CSR 불일치 방지)
  faker.seed(42);

  return Array.from({ length: count }, (_, i) => {
    const expert = EXPERT_TYPES[i % EXPERT_TYPES.length];
    // 약 60%의 확률로 이미지 포함
    const hasImage = i % 5 !== 2 && i % 5 !== 4;
    const createdAt = faker.date.recent({ days: 14 });

    return {
      id: `feed-${i + 1}`,
      userName: faker.person.fullName(),
      userAvatar: faker.image.urlPicsumPhotos({ width: 80, height: 80 }),
      expertType: expert.type,
      expertLabel: expert.label,
      dreamTitle: DREAM_TITLES[i % DREAM_TITLES.length],
      dreamSummary: DREAM_SUMMARIES[i % DREAM_SUMMARIES.length],
      analysisExcerpt: ANALYSIS_EXCERPTS[i % ANALYSIS_EXCERPTS.length],
      imageUrl: hasImage
        ? faker.image.urlPicsumPhotos({ width: 800, height: 500 })
        : null,
      likeCount: faker.number.int({ min: 3, max: 982 }),
      commentCount: faker.number.int({ min: 0, max: 87 }),
      shareCount: faker.number.int({ min: 0, max: 45 }),
      createdAt,
    };
  });
};

/**
 * 전문 관점에 따른 뱃지 스타일 클래스를 반환합니다.
 */
export const getExpertBadgeClass = (type: FeedItem["expertType"]): string => {
  const found = EXPERT_TYPES.find((e) => e.type === type);
  return found?.colorClass ?? "bg-slate-100 text-slate-700";
};

/**
 * 상대적인 시간 표시를 위한 유틸리티 함수
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  return date.toLocaleDateString("ko-KR");
};
