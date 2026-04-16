# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: MindPrint (AI 성격 분석 & MBTI 심층 리포트)
- **목표**: 질문 응답 또는 자유 글을 기반으로 AI가 성격을 심층 분석하고 레이더 차트로 시각화하는 수익형 웹 서비스.
- **핵심 가치 1**: MBTI 유형 추정과 5대 성격 차원(개방성/성실성/외향성/우호성/신경증)을 점수화하여 객관적 자기 이해 지원.
- **핵심 가치 2**: 친구와의 비교 기능과 SNS 공유 카드로 바이럴 확산.

## 2. 타겟 유저 (Target Audience)

- 자기 이해와 성격 분석에 관심 있는 20~30대.
- MBTI, 성격 테스트를 즐기는 유저.
- 결과를 SNS에 공유하고 친구와 비교하고 싶은 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk
- **Charts**: Recharts

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Modern, Psychological, Insightful.
- **Colors**: Indigo, Teal, Deep Purple.
- **Interactions**: 레이더 차트 애니메이션, 질문 슬라이드, 비교 오버레이.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout

1. **상단 네비게이션 바**: 홈 로고, 메뉴, 로그인/마이페이지.
2. **Body**: 각 페이지 내용.
3. **Footer**: 사업자 정보, 이용약관, 개인정보처리방침, 문의하기.
4. **Head & Meta**: SEO, Open Graph, GA4.

### 5.2. Page Details

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "AI가 읽어내는 나의 진짜 성격, 지금 확인해 보세요." CTA ("성격 분석 시작").
   - **Feature Section**: MBTI 추정, 5대 성격 차원, 심층 리포트, 친구 비교.
   - **Social Proof**: "분석 결과가 너무 정확해서 친구들한테 다 공유했어요" 등 후기.
   - **분석 방식 선택 카드**: 질문 응답 (빠른 분석) / 자유 글 (심층 분석).

2. **분석 방식 선택 (`/analysis-setup`)**
   - **방식 1 - 질문 응답**: 20개 성격 질문 (Likert 5점 척도).
   - **방식 2 - 자유 글**: 최소 500자 이상 (일기, 자기소개, 최근 고민 등).
   - **결제**: 기본/프리미엄 플랜 선택 후 토스페이먼츠.

3. **질문 응답 페이지 (`/analysis-questions`)**
   - 20개 질문 카드 슬라이드.
   - 각 질문: "새로운 사람들과 모임에 갔을 때..." → 1(전혀 아니다) ~ 5(매우 그렇다).
   - 진행 바: 현재/전체.
   - **Big 5 매핑 방법**:
     - 20개 질문은 각 Big 5 차원당 4문항으로 구성
     - 각 문항의 응답(1-5)을 차원별로 합산 후 0-100 스케일로 정규화
     - 역문항(Negative-worded)은 점수를 역산 (6 - 응답값)
     - 매핑 예시:
       - 개방성: Q1(상상력), Q6(미적감), Q11(호기심), Q16(다양성)
       - 성실성: Q2(조직성), Q7(책임감), Q12(성실성), Q17(규율)
       - 외향성: Q3(사교성), Q8(활동성), Q13(주도성), Q18(긍정성)
       - 우호성: Q4(공감), Q9(협력), Q14(신뢰), Q19(이타성)
       - 신경증: Q5(불안), Q10(우울), Q15(충동성), Q20(취약성)

4. **자유 글 작성 (`/analysis-writing`)**
   - 텍스트 에어리어 (최소 500자, 최대 5,000자).
   - 글자 수 카운터.
   - **최소 글자 검증**: 500자 미만 제출 시 "좀 더 자세히 적어주시면 더 정확한 분석이 가능합니다. (최소 500자)" 안내
   - **최대 글자 제한**: 5,000자 초과 시 자동 잘림
   - **부적절한 내용 감지**: 욕설, 혐오 표현 등 감지 시 "분석에 적합하지 않은 내용이 포함되어 있습니다." 안내
   - 가이드: "최근 일주일간 느낀 감정, 중요한 결정을 내린 방식, 스트레스 받을 때의 대처 등을 자유롭게 적어보세요."

5. **분석 결과 (`/analysis-result/[id]`)**
   - **MBTI 유형**: 추정 MBTI + 설명.
   - **5대 성격 차원 레이더 차트**: 개방성, 성실성, 외향성, 우호성, 신경증 (Recharts Radar).
   - **세부 특성**: 10개+ 하위 특성 점수 (막대 그래프).
   - **심층 분석**: 강점, 약점, 가치관, 스트레스 대응, 커뮤니케이션 스타일.
   - **추천 직업**: 성격에 맞는 직업 TOP 5.
   - **어울리는 유형**: 관계 호환성 분석.
   - **프리미엄**: 심층 리포트 + 연간 성장 트래킹 + 커리어 가이드.
   - **공유 카드**: OG 이미지 생성 (SNS 공유).
   - **친구 비교 링크**: "친구 결과와 비교하기" 공유 링크 생성.

6. **친구 비교 (`/compare`)**
   - 내 결과 + 친구 결과 레이더 차트 오버레이.
   - 차이점 분석 텍스트.

7. **유저 마이페이지 (`/my-page`)**: 분석 히스토리, 연간 트래킹 (프리미엄), 프로필 수정.
8. **비회원 로그인 (`/guest-login`)**, **비회원 주문 조회 (`/guest-check`)**, **회원 로그인 (`/auth`)**.

### 5.3. E2E Test Checklist

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Landing** | `Home (/)` | CTA -> `/analysis-setup` | ✅ Pass |
| **Auth** | `Guest Login` | 비회원 로그인 | ✅ Pass |
| **Setup** | `analysis-setup` | 방식 선택 (질문/글) | ✅ Pass |
| **Questions** | `analysis-questions` | 20개 질문 응답, 진행 바 | ✅ Pass |
| **Writing** | `analysis-writing` | 자유 글 작성, 글자 수 카운터 | ✅ Pass |
| **Payment** | `payments` | 토스 위젯, 결제 성공 | ✅ Pass |
| **Result** | `analysis-result/[id]` | MBTI, 레이더 차트, 심층 분석 | ✅ Pass |
| **Compare** | `compare` | 친구 결과 오버레이 | ✅ Pass |
| **My Page** | `my-page` | 히스토리, 트래킹 | ✅ Pass |

### 5.4. Guest Checkout 구현 리스트

| 구분 | 주요 기능 | 구현 여부 | E2E 테스트 |
|---|---|---|---|
| **Frontend** | 비회원 폼 | ✅ 완료 | ✅ 완료 |
| **Backend** | Guest 분기 | ✅ 완료 | ✅ 완료 |
| **Backend** | Bcrypt 해싱 | ✅ 완료 | ✅ 완료 |
| **Database** | RLS 설정 | ✅ 완료 | ✅ 완료 |

## 6. Admin UX Flow & Layout

1. **대시보드 (`/admin`)**: 매출, 가입자, MBTI 분포 통계, 평균 차원 점수.
2. **주문 내역 (`/admin/order-list`)**: 주문 테이블.
3. **주문 상세 (`/admin/order-list/[id]`)**: 입력 데이터, 분석 결과, 재시도/취소.
4. **유저 리스트 (`/admin/user-list`)**: 회원/비회원.
5. **분석 통계 (`/admin/analytics`)**: MBTI 분포, 차원 평균, 직업 추천 인기.

### Admin API

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 통계 | Admin |
| **GET** | `/api/admin/orders` | 주문 | Admin |
| **GET** | `/api/admin/orders/[id]` | 상세 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | 재분석 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 취소 | Admin |
| **GET** | `/api/admin/users` | 회원 | Admin |
| **GET** | `/api/admin/analytics/mbti-distribution` | MBTI 분포 | Admin |
| **GET** | `/api/admin/analytics/dimension-averages` | 차원 평균 | Admin |

## 7. 운영 및 정책

- AI 분석 지연/오류 시 자동 재시도(1회). 최종 실패 시 결제 자동 취소.
- 비회원 데이터 30일 보관 후 삭제.
- 성격 분석은 참고용이며 전문 심리 진단이 아님을 명시.

### 7.3. 에러 처리 상세
- **AI 생성 재시도**: exponential backoff (1초 → 2초 → 4초), 최대 3회, 타임아웃 30초
- **최종 실패 시**: 에러 코드와 함께 사용자 안내, Toss Cancel API 호출로 결제 자동 취소
- **관리자 알림**: 실패 건 Slack webhook 또는 이메일 통지

### 7.4. 관리자 감사 로그
- Admin 활동 로깅: 재시도, 취소, 데이터 수정 시 `admin_audit_logs` 테이블에 기록
- 로그 보관 기간: 1년
- 로그 항목: admin_id, action, target_id, timestamp, ip_address

### 7.5. 데이터 백업
- Supabase 자동 일일 백업 (Pro 플랜 이상)
- 장애 복구 목표: RPO 24시간, RTO 4시간

### 7.6. 심리 분석 특수 정책
- **전문 진단 아님 명시**: 모든 분석 결과 페이지 상단에 "본 분석은 AI 기반 참고 자료이며, 임상 심리 전문가의 진단을 대체하지 않습니다." 필수 표시
- **자유 글 원문 보관**: 분석 완료 후 7일 내 원문 자동 삭제 (분석 결과만 보관)
- **공유 토큰 만료**: 비교 공유 링크는 30일 후 자동 만료
- **미성년자 주의**: 만 14세 미만은 보호자 동의 필요

## 8. API Specification

### 공통 API 규약

**페이지네이션**: cursor 기반 (cursor, limit 기본 20/최대 100, 응답에 next_cursor)

**에러 응답**: `{ error: string, code: string, status: number }`

**주요 에러 코드**: INVALID_INPUT(400), UNAUTHORIZED(401), FORBIDDEN(403), NOT_FOUND(404), RATE_LIMITED(429), AI_GENERATION_FAILED(502), PAYMENT_FAILED(402)

### 8.1. Auth & Users

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/auth/guest` | 비회원 로그인 | Public |
| **POST** | `/api/auth/logout` | 로그아웃 | User, Guest |
| **GET** | `/api/users/me` | 내 정보 | User |
| **PATCH** | `/api/users/me` | 프로필 수정 | User |

### 8.2. Analyses (성격 분석)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/analyses` | 분석 요청 (질문 응답 또는 자유 글) | User, Guest |
| **POST** | `/api/analyses/generate` | 내부 AI 분석 | Internal |
| **GET** | `/api/analyses` | 내 분석 목록 | User |
| **GET** | `/api/analyses/[id]` | 분석 결과 상세 | Owner, Shared |

### 8.3. Comparisons (친구 비교)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/analyses/[id]/share` | 비교 공유 링크 생성 | Owner |
| **GET** | `/api/comparisons/[token]` | 비교 데이터 조회 | Public |
| **POST** | `/api/comparisons/[token]/submit` | 친구 분석 결과 제출 | Public |

> **공유 토큰 검증**: 만료된 토큰으로 접근 시 410 Gone 응답. 유효하지 않은 토큰은 404.

### 8.4. Payments

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 결제 승인 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 결제 상태 | Owner |
| **POST** | `/api/webhooks/toss` | 웹훅 | Public (IP 제한) |

## 9. DB Schema Specification (Supabase)

### Entity Map

**1. users, public.profiles** (동일)

**2. public.guests** (동일)

**3. public.analyses (성격 분석)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | Null | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `input_type` | `text` | **NN** | 'QUESTIONS', 'WRITING' |
| `question_answers` | `jsonb` | Null | 질문 응답 배열 [{question_id, score}] |
| `writing_text` | `text` | Null | 자유 글 원문 |
| `mbti_type` | `text` | Null | 추정 MBTI ('INTJ', 'ENFP', ...) |
| `status` | `text` | **NN** | `PENDING`, `COMPLETED`, `FAILED` |
| `share_token` | `text` | Null | 비교 공유용 토큰 (Unique) |
| `og_image_url` | `text` | Null | 공유 카드 이미지 URL |
| `share_token_expires_at` | `timestamptz` | Null | 공유 토큰 만료 (기본 30일) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**4. public.personality_scores (성격 차원 점수)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `analysis_id` | `uuid` | **NN** | FK `analyses.id` (Unique) |
| `openness` | `integer` | Null | 개방성 (0-100) |
| `conscientiousness` | `integer` | Null | 성실성 (0-100) |
| `extraversion` | `integer` | Null | 외향성 (0-100) |
| `agreeableness` | `integer` | Null | 우호성 (0-100) |
| `neuroticism` | `integer` | Null | 신경증 (0-100) |
| `detail_scores` | `jsonb` | Null | 하위 특성 점수 (10개+) |
| `strengths` | `jsonb` | Null | 강점 배열 |
| `weaknesses` | `jsonb` | Null | 약점 배열 |
| `values` | `jsonb` | Null | 가치관 분석 |
| `stress_response` | `text` | Null | 스트레스 대응 |
| `communication_style` | `text` | Null | 커뮤니케이션 스타일 |
| `recommended_careers` | `jsonb` | Null | 추천 직업 TOP 5 |
| `compatible_types` | `jsonb` | Null | 어울리는 MBTI 유형 |
| `premium_report` | `jsonb` | Null | 심층 리포트 (프리미엄) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**5. public.comparisons (비교 데이터)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `analysis_a_id` | `uuid` | **NN** | FK `analyses.id` |
| `analysis_b_id` | `uuid` | Null | FK `analyses.id` (친구 제출 후) |
| `share_token` | `text` | **NN** | 공유 토큰 (Unique) |
| `comparison_result` | `jsonb` | Null | 비교 분석 결과 |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**6. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `analysis_id` | `uuid` | **NN** | FK `analyses.id` (Unique) |
| `amount` | `integer` | **NN** | 결제 금액 |
| `payment_key` | `text` | Null | Toss Payment Key |
| `status` | `text` | **NN** | `READY`, `DONE`, `CANCELED` |
| `approved_at` | `timestamptz` | Null | 결제 승인 시각 |
| `created_at` | `timestamptz` | **NN** | 주문 생성 시각 |

### RLS 정책 (Row Level Security)

```sql
-- profiles: 본인만 조회/수정
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- guests: 본인만 조회
CREATE POLICY "Guests can view own data" ON guests FOR SELECT USING (id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- analyses: 소유자만 접근
CREATE POLICY "Owner full access" ON analyses FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM analyses WHERE analyses.id = orders.analysis_id AND (analyses.user_id = auth.uid() OR analyses.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| analyses | `(user_id, status)` | 사용자별 목록 조회 |
| analyses | `(guest_id, status)` | 비회원 목록 조회 |
| orders | `(created_at DESC)` | Admin 주문 리스트 |

### Connection Pooling
- Supabase Supavisor (Transaction Mode), Pool size: 20

## 10. API E2E Test Scenarios

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-A-01 | POST | `/api/auth/guest` | 비회원 로그인 | ✅ Pass |
| API-AN-01 | POST | `/api/analyses` | 분석 요청 (질문) | ✅ Pass |
| API-AN-02 | POST | `/api/analyses` | 분석 요청 (자유 글) | ✅ Pass |
| API-AN-03 | POST | `/api/analyses` | 자유 글 최소 500자 미만 | ✅ Pass |
| API-AN-04 | POST | `/api/analyses/generate` | AI 분석 | ✅ Pass |
| API-AN-05 | GET | `/api/analyses/[id]` | 결과 조회 | ✅ Pass |
| API-CM-01 | POST | `/api/analyses/[id]/share` | 공유 링크 생성 | ✅ Pass |
| API-CM-02 | GET | `/api/comparisons/[token]` | 비교 데이터 | ✅ Pass |
| API-CM-03 | POST | `/api/comparisons/[token]/submit` | 친구 결과 제출 | ✅ Pass |
| API-P-01 | POST | `/api/payments/confirm` | 결제 성공 | ✅ Pass |
| API-AD-01 | GET | `/api/admin/stats` | 통계 | ✅ Pass |
| API-AD-02 | GET | `/api/admin/analytics/mbti-distribution` | MBTI 분포 | ✅ Pass |
| API-AD-03 | POST | `/api/admin/orders/[id]/retry` | 재분석 | ✅ Pass |
| API-AD-04 | POST | `/api/admin/orders/[id]/cancel` | 취소 | ✅ Pass |

## 11. Security Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **IAM** | RLS | 비인가 접근 차단 | ✅ Pass |
| **App** | Internal API | generate 외부 호출 차단 | ✅ Pass |
| **App** | 공유 토큰 | 만료/유효하지 않은 토큰 시 404 | ✅ Pass |
| **Input** | Prompt Injection | 악의적 글 필터링 | ✅ Pass |
| **Payment** | 금액 위변조 | 조작 시 400 | ✅ Pass |
| **Infra** | Rate Limiting | 초과 시 429 | ✅ Pass |

**Prompt Injection 방어 구현**:
- 입력 글자 수 서버 사이드 검증
- 특수 문자 및 SQL/HTML 패턴 정규식 필터링
- AI 시스템 프롬프트와 사용자 입력을 별도 메시지로 분리
- AI 응답 후처리: 민감 정보 패턴 감지 및 마스킹

**Rate Limiting 구체화**:
- 비회원 로그인: 5회/분 per IP
- AI 생성 요청: 3회/분 per user
- API 전체: 100회/분 per IP
- 구현: Next.js middleware + Upstash Redis
- 초과 시: 429 + Retry-After 헤더

**Internal API Protection**:
- `x-internal-request` 커스텀 헤더 + 서버 환경변수(`INTERNAL_SECRET`) 검증

**CSRF 방어**:
- SameSite=Strict 쿠키 설정
- 상태 변경 API에 커스텀 헤더 검증

**Admin 인증**:
- 미들웨어에서 `profiles.role = 'ADMIN'` 검증
- Admin 세션 타임아웃: 30분 비활동 시 자동 로그아웃
- 모든 Admin 액션 감사 로그 기록

## 12. Service Optimization Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Rendering** | 레이더 차트 lazy loading | ✅ Pass |
| **Network** | 분석 결과 캐싱 | ✅ Pass |
| **Database** | analyses(user_id, status), personality_scores(analysis_id) 인덱싱 | ✅ Pass |
| **SEO** | 동적 Meta + OG 이미지 | ✅ Pass |
| **UX/AI** | 분석 결과 실시간 출력 | ✅ Pass |
| **UX** | 질문 슬라이드 스무스 전환 | ✅ Pass |

## 13. Compliance Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | ✅ Pass |
| **Privacy** | 자유 글 원문 분석 후 삭제 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | ✅ Pass |
| **AI/Data** | AI 학습 미사용 고지 | ✅ Pass |
| **AI/Data** | 분석 결과 참고용 고지 | ✅ Pass |

### 데이터 유출 대응
- 발견 후 72시간 내 관할 당국 통지
- 영향받는 사용자에게 이메일/SMS 통지
- 원인 분석 리포트 및 재발 방지 대책

### 쿠키 동의
- 필수 쿠키 (인증, 결제): 자동 적용
- 분석 쿠키 (GA4): 명시적 동의 후 활성화
- 구현: 하단 고정 Cookie Consent 배너

### 결제 기록 보존 및 폐기
- 결제 완료 기록: 5년 보존 (전자상거래법)
- 회원 탈퇴 시: 익명화하여 보존
- 5년 경과 후: 완전 삭제
- 비회원 결제 기록: 30일 후 개인정보 마스킹, 결제 기록만 5년 보존
