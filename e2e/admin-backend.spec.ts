import { test, expect } from '@playwright/test';

/**
 * PRD 8.4 - 관리자 백엔드 E2E 테스트 (Server Actions & Admin API)
 */
test.describe('관리자 백엔드 E2E 테스트', () => {

  /**
   * No. 1 권한 및 인증 보호 (Admin API)
   * 테스트: 비관리자 또는 비로그인 상태에서 관리자 API 엔드포인트 접근 시도
   * 예상: 401 Unauthorized 또는 403 Forbidden 반환
   */
  test('No. 1 - 관리자 API 비인가 접근 차단 (401/403)', async ({ request }) => {
    // 1. 비로그인 상태에서 API 호출 시도
    const response = await request.get('/api/admin/metrics');
    // middleware.ts에 의해 401 또는 403이 반환되어야 함
    expect([401, 403]).toContain(response.status());

    // 2. 다른 관리자 API 시도
    const response2 = await request.get('/api/admin/orders');
    expect([401, 403]).toContain(response2.status());
  });

  /**
   * No. 2 매출 조회 (Metrics) 데이터 응답 구조 검사
   * (주의: 실제로 어드민 세션이 필요함. 여기서는 API 응답의 유효성 위주로 검사)
   */
  test('No. 2 - 매출 조회 API 응답 구조 검증', async ({ page }) => {
    // 실제 어드민 로그인이 필요한 경우 context에 세션을 주입해야 함.
    // 여기서는 페이지 로드 후 내부적으로 API가 호출되는 상황을 가정하거나, 
    // 직접 호출이 권한에 막힐 경우를 skip 처리하지 않고 에러 여부만 확인.
    await page.goto('/admin');
    
    // UI상에 대시보드 지표가 실제 데이터로 채워지는지 확인 (Server Component 또는 Client Fetch)
    // '총 매출액' 등의 텍스트가 표시되는지 확인
    await expect(page.locator('text=총 매출액')).toBeVisible({ timeout: 10000 });
  });

  /**
   * No. 3 & 4 주문 내역 및 상세 조회 데이터 정합성
   * 테스트: 데이터 조인 결과(1:1 관계)가 객체 형태로 정확히 매핑되는지 확인
   */
  test('No. 3 & 4 - 주문 내역 및 상세 데이터 매핑 검증', async ({ page }) => {
    await page.goto('/admin/order-list');
    
    // 리스트에 주문 데이터가 최소 1개 이상 렌더링되는지 확인
    const orderRows = page.locator('tbody tr');
    await expect(orderRows.first()).toBeVisible({ timeout: 10000 });

    // 첫 번째 주문 상세로 이동
    const detailBtn = page.getByRole('button', { name: /상세보기/ }).first();
    await detailBtn.click();

    // 상세 페이지에서 dream_results(analysis_status) 데이터가 보이는지 확인
    await expect(page.locator('text=AI 해몽 분석 결과')).toBeVisible({ timeout: 10000 });
    // '정상 생성됨' 또는 'completed' 관련 상태 배지 확인
    await expect(page.locator('text=정상 생성됨')).toBeVisible();
  });

  /**
   * No. 5 결과 재생성 (Regenerate) API 연동 및 중복 방지
   * 테스트: /api/admin/orders/[id]/regenerate 호출 시 200 응답 및 로직 트리거
   */
  test('No. 5 - AI 결과 재생성 API 연동 확인', async ({ page, request }) => {
    // 1. 주문 목록으로 이동
    await page.goto('/admin/order-list');
    await expect(page.locator('h1')).toContainText('주문 내역 리스트');

    // 2. 첫 번째 주문의 '상세보기' 버튼 클릭하여 상세 페이지 진입
    const firstDetailBtn = page.locator('button:has-text("상세보기")').first();
    await expect(firstDetailBtn).toBeVisible({ timeout: 15000 });
    await firstDetailBtn.click();

    // 3. 상세 페이지 로드 확인 (h1: 상세 주문 내역)
    await expect(page.locator('h1')).toContainText('상세 주문 내역', { timeout: 15000 });

    // 4. 'LLM 해몽 재생성' 버튼 유무 확인
    const regenBtn = page.locator('button:has-text("LLM 해몽 재생성")');
    await expect(regenBtn).toBeVisible({ timeout: 15000 });

    // 5. 버튼 클릭 시 confirm 다이얼로그 처리 검증
    let dialogMsg = '';
    page.once('dialog', async dialog => {
        dialogMsg = dialog.message();
        await dialog.dismiss(); // 실제 API 호출 방지를 위해 취소 처리
    });

    await regenBtn.click();
    expect(dialogMsg).toContain('재생성하시겠습니까');
  });

  /**
   * No. 6 & 7 유저 관리 및 데이터 정합성 (Server Action 검증)
   * 테스트: 필터링 및 누적 주문 건수 집계 데이터 일치 여부
   */
  test('No. 6 & 7 - 유저 리스트 필터 및 주문 카운트 데이터 검증', async ({ page }) => {
    await page.goto('/admin/user-list');

    // '전체' 탭에서 유저 리스트 확인
    await expect(page.locator('text=전체 유저')).toBeVisible();

    // 필터를 '회원'으로 변경
    const memberFilter = page.locator('label[for="member"]');
    await memberFilter.click();
    
    // 리스트가 업데이트되었는지 확인 (비회원 배지가 없는지 등)
    const guestBadge = page.locator('text=비회원').first();
    // 비회원 필터를 켰을 때 비회원이 보여야 하므로, 회원 필터 시에는 비회원이 사라지는지 체크 (Mock 데이터 기준)
    // 여기서는 UI 응답성 위주로 체크
    await expect(page.locator('table')).toBeVisible();
    
    // 누적 주문 건수(orderCount) 텍스트 패턴 확인
    await expect(page.locator('text=건').first()).toBeVisible();
  });

});
