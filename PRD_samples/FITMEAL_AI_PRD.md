# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: FitMeal AI (AI 식단 & 운동 플래너)
- **목표**: 사용자의 체형, 목표, 알레르기를 입력하면 AI가 주간 식단과 운동 루틴을 생성하는 수익형 웹 서비스.
- **핵심 가치 1**: 개인 맞춤형 식단과 운동을 캘린더 UI로 직관적으로 관리.
- **핵심 가치 2**: 영양소 시각화(차트)와 체중 트래킹으로 동기부여 제공.

## 2. 타겟 유저 (Target Audience)

- 다이어트, 증량, 체지방 감소 등 체형 관리가 필요한 20~40대.
- 식단과 운동을 체계적으로 관리하고 싶은 건강 관심자.
- 모바일에서 식단/운동을 빠르게 확인하고 기록하고 싶은 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Fresh, Energetic, Healthy.
- **Colors**: Fresh Green, Orange Accent, White Background.
- **Interactions**: 캘린더 슬라이드 애니메이션, 차트 게이지 애니메이션, 식단 카드 플립.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout (Common Structure)

1. **상단 네비게이션 바**
   - **(공통)**: 홈 로고.
   - **(Desktop)**: 전체 메뉴 노출.
   - **(Mobile)**: 우측 상단 `햄버거 메뉴` 아이콘.
   - **(비회원)**: `로그인`, `비회원 주문 조회`.
   - **(회원)**: `마이페이지`, `내 캘린더`.
2. **Body**: 각 페이지 별 주요 내용 렌더링.
3. **Footer**: 사업자 정보, `이용약관`, `개인정보처리 방침`, `문의하기`.
4. **Head & Meta**: SEO, Open Graph, GA4 설정.

### 5.2. Page Details

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "AI가 짜주는 나만의 식단과 운동, 건강한 변화의 시작." CTA ("내 맞춤 플랜 시작하기").
   - **Feature Section**: 주간 맞춤 식단, 운동 루틴, 영양소 분석, 체중 트래킹.
   - **Social Proof**: "이 앱 쓰고 한 달에 3kg 감량했어요" 등 후기.

2. **플랜 설정 페이지 (`/plan-setup`)**
   - **기본 정보**: 성별, 나이, 키, 현재 체중, 목표 체중.
   - **목표 선택**: 감량 / 증량 / 유지.
   - **알레르기/기피 식품**: 선택형 (우유, 계란, 견과류, 해산물, 글루텐 등).
   - **식사 횟수**: 3식 / 3식+간식 / 2식.
   - **운동 레벨**: 초보 / 중급 / 고급.
   - **플랜 기간**: 1주 / 2주 / 4주 / 8주.
   - **주의사항**: AI 생성 식단은 참고용이며 의학적 조언이 아님.

3. **결제 페이지 (`/payments`)**
   - **UI**: 영수증 컨셉 카드.
   - **Function**: `기본/프리미엄` 플랜 스위처, 토스페이먼츠 연동.

4. **플랜 결과 페이지 (`/plan-result/[order-id]`)**
   - **주간 식단**: 월~일, 식사별 메뉴, 칼로리, 탄단지.
   - **운동 루틴**: 부위별 운동, 세트/횟수, AI 생성 가이드 이미지.
   - **영양소 요약**: 원형 차트(탄단지 비율), 일일 칼로리 막대 그래프 (Recharts).
   - **쇼핑리스트 (프리미엄)**: 주간 필요 식재료 목록.
   - **알레르기 필터 검증**: AI 생성 식단이 사용자가 설정한 알레르기 식품을 포함하지 않는지 DB 레벨에서 교차 검증. 매칭 발생 시 해당 메뉴 자동 대체.

5. **식단 캘린더 (`/calendar`)**
   - (회원전용) 주간/월간 캘린더 뷰.
   - 날짜 클릭 시 해당 일 식단/운동 상세.
   - 체중 입력 -> 체중 변화 그래프.
   - **플랜 재생성**: 목표 체중 도달 또는 체중 변화 추이가 예상과 크게 다를 경우, "플랜 재생성" 버튼으로 새 조건 기반 AI 플랜 재생성 가능.

6. **유저 마이페이지 (`/my-page`)**
   - (회원전용) 플랜 히스토리, 체중 트래킹 그래프, 프로필 수정.

7. **비회원 로그인 (`/guest-login`)**, **비회원 주문 조회 (`/guest-check`)**, **회원 로그인 (`/auth`)**

### 5.3. E2E Test Checklist

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Landing** | `Home (/)` | 네비게이션, CTA -> `/plan-setup` | ✅ Pass |
| **Authentication** | `Guest Login` | 비회원 로그인 성공/실패 | ✅ Pass |
| **Plan Setup** | `plan-setup` | 체형 정보 입력 -> 결제 플로우 | ✅ Pass |
| **Payment** | `payments` | 토스 위젯 로드, 결제 성공 | ✅ Pass |
| **Result** | `plan-result/[id]` | 식단/운동/차트 렌더링 | ✅ Pass |
| **Calendar** | `calendar` | 캘린더 뷰, 날짜별 상세, 체중 입력 | ✅ Pass |
| **My Page** | `my-page` | 플랜 히스토리, 체중 그래프 | ✅ Pass |

### 5.4. Guest Checkout 구현 리스트

| 구분 | 주요 기능 | 구현 내용 | 구현 여부 | E2E 테스트 |
|---|---|---|---|---|
| **Frontend** | `/plan-setup` 폼 | 비회원 phone/password UI | ✅ 완료 | ✅ 완료 |
| **Frontend** | API Payload | `POST /api/plans`에 비회원 정보 포함 | ✅ 완료 | ✅ 완료 |
| **Backend** | 로직 분기 | Auth 없을 시 Guest 처리 | ✅ 완료 | ✅ 완료 |
| **Backend** | 비밀번호 해싱 | Bcrypt | ✅ 완료 | ✅ 완료 |
| **Backend** | Guest 생성 | `guests` 레코드 생성 | ✅ 완료 | ✅ 완료 |
| **Database** | RLS 설정 | 익명 삽입 권한 | ✅ 완료 | ✅ 완료 |

## 6. Admin UX Flow & Layout

### 6.1. Admin Global Layout

1. **좌측 LNB**: `대시보드`, `주문 내역`, `회원 관리`.
2. **Body**: 페이지별 콘텐츠.

### 6.2. Admin Page Details

1. **대시보드 (`/admin`)**: 매출, 가입자, 인기 목표(감량/증량) 통계.
2. **주문 내역 (`/admin/order-list`)**: 결제 완료 주문 테이블.
3. **주문 상세 (`/admin/order-list/[id]`)**: 주문 정보, 플랜 상세(식단/운동), 재시도/취소.
4. **유저 리스트 (`/admin/user-list`)**: 회원/비회원 통합.

### 6.3. Admin Requirements - Frontend & Backend

| 구분 | 페이지/API | 구현 내용 | 구현 여부 | E2E 테스트 |
|---|---|---|---|---|
| **공통** | 레이아웃 + Middleware | LNB, Protected Route, ADMIN 검증 | ✅ 완료 | ✅ 완료 |
| **통계** | `GET /api/admin/stats` | 매출, 가입자, 목표별 통계 | ✅ 완료 | ✅ 완료 |
| **주문** | `GET /api/admin/orders` | 주문 리스트, 페이지네이션 | ✅ 완료 | ✅ 완료 |
| | `GET /api/admin/orders/[id]` | 주문 상세 (식단+운동) | ✅ 완료 | ✅ 완료 |
| | `POST /.../retry` | AI 재생성 | ✅ 완료 | ✅ 완료 |
| | `POST /.../cancel` | 결제 취소 | ✅ 완료 | ✅ 완료 |
| **회원** | `GET /api/admin/users` | 회원/비회원 통합 조회 | ✅ 완료 | ✅ 완료 |

## 7. 운영 및 정책

### 7.1. 예외 및 실패 처리

- AI 플랜 생성 지연/오류 시 자동 재시도(1회).
- 최종 실패 시 오류 안내 + 결제 자동 취소.

### 7.2. 데이터 및 보안 정책

- **건강 정보 보호**: 입력된 체형/건강 정보는 암호화 저장.
- **비회원 데이터**: 30일 보관 후 삭제.
- **의학적 면책**: AI 식단/운동은 참고용이며 의학적 진단이 아님을 명시.

### 7.3. 건강 데이터 특수 정책
- **민감 정보 처리**: 체중, 체형 정보는 AES-256 암호화하여 DB 저장
- **의학적 면책 강화**: 모든 식단/운동 결과 페이지 하단에 "본 플랜은 AI가 생성한 참고 자료이며, 의학적 진단·처방을 대체하지 않습니다. 건강 상태에 따라 전문의와 상담하세요." 문구 필수 표시
- **미성년자 보호**: 만 14세 미만은 서비스 이용 불가 (가입 시 생년월일 검증)

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

### 8.1. Auth & Users

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/auth/guest` | 비회원 로그인 | Public |
| **POST** | `/api/auth/logout` | 로그아웃 | User, Guest |
| **GET** | `/api/users/me` | 내 정보 | User |
| **PATCH** | `/api/users/me` | 프로필 수정 | User |

### 8.2. Plans (식단/운동 플랜)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/plans` | 플랜 생성 및 AI 요청 | User, Guest |
| **POST** | `/api/plans/generate` | 내부 AI 생성 | Internal |
| **GET** | `/api/plans` | 내 플랜 목록 | User |
| **GET** | `/api/plans/[id]` | 플랜 상세 (식단+운동) | Owner |
| **POST** | `/api/plans/validate-allergies` | AI 식단 알레르기 교차 검증 | Internal |

### 8.3. Weight Logs (체중 기록)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/weight-logs` | 체중 기록 추가 | User, Guest |
| **GET** | `/api/weight-logs` | 체중 기록 목록 | User, Guest |
| **DELETE** | `/api/weight-logs/[id]` | 체중 기록 삭제 | Owner |

> **주의**: 비회원의 체중 기록은 `weight_logs.guest_id` 컬럼을 통해 관리. `guest_id` 컬럼 추가 필요.

### 8.4. Payments

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 결제 승인 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 결제 상태 | Owner |
| **POST** | `/api/webhooks/toss` | 웹훅 | Public (IP 제한) |

### 8.5. Admin

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 대시보드 | Admin |
| **GET** | `/api/admin/orders` | 주문 리스트 | Admin |
| **GET** | `/api/admin/orders/[id]` | 주문 상세 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | AI 재생성 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 결제 취소 | Admin |
| **GET** | `/api/admin/users` | 회원 리스트 | Admin |

### 8.6. 공통 API 규약

**페이지네이션**:
- 리스트 API는 cursor 기반 페이지네이션 적용
- Query Parameters: `cursor` (마지막 항목 ID), `limit` (기본 20, 최대 100)
- 응답에 `next_cursor` 포함, `null`이면 마지막 페이지

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

## 9. DB Schema Specification (Supabase)

### 9.1. Entity Map

**1. users (Supabase Auth)**

**2. public.profiles**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK, References `auth.users.id` |
| `nickname` | `text` | **NN** | 닉네임 |
| `role` | `text` | **NN** | 'USER' or 'ADMIN' |
| `created_at` | `timestamptz` | **NN** | 가입 일시 |

**3. public.guests**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `phone` | `text` | **NN** | 전화번호 (Unique) |
| `password_hash` | `text` | **NN** | 비밀번호 (Bcrypt) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**4. public.plans (식단/운동 플랜)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | Null | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `goal` | `text` | **NN** | 'LOSS', 'GAIN', 'MAINTAIN' |
| `current_weight` | `numeric` | **NN** | 현재 체중 (kg) |
| `target_weight` | `numeric` | **NN** | 목표 체중 (kg) |
| `height` | `numeric` | **NN** | 키 (cm) |
| `age` | `integer` | **NN** | 나이 |
| `gender` | `text` | **NN** | 'MALE', 'FEMALE' |
| `allergies` | `jsonb` | **NN** | 알레르기 배열 (Default: []) |
| `meals_per_day` | `integer` | **NN** | 식사 횟수 |
| `exercise_level` | `text` | **NN** | 'BEGINNER', 'INTERMEDIATE', 'ADVANCED' |
| `status` | `text` | **NN** | `PENDING`, `COMPLETED`, `FAILED` |
| `duration_weeks` | `integer` | **NN** | 플랜 기간 (주) |
| `shopping_list` | `jsonb` | Null | 쇼핑리스트 (프리미엄) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**5. public.meals (식단 데이터)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `plan_id` | `uuid` | **NN** | FK `plans.id` |
| `day_of_week` | `integer` | **NN** | 요일 (0=월, 6=일) |
| `meal_type` | `text` | **NN** | 'BREAKFAST', 'LUNCH', 'DINNER', 'SNACK' |
| `menu` | `text` | **NN** | 메뉴명 |
| `calories` | `integer` | **NN** | 칼로리 (kcal) |
| `carbs` | `numeric` | **NN** | 탄수화물 (g) |
| `protein` | `numeric` | **NN** | 단백질 (g) |
| `fat` | `numeric` | **NN** | 지방 (g) |
| `recipe_url` | `text` | Null | 레시피 링크 |

**6. public.workouts (운동 데이터)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `plan_id` | `uuid` | **NN** | FK `plans.id` |
| `day_of_week` | `integer` | **NN** | 요일 |
| `body_part` | `text` | **NN** | 부위 ('CHEST', 'BACK', 'LEGS', 'CORE', 'CARDIO', 'FULL_BODY') |
| `exercise_name` | `text` | **NN** | 운동명 |
| `sets` | `integer` | **NN** | 세트 수 |
| `reps` | `integer` | **NN** | 횟수 |
| `guide_image_url` | `text` | Null | AI 생성 운동 가이드 이미지 |

**7. public.weight_logs (체중 기록)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | **NN** | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `weight` | `numeric` | **NN** | 체중 (kg) |
| `recorded_at` | `date` | **NN** | 기록 날짜 |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**8. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `plan_id` | `uuid` | **NN** | FK `plans.id` (Unique) |
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

-- plans: 소유자만 접근 (user_id 또는 guest_id 매칭)
CREATE POLICY "Owner full access" ON plans FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM plans WHERE plans.id = orders.plan_id AND (plans.user_id = auth.uid() OR plans.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| plans | `(user_id, status)` | 사용자별 목록 조회 |
| plans | `(guest_id, status)` | 비회원 목록 조회 |
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
| API-A-03 | POST | `/api/auth/logout` | 로그아웃 | ✅ Pass |
| API-A-04 | GET | `/api/users/me` | 내 정보 (인증) | ✅ Pass |
| API-A-05 | PATCH | `/api/users/me` | 프로필 수정 | ✅ Pass |

### 10.2. Plans API

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-PL-01 | POST | `/api/plans` | 플랜 생성 (정상) | ✅ Pass |
| API-PL-02 | POST | `/api/plans` | 필수 정보 누락 | ✅ Pass |
| API-PL-03 | GET | `/api/plans` | 내 플랜 목록 | ✅ Pass |
| API-PL-04 | GET | `/api/plans/[id]` | 플랜 상세 (식단+운동) | ✅ Pass |
| API-PL-05 | POST | `/api/plans/generate` | AI 생성 요청 | ✅ Pass |

### 10.3. Weight Logs API

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-W-01 | POST | `/api/weight-logs` | 체중 기록 추가 | ✅ Pass |
| API-W-02 | GET | `/api/weight-logs` | 체중 목록 | ✅ Pass |
| API-W-03 | DELETE | `/api/weight-logs/[id]` | 기록 삭제 | ✅ Pass |

### 10.4. Payments API

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-P-01 | POST | `/api/payments/confirm` | 결제 성공 | ✅ Pass |
| API-P-02 | POST | `/api/payments/confirm` | 금액 불일치 | ✅ Pass |
| API-P-03 | POST | `/api/webhooks/toss` | 웹훅 정상 | ✅ Pass |

### 10.5. Admin API

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-AD-01 | GET | `/api/admin/stats` | 통계 | ✅ Pass |
| API-AD-02 | GET | `/api/admin/orders` | 주문 리스트 | ✅ Pass |
| API-AD-03 | GET | `/api/admin/orders/[id]` | 주문 상세 | ✅ Pass |
| API-AD-04 | POST | `/api/admin/orders/[id]/retry` | 재생성 | ✅ Pass |
| API-AD-05 | POST | `/api/admin/orders/[id]/cancel` | 취소 | ✅ Pass |
| API-AD-06 | GET | `/api/admin/users` | 회원 리스트 | ✅ Pass |
| API-AD-07 | N/A | `/api/admin/*` | 권한 없는 접근 | ✅ Pass |

## 11. Security Checklist

### 11.1 Identity & Access Management

- **Supabase RLS**: 모든 테이블 RLS 적용.
- **API 권한 제어**: ADMIN 검증.
- **비회원 비밀번호**: Bcrypt + Salt.

### 11.2 Application & Data Security

- **Internal API Protection**: `/api/plans/generate` 외부 호출 차단.
  - `x-internal-request` 커스텀 헤더 + 서버 환경변수(`INTERNAL_SECRET`) 검증
  - Vercel 배포 시 VPC 내부 통신만 허용
- **건강 정보 보호**: 체중/체형 데이터 암호화 저장 고려.
- **Error Handling**: 내부 예외 노출 금지.
- **CSRF 방어**:
  - SameSite=Strict 쿠키 설정
  - 상태 변경 API(POST/PATCH/DELETE)에 커스텀 헤더 검증

### 11.3 AI & Input Validation

- **Prompt Injection 방어**: 입력 글자 수 제한.
  - 입력 글자 수 서버 사이드 검증 (최대 10,000자)
  - 특수 문자 및 SQL/HTML 패턴 정규식 필터링
  - AI 시스템 프롬프트와 사용자 입력을 별도 메시지로 분리 (prompt isolation)
  - AI 응답 후처리: 민감 정보(전화번호, 주민번호) 패턴 감지 및 마스킹
- **XSS 차단**: 모든 출력 이스케이프.

### 11.3.1 Rate Limiting
- 비회원 로그인: 5회/분 per IP
- AI 생성 요청: 3회/분 per user
- API 전체: 100회/분 per IP
- 구현 방식: Next.js middleware + Upstash Redis (또는 Supabase pg_rate_limit)
- 초과 시 응답: 429 Too Many Requests + Retry-After 헤더

### 11.3.2 Admin 인증
- 미들웨어에서 `profiles.role = 'ADMIN'` 검증
- Admin 세션 타임아웃: 30분 비활동 시 자동 로그아웃
- 모든 Admin 액션 감사 로그 기록

### 11.4 Payment Security

- **금액 위변조 방지**, **Webhook 검증**, **멱등성 보장**.

### 11.5 Security E2E Test Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **IAM** | RLS | 비인가 접근 차단 | ✅ Pass |
| **App** | Internal API | generate 외부 호출 차단 | ✅ Pass |
| **Input** | Prompt Injection | 악의적 입력 필터링 | ✅ Pass |
| **Payment** | 금액 위변조 | 조작 시 400 | ✅ Pass |
| **Infra** | Rate Limiting | 초과 시 429 | ✅ Pass |

**Prompt Injection 방어 구현**:
- 입력 글자 수 서버 사이드 검증 (최대 10,000자)
- 특수 문자 및 SQL/HTML 패턴 정규식 필터링
- AI 시스템 프롬프트와 사용자 입력을 별도 메시지로 분리 (prompt isolation)
- AI 응답 후처리: 민감 정보(전화번호, 주민번호) 패턴 감지 및 마스킹

**Rate Limiting 구체화**:
- 비회원 로그인: 5회/분 per IP
- AI 생성 요청: 3회/분 per user
- API 전체: 100회/분 per IP
- 구현 방식: Next.js middleware + Upstash Redis (또는 Supabase pg_rate_limit)
- 초과 시 응답: 429 Too Many Requests + Retry-After 헤더

**Internal API Protection**:
- `x-internal-request` 커스텀 헤더 + 서버 환경변수(`INTERNAL_SECRET`) 검증
- Vercel 배포 시 VPC 내부 통신만 허용

**CSRF 방어**:
- SameSite=Strict 쿠키 설정
- 상태 변경 API(POST/PATCH/DELETE)에 커스텀 헤더 검증

**Admin 인증**:
- 미들웨어에서 `profiles.role = 'ADMIN'` 검증
- Admin 세션 타임아웃: 30분 비활동 시 자동 로그아웃
- 모든 Admin 액션 감사 로그 기록

## 12. Service Optimization Checklist

### 12.1 Rendering

- **이미지 최적화**: `next/image`, 운동 가이드 이미지 WebP.
- **Client Component 최소화**: 차트 + 캘린더에만 `"use client"`.

### 12.2 Network

- **데이터 캐싱**: 플랜 결과 캐싱.
- **Web Vitals**: LCP, INP, CLS.

### 12.3 Database

- **인덱싱**: plans(user_id, status), meals(plan_id, day_of_week), weight_logs(user_id, recorded_at).
- **Connection Pooling**: Supavisor.
- **Cursor 페이지네이션**: 히스토리 조회.

### 12.4 SEO

- **동적 메타데이터**: `/plan-result/[id]` OG 태그.
- **Sitemap**.

### 12.5 AI UX

- **Streaming**: 플랜 생성 중 실시간 출력.
- **Debouncing**: 결제 버튼.

### 12.6 E2E Optimization Test Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Rendering** | 이미지 WebP 서빙 | ✅ Pass |
| **Network** | 플랜 결과 캐싱 | ✅ Pass |
| **Database** | 인덱싱 | ✅ Pass |
| **SEO** | 동적 Meta | ✅ Pass |
| **UX/AI** | Streaming | ✅ Pass |

## 13. Compliance Checklist

### 13.1 Privacy

- **수집 최소화**, **명시적 동의**, **잊혀질 권리**, **비회원 30일 보관**.

### 13.2 Payment

- **Toss 가이드라인**, **결제 기록 5년 보존**, **청약 철회 불가 고지**.

### 13.3 AI & Health Data

- **AI 학습 미사용**: 프라이버시 정책 명시.
- **건강 정보 면책**: "AI 식단/운동은 참고용이며 의학적 진단을 대체하지 않습니다" 명시.

### 13.4. 데이터 유출 대응
- 발견 후 72시간 내 관할 당국 통지 (개인정보보호법)
- 영향받는 사용자에게 이메일/SMS 통지
- 원인 분석 리포트 작성 및 재발 방지 대책 수립

### 13.5. 쿠키 동의
- 필수 쿠키 (인증 세션, 결제 세션): 서비스 이용에 필요하므로 자동 적용
- 분석 쿠키 (GA4, Hotjar): 명시적 동의 후 활성화
- 구현: 하단 고정 Cookie Consent 배너, 동의 거부 시에도 서비스 이용 가능

### 13.6. 결제 기록 보존 및 폐기
- 결제 완료 기록: 5년 보존 (전자상거래법 제6조)
- 회원 탈퇴 시: 결제 기록은 개인식별정보(이메일, 닉네임)를 익명화하여 보존
- 5년 경과 후: 결제 기록 완전 삭제
- 비회원 결제 기록: 30일 후 개인정보 마스킹, 결제 기록만 5년 보존

### 13.7 Compliance E2E Test Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | ✅ Pass |
| **AI/Health** | 의학적 면책 고지 | ✅ Pass |
