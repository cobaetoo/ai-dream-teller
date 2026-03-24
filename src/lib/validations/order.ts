import { z } from "zod";

export const orderSchema = z.object({
  dream_content: z
    .string()
    .min(20, "꿈 내용은 최소 20자 이상이어야 합니다.")
    .max(5000, "꿈 내용은 최대 5000자 이내여야 합니다.")
    .trim(),
  expert_field: z.string().min(1, "전문 분야를 선택해주세요."),
  includes_image: z.boolean(),
  total_amount: z.number().int().min(1500, "최소 금액 미달"),
  phone_number: z.string().optional(),
  guest_password: z.string().optional(),
});
