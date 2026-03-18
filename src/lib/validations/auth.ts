import { z } from "zod";

export const guestSchema = z.object({
  phone_number: z
    .string()
    .min(10, "전화번호는 최소 10자 이상이어야 합니다.")
    .max(15, "전화번호는 최대 15자 이내여야 합니다.")
    .regex(/^01[0-9]-[0-9]{3,4}-[0-9]{4}$/, "올바른 전화번호 형식(010-0000-0000)이어야 합니다."),
  guest_password: z
    .string()
    .length(4, "비밀번호는 숫자 4자리여야 합니다.")
    .regex(/^[0-9]+$/, "비밀번호는 숫자만 입력 가능합니다."),
});

export const profileSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자 이내여야 합니다.")
    .regex(/^[a-zA-Z0-9가-힣\s]+$/, "닉네임에는 특수문자를 사용할 수 없습니다."),
});
