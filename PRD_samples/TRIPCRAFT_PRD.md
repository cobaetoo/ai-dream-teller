# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: TripCraft (AI 여행 일정 생성기)
- **목표**: 목적지, 기간, 예산, 취향을 입력하면 AI가 일별 여행 일정을 생성하고 지도로 시각화하는 수익형 웹 서비스.
- **핵심 가치 1**: 동선이 최적화된 여행 일정을 지도 위에 직관적으로 시각화.
- **핵심 가치 2**: 생성된 일정을 공유하고, 다른 여행자들의 일정을 참고할 수 있는 커뮤니티.

## 2. 타겟 유저 (Target Audience)

- 여행 계획 세우기를 귀찮아하는 20~40대.
- 여행지에서 효율적으로 시간을 쓰고 싶은 여행자.
- 일정을 친구/연인과 공유하고 함께 편집하고 싶은 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk
- **Maps**: Kakao Maps API
- **Maps 상세**: Kakao Maps JavaScript API (클라이언트 렌더링). API 키는 서버에서 Next.js API Route를 통해 프록시하여 클라이언트에 직접 노출하지 않음. 도메인 제한 설정.

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Adventurous, Vibrant, Inspiring.
- **Colors**: Sky Blue, Sunset Orange, White.
- **Interactions**: 지도 핀 애니메이션, 일정 카드 슬라이드, 타임라인 스크롤.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout (Common Structure)

1. **상단 네비게이션 바**
   - **(공통)**: 홈 로고.
   - **(Desktop)**: 전체 메뉴 노출.
   - **(Mobile)**: 우측 상단 `햄버거 메뉴`.
   - **(비회원)**: `로그인`, `비회원 주문 조회`.
   - **(회원)**: `마이페이지`, `내 여행`.
2. **Body**: 각 페이지 별 주요 내용.
3. **Footer**: 사업자 정보, `이용약관`, `개인정보처리방침`, `문의하기`.
4. **Head & Meta**: SEO, Open Graph, GA4.

### 5.2. Page Details

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "여행 계획은 AI에게, 설렘은 당신에게." CTA ("여행 일정 만들기").
   - **Feature Section**: AI 일정 생성, 지도 동선 시각화, 일정 공유, 가이드북.
   - **Social Proof**: "입력 3분 만에 3박 4일 일정이 완성됐어요" 등 후기.

2. **여행 조건 입력 (`/trip-setup`)**
   - **목적지**: 도시명 검색 (자동완성).
   - **여행 기간**: 시작일 ~ 종료일 (달력 피커).
   - **예산**: 1인 기준 (슬라이더 + 직접 입력).
   - **여행 스타일**: 혼자 / 커플 / 가족 / 친구.
   - **관심사**: 맛집 / 문화 / 자연 / 쇼핑 / 액티비티 (복수 선택).
   - **추가 요구사항**: 자유 텍스트 (예: "바다 근처 숙소 선호").

3. **결제 페이지 (`/payments`)**
   - **UI**: 여행 티켓 컨셉 카드.
   - **Function**: `기본/프리미엄` 플랜 스위처, 토스페이먼츠.

4. **여행 일정 결과 (`/trip-result/[order-id]`)**
   - **일별 타임라인**: Morning / Afternoon / Evening 활동 카드.
   - **지도 뷰**: Kakao Maps에 일정 동선 표시 (Polyline + Marker).
   - **장소 카드**: 이름, 카테고리, 예상 머무는 시간, 예상 비용, 링크.
   - **식당 추천**: 주변 맛집 자동 추천.
   - **숙박 추천**: 예산에 맞는 숙소.
   - **프리미엄**: 다중 도시 루트, 예약 링크, 가이드북 PDF, AI 로컬 맛집 추천.
   - **지도 장애 대응 (Graceful Degradation)**:
     - Kakao Maps API 호출 실패 시 지도 영역을 타임라인 리스트 뷰로 대체
     - 장소 카드에 좌표 대신 텍스트 주소 표시
     - 사용자에게 "지도를 불러올 수 없습니다. 리스트 뷰로 표시합니다." 안내
     - 5분 간격으로 지도 API 재시도, 복구 시 자동으로 지도 뷰 복원
   - **공유**: URL 공유, 이미지 카드 export.

5. **유저 마이페이지 (`/my-page`)**
   - (회원전용) 저장된 일정 리스트, 공유 받은 일정, 프로필 수정.

6. **비회원 로그인 (`/guest-login`)**, **비회원 주문 조회 (`/guest-check`)**, **회원 로그인 (`/auth`)**

### 5.3. E2E Test Checklist

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Landing** | `Home (/)` | 네비게이션, CTA -> `/trip-setup` | ✅ Pass |
| **Auth** | `Guest Login` | 비회원 로그인 성공/실패 | ✅ Pass |
| **Setup** | `trip-setup` | 조건 입력 -> 결제 플로우 | ✅ Pass |
| **Payment** | `payments` | 토스 위젯, 결제 성공 | ✅ Pass |
| **Result** | `trip-result/[id]` | 일정 타임라인 + 지도 렌더링 | ✅ Pass |
| **Share** | 공유 링크 | URL로 접속 시 일정 표시 | ✅ Pass |
| **My Page** | `my-page` | 저장된 일정 리스트 | ✅ Pass |

### 5.4. Guest Checkout 구현 리스트

| 구분 | 주요 기능 | 구현 여부 | E2E 테스트 |
|---|---|---|:---|
| **Frontend** | `/trip-setup` 비회원 폼 | ✅ 완료 | ✅ 완료 |
| **Frontend** | API Payload 비회원 정보 포함 | ✅ 완료 | ✅ 완료 |
| **Backend** | Guest 분기 처리 | ✅ 완료 | ✅ 완료 |
| **Backend** | Bcrypt 해싱 | ✅ 완료 | ✅ 완료 |
| **Backend** | Guest 레코드 생성 | ✅ 완료 | ✅ 완료 |
| **Database** | RLS 설정 | ✅ 완료 | ✅ 완료 |

## 6. Admin UX Flow & Layout

### 6.1. Admin Global Layout

1. **좌측 LNB**: `대시보드`, `주문 내역`, `회원 관리`, `인기 목적지 통계`.

### 6.2. Admin Page Details

1. **대시보드 (`/admin`)**: 매출, 가입자, 인기 목적지 TOP 10, 평균 여행 기간 통계.
2. **주문 내역 (`/admin/order-list`)**: 결제 주문 테이블.
3. **주문 상세 (`/admin/order-list/[id]`)**: 주문 정보, 여행 조건, 생성된 일정, 재시도/취소.
4. **유저 리스트 (`/admin/user-list`)**: 회원/비회원 통합.

### 6.3. Admin Requirements

| 구분 | 페이지/API | 구현 여부 | E2E 테스트 |
|---|---|---|---|
| **공통** | 레이아웃 + Middleware | ✅ 완료 | ✅ 완료 |
| **통계** | `GET /api/admin/stats` | ✅ 완료 | ✅ 완료 |
| **주문** | `GET /api/admin/orders` | ✅ 완료 | ✅ 완료 |
| | `GET /api/admin/orders/[id]` | ✅ 완료 | ✅ 완료 |
| | `POST /api/admin/orders/[id]/retry` | ✅ 완료 | ✅ 완료 |
| | `POST /api/admin/orders/[id]/cancel` | ✅ 완료 | ✅ 완료 |
| **회원** | `GET /api/admin/users` | ✅ 완료 | ✅ 완료 |

## 7. 운영 및 정책

### 7.1. 예외 및 실패 처리

- AI 일정 생성 지연/오류 시 자동 재시도(1회).
- 최종 실패 시 오류 안내 + 결제 자동 취소.
- Kakao Maps API 장애 시 일정 텍스트만 표시 (지도 비활성).

### 7.2. 데이터 및 보안 정책

- **비회원 데이터**: 30일 보관 후 삭제.
- **공유 일정**: 공유 링크에는 개인 정보 미포함.
- **지도 API**: Kakao Maps API 키 서버 사이드 관리.

### 7.3. 여행 일정 특수 정책
- **AI 생성 좌표 검증**: AI가 생성한 위도/경도 좌표를 목적지 국가 범위 내인지 서버에서 검증. 범위 외 좌표는 재생성
- **공유 일정 개인정보**: 공유 토큰으로 접근 시 작성자의 개인정보(이름, 이메일) 미표시
- **외부 링크 관리**: `external_url`은 AI가 생성하므로 링크 유효성을 주간 배치로 검증, 만료 링크는 자동 숨김
- **Kakao Maps 이용약관**: API 호출 시 카카오 이용약관 준수, 일일 할당량 모니터링

### 7.4. 에러 처리 상세
- **AI 생성 재시도**: exponential backoff (1초 → 2초 → 4초), 최대 3회, 타임아웃 30초
- **최종 실패 시**: 에러 코드와 함께 사용자 안내, Toss Cancel API 호출로 결제 자동 취소
- **관리자 알림**: 실패 건 Slack webhook 또는 이메일 통지

### 7.5. 관리자 감사 로그
- Admin 활동 로깅: 재시도, 취소, 데이터 수정 시 `admin_audit_logs` 테이블에 기록
- 로그 보관 기간: 1년
- 로그 항목: admin_id, action, target_id, timestamp, ip_address

### 7.6. 데이터 백업
- Supabase 자동 일일 백업 (Pro 플랜 이상)
- 장애 복구 목표: RPO 24시간, RTO 4시간

## 8. API Specification

### 공통 API 규약

**페이지네이션**:
- 리스트 API는 cursor 기반 페이지네이션 적용
- Query Parameters: `cursor`, `limit` (기본 20, 최대 100)
- 응답에 `next_cursor` 포함

**에러 응답 형식**:
```json
{
  "error": "Human readable message",
  "code": "ERROR_CODE",
  "status": 400
}
```

**주요 에러 코드**:
| 코드 | HTTP Status | 설명 |
|---|---|---|
| `INVALID_INPUT` | 400 | 필수 파라미터 누락/형식 오류 |
| `UNAUTHORIZED` | 401 | 인증 필요 |
| `FORBIDDEN` | 403 | 권한 없음 |
| `NOT_FOUND` | 404 | 리소스 없음 |
| `RATE_LIMITED` | 429 | 요청 한도 초과 |
| `AI_GENERATION_FAILED` | 502 | AI 생성 실패 |
| `PAYMENT_FAILED` | 402 | 결제 실패 |

### 8.1. Auth & Users

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/auth/guest` | 비회원 로그인 | Public |
| **POST** | `/api/auth/logout` | 로그아웃 | User, Guest |
| **GET** | `/api/users/me` | 내 정보 | User |
| **PATCH** | `/api/users/me` | 프로필 수정 | User |

### 8.2. Trips (여행 일정)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/trips` | 여행 일정 생성 요청 | User, Guest |
| **POST** | `/api/trips/generate` | 내부 AI 일정 생성 | Internal |
| **GET** | `/api/trips` | 내 여행 목록 | User |
| **GET** | `/api/trips/[id]` | 여행 상세 (일정 + 장소) | Owner, Shared |
| **PATCH** | `/api/trips/[id]` | 일정 수정 | Owner |
| **DELETE** | `/api/trips/[id]` | 일정 삭제 | Owner |
| **POST** | `/api/trips/[id]/share` | 공유 토큰 생성 (30일 유효) | Owner |

### 8.3. Payments

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 결제 승인 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 결제 상태 | Owner |
| **POST** | `/api/webhooks/toss` | 웹훅 | Public (IP 제한) |

### 8.4. Admin

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 대시보드 | Admin |
| **GET** | `/api/admin/orders` | 주문 리스트 | Admin |
| **GET** | `/api/admin/orders/[id]` | 주문 상세 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | 일정 재생성 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 결제 취소 | Admin |
| **GET** | `/api/admin/users` | 회원 리스트 | Admin |

## 9. DB Schema Specification (Supabase)

### 9.1. Entity Map

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

**4. public.trips (여행 일정)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | Null | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `destination` | `text` | **NN** | 목적지 |
| `start_date` | `date` | **NN** | 여행 시작일 |
| `end_date` | `date` | **NN** | 여행 종료일 |
| `budget` | `integer` | **NN** | 예산 (원) |
| `travel_style` | `text` | **NN** | 'SOLO', 'COUPLE', 'FAMILY', 'FRIENDS' |
| `interests` | `jsonb` | **NN** | 관심사 배열 ['food', 'culture', 'nature', 'shopping', 'activity'] |
| `extra_requests` | `text` | Null | 추가 요구사항 |
| `status` | `text` | **NN** | `PENDING`, `COMPLETED`, `FAILED` |
| `share_token` | `text` | Null | 공유용 토큰 (Unique) |
| `share_token_expires_at` | `timestamptz` | Null | 공유 토큰 만료 일시 (기본 30일) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**5. public.trip_days (일별 일정)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `trip_id` | `uuid` | **NN** | FK `trips.id` |
| `day_number` | `integer` | **NN** | 일차 (1, 2, 3...) |
| `date` | `date` | **NN** | 해당 날짜 |
| `summary` | `text` | Null | 일일 요약 |

**6. public.trip_activities (활동)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `trip_day_id` | `uuid` | **NN** | FK `trip_days.id` |
| `time_slot` | `text` | **NN** | 'MORNING', 'AFTERNOON', 'EVENING' |
| `place_name` | `text` | **NN** | 장소명 |
| `category` | `text` | **NN** | 'ATTRACTION', 'RESTAURANT', 'ACCOMMODATION', 'ACTIVITY', 'TRANSPORT' |
| `description` | `text` | Null | 설명 |
| `latitude` | `numeric` | Null | 위도 |
| `longitude` | `numeric` | Null | 경도 |
| `duration_minutes` | `integer` | Null | 예상 소요 시간 |
| `estimated_cost` | `integer` | Null | 예상 비용 (원) |
| `external_url` | `text` | Null | 외부 링크 (예약 등) |
| `address` | `text` | Null | 텍스트 주소 (지도 장애 시 대체 표시용) |
| `order_index` | `integer` | **NN** | 정렬 순서 |

**7. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `trip_id` | `uuid` | **NN** | FK `trips.id` (Unique) |
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

-- trips: 소유자만 접근
CREATE POLICY "Owner full access" ON trips FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM trips WHERE trips.id = orders.trip_id AND (trips.user_id = auth.uid() OR trips.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| trips | `(user_id, status)` | 사용자별 목록 조회 |
| trips | `(guest_id, status)` | 비회원 목록 조회 |
| orders | `(created_at DESC)` | Admin 주문 리스트 |
| orders | `(status)` | 결제 상태별 필터 |

### Connection Pooling
- Supabase Supavisor 사용 (Transaction Mode)
- Pool size: 20 connections

## 10. API E2E Test Scenarios

### 10.1. Auth & Users

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-A-01 | POST | `/api/auth/guest` | 비회원 로그인 성공 | ✅ Pass |
| API-A-02 | POST | `/api/auth/guest` | 로그인 실패 | ✅ Pass |
| API-A-03 | GET | `/api/users/me` | 내 정보 | ✅ Pass |

### 10.2. Trips API

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-T-01 | POST | `/api/trips` | 여행 생성 (정상) | ✅ Pass |
| API-T-02 | POST | `/api/trips` | 필수 정보 누락 | ✅ Pass |
| API-T-03 | GET | `/api/trips` | 내 여행 목록 | ✅ Pass |
| API-T-04 | GET | `/api/trips/[id]` | 여행 상세 | ✅ Pass |
| API-T-05 | GET | `/api/trips/[id]` | 공유 토큰으로 접근 | ✅ Pass |
| API-T-06 | PATCH | `/api/trips/[id]` | 일정 수정 | ✅ Pass |
| API-T-07 | DELETE | `/api/trips/[id]` | 일정 삭제 | ✅ Pass |
| API-T-08 | POST | `/api/trips/generate` | AI 일정 생성 | ✅ Pass |

### 10.3. Payments & Admin

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-P-01 | POST | `/api/payments/confirm` | 결제 성공 | ✅ Pass |
| API-P-02 | POST | `/api/payments/confirm` | 금액 불일치 | ✅ Pass |
| API-AD-01 | GET | `/api/admin/stats` | 통계 | ✅ Pass |
| API-AD-02 | GET | `/api/admin/orders` | 주문 | ✅ Pass |
| API-AD-03 | POST | `/api/admin/orders/[id]/retry` | 재생성 | ✅ Pass |
| API-AD-04 | POST | `/api/admin/orders/[id]/cancel` | 취소 | ✅ Pass |

## 11. Security Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **IAM** | RLS | 비인가 접근 차단 | ✅ Pass |
| **App** | Internal API | generate 외부 호출 차단 | ✅ Pass |
| **App** | Maps API Key | 키가 클라이언트에 노출되지 않음 | ✅ Pass |
| **Input** | Prompt Injection | 악의적 입력 필터링 | ✅ Pass |
| **Payment** | 금액 위변조 | 조작 시 400 | ✅ Pass |
| **Infra** | Rate Limiting | 초과 시 429 | ✅ Pass |

**Prompt Injection 방어 구현**:
- 입력 글자 수 서버 사이드 검증 (최대 10,000자)
- 특수 문자 및 SQL/HTML 패턴 정규식 필터링
- AI 시스템 프롬프트와 사용자 입력을 별도 메시지로 분리 (prompt isolation)
- AI 응답 후처리: 민감 정보 패턴 감지 및 마스킹

**Rate Limiting 구체화**:
- 비회원 로그인: 5회/분 per IP
- AI 생성 요청: 3회/분 per user
- API 전체: 100회/분 per IP
- 구현 방식: Next.js middleware + Upstash Redis
- 초과 시 응답: 429 Too Many Requests + Retry-After 헤더

**Internal API Protection**:
- `x-internal-request` 커스텀 헤더 + 서버 환경변수(`INTERNAL_SECRET`) 검증
- Vercel 배포 시 VPC 내부 통신만 허용

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
| **Rendering** | 지도 lazy loading | ✅ Pass |
| **Network** | 일정 결과 캐싱 | ✅ Pass |
| **Database** | trips(user_id, status), trip_activities(trip_day_id) 인덱싱 | ✅ Pass |
| **SEO** | 동적 Meta + Sitemap | ✅ Pass |
| **UX/AI** | Streaming 일정 생성 | ✅ Pass |

## 13. Compliance Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | ✅ Pass |
| **AI/Data** | AI 학습 미사용 고지 | ✅ Pass |
| **Maps** | Kakao Maps 이용약관 준수 | ✅ Pass |

### 데이터 유출 대응
- 발견 후 72시간 내 관할 당국 통지
- 영향받는 사용자에게 이메일/SMS 통지
- 원인 분석 리포트 및 재발 방지 대책 수립

### 쿠키 동의
- 필수 쿠키 (인증, 결제): 자동 적용
- 분석 쿠키 (GA4): 명시적 동의 후 활성화
- 구현: 하단 고정 Cookie Consent 배너

### 결제 기록 보존 및 폐기
- 결제 완료 기록: 5년 보존 (전자상거래법)
- 회원 탈퇴 시: 결제 기록은 익명화하여 보존
- 5년 경과 후: 완전 삭제
- 비회원 결제 기록: 30일 후 개인정보 마스킹, 결제 기록만 5년 보존
