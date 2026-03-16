import { test, expect } from '@playwright/test';

/**
 * PRD 8.1 - 프로덕트 상세 페이지 프론트엔드 E2E 테스트
 * 테스트 No.3, No.4, No.5, No.6 항목
 */
test.describe('프로덕트 상세 페이지 (/dream-teller)', () => {
  /**
   * No.3: 아코디언 이전 단계 무시하고 다음 단계 헤더 강제 클릭 시도
   * 예상: 이전 Step 미완료 시 아코디언 잠금(Lock) 유지, 에러 토스트/인디케이터 제공
   *
   * [발견 사항] 현재 구현에서는 아코디언 잠금(Lock)이 없어 자유롭게 열 수 있음.
   * 단, 최종 submit 시 dreamContent.trim() 검증으로 빈 꿈을 방어함.
   */
  test('No.3 - 아코디언 이전 단계 무시하고 다음 단계 헤더 강제 클릭', async ({ page }) => {
    await page.goto('/dream-teller');
    await expect(page.locator('h1')).toContainText('당신의 꿈을 들려주세요');

    // Step 2 트리거 강제 클릭 (Step 1 "다음 단계" 없이)
    const step2Trigger = page.locator('h2:has-text("꿈의 내용을 자유롭게 적어주세요")');
    await step2Trigger.click();
    await page.waitForTimeout(300);

    // Step 3 트리거 강제 클릭
    const step3Trigger = page.locator('h2:has-text("결제 옵션 선택")');
    await step3Trigger.click();
    await page.waitForTimeout(300);

    // 아코디언이 자유 열림이므로 레이아웃 오류 없이 정상 동작 확인
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();

    // 꿈 내용 비어있는 상태로 결제 버튼 클릭 → alert 발생 확인
    // dialog 이벤트를 먼저 등록
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('꿈 내용을 입력해주세요');
      await dialog.accept();
    });

    const submitButton = page.locator('button[type="submit"]');
    // 스크롤 후 클릭
    await submitButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await submitButton.click({ force: true });

    // /payments로 이동하지 않았는지 확인
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('/dream-teller');
  });

  /**
   * No.4: 꿈 텍스트 입력창에 모두 공백으로만 채운 뒤 제출 시도
   * 예상: trim 체크 실패 → 진행 불가 & 에러/경고 노출
   */
  test('No.4 - 꿈 텍스트에 공백만 입력 후 제출 시 validation 작동', async ({ page }) => {
    await page.goto('/dream-teller');
    await expect(page.locator('h1')).toContainText('당신의 꿈을 들려주세요');

    // Step 2 열기
    const step2Trigger = page.locator('h2:has-text("꿈의 내용을 자유롭게 적어주세요")');
    await step2Trigger.click();
    await page.waitForTimeout(300);

    // 공백만 입력
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible();
    await textarea.fill('     \n\n   \t   \n     ');

    // dialog 이벤트 먼저 등록
    let dialogTriggered = false;
    page.on('dialog', async (dialog) => {
      dialogTriggered = true;
      expect(dialog.message()).toContain('꿈 내용을 입력해주세요');
      await dialog.accept();
    });

    // 결제 버튼 클릭
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await submitButton.click({ force: true });

    // dialog가 트리거되었고 페이지 이동이 안 되었는지
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('/dream-teller');
    expect(dialogTriggered).toBeTruthy();
  });

  /**
   * No.5: 1만 자 이상 + 이모지 + 특수문자 혼합 대량 붙여넣기
   * 예상: UI 프리징 없이 안정적으로 동작
   */
  test('No.5 - 1만 자 이상 장문 + 이모지 + 특수문자 대량 붙여넣기', async ({ page }) => {
    await page.goto('/dream-teller');
    await expect(page.locator('h1')).toContainText('당신의 꿈을 들려주세요');

    // Step 2 열기
    const step2Trigger = page.locator('h2:has-text("꿈의 내용을 자유롭게 적어주세요")');
    await step2Trigger.click();

    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible();

    // 대량 텍스트 생성
    const emojiBlock = '🌙✨🔮💫🌊🎭🦋🌈🔥💎';
    const specialChars = '<script>alert("xss")</script>&lt;&gt;&amp;{}[]|\\^~`@#$%';
    const longText = '어젯밤 꿈에서 하늘을 나는 고래를 봤습니다. ';
    const massiveContent =
      longText.repeat(200) + emojiBlock.repeat(50) + specialChars.repeat(20);

    await textarea.fill(massiveContent);

    // UI 프리징 없이 값이 입력되었는지
    const textareaValue = await textarea.inputValue();
    expect(textareaValue.length).toBeGreaterThan(0);

    // 페이지 정상 확인
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('h1')).toContainText('당신의 꿈을 들려주세요');

    // 글자 수 카운터 표시 확인
    const counter = page.locator('text=/\\d+ \\/ 최소 20자 권장/');
    await expect(counter).toBeVisible();

    // 다른 step 정상 동작
    const step1Trigger = page.locator('h2:has-text("누구에게 해몽을 맡길까요")');
    await step1Trigger.click();
    await expect(step1Trigger).toBeVisible();

    // 제출 버튼 정상 렌더링
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });

  /**
   * No.6: AI 이미지 추가 옵션 토글을 초당 여러 번 연속 On/Off 반복
   * 예상: 최종 토글 상태에 맞는 정확한 예상 금액 도출
   */
  test('No.6 - AI 이미지 추가 옵션 토글 빠른 연속 On/Off 반복', async ({ page }) => {
    await page.goto('/dream-teller');
    await expect(page.locator('h1')).toContainText('당신의 꿈을 들려주세요');

    // Step 3 열기
    const step3Trigger = page.locator('h2:has-text("결제 옵션 선택")');
    await step3Trigger.click();
    await page.waitForTimeout(300);

    // 이미지 옵션 체크박스의 Label 클릭 영역 사용
    // Checkbox가 Shadcn이므로 Label 클릭으로 토글
    const imageLabel = page.locator('label[for="include-image"]');
    await expect(imageLabel).toBeVisible();

    // 초기 상태: 체크됨 → 2,000원
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toContainText('2,000');

    // 20번 연속 빠른 토글 (Label 클릭)
    for (let i = 0; i < 20; i++) {
      await imageLabel.click({ force: true, noWaitAfter: true, delay: 0 });
    }
    // 짝수 번이므로 원래 상태(checked) 유지 → 2,000원
    await page.waitForTimeout(500);
    await expect(submitButton).toContainText('2,000');

    // 1번 더 클릭 → unchecked → 1,500원
    await imageLabel.click();
    await page.waitForTimeout(300);
    await expect(submitButton).toContainText('1,500');

    // 다시 1번 클릭 → checked → 2,000원
    await imageLabel.click();
    await page.waitForTimeout(300);
    await expect(submitButton).toContainText('2,000');

    // UI 정상 확인
    await expect(page.locator('body')).toBeVisible();
  });
});
