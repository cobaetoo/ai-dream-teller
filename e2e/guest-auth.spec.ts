import { test, expect } from '@playwright/test';

/**
 * PRD 8.1 - 비회원 로그인 및 주문 조회 E2E 테스트
 * 테스트 No.14, No.15 항목
 */
test.describe('비회원 인증 및 조회 (/guest-login, /guest-check)', () => {
  /**
   * No.14: 비회원 로그인 입력 필드 이상 값 및 연타 테스트
   * 예상: 전화번호 포맷터 작동, 중복 API 호출 방어
   */
  test('No.14 - 비회원 로그인 필드 유효성 및 버튼 연타', async ({ page }) => {
    await page.goto('/guest-login');
    await expect(page.locator('h1')).toContainText('비회원 주문 조회');

    const phoneInput = page.locator('#phone');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('button[type="submit"]');

    // 1. 전화번호 필드 숫자 이외 문자 입력 시도
    // maxLength=13 제한이 있으므로 노이즈를 포함해 13자 이내로 입력하여 필터링 확인
    // "01012345678"은 11자. 앞에 노이즈 "!" 붙여서 테스트
    await phoneInput.fill('!01012345678');
    await expect(phoneInput).toHaveValue('010-1234-5678');

    // 2. 비밀번호 필드 4자리 초과 입력 시도
    await passwordInput.fill('12345678');
    await expect(passwordInput).toHaveValue('1234'); // maxLength={4}

    // 3. 버튼 광클릭 연타 (로그인 요청 중 버튼이 disabled 되는지 확인)
    // password가 채워진 상태에서 submit
    await submitButton.click({ noWaitAfter: true });
    
    // 버튼이 disabled 상태인지 확인 (isLoading)
    // note: 핸들러 내부에서 setIsLoading(true)가 비동기로 작동하므로 순식간에 지나갈 수 있음
    // 하지만 1000ms 딜레이가 있으므로 충분히 감지 가능
    await expect(submitButton).toBeDisabled();
    
    // 최종적으로 /guest-check로 이동하는지 확인
    await page.waitForURL('**/guest-check', { timeout: 5000 });
    expect(page.url()).toContain('/guest-check');
  });

  /**
   * No.15: 비회원 주문 내역 로드 및 스크롤 안정성
   * 예상: "내역 더보기" 클릭 및 스크롤 시 UI 안정 유지
   */
  test('No.15 - 주문 내역 로드 및 광스크롤 안정성', async ({ page }) => {
    await page.goto('/guest-check');
    await expect(page.locator('h1')).toContainText('비회원 주문 내역');

    const historyItems = page.locator('a[href^="/dream-result/"]');
    const count = await historyItems.count();
    expect(count).toBeGreaterThan(0);

    // 광스크롤
    for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(50);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(50);
    }

    await expect(page.locator('h1')).toBeVisible();
    await expect(historyItems.first()).toBeVisible();

    await historyItems.first().click();
    await page.waitForURL('**/dream-result/**', { timeout: 5000 });
    expect(page.url()).toContain('/dream-result/');
  });
});
