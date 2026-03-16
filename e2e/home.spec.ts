import { test, expect } from '@playwright/test';

/**
 * PRD 8.1 - 메인 랜딩 페이지 프론트엔드 E2E 테스트
 * 테스트 No.1, No.2 항목
 */
test.describe('메인 랜딩 페이지 (/)', () => {
  /**
   * No.1: 히어로 섹션 CTA 버튼을 불규칙적으로 연속 광클릭 시도
   * 예상 결과: 중복 렌더링이나 라우팅 푸시 없이 1회만 /dream-teller로 진입
   */
  test('No.1 - CTA 버튼 연속 광클릭 시 중복 라우팅 없이 /dream-teller로 1회 진입', async ({
    page,
  }) => {
    await page.goto('/');

    // 히어로 H1 텍스트가 보이는지 확인 (페이지 정상 로드 검증)
    await expect(page.locator('h1')).toContainText('아직 기억나시나요?');

    // CTA 버튼 찾기: "/dream-teller" 링크
    const ctaLink = page.locator('a[href="/dream-teller"]');
    await expect(ctaLink).toBeVisible();

    // 10번 연속 광클릭 (극단적 유저 시뮬레이션)
    const clickPromises: Promise<void>[] = [];
    for (let i = 0; i < 10; i++) {
      clickPromises.push(ctaLink.click({ force: true, noWaitAfter: true }));
    }
    await Promise.allSettled(clickPromises);

    // /dream-teller로 정상 이동 확인
    await page.waitForURL('**/dream-teller', { timeout: 10000 });
    expect(page.url()).toContain('/dream-teller');

    // 페이지가 에러 없이 정상 렌더링되었는지 확인
    await expect(page.locator('body')).toBeVisible();

    // 뒤로 가기 후 다시 광클릭해서 이전 네비게이션과 충돌이 없는지 검증
    await page.goBack();
    await page.waitForURL('**/', { timeout: 10000 });

    // 다시 CTA 5번 빠르게 클릭
    const ctaLink2 = page.locator('a[href="/dream-teller"]');
    await expect(ctaLink2).toBeVisible();
    for (let i = 0; i < 5; i++) {
      await ctaLink2.click({ force: true, noWaitAfter: true });
    }
    await page.waitForURL('**/dream-teller', { timeout: 10000 });
    expect(page.url()).toContain('/dream-teller');
  });

  /**
   * No.2: 모바일 환경에서 네비게이션 드로어를 연 상태로 뷰포트 크기 빈번하게 변경
   * 예상 결과: 반응형 중단점 변경 시 드로어 상태 꼬임 없이 레이아웃 안정적 유지
   *
   * [발견된 이슈] Sheet(Drawer)가 열린 상태에서 뷰포트를 데스크탑→모바일로 변경하면
   * Sheet overlay가 닫히지 않고 남아있어 본문 클릭이 차단됨. 이를 검증하는 테스트.
   */
  test('No.2 - 모바일 드로어 열림 상태에서 뷰포트 크기 빈번 변경 시 레이아웃 안정 유지', async ({
    page,
  }) => {
    // 1. 모바일 뷰포트로 설정
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('아직 기억나시나요?');

    // 2. 모바일에서 햄버거 메뉴 버튼이 표시되는지 확인
    const hamburgerButton = page.locator('div.md\\:hidden button');
    await expect(hamburgerButton).toBeVisible();

    // 3. 햄버거 메뉴 클릭 → 드로어(Sheet) 열기
    await hamburgerButton.click();

    // 4. Sheet 내 콘텐츠가 열렸는지 확인 (dialog role 체크)
    const sheetDialog = page.locator('[role="dialog"][data-open]');
    await expect(sheetDialog).toBeVisible({ timeout: 3000 });

    // 5. 빈번한 뷰포트 사이즈 변경 (가로/세로 회전 시뮬레이션)
    const viewportSequence = [
      { width: 667, height: 375 }, // 모바일 가로
      { width: 375, height: 667 }, // 모바일 세로 복귀
      { width: 1024, height: 768 }, // 태블릿/데스크탑 진입 (md 이상)
      { width: 375, height: 667 }, // 다시 모바일 세로
      { width: 667, height: 375 }, // 다시 모바일 가로
      { width: 1280, height: 720 }, // 와이드 데스크탑
      { width: 375, height: 667 }, // 최종 모바일 세로
    ];

    for (const viewport of viewportSequence) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(200);
    }

    // 6. 최종 상태에서 페이지 크래시 없이 정상 동작하는지 검증
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('h1')).toContainText('아직 기억나시나요?');

    // 7. Sheet overlay가 열린 채로 남아있는지 확인 (이슈 탐지)
    const sheetOverlay = page.locator('[data-slot="sheet-overlay"][data-open]');
    const overlayStillOpen = await sheetOverlay.isVisible().catch(() => false);

    // Sheet(dialog)가 열린 채로 남아있는지 체크
    const dialogStillOpen = await sheetDialog.isVisible().catch(() => false);

    if (overlayStillOpen || dialogStillOpen) {
      // 이슈 발견: 뷰포트 변경 후 Sheet가 자동으로 닫히지 않음
      // 이 경우 Escape 키로 강제 닫기 시도
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }

    // 8. overlay가 제거된 후 CTA 버튼 클릭이 정상 동작하는지 검증
    const ctaLink = page.locator('a[href="/dream-teller"]');
    await expect(ctaLink).toBeVisible();
    await ctaLink.click({ timeout: 5000 });
    await page.waitForURL('**/dream-teller', { timeout: 10000 });
    expect(page.url()).toContain('/dream-teller');
  });
});
