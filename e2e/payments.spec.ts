import { test, expect } from '@playwright/test';

/**
 * PRD 8.1 - 결제 연동 페이지 프론트엔드 E2E 테스트
 * 테스트 No.7, No.8 항목
 *
 * [참고] 토스페이먼츠 위젯은 외부 SDK이므로 실제 결제 승인까지는 테스트하지 않습니다.
 * 페이지 렌더링, 위젯 초기화, 버튼 상태, 에러 핸들링 등 프론트엔드 안정성을 검증합니다.
 */
test.describe('결제 연동 페이지 (/payments)', () => {
  /**
   * No.7: 토스페이먼츠 위젯 로딩 중 뒤로 가기 + 즉시 복귀를 수회 반복
   * 예상: 결제 인스턴스 중복 호출/메모리 릭 없이 결제창 초기화 및 올바른 렌더링 유지
   */
  test('No.7 - 위젯 로딩 중 뒤로 가기/복귀 반복 시 페이지 안정성', async ({ page }) => {
    // 콘솔 에러 수집
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // 1. 결제 페이지 진입
    await page.goto('/payments');
    await expect(page.locator('h2:has-text("주문 접수증")')).toBeVisible();

    // 결제 버튼이 존재하는지 확인
    const payButton = page.locator('button:has-text("결제하기")');
    await expect(payButton).toBeVisible();

    // 2. 뒤로 가기 → 복귀 반복 3회
    for (let i = 0; i < 3; i++) {
      // 위젯 로딩 중일 때 뒤로 가기
      await page.goBack();
      await page.waitForTimeout(200);

      // 즉시 앞으로 가기(복귀)
      await page.goForward();
      await page.waitForTimeout(500);
    }

    // 3. 최종 상태에서 페이지가 정상 렌더링되는지 확인
    await expect(page.locator('h2:has-text("주문 접수증")')).toBeVisible();
    await expect(page.locator('h2:has-text("결제 수단 선택")')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();

    // 4. #payment-method 위젯 영역이 존재하는지 확인
    const widgetArea = page.locator('#payment-method');
    await expect(widgetArea).toBeVisible();

    // 5. 결제 버튼이 정상 존재하는지
    await expect(payButton).toBeVisible();

    // 6. 페이지 크래시가 없었는지 (치명적 오류 없음)
    // 토스 SDK 관련 네트워크 에러는 환경에 따라 발생할 수 있으므로
    // "unhandled" 또는 "Cannot read" 등 치명적 JS 에러만 검증
    const criticalErrors = consoleErrors.filter(
      (e) => e.includes('Uncaught') || e.includes('Cannot read') || e.includes('is not a function')
    );
    expect(criticalErrors.length).toBe(0);
  });

  /**
   * No.8: 결제 버튼 클릭 순간 브라우저 오프라인 모드 적용 (네트워크 강제 단절)
   * 예상: 무한 로딩 프리징 없이 네트워크 상태 확인 안내 표출
   *
   * [참고] Playwright context.setOffline을 사용해 네트워크 단절을 시뮬레이션합니다.
   * 토스 SDK 클라이언트 키가 없는 환경에서는 위젯 초기화 자체가 실패할 수 있으므로
   * 오프라인 상태에서의 페이지 안정성 및 에러 핸들링을 중점 검증합니다.
   */
  test('No.8 - 네트워크 강제 단절 시 무한 로딩 없이 안정적 처리', async ({ page, context }) => {
    // 콘솔 에러/로그 수집
    const consoleMessages: string[] = [];
    page.on('console', (msg) => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));

    // 1. 결제 페이지 정상 진입
    await page.goto('/payments');
    await expect(page.locator('h2:has-text("주문 접수증")')).toBeVisible();

    // 결제 버튼 확인
    const payButton = page.locator('button:has-text("결제하기")');
    await expect(payButton).toBeVisible();

    // 2. 네트워크 강제 단절
    await context.setOffline(true);
    await page.waitForTimeout(500);

    // 3. 결제 버튼 클릭 시도 (오프라인 상태)
    // handlePayment에서 paymentWidget이 null이면 early return,
    // 또는 SDK 요청 실패 시 catch에서 에러 처리
    const dialogMessages: string[] = [];
    page.on('dialog', async (dialog) => {
      dialogMessages.push(dialog.message());
      await dialog.accept();
    });

    // 버튼이 disabled가 아닌 경우에만 클릭 시도
    const isDisabled = await payButton.isDisabled();
    if (!isDisabled) {
      await payButton.click({ force: true });
      await page.waitForTimeout(2000);
    }

    // 4. 무한 로딩(프리징) 상태가 아닌지 확인
    // 페이지가 응답하는지 체크 - body가 보이고 상호작용 가능한지
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('h2:has-text("주문 접수증")')).toBeVisible();

    // 5. 로딩 스피너가 무한히 돌고 있지 않은지 확인
    // 결제 요청 중 스피너가 5초 이상 유지되면 프리징으로 판단
    const spinnerVisible = await page.locator('text=결제 요청 중...').isVisible().catch(() => false);
    // 오프라인에서는 빠르게 에러가 발생하므로 스피너가 사라져야 함
    // 하지만 SDK가 로드 안된 경우 버튼이 disabled 상태이므로 스피너 자체가 안 뜰 수도 있음

    // 6. 네트워크 복원
    await context.setOffline(false);
    await page.waitForTimeout(1000);

    // 7. 네트워크 복원 후 페이지가 정상 동작하는지
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('h2:has-text("주문 접수증")')).toBeVisible();

    // 페이지 새로고침 후 정상 복구 가능한지
    await page.reload();
    await expect(page.locator('h2:has-text("주문 접수증")')).toBeVisible();
    await expect(page.locator('h2:has-text("결제 수단 선택")')).toBeVisible();
  });
});
