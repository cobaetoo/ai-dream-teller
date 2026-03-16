import { test, expect } from '@playwright/test';

test.describe('Backend Auth E2E Tests (PRD 8.2.1-3)', () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // 1. POST /api/auth/login - 지원하지 않는 provider 테스트
  test('POST /api/auth/login should return 400 for unsupported provider', async ({ request }) => {
    const formData = new URLSearchParams();
    formData.append('provider', 'github');

    const response = await request.post(`${baseUrl}/api/auth/login`, {
      data: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Unsupported or missing provider');
  });

  test('POST /api/auth/login should return 400 for empty provider', async ({ request }) => {
    const formData = new URLSearchParams();
    // provider를 비워서 보냄

    const response = await request.post(`${baseUrl}/api/auth/login`, {
      data: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    expect(response.status()).toBe(400);
  });

  // 2. GET /api/auth/callback - 유효하지 않은 코드 테스트
  test('GET /api/auth/callback should redirect to auth page with error for invalid code', async ({ request }) => {
    // Playwright의 request.get은 기본적으로 리다이렉트를 따르지 않도록 설정할 수 있음
    const response = await request.get(`${baseUrl}/api/auth/callback?code=invalid_code`, {
      maxRedirects: 0,
    });

    // 302 또는 307 리다이렉트 확인
    expect(response.status()).toBeGreaterThanOrEqual(300);
    expect(response.status()).toBeLessThan(400);
    
    const location = response.headers()['location'];
    expect(location).toContain('/auth?error=auth_callback_failed');
  });

  // 3. POST /api/auth/logout - 세션 없는 상태에서 로그아웃 시도
  test('POST /api/auth/logout should redirect to home even without session', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/auth/logout`, {
      maxRedirects: 0,
    });

    // 302 또는 307 리다이렉트 확인
    expect(response.status()).toBeGreaterThanOrEqual(300);
    expect(response.status()).toBeLessThan(400);

    const location = response.headers()['location'];
    // next/navigation의 redirect("/")는 현재 환경에 따라 전체 URL 혹은 "/" 일 수 있음
    expect(location === '/' || location.endsWith(baseUrl + '/')).toBeTruthy();
  });
});
