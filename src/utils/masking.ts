/**
 * 데이터 프라이버시 보호를 위한 마스킹 유틸리티 (PRD 9.5)
 */

/**
 * 전화번호 마스킹 (010-1234-5678 -> 010-****-5678)
 */
export const maskPhoneNumber = (phone: string | null | undefined): string => {
  if (!phone) return "정보 없음";
  const parts = phone.split("-");
  if (parts.length === 3) {
    return `${parts[0]}-****-${parts[2]}`;
  }
  // 하이픈이 없는 경우 뒤 4자리만 남기고 마스킹
  return phone.length > 4 ? "****" + phone.slice(-4) : "****";
};

/**
 * 이메일 마스킹 (example@email.com -> ex***@email.com)
 */
export const maskEmail = (email: string | null | undefined): string => {
  if (!email) return "정보 없음";
  const [local, domain] = email.split("@");
  if (!domain) return "****";
  return local.length > 2 
    ? local.slice(0, 2) + "****@" + domain 
    : "****@" + domain;
};

/**
 * 유저 ID 마스킹 (UUID -> 앞 8자리...)
 */
export const maskUserId = (userId: string | null | undefined): string => {
  if (!userId) return "알 수 없음";
  return userId.length > 8 ? userId.substring(0, 8) + "..." : userId;
};
