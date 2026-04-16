# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: LetterLab (AI 편지 & 메시지 작성기)
- **목표**: 상황과 키워드를 입력하면 AI가 맞춤형 편지/메시지를 작성하고, 디자인 템플릿으로 꾸며 이미지로 내보내는 수익형 웹 서비스.
- **핵심 가치 1**: 다양한 상황(생일, 사과, 감사, 고백 등)에 맞는 편지를 여러 톤으로 자동 생성.
- **핵심 가치 2**: 폰트, 배경, 레이아웃을 커스터마이징하여 예쁜 이미지 카드로 공유.

## 2. 타겟 유저 (Target Audience)

- 특별한 메시지를 전하고 싶지만 글쓰기가 어려운 20~40대.
- SNS에 예쁜 감성 글귀를 공유하고 싶은 유저.
- 비즈니스 이메일, 청첩장 문구 등 전문적인 글이 필요한 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk
- **Export**: html-to-image (클라이언트 사이드 이미지 변환)
- **Fonts**: Google Fonts (무료) + 로컬 웹폰트 (상업용 라이선스 확인된 폰트만 사용). `next/font`로 최적화.

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Warm, Artistic, Paper-like.
- **Colors**: Cream, Soft Rose, Warm Gray, Accent Gold.
- **Interactions**: 편지지 텍스처 효과, 폰트 실시간 프리뷰, 템플릿 슬라이드 전환.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout

1. **상단 네비게이션 바**: 홈 로고, 메뉴, 로그인/마이페이지.
2. **Body**: 각 페이지 내용.
3. **Footer**: 사업자 정보, 이용약관, 개인정보처리방침, 문의하기.
4. **Head & Meta**: SEO, Open Graph, GA4.

### 5.2. Page Details

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "마음을 글로 전하세요, AI가 함께 씁니다." CTA ("편지 쓰기").
   - **Feature Section**: 상황별 편지 생성, 다양한 톤, 디자인 템플릿, 이미지 공유.
   - **Social Proof**: "사과 편지 썼더니 바로 화풀었어요" 등 후기.
   - **카테고리 갤러리**: 생일, 사과, 감사, 사랑, 청첩장, 조의문, 자기소개, 비즈니스, 새해, 크리스마스.

2. **편지 작성 설정 (`/letter-setup`)**
   - **상황 카테고리**: BIRTHDAY, APOLOGY, THANKS, LOVE, WEDDING, CONDOLENCE, INTRO, BUSINESS, NEWYEAR, CHRISTMAS, CUSTOM.
   - **핵심 메시지**: 전달하고 싶은 내용 (키워드 또는 짧은 문장).
   - **받는 사람**: 관계 (친구, 연인, 부모님, 상사, 동료 등).
   - **어조**: 정중, 친근, 유머러스, 감성적.
   - **생성 수량**: 3개 버전 (기본).
   - **핵심 메시지 글자 수 제한**: 최대 500자
   - **받는 사람 관계 커스텀 입력**: 목록에 없는 관계는 '직접 입력' 선택 후 최대 20자

3. **결제 페이지 (`/payments`)**: 영수증 컨셉, 기본/프리미엄 플랜, 토스페이먼츠.

4. **편지 결과 (`/letter-result/[order-id]`)**
   - **편지 텍스트**: AI가 작성한 3개 버전. 각각 다른 톤.
   - **편집기**: 텍스트 직접 수정 가능.
   - **디자인 편집**:
     - 폰트 선택 (손글씨, 고딕, 명조, 영어 등).
     - 배경 템플릿 (편지지, 모던, 귀여운, 미니멀, 겨울, 꽃 등).
     - 텍스트 배치 (왼쪽/가운데/오른쪽 정렬).
   - **프리미엄**: 프리미엄 템플릿 + AI 커버 이미지 생성 + 무제한 편지.
   - **내보내기**: PNG 이미지 다운로드, SNS 공유.
   - **Export 프로세스**:
     1. `html-to-image` (dom-to-image-more)로 클라이언트 사이드에서 PNG 생성
     2. 생성된 이미지를 Supabase Storage에 업로드
     3. Storage URL을 `exports` 테이블에 저장
     4. 다운로드 및 SNS 공유는 Storage URL 기반

5. **템플릿 갤러리 (`/gallery`)**: 공개 템플릿 둘러보기, 프리미엄 표시.

6. **유저 마이페이지 (`/my-page`)**: 저장된 편지, 프로필 수정.
7. **비회원 로그인 (`/guest-login`)**, **비회원 주문 조회 (`/guest-check`)**, **회원 로그인 (`/auth`)**.

### 5.3. E2E Test Checklist

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Landing** | `Home (/)` | 카테고리 갤러리, CTA -> `/letter-setup` | ✅ Pass |
| **Auth** | `Guest Login` | 비회원 로그인 | ✅ Pass |
| **Setup** | `letter-setup` | 카테고리, 키워드, 어조 선택 | ✅ Pass |
| **Payment** | `payments` | 토스 위젯, 결제 성공 | ✅ Pass |
| **Result** | `letter-result/[id]` | 3개 버전 편지, 디자인 편집, 이미지 export | ✅ Pass |
| **Gallery** | `gallery` | 템플릿 갤러리 렌더링 | ✅ Pass |
| **My Page** | `my-page` | 저장된 편지 리스트 | ✅ Pass |

### 5.4. Guest Checkout 구현 리스트

| 구분 | 주요 기능 | 구현 여부 | E2E 테스트 |
|---|---|---|---|
| **Frontend** | 비회원 폼 | ✅ 완료 | ✅ 완료 |
| **Backend** | Guest 분기 | ✅ 완료 | ✅ 완료 |
| **Backend** | Bcrypt 해싱 | ✅ 완료 | ✅ 완료 |
| **Database** | RLS 설정 | ✅ 완료 | ✅ 완료 |

## 6. Admin UX Flow & Layout

1. **대시보드 (`/admin`)**: 매출, 가입자, 카테고리별 인기 통계.
2. **주문 내역 (`/admin/order-list`)**: 주문 테이블.
3. **주문 상세 (`/admin/order-list/[id]`)**: 편지 내용, 설정, 재시도/취소.
4. **유저 리스트 (`/admin/user-list`)**: 회원/비회원.
5. **템플릿 관리 (`/admin/templates`)**: 템플릿 CRUD, 프리미엄 설정.

### Admin API

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 통계 | Admin |
| **GET** | `/api/admin/orders` | 주문 | Admin |
| **GET** | `/api/admin/orders/[id]` | 상세 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | 재생성 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 취소 | Admin |
| **GET** | `/api/admin/users` | 회원 | Admin |
| **GET** | `/api/admin/templates` | 템플릿 | Admin |
| **POST** | `/api/admin/templates` | 템플릿 생성 | Admin |
| **PATCH** | `/api/admin/templates/[id]` | 템플릿 수정 | Admin |
| **DELETE** | `/api/admin/templates/[id]` | 템플릿 삭제 | Admin |

## 7. 운영 및 정책

### 7.1. 예외 및 실패 처리

- AI 생성 지연/오류 시 자동 재시도(1회). 최종 실패 시 결제 자동 취소.
- 비회원 데이터 30일 보관 후 삭제.
- AI 생성 편지는 참고용이며, 실제 발송 시 내용 확인 권장.

### 7.2. 데이터 및 보안 정책

- **비회원 데이터**: 30일 보관 후 삭제.
- **AI 생성 편지**: 참고용이며, 실제 발송 시 내용 확인 권장.

### 7.3. 폰트 및 콘텐츠 정책
- **폰트 라이선스**: 상업용 서비스에서 사용 가능한 라이선스 폰트만 등록 (관리자가 확인 후 등록)
- **AI 생성 편지 저작권**: AI 생성 편지의 저작권은 사용자에게 귀속 (약관에 명시)
- **편지 내용 모니터링**: AI 생성 결과에 유해/불법 콘텐츠 감지 시 자동 필터링

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

### 8.2. Letters (편지)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/letters` | 편지 생성 요청 | User, Guest |
| **POST** | `/api/letters/generate` | 내부 AI 편지 생성 | Internal |
| **GET** | `/api/letters` | 내 편지 목록 | User |
| **GET** | `/api/letters/[id]` | 편지 상세 | Owner |
| **PATCH** | `/api/letters/[id]` | 편지 수정 (텍스트/디자인) | Owner |
| **DELETE** | `/api/letters/[id]` | 삭제 | Owner |

### 8.3. Templates (템플릿)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/templates` | 템플릿 리스트 (공개) | Public |
| **GET** | `/api/templates/[id]` | 템플릿 상세 | Public |

### 8.4. Payments

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 결제 승인 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 결제 상태 | Owner |
| **POST** | `/api/webhooks/toss` | 웹훅 | Public (IP 제한) |

### 공통 API 규약

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

### Entity Map

**1. users, public.profiles** (동일)

**2. public.guests** (동일)

**3. public.letters (편지)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | Null | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `category` | `text` | **NN** | 상황 카테고리 |
| `recipient_relation` | `text` | **NN** | 받는 사람 관계 |
| `tone` | `text` | **NN** | 'POLITE', 'FRIENDLY', 'HUMOROUS', 'EMOTIONAL' |
| `keywords` | `text` | **NN** | 핵심 메시지/키워드 |
| `versions` | `jsonb` | **NN** | AI 생성 편지 3개 버전 [{text, tone}] |

> **versions JSON 스키마**: `[{text: string, tone: 'POLITE'|'FRIENDLY'|'HUMOROUS'|'EMOTIONAL', word_count: number}]`
| `selected_version` | `integer` | Null | 선택한 버전 (1, 2, 3) |
| `edited_text` | `text` | Null | 사용자 수정 텍스트 |
| `font_id` | `uuid` | Null | FK `fonts.id` |
| `template_id` | `uuid` | Null | FK `templates.id` |
| `text_align` | `text` | Null | 'LEFT', 'CENTER', 'RIGHT' |
| `cover_image_url` | `text` | Null | AI 생성 커버 이미지 (프리미엄) |
| `export_image_url` | `text` | Null | 최종 export 이미지 |
| `status` | `text` | **NN** | `PENDING`, `COMPLETED`, `FAILED` |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**4. public.templates (디자인 템플릿)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `name` | `text` | **NN** | 템플릿명 |
| `category` | `text` | Null | 카테고리 (범용이면 Null) |
| `background_url` | `text` | **NN** | 배경 이미지 URL |
| `is_premium` | `boolean` | **NN** | 프리미엄 여부 |
| `is_active` | `boolean` | **NN** | 활성 여부 |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**5. public.fonts (폰트)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `name` | `text` | **NN** | 폰트명 |
| `font_family` | `text` | **NN** | CSS font-family |
| `category` | `text` | **NN** | 'HANDWRITING', 'GOTHIC', 'MYEONGJO', 'ENGLISH' |
| `is_premium` | `boolean` | **NN** | 프리미엄 여부 |
| `license_type` | `text` | **NN** | 'FREE', 'COMMERCIAL', 'PREMIUM' |
| `font_url` | `text` | **NN** | 웹폰트 CSS URL |

**6. public.exports (이미지 export 기록)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `letter_id` | `uuid` | **NN** | FK `letters.id` |
| `image_url` | `text` | **NN** | export 이미지 URL |
| `format` | `text` | **NN** | 'PNG' |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**7. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `letter_id` | `uuid` | **NN** | FK `letters.id` (Unique) |
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

-- letters: 소유자만 접근
CREATE POLICY "Owner full access" ON letters FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM letters WHERE letters.id = orders.letter_id AND (letters.user_id = auth.uid() OR letters.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| letters | `(user_id, status)` | 사용자별 목록 조회 |
| letters | `(guest_id, status)` | 비회원 목록 조회 |
| orders | `(created_at DESC)` | Admin 주문 리스트 |
| orders | `(status)` | 결제 상태별 필터 |

### Connection Pooling
- Supabase Supavisor 사용 (Transaction Mode)
- Pool size: 20 connections

## 10. API E2E Test Scenarios

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-A-01 | POST | `/api/auth/guest` | 비회원 로그인 | ✅ Pass |
| API-L-01 | POST | `/api/letters` | 편지 생성 | ✅ Pass |
| API-L-02 | POST | `/api/letters/generate` | AI 편지 생성 | ✅ Pass |
| API-L-03 | GET | `/api/letters/[id]` | 편지 상세 | ✅ Pass |
| API-L-04 | PATCH | `/api/letters/[id]` | 편지 수정 (텍스트) | ✅ Pass |
| API-L-05 | PATCH | `/api/letters/[id]` | 편지 수정 (디자인) | ✅ Pass |
| API-L-06 | DELETE | `/api/letters/[id]` | 삭제 | ✅ Pass |
| API-T-01 | GET | `/api/templates` | 템플릿 리스트 | ✅ Pass |
| API-P-01 | POST | `/api/payments/confirm` | 결제 성공 | ✅ Pass |
| API-AD-01 | GET | `/api/admin/stats` | 통계 | ✅ Pass |
| API-AD-02 | POST | `/api/admin/templates` | 템플릿 생성 | ✅ Pass |
| API-AD-03 | POST | `/api/admin/orders/[id]/retry` | 재생성 | ✅ Pass |
| API-AD-04 | POST | `/api/admin/orders/[id]/cancel` | 취소 | ✅ Pass |

## 11. Security Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **IAM** | RLS | 비인가 접근 차단 | ✅ Pass |
| **App** | Internal API | generate 외부 호출 차단 | ✅ Pass |
| **Input** | Prompt Injection | 악의적 키워드 필터링 | ✅ Pass |
| **Payment** | 금액 위변조 | 조작 시 400 | ✅ Pass |
| **Template** | 프리미엄 접근 | 비결제 유저 프리미엄 템플릿 차단 | ✅ Pass |
| **Infra** | Rate Limiting | 초과 시 429 | ✅ Pass |

### Prompt Injection 방어 구현
- 입력 글자 수 서버 사이드 검증 (최대 10,000자)
- 특수 문자 및 SQL/HTML 패턴 정규식 필터링
- AI 시스템 프롬프트와 사용자 입력을 별도 메시지로 분리 (prompt isolation)
- AI 응답 후처리: 민감 정보(전화번호, 주민번호) 패턴 감지 및 마스킹

### Rate Limiting 구체화
- 비회원 로그인: 5회/분 per IP
- AI 생성 요청: 3회/분 per user
- API 전체: 100회/분 per IP
- 구현 방식: Next.js middleware + Upstash Redis (또는 Supabase pg_rate_limit)
- 초과 시 응답: 429 Too Many Requests + Retry-After 헤더

### Internal API Protection
- `x-internal-request` 커스텀 헤더 + 서버 환경변수(`INTERNAL_SECRET`) 검증
- Vercel 배포 시 VPC 내부 통신만 허용

### CSRF 방어
- SameSite=Strict 쿠키 설정
- 상태 변경 API(POST/PATCH/DELETE)에 커스텀 헤더 검증

### Admin 인증
- 미들웨어에서 `profiles.role = 'ADMIN'` 검증
- Admin 세션 타임아웃: 30분 비활동 시 자동 로그아웃
- 모든 Admin 액션 감사 로그 기록

## 12. Service Optimization Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Rendering** | 템플릿 배경 이미지 lazy loading | ✅ Pass |
| **Rendering** | 폰트 preload (선택 시) | ✅ Pass |
| **Network** | 템플릿 리스트 캐싱 | ✅ Pass |
| **Database** | letters(user_id, status) 인덱싱 | ✅ Pass |
| **SEO** | 동적 Meta | ✅ Pass |
| **UX/AI** | 편지 생성 실시간 출력 | ✅ Pass |
| **Export** | 이미지 생성 성능 (html-to-image) | ✅ Pass |

## 13. Compliance Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | ✅ Pass |
| **AI/Data** | AI 학습 미사용 고지 | ✅ Pass |
| **Font** | 폰트 라이선스 준수 | ✅ Pass |

### 데이터 유출 대응
- 발견 후 72시간 내 관할 당국 통지 (개인정보보호법)
- 영향받는 사용자에게 이메일/SMS 통지
- 원인 분석 리포트 작성 및 재발 방지 대책 수립

### 쿠키 동의
- 필수 쿠키 (인증 세션, 결제 세션): 서비스 이용에 필요하므로 자동 적용
- 분석 쿠키 (GA4, Hotjar): 명시적 동의 후 활성화
- 구현: 하단 고정 Cookie Consent 배너, 동의 거부 시에도 서비스 이용 가능

### 결제 기록 보존 및 폐기
- 결제 완료 기록: 5년 보존 (전자상거래법 제6조)
- 회원 탈퇴 시: 결제 기록은 개인식별정보를 익명화하여 보존
- 5년 경과 후: 결제 기록 완전 삭제
- 비회원 결제 기록: 30일 후 개인정보 마스킹, 결제 기록만 5년 보존
