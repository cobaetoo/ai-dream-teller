# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: NameSpark (AI 네이밍 서비스)
- **목표**: 아기 이름, 반려동물 이름, 브랜드/프로젝트명을 조건에 맞춰 AI가 제안하고, 커뮤니티 투표로 최적의 이름을 찾는 수익형 웹 서비스.
- **핵심 가치 1**: 직관적인 조건 필터 UI로 원하는 느낌의 이름을 빠르게 발견.
- **핵심 가치 2**: 이름 후보 비교와 커뮤니티 투표로 최종 결정을 돕는 협업 네이밍 경험.

## 2. 타겟 유저 (Target Audience)

- 임산부, 출산 예정 부부 (아기 이름).
- 반려동물 입양자 (펫 이름).
- 창업자, 크리에이터 (브랜드/프로젝트명).
- 닉네임이 필요한 게이머, SNS 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Warm, Creative, Joyful.
- **Colors**: Coral Pink, Soft Gold, Warm White.
- **Interactions**: 이름 카드 플립 애니메이션, 투표 카운트 업, 비교 슬라이더.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout (Common Structure)

1. **상단 네비게이션 바**
   - **(공통)**: 홈 로고.
   - **(Desktop)**: 전체 메뉴 노출.
   - **(Mobile)**: 우측 상단 `햄버거 메뉴`.
   - **(비회원)**: `로그인`, `비회원 주문 조회`.
   - **(회원)**: `마이페이지`.
2. **Body**: 각 페이지 별 주요 내용.
3. **Footer**: 사업자 정보, `이용약관`, `개인정보처리 방침`, `문의하기`.
4. **Head & Meta**: SEO, Open Graph, GA4.

### 5.2. Page Details

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "완벽한 이름, AI가 찾아드립니다." CTA ("이름 찾기 시작").
   - **Feature Section**: 카테고리별 네이밍, 조건 필터, 이름 비교, 커뮤니티 투표.
   - **Social Proof**: "AI가 추천해준 이름에 남편도 반했어요" 등 후기.

2. **네이밍 조건 입력 (`/naming-setup`)**
   - **카테고리 선택**: 아기 / 반려동물 / 브랜드 / 닉네임.
   - **공통 조건**: 글자 수 (1~5), 느낌 (발음 쉬운 / 고급스러운 / 귀여운 / 강렬한 / 부드러운).
   - **아기 추가**: 성(姓), 한자 포함 여부, 의미 (지혜/행복/용기 등), 성별.
   - **반려동물 추가**: 동물 종류, 외모 특징, 성격.
   - **브랜드 추가**: 업종, 타겟 고객, 브랜드 가치, 영문/국문.
   - **플랜별 생성 수**: 기본 15개 이름 + 기본 분석 / 프리미엄 50개 이름 + 상세 분석 리포트 + 브랜드 로고 AI 이미지

3. **결제 페이지 (`/payments`)**
   - **UI**: 영수증 컨셉 카드.
   - **Function**: `기본/프리미엄` 플랜 스위처, 토스페이먼츠.

4. **네이밍 결과 (`/naming-result/[order-id]`)**
   - **이름 카드 리스트**: 이름, 의미, 어원, 발음 난이도, 추천 이유.
   - **비교 기능**: 후보 2~3개 선택 시 상세 비교 뷰 (의미/발음/인지도/호감도).
   - **비교 기준 상세**:
     - 의미 (Meaning): 이름의 사전적/어원적 의미 깊이 (1-10점, AI 평가)
     - 발음 (Pronunciation): 발음 용이성 및 운율적 아름다움 (1-10점, AI 평가)
     - 인지도 (Recognition): 대중적 친숙도 및 기억하기 쉬운 정도 (1-10점, AI 평가)
     - 호감도 (Appeal): 일반적 긍정 연상 정도 (1-10점, AI 평가)
   - **레이더 차트**: 4개 기준을 레이더 차트로 시각화하여 직관적 비교
   - **커뮤니티 투표**: "이 중 어떤 이름이 좋나요?" 공유 링크 생성.
   - **프리미엄**: 50개 이름 + 상세 분석 리포트 + 브랜드 로고 AI 이미지 생성.

5. **비교 페이지 (`/compare`)**: 선택한 이름 나란히 비교 (레이더 차트).

6. **커뮤니티 피드 (`/feeds`)**: 다른 사용자의 투표 진행 중인 이름, 인기 이름 랭킹.

7. **유저 마이페이지 (`/my-page`)**, **비회원 로그인 (`/guest-login`)**, **비회원 주문 조회 (`/guest-check`)**, **회원 로그인 (`/auth`)**.

### 5.3. E2E Test Checklist

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Landing** | `Home (/)` | 네비게이션, CTA -> `/naming-setup` | ✅ Pass |
| **Auth** | `Guest Login` | 비회원 로그인 성공/실패 | ✅ Pass |
| **Setup** | `naming-setup` | 카테고리/조건 선택 -> 결제 | ✅ Pass |
| **Payment** | `payments` | 토스 위젯, 결제 성공 | ✅ Pass |
| **Result** | `naming-result/[id]` | 이름 카드 리스트 렌더링 | ✅ Pass |
| **Compare** | `compare` | 이름 비교 뷰, 레이더 차트 | ✅ Pass |
| **Community** | `feeds` | 투표 진행 중 이름, 투표 기능 | ✅ Pass |

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

1. **대시보드 (`/admin`)**: 매출, 가입자, 카테고리별 네이밍 통계, 인기 조건 통계.
2. **주문 내역 (`/admin/order-list`)**: 결제 주문 테이블.
3. **주문 상세 (`/admin/order-list/[id]`)**: 조건, 결과, 재시도/취소.
4. **유저 리스트 (`/admin/user-list`)**: 회원/비회원 통합.
5. **커뮤니티 관리 (`/admin/feed-list`)**: 투표 게시글 관리, 부적절 콘텐츠 숨김.

### Admin API

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 통계 | Admin |
| **GET** | `/api/admin/orders` | 주문 | Admin |
| **GET** | `/api/admin/orders/[id]` | 상세 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | 재생성 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 취소 | Admin |
| **GET** | `/api/admin/users` | 회원 | Admin |
| **GET** | `/api/admin/votes/public` | 투표 피드 | Admin |
| **PATCH** | `/api/admin/votes/[id]/visibility` | 투표 숨김 | Admin |

## 7. 운영 및 정책

- AI 생성 지연/오류 시 자동 재시도(1회). 최종 실패 시 결제 자동 취소.
- 비회원 데이터 30일 보관 후 삭제.
- 커뮤니티 투표: 부적절 콘텐츠 신고 기능, 관리자 숨김 처리.

### 7.1. 에러 처리 상세
- **AI 생성 재시도**: exponential backoff (1초 → 2초 → 4초), 최대 3회, 타임아웃 30초
- **최종 실패 시**: 에러 코드와 함께 사용자 안내, Toss Cancel API 호출로 결제 자동 취소
- **관리자 알림**: 실패 건 Slack webhook 또는 이메일 통지

### 7.2. 관리자 감사 로그
- Admin 활동 로깅: 재시도, 취소, 데이터 수정 시 `admin_audit_logs` 테이블에 기록
- 로그 보관 기간: 1년
- 로그 항목: admin_id, action, target_id, timestamp, ip_address

### 7.3. 데이터 백업
- Supabase 자동 일일 백업 (Pro 플랜 이상)
- 장애 복구 목표: RPO 24시간, RTO 4시간

### 7.4. 네이밍 서비스 특수 정책
- **이름 저작권 안내**: AI가 생성한 이름의 상표 등록 가능 여부는 사용자가 직접 확인해야 함을 명시
- **투표 만료**: 커뮤니티 투표는 생성 후 30일간 활성, 이후 자동 종료 (결과는 유지)
- **부적절 콘텐츠**: 이름 후보에 욕설/혐오 의미가 포함될 수 있으므로 AI 생성 시 필터링 적용
- **투표 조작 방지**: IP + 브라우저 fingerprint + (회원의 경우) user_id 기반 중복 투표 방지

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

### 8.2. Namings (네이밍 요청)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/namings` | 네이밍 요청 생성 | User, Guest |
| **POST** | `/api/namings/generate` | 내부 AI 이름 생성 | Internal |
| **GET** | `/api/namings` | 내 네이밍 목록 | User |
| **GET** | `/api/namings/[id]` | 네이밍 상세 + 이름 리스트 | Owner |
| **DELETE** | `/api/namings/[id]` | 삭제 | Owner |

### 8.3. Votes (커뮤니티 투표)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/votes` | 투표 게시글 생성 (이름 후보 등록) | User |
| **GET** | `/api/votes` | 투표 리스트 (피드) | Public |
| **POST** | `/api/votes/[id]/cast` | 투표 (이름 선택) | User, Guest |
| **GET** | `/api/votes/[id]` | 투표 결과 | Public |

### 8.4. Payments

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 결제 승인 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 결제 상태 | Owner |
| **POST** | `/api/webhooks/toss` | 웹훅 | Public (IP 제한) |

## 9. DB Schema Specification (Supabase)

### Entity Map

**1. users (Supabase Auth)**

**2. public.profiles**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `nickname` | `text` | **NN** | 닉네임 |
| `role` | `text` | **NN** | 'USER' or 'ADMIN' |
| `created_at` | `timestamptz` | **NN** | 가입 일시 |

**3. public.guests**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `phone` | `text` | **NN** | 전화번호 (Unique) |
| `password_hash` | `text` | **NN** | Bcrypt |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**4. public.naming_requests (네이밍 요청)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | Null | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `category` | `text` | **NN** | 'BABY', 'PET', 'BRAND', 'NICKNAME' |
| `conditions` | `jsonb` | **NN** | 조건 (성, 한자, 의미, 업종 등 카테고리별) |
| `status` | `text` | **NN** | `PENDING`, `COMPLETED`, `FAILED` |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**5. public.name_candidates (이름 후보)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `naming_request_id` | `uuid` | **NN** | FK `naming_requests.id` |
| `name` | `text` | **NN** | 이름 |
| `meaning` | `text` | **NN** | 의미 |
| `origin` | `text` | Null | 어원 |
| `pronunciation_difficulty` | `text` | Null | 'EASY', 'MODERATE', 'HARD' |
| `recommendation_reason` | `text` | Null | 추천 이유 |
| `analysis_detail` | `jsonb` | Null | 상세 분석 (인지도, 호감도 등) |

> **analysis_detail JSON 스키마**: `{meaning_score: number(1-10), pronunciation_score: number(1-10), recognition_score: number(1-10), appeal_score: number(1-10), overall_score: number(1-10)}`

**6. public.votes (커뮤니티 투표)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | **NN** | FK `profiles.id` |
| `title` | `text` | **NN** | 투표 제목 |
| `category` | `text` | **NN** | 네이밍 카테고리 |
| `is_public` | `boolean` | **NN** | 공개 여부 (Default: true) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**7. public.vote_options (투표 선택지)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `vote_id` | `uuid` | **NN** | FK `votes.id` |
| `name` | `text` | **NN** | 이름 |
| `vote_count` | `integer` | **NN** | 투표 수 (Default: 0) |

**8. public.vote_records (투표 기록)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `vote_id` | `uuid` | **NN** | FK `votes.id` |
| `option_id` | `uuid` | **NN** | FK `vote_options.id` |
| `voter_id` | `uuid` | Null | FK `profiles.id` (비회원은 Null) |
| `voter_ip` | `text` | Null | 비회원 식별용 |
| `browser_fingerprint` | `text` | Null | 브라우저 핑거프린트 (비회원 중복 투표 방지용) |
| `created_at` | `timestamptz` | **NN** | 투표 일시 |

**9. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `naming_request_id` | `uuid` | **NN** | FK `naming_requests.id` (Unique) |
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

-- naming_requests: 소유자만 접근
CREATE POLICY "Owner full access" ON naming_requests FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM naming_requests WHERE naming_requests.id = orders.naming_request_id AND (naming_requests.user_id = auth.uid() OR naming_requests.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| naming_requests | `(user_id, status)` | 사용자별 목록 조회 |
| naming_requests | `(guest_id, status)` | 비회원 목록 조회 |
| orders | `(created_at DESC)` | Admin 주문 리스트 |

### Connection Pooling
- Supabase Supavisor (Transaction Mode), Pool size: 20

## 10. API E2E Test Scenarios

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-A-01 | POST | `/api/auth/guest` | 비회원 로그인 | ✅ Pass |
| API-N-01 | POST | `/api/namings` | 네이밍 생성 | ✅ Pass |
| API-N-02 | GET | `/api/namings/[id]` | 결과 조회 | ✅ Pass |
| API-N-03 | POST | `/api/namings/generate` | AI 생성 | ✅ Pass |
| API-V-01 | POST | `/api/votes` | 투표 생성 | ✅ Pass |
| API-V-02 | GET | `/api/votes` | 투표 리스트 | ✅ Pass |
| API-V-03 | POST | `/api/votes/[id]/cast` | 투표 참여 | ✅ Pass |
| API-P-01 | POST | `/api/payments/confirm` | 결제 성공 | ✅ Pass |
| API-AD-01 | GET | `/api/admin/stats` | 통계 | ✅ Pass |
| API-AD-02 | GET | `/api/admin/orders` | 주문 | ✅ Pass |
| API-AD-03 | PATCH | `/api/admin/votes/[id]/visibility` | 투표 숨김 | ✅ Pass |

## 11. Security Checklist

### 11.1 Identity & Access Management

- **Supabase RLS**: `profiles`, `guests`, `naming_requests`, `name_candidates`, `orders` 테이블에 명확한 RLS 정책 적용.
- **API 권한 제어**: `/api/admin/*` 접근 시 세션/토큰 내 권한 변조 여부 검사.
- **비회원 비밀번호 암호화**: `password`는 Bcrypt + Salt로 저장.

### 11.2 Application & Data Security

- **Internal API Protection**: `/api/namings/generate` 외부 직접 호출 차단.
  - `x-internal-request` 커스텀 헤더 + 서버 환경변수(`INTERNAL_SECRET`) 검증
- **Error Handling**: 클라이언트 응답에 DB 쿼리/Stack Trace 노출 금지.
- **Log Masking**: 결제 키, 비밀번호, 전화번호 평문 로그 금지.

### 11.3 AI & Input Validation

- **Prompt Injection 방어**: 입력 글자 수 제한 및 특수 문자 필터링.
  - 입력 글자 수 서버 사이드 검증
  - 특수 문자 및 SQL/HTML 패턴 정규식 필터링
  - AI 시스템 프롬프트와 사용자 입력을 별도 메시지로 분리
  - AI 응답 후처리: 민감 정보 패턴 감지 및 마스킹
- **XSS 차단**: 피드/닉네임에 HTML 태그 실행 불가.

### 11.4 Payment Security

- **금액 위변조 방지**: `/api/payments/confirm` 시 백엔드 상품 실원가와 비교.
- **Webhook 검증**: Toss 공식 IP 대역 인증 + Body Secret Key 검증.
- **멱등성 보장**: 동일 `orderId` 중복 결제 방지.

### 11.5 Infrastructure & Ops

- **Rate Limiting**: 비회원 로그인/생성 API에 쓰로틀링(HTTP 429).
  - 비회원 로그인: 5회/분 per IP
  - AI 생성 요청: 3회/분 per user
  - API 전체: 100회/분 per IP
  - 구현: Next.js middleware + Upstash Redis
  - 초과 시: 429 + Retry-After 헤더
- **의존성 점검**: 정기 `npm audit`.

### 11.6 CSRF 방어

- SameSite=Strict 쿠키 설정
- 상태 변경 API에 커스텀 헤더 검증

### 11.7 Admin 인증

- 미들웨어에서 `profiles.role = 'ADMIN'` 검증
- Admin 세션 타임아웃: 30분 비활동 시 자동 로그아웃
- 모든 Admin 액션 감사 로그 기록

### 11.8 Security E2E Test Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **IAM** | RLS | 비인가 접근 차단 | ✅ Pass |
| **App** | Internal API | generate 외부 호출 차단 | ✅ Pass |
| **Input** | Prompt Injection | 악의적 입력 필터링 | ✅ Pass |
| **Payment** | 금액 위변조 | 조작 시 400 | ✅ Pass |
| **Vote** | 투표 어뷰징 | 동일 IP 1시간 내 10회 이상 투표 시 차단 + fingerprint(device+browser 해시) 기반 중복 투표 방지 | ✅ Pass |
| **Infra** | Rate Limiting | 초과 시 429 | ✅ Pass |
| **CSRF** | 쿠키 설정 | SameSite=Strict 검증 | ✅ Pass |
| **Admin** | 권한 검증 | 비Admin 접근 시 403 | ✅ Pass |

## 12. Service Optimization Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Rendering** | 이름 카드 lazy loading | ✅ Pass |
| **Network** | 네이밍 결과 캐싱 | ✅ Pass |
| **Database** | naming_requests(user_id, status), vote_options(vote_id) 인덱싱 | ✅ Pass |
| **SEO** | 동적 Meta | ✅ Pass |
| **UX/AI** | Streaming 이름 생성 | ✅ Pass |

## 13. Compliance Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | ✅ Pass |
| **AI/Data** | AI 학습 미사용 고지 | ✅ Pass |

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
