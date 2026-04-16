# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: RoomGlow (AI 인테리어 스타일링)
- **목표**: 방 사진을 업로드하고 원하는 스타일을 선택하면 AI가 인테리어를 제안하고 Before/After 이미지를 생성하는 수익형 웹 서비스.
- **핵심 가치 1**: AI 이미지 생성으로 실제 방의 구조를 유지한 채 스타일 변화를 프리뷰.
- **핵심 가치 2**: 예산에 맞는 가구/소품 추천으로 실질적인 인테리어 실현 지원.

## 2. 타겟 유저 (Target Audience)

- 자취방, 신혼집 인테리어를 고민하는 20~35대.
- 인테리어에 관심은 있지만 전문 지식이 없는 유저.
- Before/After 변화를 시각적으로 확인하고 싶은 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk (Imagen 3 for interior image generation, fallback to text-only on failure)
- **Storage**: Supabase Storage (이미지 파일)

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Warm, Cozy, Magazine-like.
- **Colors**: Beige, Warm White, Soft Wood, Accent Terracotta.
- **Interactions**: Before/After 슬라이더, 스타일 카드 호버 확대, 이미지 페이드 전환.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout

1. **상단 네비게이션 바**: 홈 로고, 메뉴, 로그인/마이페이지.
2. **Body**: 각 페이지 내용.
3. **Footer**: 사업자 정보, 이용약관, 개인정보처리방침, 문의하기.
4. **Head & Meta**: SEO, Open Graph, GA4.

### 5.2. Page Details

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "방 사진 한 장으로 시작하는 인테리어 변화." CTA ("내 방 스타일링 시작").
   - **Feature Section**: Before/After 프리뷰, 스타일 선택, 가구 추천, 예산 설정.
   - **Social Proof**: "이 앱으로 방을 꾸몄더니 집들이 반응이 폭발했어요" 등 후기.
   - **스타일 갤러리**: 북유럽, 모던, 빈티지, 미니멀, 한국적 모던 등 스타일 프리뷰.

2. **인테리어 설정 (`/interior-setup`)**
   - **방 사진 업로드**: 이미지 파일 (JPG/PNG, 최대 10MB). 최대 3장 (여러 각도).
   - **업로드 검증**:
     - 확장자 화이트리스트: .jpg, .jpeg, .png만 허용
     - MIME 타입 교차 검증 (확장자 변조 방지)
     - 이미지 해상도 권장: 최소 640x480, 최대 4096x4096
     - 비이미지 파일(.exe, .svg 등) 업로드 시 400 에러
   - **스타일 선택**: 북유럽, 모던, 빈티지, 미니멀, 한국적 모던, 인더스트리얼, 프로방스 (복수 선택 가능, 프리미엄).
   - **예산 설정**: 전체 예산 슬라이더 (10만원~500만원).
   - **방 유형**: 원룸, 거실, 침실, 서재, 주방.
   - **추가 요구사항**: 자유 텍스트 (예: "책상 공간이 필요해요").

3. **결제 페이지 (`/payments`)**
   - **UI**: 인테리어 견적서 컨셉.
   - **Function**: `기본/프리미엄` 플랜 스위처, 토스페이먼츠.

4. **인테리어 결과 (`/interior-result/[order-id]`)**
   - **Before/After 프리뷰**: 슬라이더로 원본 ↔ 스타일 적용 이미지 비교.
   - **스타일 분석**: AI가 현재 공간 분석 + 제안 스타일 설명.
   - **가구/소품 추천**: 카테고리별 (조명, 가구, 패브릭, 데코) 추천 아이템.
   - **예산 분석**: 카테고리별 예상 비용 (파이 차트).
   - **프리미엄**: 3개 스타일 비교 + 가구 쇼핑 링크 + AI 3D 프리뷰 이미지.
   - **이미지 생성 실패 시 대응**:
     - 텍스트 분석(스타일 분석, 가구 추천, 예산 분석)은 정상 제공
     - Before/After 이미지 영역에 "이미지 생성에 실패했습니다. 텍스트 분석 결과만 제공됩니다." 안내
     - 결제 금액의 30% 자동 부분 환불 (프리미엄은 50%)
     - 관리자 페이지에서 이미지 재생성 가능 (재생성 성공 시 환불 청구 취소)
   - **저장/공유**: 이미지 다운로드, URL 공유.

5. **유저 마이페이지 (`/my-page`)**: 저장된 스타일링 히스토리, 프로필 수정.
6. **비회원 로그인 (`/guest-login`)**, **비회원 주문 조회 (`/guest-check`)**, **회원 로그인 (`/auth`)**.

### 5.3. E2E Test Checklist

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Landing** | `Home (/)` | 네비게이션, CTA -> `/interior-setup` | ✅ Pass |
| **Auth** | `Guest Login` | 비회원 로그인 | ✅ Pass |
| **Setup** | `interior-setup` | 사진 업로드 + 스타일 선택 | ✅ Pass |
| **Upload** | 이미지 업로드 | JPG/PNG 성공, EXE 차단 | ✅ Pass |
| **Payment** | `payments` | 토스 위젯, 결제 성공 | ✅ Pass |
| **Result** | `interior-result/[id]` | Before/After, 가구 추천 렌더링 | ✅ Pass |
| **My Page** | `my-page` | 스타일링 히스토리 | ✅ Pass |

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

1. **대시보드 (`/admin`)**: 매출, 가입자, 인기 스타일 통계, 평균 예산.
2. **주문 내역 (`/admin/order-list`)**: 주문 테이블.
3. **주문 상세 (`/admin/order-list/[id]`)**: 원본 사진, AI 결과, 가구 추천, 재시도/이미지재생성/취소.
4. **유저 리스트 (`/admin/user-list`)**: 회원/비회원.

### Admin API

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 통계 | Admin |
| **GET** | `/api/admin/orders` | 주문 | Admin |
| **GET** | `/api/admin/orders/[id]` | 상세 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | AI 재생성 | Admin |
| **POST** | `/api/admin/orders/[id]/image-regen` | 이미지 재생성 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 취소 | Admin |
| **GET** | `/api/admin/users` | 회원 | Admin |

## 7. 운영 및 정책

- AI 생성 지연/오류 시 자동 재시도(1회). 최종 실패 시 결제 자동 취소.
- 이미지 생성 실패 시 텍스트 분석만 제공 + 부분 환불 안내.
- 비회원 데이터 30일 보관 후 삭제.
- 업로드 이미지: 분석 완료 후 원본은 30일 내 Supabase Storage에서 삭제.

### 7.3. 이미지 생성 정책
- **AI 이미지 품질**: Imagen 기반 생성, 실제 시공 결과와 다를 수 있음을 결과 페이지에 명시
- **이미지 생성 타임아웃**: 60초 (텍스트 분석은 30초)
- **이미지 보관**: Before/After 이미지는 Supabase Storage에 90일 보관 후 자동 삭제
- **업로드 원본**: 분석 완료 후 30일 내 Supabase Storage에서 자동 삭제
- **저작권 안내**: AI 생성 이미지의 저작권은 서비스 이용약관에 따라 사용자에게 귀속

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

### 8.2. Stylings (인테리어 스타일링)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/stylings` | 스타일링 요청 (이미지 업로드 포함) | User, Guest |
| **POST** | `/api/stylings/generate` | 내부 AI 분석 + 이미지 생성 | Internal |
| **GET** | `/api/stylings` | 내 스타일링 목록 | User |
| **GET** | `/api/stylings/[id]` | 스타일링 상세 | Owner |
| **DELETE** | `/api/stylings/[id]` | 삭제 | Owner |
| **POST** | `/api/stylings/[id]/partial-refund` | 이미지 생성 실패 시 부분 환불 | Internal |

### 8.3. Payments

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 결제 승인 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 결제 상태 | Owner |
| **POST** | `/api/webhooks/toss` | 웹훅 | Public (IP 제한) |

### 8.4. Admin (위 표 참조)

## 9. DB Schema Specification (Supabase)

### Entity Map

**1. users, public.profiles** (동일)

**2. public.guests** (동일)

**3. public.styling_requests (스타일링 요청)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | Null | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `room_images` | `jsonb` | **NN** | 업로드 이미지 URL 배열 |
| `room_type` | `text` | **NN** | 'STUDIO', 'LIVING', 'BEDROOM', 'STUDY', 'KITCHEN' |
| `selected_styles` | `jsonb` | **NN** | 선택한 스타일 배열 ['NORDIC', 'MODERN', ...] |
| `budget` | `integer` | **NN** | 예산 (원) |
| `extra_requests` | `text` | Null | 추가 요구사항 |
| `status` | `text` | **NN** | `PENDING`, `COMPLETED`, `FAILED` |
| `image_count` | `integer` | **NN** | 업로드 이미지 수 (1-3 검증용, Default: 1) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**4. public.style_results (스타일링 결과)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `request_id` | `uuid` | **NN** | FK `styling_requests.id` (Unique) |
| `style_analysis` | `jsonb` | Null | 현재 공간 분석 + 스타일 제안 텍스트 |
| `before_after_images` | `jsonb` | Null | [{style: 'NORDIC', before_url, after_url}] |
| `furniture_recommendations` | `jsonb` | Null | [{category, name, price, image_url, shop_url}] |
| `budget_breakdown` | `jsonb` | Null | 카테고리별 예상 비용 |
| `image_generation_failed` | `boolean` | Null | 이미지 생성 실패 여부 |
| `partial_refund_amount` | `integer` | Null | 부분 환불 금액 |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**5. public.style_presets (스타일 프리셋)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `name` | `text` | **NN** | 스타일명 ('NORDIC', 'MODERN', ...) |
| `display_name` | `text` | **NN** | 표시명 ('북유럽', '모던', ...) |
| `description` | `text` | **NN** | 설명 |
| `thumbnail_url` | `text` | **NN** | 썸네일 이미지 URL |
| `prompt_hint` | `text` | **NN** | AI 프롬프트 힌트 |

**6. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `styling_request_id` | `uuid` | **NN** | FK `styling_requests.id` (Unique) |
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

-- styling_requests: 소유자만 접근
CREATE POLICY "Owner full access" ON styling_requests FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM styling_requests WHERE styling_requests.id = orders.styling_request_id AND (styling_requests.user_id = auth.uid() OR styling_requests.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| styling_requests | `(user_id, status)` | 사용자별 목록 조회 |
| styling_requests | `(guest_id, status)` | 비회원 목록 조회 |
| orders | `(created_at DESC)` | Admin 주문 리스트 |
| orders | `(status)` | 결제 상태별 필터 |

### Connection Pooling
- Supabase Supavisor 사용 (Transaction Mode)
- Pool size: 20 connections

## 10. API E2E Test Scenarios

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-A-01 | POST | `/api/auth/guest` | 비회원 로그인 | ✅ Pass |
| API-S-01 | POST | `/api/stylings` | 스타일링 요청 (이미지 포함) | ✅ Pass |
| API-S-02 | POST | `/api/stylings` | 미지원 파일 포맷 | ✅ Pass |
| API-S-03 | POST | `/api/stylings` | 파일 크기 초과 (10MB) | ✅ Pass |
| API-S-04 | GET | `/api/stylings/[id]` | 결과 조회 | ✅ Pass |
| API-S-05 | POST | `/api/stylings/generate` | AI 생성 | ✅ Pass |
| API-P-01 | POST | `/api/payments/confirm` | 결제 성공 | ✅ Pass |
| API-AD-01 | GET | `/api/admin/stats` | 통계 | ✅ Pass |
| API-AD-02 | POST | `/api/admin/orders/[id]/retry` | 재생성 | ✅ Pass |
| API-AD-03 | POST | `/api/admin/orders/[id]/image-regen` | 이미지 재생성 | ✅ Pass |
| API-AD-04 | POST | `/api/admin/orders/[id]/cancel` | 취소 | ✅ Pass |

## 11. Security Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **IAM** | RLS | 비인가 접근 차단 | ✅ Pass |
| **App** | Internal API | generate 외부 호출 차단 | ✅ Pass |
| **App** | 파일 업로드 | .exe 업로드 차단 | ✅ Pass |
| **App** | 이미지 검증 | 비이미지 파일 차단 | ✅ Pass |
| **Input** | Prompt Injection | 악의적 extra_requests 필터링 | ✅ Pass |
| **Payment** | 금액 위변조 | 조작 시 400 | ✅ Pass |
| **Storage** | 이미지 접근 | Supabase Storage RLS | ✅ Pass |
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
| **Rendering** | Before/After 이미지 lazy loading | ✅ Pass |
| **Rendering** | 스타일 갤러리 가상 스크롤 | ✅ Pass |
| **Network** | 결과 이미지 CDN 캐싱 | ✅ Pass |
| **Database** | styling_requests(user_id, status) 인덱싱 | ✅ Pass |
| **Storage** | 이미지 WebP 변환 | ✅ Pass |
| **SEO** | 동적 Meta | ✅ Pass |
| **UX/AI** | 이미지 생성 진행률 표시 | ✅ Pass |

## 13. Compliance Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | ✅ Pass |
| **Privacy** | 업로드 이미지 30일 내 삭제 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | ✅ Pass |
| **AI/Data** | AI 학습 미사용 고지 | ✅ Pass |
| **AI/Data** | AI 생성 이미지 저작권 안내 | ✅ Pass |

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
