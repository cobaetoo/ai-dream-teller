# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: LoveSignal (AI 연애 궁합 & 연애 코칭)
- **목표**: 두 사람의 정보를 기반으로 AI가 궁합을 분석하고 연애 조언을 제공하는 수익형 웹 서비스.
- **핵심 가치 1**: 페어링 코드 시스템으로 상대방에게 링크를 보내 양쪽 정보를 모두 반영한 정확한 분석.
- **핵심 가치 2**: 익명 연애 상담 커뮤니티에서 AI와 유저들의 조언을 받을 수 있는 공간.

## 2. 타겟 유저 (Target Audience)

- 연애 중이거나 관심 있는 20~30대.
- 상대방과의 궁합이나 관계 방향이 궁금한 커플/짝사랑.
- 연애 고민을 익명으로 상담하고 싶은 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Romantic, Warm, Inviting.
- **Colors**: Rose Pink, Lavender, Soft White.
- **Interactions**: 하트 파티클, 궁합 게이지 애니메이션, 카드 뒤집기.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout (Common Structure)

1. **상단 네비게이션 바**: 홈 로고, (Desktop) 전체 메뉴, (Mobile) 햄버거, (비회원) 로그인, (회원) 마이페이지.
2. **Body**: 각 페이지 내용.
3. **Footer**: 사업자 정보, 이용약관, 개인정보처리방침, 문의하기.
4. **Head & Meta**: SEO, Open Graph, GA4.

### 5.2. Page Details

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "두 사람의 이야기, AI가 읽어드립니다." CTA ("우리 궁합 확인하기").
   - **Feature Section**: AI 궁합 분석, 페어링 코드 공유, 연애 코칭, 익명 상담 커뮤니티.
   - **Social Proof**: "결과 보고 남친이랑 대화를 많이 하게 됐어요" 등 후기.

2. **내 정보 입력 (`/compatibility-setup`)**
   - **내 정보**: 이름(또는 닉네임), 생년월일, 성격 유형(MBTI 선택 또는 모름), 자유 텍스트(나를 한 줄로 표현).
   - **분석 유형**: 궁합 분석 / 연애 코칭 / 관계 성장 가이드.
   - **상대방 정보 입력 방식**: (1) 직접 입력, (2) 페어링 코드 공유.
   - **결제**: 기본/프리미엄 플랜 선택 후 토스페이먼츠.

3. **페어링 페이지 (`/pairing/[code]`)**
   - 공유받은 링크로 접속 시 상대방이 자신의 정보 입력.
   - 입력 완료 시 양쪽 정보 기반 AI 분석 자동 시작.
   - 결과 완료 알림 (이메일 또는 카카오톡).

4. **궁합 결과 (`/result/[id]`)**
   - **종합 궁합 점수**: 0-100 게이지 (하트 애니메이션).
   - **상세 분석**: 성격 궁합, 소통 스타일, 갈등 요인, 관계 발전 조언.
   - **프리미엄**: 심층 리포트 + 연애 코칭 3회 + 관계 성장 가이드.
   - **공유 카드**: OG 이미지 카드 (SNS 공유용).

5. **연애 상담 커뮤니티 (`/community`)**
   - 익명 글 작성 (고민 내용).
   - 댓글 (유저 + AI 조언).
   - 카테고리 필터: 짝사랑, 갈등, 이별, 재회, 연애 팁.
   - **커뮤니티 규칙**:
     - 게시글 작성은 **회원만** 가능 (비회원은 읽기만)
     - 댓글 작성도 회원만 가능
     - 익명이지만 닉네임은 표시되어 일정 수준의 추적 가능성 유지
     - 신고 기능: 각 게시글/댓글에 신고 버튼, 3회 이상 신고 시 자동 숨김 + 관리자 검토
   - **AI 조언 트리거**: 게시글 작성 후 작성자가 "AI 조언 받기" 버튼 클릭 시 수동 생성 (자동이 아님)

6. **유저 마이페이지 (`/my-page`)**: 궁합 히스토리, 커뮤니티 활동, 프로필 수정.
7. **비회원 로그인 (`/guest-login`)**, **비회원 주문 조회 (`/guest-check`)**, **회원 로그인 (`/auth`)**.

### 5.3. E2E Test Checklist

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Landing** | `Home (/)` | 네비게이션, CTA -> `/compatibility-setup` | ✅ Pass |
| **Auth** | `Guest Login` | 비회원 로그인 | ✅ Pass |
| **Setup** | `compatibility-setup` | 내 정보 + 상대방 정보 입력 | ✅ Pass |
| **Pairing** | `/pairing/[code]` | 페어링 코드로 접속 -> 상대 정보 입력 | ✅ Pass |
| **Payment** | `payments` | 토스 위젯, 결제 성공 | ✅ Pass |
| **Result** | `result/[id]` | 궁합 점수 + 상세 분석 렌더링 | ✅ Pass |
| **Community** | `community` | 익명 글 작성, 댓글, AI 조언 | ✅ Pass |

### 5.4. Guest Checkout 구현 리스트

| 구분 | 주요 기능 | 구현 여부 | E2E 테스트 |
|---|---|---|---|
| **Frontend** | 비회원 폼 | ✅ 완료 | ✅ 완료 |
| **Frontend** | API Payload | ✅ 완료 | ✅ 완료 |
| **Backend** | Guest 분기 | ✅ 완료 | ✅ 완료 |
| **Backend** | Bcrypt 해싱 | ✅ 완료 | ✅ 완료 |
| **Backend** | Guest 생성 | ✅ 완료 | ✅ 완료 |
| **Database** | RLS 설정 | ✅ 완료 | ✅ 완료 |

## 6. Admin UX Flow & Layout

1. **대시보드 (`/admin`)**: 매출, 가입자, 페어링 성공률, 커뮤니티 활성도.
2. **주문 내역 (`/admin/order-list`)**: 주문 테이블.
3. **주문 상세 (`/admin/order-list/[id]`)**: 양쪽 정보, 분석 결과, 재시도/취소.
4. **유저 리스트 (`/admin/user-list`)**: 회원/비회원.
5. **커뮤니티 관리 (`/admin/community`)**: 게시글/댓글 모더레이션.

### Admin API

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 통계 | Admin |
| **GET** | `/api/admin/orders` | 주문 | Admin |
| **GET** | `/api/admin/orders/[id]` | 상세 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | 재분석 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 취소 | Admin |
| **GET** | `/api/admin/users` | 회원 | Admin |
| **GET** | `/api/admin/community/posts` | 게시글 | Admin |
| **PATCH** | `/api/admin/community/posts/[id]` | 숨김/삭제 | Admin |
| **DELETE** | `/api/admin/community/comments/[id]` | 댓글 삭제 | Admin |

## 7. 운영 및 정책

- AI 분석 지연/오류 시 자동 재시도(1회). 최종 실패 시 결제 자동 취소.
- 비회원 데이터 30일 보관 후 삭제.
- 커뮤니티: 익명이지만 악성 게시글/댓글 신고 및 관리자 삭제.
- 궁합 분석은 오락 목적이며 전문 심리 상담이 아님을 명시.

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

### 7.6. 커뮤니티 관리 정책
- **콘텐츠 모더레이션**:
  - AI Moderation: 게시글/댓글 작성 시 유해 콘텐츠(욕설, 혐오, 스팸) 자동 감지
  - 신고 시스템: 3회 이상 신고 시 자동 숨김 + 관리자 검토 큐 진입
  - 관리자 권한: 부적절 게시글/댓글 즉시 숨김/삭제 가능
- **궁합 분석 면책**: 결과 페이지에 "궁합 분석은 오락 목적의 참고 자료이며, 전문 심리 상담이나 관계 조언을 대체하지 않습니다." 명시

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

### 8.2. Compatibility (궁합 분석)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/compatibilities` | 궁합 분석 요청 (상대방 정보 포함 또는 페어링) | User, Guest |
| **POST** | `/api/compatibilities/generate` | 내부 AI 분석 | Internal |
| **GET** | `/api/compatibilities` | 내 궁합 목록 | User |
| **GET** | `/api/compatibilities/[id]` | 궁합 상세 결과 | Owner |

### 8.3. Pairing (페어링)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/pairings` | 페어링 코드 생성 | User, Guest |
| **GET** | `/api/pairings/[code]` | 페어링 정보 조회 | Public |
| **POST** | `/api/pairings/[code]/submit` | 상대방 정보 제출 | Public |

### 8.4. Community (연애 상담)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/community/posts` | 게시글 작성 | User |
| **GET** | `/api/community/posts` | 게시글 리스트 (카테고리 필터) | Public |
| **GET** | `/api/community/posts/[id]` | 게시글 상세 + 댓글 | Public |
| **POST** | `/api/community/posts/[id]/comments` | 댓글 작성 | User |
| **POST** | `/api/community/posts/[id]/ai-advice` | AI 조언 생성 | User |

### 8.5. Payments

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 결제 승인 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 결제 상태 | Owner |
| **POST** | `/api/webhooks/toss` | 웹훅 | Public (IP 제한) |

## 9. DB Schema Specification (Supabase)

### Entity Map

**1. users, public.profiles** (동일 구조)

**2. public.guests** (동일 구조)

**3. public.compatibility_requests (궁합 분석 요청)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | Null | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `my_info` | `jsonb` | **NN** | 내 정보 (이름, 생일, MBTI, 한줄소개) |
| `partner_info` | `jsonb` | Null | 상대방 정보 (직접 입력 시) |
| `partner_source` | `text` | **NN** | 'DIRECT', 'PAIRING' |
| `pairing_id` | `uuid` | Null | FK `pairing_codes.id` |
| `analysis_type` | `text` | **NN** | 'COMPATIBILITY', 'COACHING', 'GROWTH' |
| `status` | `text` | **NN** | `PENDING`, `COMPLETED`, `FAILED` |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**4. public.pairing_codes (페어링 코드)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `request_id` | `uuid` | **NN** | FK `compatibility_requests.id` |
| `code` | `text` | **NN** | 페어링 코드 (Unique, 8자리) |
| `partner_submitted` | `boolean` | **NN** | 상대방 제출 여부 (Default: false) |
| `partner_info` | `jsonb` | Null | 상대방 제출 정보 |
| `expires_at` | `timestamptz` | **NN** | 만료 일시 (7일) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

> **페어링 코드 보안**:
> - 코드는 8자리 영숫자 랜덤 생성 (추측 불가)
> - 7일 만료 후 자동 무효화
> - 동일 request_id당 최대 1개 페어링 코드 생성
> - 만료된 코드로 제출 시도 시 410 Gone 응답

**5. public.analyses (분석 결과)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `request_id` | `uuid` | **NN** | FK `compatibility_requests.id` (Unique) |
| `overall_score` | `integer` | Null | 종합 궁합 점수 (0-100) |
| `personality_match` | `integer` | Null | 성격 궁합 |
| `communication_style` | `jsonb` | Null | 소통 스타일 분석 |
| `conflict_factors` | `jsonb` | Null | 갈등 요인 |
| `advice` | `text` | Null | 종합 조언 |
| `premium_report` | `jsonb` | Null | 심층 리포트 (프리미엄) |
| `og_image_url` | `text` | Null | 공유 카드 이미지 URL |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

> **궁합 점수 산출 방법**:
> - 종합 점수(0-100)는 성격 궁합(30%), 소통 스타일(25%), 갈등 요인(20%), 관계 발전 가능성(25%) 가중 평균
> - 각 하위 점수는 AI가 양쪽 정보를 비교 분석하여 산출
> - 점수는 절대적이지 않으며 참고용임을 결과 페이지에 명시

**6. public.community_posts (커뮤니티 게시글)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | **NN** | FK `profiles.id` |
| `category` | `text` | **NN** | 'CRUSH', 'CONFLICT', 'BREAKUP', 'REUNION', 'TIPS' |
| `title` | `text` | **NN** | 제목 |
| `content` | `text` | **NN** | 내용 |
| `is_anonymous` | `boolean` | **NN** | 익명 여부 (Default: true) |
| `is_hidden` | `boolean` | **NN** | 숨김 여부 (Default: false) |
| `created_at` | `timestamptz` | **NN** | 작성 일시 |

> **주의**: `community_posts`와 `comments`는 `user_id`만 참조하며 `guest_id`가 없음. 즉, 비회원은 커뮤니티 게시글/댓글 작성 불가 (읽기만 가능).

**7. public.comments (댓글)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `post_id` | `uuid` | **NN** | FK `community_posts.id` |
| `user_id` | `uuid` | Null | FK `profiles.id` (AI 댓글은 Null) |
| `content` | `text` | **NN** | 댓글 내용 |
| `is_ai` | `boolean` | **NN** | AI 댓글 여부 (Default: false) |
| `is_hidden` | `boolean` | **NN** | 숨김 여부 (Default: false) |
| `created_at` | `timestamptz` | **NN** | 작성 일시 |

**8. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `compatibility_request_id` | `uuid` | **NN** | FK `compatibility_requests.id` (Unique) |
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

-- compatibility_requests: 소유자만 접근
CREATE POLICY "Owner full access" ON compatibility_requests FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM compatibility_requests WHERE compatibility_requests.id = orders.compatibility_request_id AND (compatibility_requests.user_id = auth.uid() OR compatibility_requests.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| compatibility_requests | `(user_id, status)` | 사용자별 목록 조회 |
| compatibility_requests | `(guest_id, status)` | 비회원 목록 조회 |
| orders | `(created_at DESC)` | Admin 주문 리스트 |

### Connection Pooling
- Supabase Supavisor (Transaction Mode), Pool size: 20

## 10. API E2E Test Scenarios

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-A-01 | POST | `/api/auth/guest` | 비회원 로그인 | ✅ Pass |
| API-C-01 | POST | `/api/compatibilities` | 궁합 분석 요청 (직접 입력) | ✅ Pass |
| API-C-02 | POST | `/api/compatibilities` | 궁합 분석 요청 (페어링) | ✅ Pass |
| API-C-03 | GET | `/api/compatibilities/[id]` | 결과 조회 | ✅ Pass |
| API-PG-01 | POST | `/api/pairings` | 페어링 코드 생성 | ✅ Pass |
| API-PG-02 | POST | `/api/pairings/[code]/submit` | 상대방 정보 제출 | ✅ Pass |
| API-CM-01 | POST | `/api/community/posts` | 게시글 작성 | ✅ Pass |
| API-CM-02 | GET | `/api/community/posts` | 게시글 리스트 | ✅ Pass |
| API-CM-03 | POST | `/api/community/posts/[id]/comments` | 댓글 작성 | ✅ Pass |
| API-CM-04 | POST | `/api/community/posts/[id]/ai-advice` | AI 조언 | ✅ Pass |
| API-P-01 | POST | `/api/payments/confirm` | 결제 성공 | ✅ Pass |
| API-AD-01 | GET | `/api/admin/stats` | 통계 | ✅ Pass |
| API-AD-02 | DELETE | `/api/admin/community/comments/[id]` | 댓글 삭제 | ✅ Pass |

## 11. Security Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **IAM** | RLS | 비인가 접근 차단 | ✅ Pass |
| **App** | Internal API | generate 외부 호출 차단 | ✅ Pass |
| **App** | 페어링 코드 | 만료된 코드 사용 시 410 | ✅ Pass |
| **Input** | Prompt Injection | 악의적 입력 필터링 | ✅ Pass |
| **Community** | XSS | `<script>` 태그 이스케이프 | ✅ Pass |
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
| **Rendering** | 공유 카드 OG 이미지 최적화 | ✅ Pass |
| **Network** | 분석 결과 캐싱 | ✅ Pass |
| **Database** | compatibility_requests(user_id, status), community_posts(category) 인덱싱 | ✅ Pass |
| **SEO** | 동적 Meta | ✅ Pass |
| **UX/AI** | Streaming 분석 | ✅ Pass |

## 13. Compliance Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | ✅ Pass |
| **Privacy** | 익명 게시글 개인정보 노출 금지 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | ✅ Pass |
| **AI/Data** | AI 학습 미사용 고지 | ✅ Pass |
| **AI/Data** | 궁합 분석 오락 목적 고지 | ✅ Pass |

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
