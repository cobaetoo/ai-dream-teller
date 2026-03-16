import { test, expect } from '@playwright/test';

test.describe('Backend Orders & Payments E2E Tests (PRD 8.2. 7,8,9,13,14,15,16,17)', () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // No. 7: POST /api/orders (가격 조작 시도 방어)
  test('POST /api/orders should return 400 for manipulated total_amount', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/orders`, {
      data: {
        dream_content: "테스트 꿈",
        expert_field: "freud",
        includes_image: true,
        total_amount: 1500, // 기본 1500 + 이미지 500 = 2000원이어야 하므로 1500 전송 시 에러
        phone_number: "010-9999-9999",
        guest_password: "password123"
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("금액 정보가 일치하지 않습니다");
  });

  // No. 13: POST /api/orders (비회원 주문 시 필수 필드 누락)
  test('POST /api/orders should return 400 for missing guest fields', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/orders`, {
      data: {
        dream_content: "테스트 꿈",
        expert_field: "jung",
        includes_image: false,
        total_amount: 1500,
        // 비회원 필수값 phone_number, guest_password 제거
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    // 비회원일 때 번호/비밀번호 없으면 이 메시지가 와야함
    expect(body.error).toContain("연락처와 비밀번호를 입력해주세요");
  });

  // No. 8: POST /api/payments/confirm (토스페이먼츠 승인 콜백 API 중복 호출/에러 차단)
  test('POST /api/payments/confirm should return error for invalid payment key', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/payments/confirm`, {
      data: {
        paymentKey: "invalid_key",
        orderId: "invalid_order",
        amount: 2000
      }
    });
    // 유효하지 않은 키이므로 시스템 에러나 toss 검증 에러 
    expect(response.status()).not.toBe(200);
  });

  // No. 9, 17: GET /api/orders/[id] (타인/무작위 주문서 조회 IDOR 방어)
  test('GET /api/orders/[id] should block access to unauthorized or random order', async ({ request }) => {
    const mockOrderId = "123e4567-e89b-12d3-a456-426614174000"; // 임의의 UUID
    const response = await request.get(`${baseUrl}/api/orders/${mockOrderId}`);
    // 세션이 없으므로 조회 실패 (401 또는 404, 403)
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  // No. 14: POST /api/payments/fail (결제창 에러 등 실패 처리 로직 방어)
  test('POST /api/payments/fail should return 400 or 404 for missing order data', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/payments/fail`, {
      data: {
        message: "Payment canceled by user",
        code: "CANCELED" // orderId가 없음 (또는 변조됨)
      }
    });
    // 필수 데이터 누락 확인 (예: 400 또는 404)
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  // No. 15: POST /api/payments/cancel (이미 처리/타인 주문 취소 시도 프록시 방어)
  test('POST /api/payments/cancel should block cancellation for invalid/unowned order', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/payments/cancel`, {
      data: {
        orderId: "123-cancel-fake"
      }
    });
    // 비정상적인 취소 시도이므로 에러 발생
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  // No. 16: POST /api/payments/webhook (위조 외부 IP 접근 보안)
  test('POST /api/payments/webhook should reject unauthorized webhook payload without valid secret', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/payments/webhook`, {
      data: {
        status: "DONE",
        orderId: "test-fake-id",
        secret: "bad-secret"
      }
    });
    // 올바른 secret 시그니처가 없으면 거부됨.
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
