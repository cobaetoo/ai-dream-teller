import { test, expect } from '@playwright/test';

/**
 * PRD 8.1 - 지난 풀이 피드 E2E 테스트
 * 테스트 No.16 항목
 */
test.describe('지난 풀이 피드 (/feeds)', () => {
  /**
   * No.16: 피드 페이지 로드 및 더보기 테스트
   * 예상: 데이터 로딩 중 중복 요청 방지 및 UI 안정성 유지
   * 
   * [현재 상태] 자동 무한 스크롤 대신 '더보기 버튼'으로 구현됨.
   */
  test('No.16 - 피드 더보기 버튼 연타 및 광스크롤 안정성', async ({ page }) => {
    await page.goto('/feeds');
    await expect(page.locator('h1')).toContainText('꿈 해몽 피드');

    // 1. 초기 로드된 카드 개수 확인 (기본 8개)
    const initialCards = page.locator('article');
    const initialCount = await initialCards.count();
    expect(initialCount).toBe(8);

    // 2. 더보기 버튼 연타
    const loadMoreButton = page.locator('button:has-text("더 많은 꿈 이야기 보기")');
    
    // 3번 연속 클릭 시도 (현재는 API가 아닌 로컬 상태 변경이므로 즉시 반영됨)
    for (let i = 0; i < 3; i++) {
        await loadMoreButton.click({ noWaitAfter: true });
    }

    // 3. 카드 개수가 증가했는지 확인 (8 + 4*3 = 20개 예상)
    // 실제로는 클릭 시마다 Math.min으로 계산되어 정확히 증가해야 함
    const afterCount = await initialCards.count();
    expect(afterCount).toBeGreaterThan(initialCount);

    // 4. 광스크롤 (최상단 <-> 최하단 반복)
    // 스크롤 성능 및 레이아웃 유지 확인
    for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(50);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(50);
    }

    // 5. 스크롤 후에도 헤더 및 버튼 정상 상호작용
    await expect(page.locator('h1')).toBeVisible();
    
    // 6. 개별 피드 카드 클릭 시 상세 페이지 이동
    const firstFeedLink = page.locator('article a').first();
    await firstFeedLink.click();
    await page.waitForURL('**/dream-result/**', { timeout: 5000 });
    expect(page.url()).toContain('/dream-result/');
  });
});
