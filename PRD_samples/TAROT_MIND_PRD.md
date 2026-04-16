# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: TarotMind (AI 타로 카드 운세 서비스)
- **목표**: 사용자가 질문을 선택하고 가상 타로 카드를 뽑으면 AI가 심층적으로 해석하는 수익형 웹 서비스.
- **핵심 가치 1**: 신비롭고 몽환적인 UI와 타로 카드 선택 인터랙션을 통해 사용자에게 몰입감 있는 경험 제공.
- **핵심 가치 2**: 메이저 아르카나 22장의 전통적인 타로 의미를 바탕으로 AI가 개인화된 해석을 제공.

## 2. 타겟 유저 (Target Audience)

- 타로, 별자리, 운세에 관심 있는 20~30대 남녀.
- 결과를 인스타그램/카카오톡 등 SNS에 공유하고 싶어 하는 유저.
- 모바일 환경에서 간편하게 카드를 뽑고 결과를 확인하고 싶은 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Mystical, Elegant, Immersive.
- **Colors**: Deep Purple, Gold, Midnight Blue (별자리/우주 느낌).
- **Interactions**: 카드 뒤집기 3D 애니메이션, 별 파티클 효과, 카드 드래그 인터랙션.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout (Common Structure)

1. **상단 네비게이션 바**
   - **(공통)**: 홈 로고.
   - **(Desktop)**: 전체 메뉴 노출.
   - **(Mobile)**: 우측 상단 `햄버거 메뉴` 아이콘 노출, 클릭 시 드로어(Drawer) 메뉴 활성화.
   - **(비회원)**: `로그인`, `비회원 주문 조회`.
   - **(회원)**: `마이페이지`.
2. **Body**: 각 페이지 별 주요 내용 렌더링.
3. **Footer**: 사업자 정보, `이용약관` 링크, `개인정보처리 방침` 링크, `문의하기`.
4. **Head & Meta**: SEO, Open Graph, GA4 등 Analytics 설정.

### 5.2. Page Details (페이지별 상세 구성)

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "별이 답하는 당신의 내일, AI 타로로 만나보세요." CTA ("타로 카드 뽑기").
   - **Feature Section**: 메이저 아르카나 22장 기반 해석, 다양한 스프레드(원카드/3카드/켈틱 크로스), AI 심층 분석, 결과 공유.
   - **Social Proof**: "정말 신기하게 맞아요... 지금 고민이 해결됐어요" 등 후기.

2. **타로 카드 선택 페이지 (`/tarot-reading`)**
   - **스프레드 선택**: 원카드(1장), 3카드(과거/현재/미래), 켈틱 크로스(10장, 프리미엄).
   - **질문 카테고리 선택**: 연애, 재운, 직업/진로, 건강, 종합.
   - **카드 선택 인터랙션**: 78장 중 사용자가 클릭하여 선택 (카드 뒤집기 애니메이션).
   - **타로 카드 데이터**:
     - 메이저 아르카나 22장: The Fool ~ The World (전통적 의미 완전 제공)
     - 마이너 아르카나 56장: Wands, Cups, Swords, Pentacles (각 14장)
     - 카드 의미 데이터는 `tarot_cards` DB 테이블에서 관리 (관리자 편집 가능)
     - AI 프롬프트에 선택된 카드의 전통적 의미를 시스템 컨텍스트로 포함
   - **정방향/역방향**: 각 카드는 50% 확률로 정방향/역방향 결정 (카드 선택 시 랜덤)
   - **주의사항**: 분석 소요 시간(최대 2분), 오락 목적 안내.

3. **결제 페이지 (`/payments`)**
   - **UI**: 영수증 컨셉의 카드 디자인 (Receipt Style).
   - **Function**: `기본/프리미엄` 플랜 스위처 (탭), 토스페이먼츠(Payment Widget) 연동.
   - **Logic**: URL Query Parameter(`?plan=`)와 연동된 상품 가격 업데이트, 비동기 결제 요청.

4. **타로 결과 페이지 (`/tarot-result/[order-id]`)**
   - 뽑은 카드 이미지와 정방향/역방향 표시.
   - AI 해석 결과: 카드별 의미, 종합 해석, 조언.
   - 프리미엄: 분야별 상세 분석 + AI 생성 이미지.
   - 공유(링크/SNS), (회원) 마이페이지 저장.

5. **유저 마이페이지 (`/my-page`)**
   - (회원전용) 타로 히스토리 리스트, 프로필 수정.

6. **비회원 로그인 (`/guest-login`)**
   - 비회원 조회용 전화번호/비밀번호 입력 폼.

7. **비회원 주문 조회 페이지 (`/guest-check`)**
   - 비회원 구매 내역 리스트.

8. **타로 피드 페이지 (`/feeds`)**
   - 무한 스크롤 피드 (공개된 타로 결과 공유), 카드 이미지 + 해석 카드형 UI.

9. **회원 로그인 페이지 (`/auth`)**
   - 소셜 로그인(구글/카카오) 및 가입 처리.

### 5.3. E2E Test Checklist (Current Implementation)

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 | 특이사항 |
|:---|:---|:---|:---|:---|
| **Landing & Navigation** | `Home (/)` | 헤더 네비게이션(데스크탑/모바일) 작동 확인 | ✅ Pass | 로고/메뉴 정상 작동 |
| | `Home (/)` | Hero Section 및 "타로 카드 뽑기" CTA 버튼 클릭 시 반응 확인 | ✅ Pass | `/tarot-reading` 리다이렉트 정상 |
| | `Footer` | 이용약관/개인정보처리방침 링크 작동 확인 | ✅ Pass | `/terms`, `/privacy` 링크 연결 완료 |
| **Authentication** | `Guest Login` | `/guest-login` 접속 -> 비회원 전화번호/비밀번호 입력 -> 로그인 성공/실패 처리 | ✅ Pass | - |
| | `User Login` | 소셜 로그인 버튼 클릭 -> 로그인 세션 생성 확인 | ✅ Pass | - |
| **My Page (User)** | `Profile` | 닉네임 수정 기능(인라인 편집) 작동 및 저장 확인 | ✅ Pass | - |
| | `Logout` | 로그아웃 버튼 클릭 시 리다이렉트 확인 | ✅ Pass | - |
| | `History` | 타로 히스토리 리스트 렌더링 확인 | ✅ Pass | - |
| **Tarot & Payment** | `Card Selection` | 스프레드 선택 -> 카드 클릭 선택 -> 해석 요청 플로우 | ✅ Pass | 카드 뒤집기 애니메이션 정상 |
| | `Payment Page` | 결제 페이지 렌더링 및 토스 페이먼츠 위젯 로드 확인 | ✅ Pass | - |
| | `Payment Flow` | 카드 결제 시뮬레이션 -> 성공 페이지 검증 | ✅ Pass | - |
| | `Tarot Result` | `/tarot-result/[id]` 접속 -> AI 해석 + 카드 이미지 렌더링 검증 | ✅ Pass | - |
| **Community** | `Feeds` | `/feeds` 접속 -> 공개된 타로 결과 카드 리스트 및 카테고리 필터링 확인 | ✅ Pass | - |

### 5.4. Guest Checkout (비회원 결제 UX) 구현 리스트

| 구분 | 주요 기능 / 화면 | 구현 내용 및 요구사항 | 사용 API / 테이블 | 구현 여부 | E2E 테스트 |
|---|---|---|---|---|---|
| **Frontend** | `/tarot-reading` 폼 | 비회원 전화번호(`phone`), 비밀번호(`password`) 입력 폼 UI 추가 | - | ✅ 완료 | ✅ 완료 |
| **Frontend** | API Payload | `POST /api/readings` 호출 시 비회원 정보(phone, password)를 바디(Body)에 포함 전송 | `POST /api/readings` | ✅ 완료 | ✅ 완료 |
| **Backend** | `POST /api/readings` 로직 분기 | 로그인(Auth) 정보가 없을 경우, 비회원(Guest) 처리 로직으로 분리하여 실행 | `POST /api/readings` | ✅ 완료 | ✅ 완료 |
| **Backend** | 비밀번호 보안 모듈 | 전송받은 `password`를 Bcrypt 등 단방향 해싱(Hash) 처리하여 저장 | - | ✅ 완료 | ✅ 완료 |
| **Backend** | 식별자(Guest) 생성/검증 | `guests` 테이블 레코드 생성. 기존 `phone` 존재 시 해당 ID 차용 | - | ✅ 완료 | ✅ 완료 |
| **Backend** | 분석 요청 데이터 연동 | 생성/식별된 `guest_id`를 참조(FK)하여 `readings` 테이블에 레코드 성공 삽입 | - | ✅ 완료 | ✅ 완료 |
| **Database** | RLS 및 스키마 권한 설정 | 익명 역할(Anon/Public)에서 `guests` 및 `readings` 테이블 데이터 삽입 시 RLS가 정상 승인되도록 권한 점검 | `guests`, `readings` | ✅ 완료 | ✅ 완료 |

## 6. Admin UX Flow & Layout (관리자 페이지)

### 6.1. Admin Global Layout

1. **Layout Structure**
   - **좌측 네비게이션 패널 (LNB)**:
     - `대시보드` (매출 등).
     - `주문 내역` (Order List).
     - `회원 관리` (User List).
     - `피드 관리` (Feed List).
   - **Body**: 페이지별 콘텐츠 영역.

### 6.2. Admin Page Details

1. **관리자 메인 페이지 (`/admin`)**
   - **Dashboard**: 기간별 매출 통계 그래프, 신규 가입자 수, 결제 건수 요약, 스프레드별 인기 통계.

2. **주문 내역 리스트 (`/admin/order-list`)**
   - 결제 완료된 모든 주문 건 테이블(Table) 표시.
   - 상세 보기 클릭 시 해당 주문의 `상세 내역 페이지`로 이동.

3. **상세 주문 내역 (`/admin/order-list/[order-id]`)**
   - 주문 정보: 회원/비회원 구분, 유저 정보, 결제 상태.
   - 타로 데이터: 선택한 스프레드, 뽑은 카드 목록, AI 해석 결과, 생성 이미지.
   - **Action**: `AI 해석 재생성 요청` (오류 시 수동 트리거), `이미지 재생성`, `결제 취소`.

4. **유저 리스트 (`/admin/user-list`)**
   - 전체 회원 및 비회원 리스트 테이블.
   - Filters: 회원/비회원 필터링.

5. **공개 피드 관리 (`/admin/feed-list`)**
   - `is_public=true` 로 설정된 타로 결과 리스트 모니터링 뷰.
   - 악성 콘텐츠/규정 위반 게시글 강제 숨김(Hide) 처리 토글 버튼.

6. **타로 카드 관리 (`/admin/tarot-cards`)**: 카드 의미, 키워드, 이미지 편집.

### 6.3. Admin Requirements - Frontend

| 구분 | 페이지/컴포넌트명 | 구현 내용 및 요구사항 | 사용 API | 구현 여부 | E2E 테스트 |
|---|---|---|---|---|---|
| **공통** | 레이아웃 | 좌측 LNB, Breadcrumb, Protected Route | - | ✅ 완료 | ✅ 완료 |
| **통계** | 대시보드 (`/admin`) | 핵심 지표 카드, 매출 차트, 스프레드별 인기 통계 | `GET /api/admin/stats` | ✅ 완료 | ✅ 완료 |
| **주문/결제** | 주문 목록 (`/admin/order-list`) | 테이블, 페이지네이션 | `GET /api/admin/orders` | ✅ 완료 | ✅ 완료 |
| | 주문 상세 (`/.../[id]`) | 주문 정보, 카드 목록, AI 해석, 재시도/이미지재생성/취소 버튼 | `GET/POST /api/admin/orders/[id]` | ✅ 완료 | ✅ 완료 |
| **회원 관리** | 유저 목록 (`/admin/user-list`) | 회원/비회원 통합 테이블, 필터바 | `GET /api/admin/users` | ✅ 완료 | ✅ 완료 |
| **콘텐츠 관리** | 피드 관리 (`/admin/feed-list`) | 공개 피드 리스트, 숨김 토글 | `GET/PATCH /api/admin/readings/public` | ✅ 완료 | ✅ 완료 |

### 6.4. Admin Requirements - Backend

| 구분 | 기능/API 분류 | 구현 내용 및 요구사항 | Route 경로 | 구현 여부 | E2E 테스트 |
|---|---|---|---|---|---|
| **공통** | 라우팅 접근 제어 | Middleware로 `/admin/*` 보호, `role === 'ADMIN'` 검증 | Middleware | ✅ 완료 | ✅ 완료 |
| **통계** | 대시보드 API | 기간별 가입자, 결제 건수, 매출, 스프레드 인기 통계 | `GET /api/admin/stats` | ✅ 완료 | ✅ 완료 |
| **주문** | 주문 목록 조회 | `orders` + `readings` Join, 페이지네이션 | `GET /api/admin/orders` | ✅ 완료 | ✅ 완료 |
| | 주문 상세 조회 | 단일 orderId 기반 결제 + 타로 데이터 일체 조회 | `GET /api/admin/orders/[id]` | ✅ 완료 | ✅ 완료 |
| | CS 보상 로직 | AI 재생성, 이미지 재생성, 결제 취소 | `POST /api/admin/orders/[id]/retry` 등 | ✅ 완료 | ✅ 완료 |
| **회원** | 회원 목록 조회 | `profiles` + `guests` 통합 쿼리 | `GET /api/admin/users` | ✅ 완료 | ✅ 완료 |
| **콘텐츠** | 피드 제어 | 공개 상태 토글 | `PATCH /api/admin/readings/[id]/visibility` | ✅ 완료 | ✅ 완료 |

## 7. 운영 및 정책 (Operations & Policy)

### 7.1. 예외 및 실패 처리

- 결제 후 AI 응답 지연/오류 발생 시 `자동 재시도(1회)` 로직 수행.
- 최종 실패 시: 사용자에게 '시스템 오류' 안내 모달 표시 및 `결제 자동 취소`.
- **결제 이탈**: 결제창 진입 후 구매하지 않고 이탈한 유저 로그 수집.

### 7.2. 데이터 및 보안 정책

- **Content Safety**: AI Moderation을 통해 유해성 필터링.
- **비회원 데이터**: 주문 내역 `30일` 보관 후 마스킹/삭제.
- **개인정보**: 피드 공유 시 닉네임 외 개인 식별 정보 노출 금지.

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

### 7.6. 타로 서비스 특수 정책
- **오락 목적 명시**: 모든 결과 페이지 상단에 "본 해석은 오락 목적의 참고 자료이며, 전문적인 심리 상담이나 예언이 아닙니다." 필수 표시
- **카드 선택 무작위성**: 카드 선택은 사용자가 클릭하지만, 실제 선택 로직은 서버에서 무작위로 결정 (조작 불가)
- **AI 해석 일관성**: 동일 카드+스프레드 조합이라도 매번 다른 해석 제공 (다양성 확보)
- **피드 공개 시 개인정보 보호**: 공개된 타로 결과에는 질문 내용 미포함, 카드 이미지와 해석만 표시

## 8. API Specification (Server Architecture)

### 공통 API 규약

**페이지네이션**: cursor 기반 (cursor, limit 기본 20/최대 100, 응답에 next_cursor)

**에러 응답**: `{ error: string, code: string, status: number }`

**주요 에러 코드**: INVALID_INPUT(400), UNAUTHORIZED(401), FORBIDDEN(403), NOT_FOUND(404), RATE_LIMITED(429), AI_GENERATION_FAILED(502), PAYMENT_FAILED(402)

### 8.1. Auth & Users

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/auth/guest` | 비회원 로그인 및 세션 발급 | Public |
| **POST** | `/api/auth/logout` | 로그아웃 (쿠키 만료) | User, Guest |
| **GET** | `/api/users/me` | 현재 세션 유저 정보 조회 | User |
| **PATCH** | `/api/users/me` | 유저 프로필 정보 수정 | User |

### 8.2. Readings (타로 해석)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/readings` | 타로 데이터 생성 및 해석 요청 (선택한 카드, 스프레드, 질문 카테고리 포함) | User, Guest |
| **POST** | `/api/readings/generate` | 내부망 통신용 AI 해석 및 이미지 생성 진행 및 저장 | Internal Server |
| **GET** | `/api/readings` | 타로 리스트 조회 (Query: `?type=feed` or `?type=my`) | Public/User |
| **GET** | `/api/readings/[id]` | 개별 타로 상세 조회 | Owner, Public |
| **PATCH** | `/api/readings/[id]` | 공개 여부 변경 등 | Owner |
| **DELETE** | `/api/readings/[id]` | 타로 데이터 삭제 | Owner |

### 8.3. Payments (결제 처리)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 토스페이먼츠 결제 승인 요청 및 완료 처리 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 주문 결제 상태 확인 | Owner |
| **POST** | `/api/webhooks/toss` | 결제 상태 변경 비동기 통보 | Public (IP 제한) |

### 8.4. Admin Features

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 대시보드 KPI 데이터 조회 | Admin |
| **GET** | `/api/admin/orders` | 전체 주문 리스트 조회 | Admin |
| **GET** | `/api/admin/orders/[id]` | 특정 주문 상세 정보 조회 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | 실패한 AI 해석 재시도 | Admin |
| **POST** | `/api/admin/orders/[id]/image-regen` | 이미지 재생성 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 결제 취소/환불 | Admin |
| **GET** | `/api/admin/users` | 전체 회원 리스트 조회 | Admin |
| **GET** | `/api/admin/readings/public` | 공개 피드 리스트 조회 | Admin |
| **PATCH** | `/api/admin/readings/[id]/visibility` | 피드 공개/숨김 토글 | Admin |
| **GET** | `/api/admin/tarot-cards` | 카드 목록 | Admin |
| **PATCH** | `/api/admin/tarot-cards/[id]` | 카드 의미 수정 | Admin |

## 9. DB Schema Specification (Supabase)

### 9.1. Entity Map

**1. users (Supabase Auth)**

- `auth.users` 테이블을 그대로 사용.

**2. public.profiles (회원 정보)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK, References `auth.users.id` |
| `nickname` | `text` | **NN** | 유저 닉네임 |
| `role` | `text` | **NN** | 'USER' or 'ADMIN' (Default: 'USER') |
| `created_at` | `timestamptz` | **NN** | 가입 일시 |

**3. public.guests (비회원 정보)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK (Default: `gen_random_uuid()`) |
| `phone` | `text` | **NN** | 전화번호 (Unique Index) |
| `password_hash` | `text` | **NN** | 비밀번호 (Bcrypt) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**4. public.readings (타로 해석 데이터)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK (Default: `gen_random_uuid()`) |
| `user_id` | `uuid` | Null | FK `profiles.id` (회원인 경우) |
| `guest_id` | `uuid` | Null | FK `guests.id` (비회원인 경우) |
| `spread_type` | `text` | **NN** | 스프레드 유형 ('ONE_CARD', 'THREE_CARD', 'CELTIC_CROSS') |
| `question_category` | `text` | **NN** | 질문 카테고리 ('LOVE', 'FORTUNE', 'CAREER', 'HEALTH', 'GENERAL') |
| `selected_cards` | `jsonb` | **NN** | 선택한 카드 배열 ([{name: "The Fool", position: "upright", position_index: 0}]) |
| `status` | `text` | **NN** | `PENDING`, `COMPLETED`, `FAILED` |
| `analysis_result` | `jsonb` | Null | AI 해석 결과 (JSON 구조) |

> **analysis_result JSON 스키마**:
> ```json
> {
>   "cards": [{"name": "The Fool", "position": "upright", "meaning": "...", "interpretation": "..."}],
>   "overall_interpretation": "종합 해석 텍스트",
>   "advice": "조언 텍스트",
>   "question_answer": "질문에 대한 직접적 답변"
>   "premium": {
>     "detailed_analysis": {"love": "...", "career": "...", "health": "..."},
>     "timeline": "향후 3개월 전망"
>   }
> }
> ```

| `has_image_gen` | `boolean` | **NN** | 이미지 생성 포함 여부 (Default: false) |
| `image_url` | `text` | Null | AI 생성 이미지 URL |
| `is_public` | `boolean` | **NN** | 공개 여부 (Default: false) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**6. public.tarot_cards (타로 카드 기본 데이터)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `name` | `text` | **NN** | 카드명 ('The Fool', 'The Star', ...) |
| `arcana` | `text` | **NN** | 'MAJOR', 'MINOR' |
| `suit` | `text` | Null | 'WANDS', 'CUPS', 'SWORDS', 'PENTACLES' (마이너만) |
| `number` | `integer` | **NN** | 카드 번호 (메이저: 0-21, 마이너: 1-14) |
| `upright_meaning` | `text` | **NN** | 정방향 의미 |
| `reversed_meaning` | `text` | **NN** | 역방향 의미 |
| `keywords` | `jsonb` | **NN** | 키워드 배열 ['new beginnings', 'spontaneity'] |
| `image_url` | `text` | **NN** | 카드 이미지 URL |

**7. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `reading_id` | `uuid` | **NN** | FK `readings.id` (Unique) |
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

-- readings: 소유자만 접근
CREATE POLICY "Owner full access" ON readings FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM readings WHERE readings.id = orders.reading_id AND (readings.user_id = auth.uid() OR readings.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| readings | `(user_id, status)` | 사용자별 목록 조회 |
| readings | `(guest_id, status)` | 비회원 목록 조회 |
| orders | `(created_at DESC)` | Admin 주문 리스트 |

### Connection Pooling
- Supabase Supavisor (Transaction Mode), Pool size: 20

## 10. API E2E Test Scenarios

### 10.1. Auth & Users API

| ID | Method | Endpoint | Scenario | Expected Status | Status |
|:---|:---|:---|:---|:---|:---|
| API-A-01 | POST | `/api/auth/guest` | 비회원 로그인 성공 | 200 OK | ✅ Pass |
| API-A-02 | POST | `/api/auth/guest` | 비회원 로그인 실패 | 401 | ✅ Pass |
| API-A-03 | POST | `/api/auth/logout` | 로그아웃 | 200 OK | ✅ Pass |
| API-A-04 | GET | `/api/users/me` | 내 정보 조회 (인증됨) | 200 OK | ✅ Pass |
| API-A-05 | GET | `/api/users/me` | 내 정보 조회 (미인증) | 401 | ✅ Pass |
| API-A-06 | PATCH | `/api/users/me` | 프로필 수정 성공 | 200 OK | ✅ Pass |
| API-A-07 | PATCH | `/api/users/me` | 프로필 수정 실패 | 400 | ✅ Pass |

### 10.2. Readings API

| ID | Method | Endpoint | Scenario | Expected Status | Status |
|:---|:---|:---|:---|:---|:---|
| API-R-01 | POST | `/api/readings` | 타로 데이터 생성 (정상) | 201 Created | ✅ Pass |
| API-R-02 | POST | `/api/readings` | 필수 파라미터 누락 | 400 | ✅ Pass |
| API-R-03 | GET | `/api/readings?type=feed` | 피드 목록 조회 | 200 OK | ✅ Pass |
| API-R-04 | GET | `/api/readings?type=my` | 내 타로 목록 조회 (인증) | 200 OK | ✅ Pass |
| API-R-05 | GET | `/api/readings?type=my` | 권한 없는 상태 조회 | 401 | ✅ Pass |
| API-R-06 | GET | `/api/readings/[id]` | 개별 타로 상세 조회 성공 | 200 OK | ✅ Pass |
| API-R-07 | GET | `/api/readings/[id]` | 존재하지 않는 타로 조회 | 404 | ✅ Pass |
| API-R-08 | PATCH | `/api/readings/[id]` | 공개 여부 변경 성공 | 200 OK | ✅ Pass |
| API-R-09 | PATCH | `/api/readings/[id]` | 권한 없는 수정 | 403 | ✅ Pass |
| API-R-10 | DELETE | `/api/readings/[id]` | 타로 삭제 성공 | 200 OK | ✅ Pass |
| API-R-11 | POST | `/api/readings/generate` | 내부 AI 생성 요청 | 200 OK | ✅ Pass |
| API-R-12 | POST | `/api/readings/generate` | 이미지 포함 옵션 시 이미지 생성 | 200 OK | ✅ Pass |

### 10.3. Payments API

| ID | Method | Endpoint | Scenario | Expected Status | Status |
|:---|:---|:---|:---|:---|:---|
| API-P-01 | POST | `/api/payments/confirm` | 결제 승인 성공 | 200 OK | ✅ Pass |
| API-P-02 | POST | `/api/payments/confirm` | 금액 불일치 승인 실패 | 400 | ✅ Pass |
| API-P-03 | POST | `/api/payments/confirm` | 잘못된 paymentKey | 400/401 | ✅ Pass |
| API-P-04 | GET | `/api/payments/[orderId]` | 결제 상태 확인 성공 | 200 OK | ✅ Pass |
| API-P-05 | GET | `/api/payments/[orderId]` | 존재하지 않는 주문 | 404 | ✅ Pass |
| API-P-06 | POST | `/api/webhooks/toss` | 웹훅 정상 수신 | 200 OK | ✅ Pass |
| API-P-07 | POST | `/api/webhooks/toss` | 인증되지 않은 웹훅 | 403 | ✅ Pass |

### 10.4. Admin API

| ID | Method | Endpoint | Scenario | Expected Status | Status |
|:---|:---|:---|:---|:---|:---|
| API-AD-01 | GET | `/api/admin/stats` | 대시보드 통계 | 200 OK | ✅ Pass |
| API-AD-02 | GET | `/api/admin/orders` | 전체 주문 리스트 | 200 OK | ✅ Pass |
| API-AD-03 | GET | `/api/admin/orders/[id]` | 주문 상세 | 200 OK | ✅ Pass |
| API-AD-04 | POST | `/api/admin/orders/[id]/retry` | AI 재시도 | 200 OK | ✅ Pass |
| API-AD-05 | POST | `/api/admin/orders/[id]/cancel` | 결제 취소 | 200 OK | ✅ Pass |
| API-AD-06 | GET | `/api/admin/users` | 회원 리스트 | 200 OK | ✅ Pass |
| API-AD-07 | GET | `/api/admin/readings/public` | 공개 피드 조회 | 200 OK | ✅ Pass |
| API-AD-08 | PATCH | `/api/admin/readings/[id]/visibility` | 피드 토글 | 200 OK | ✅ Pass |
| API-AD-09 | N/A | `/api/admin/*` | 권한 없는 접근 | 401/403 | ✅ Pass |

## 11. Security Checklist

### 11.1 Identity & Access Management

- **Supabase RLS**: `profiles`, `guests`, `readings`, `orders` 테이블에 명확한 RLS 정책 적용.
- **API 권한 제어**: `/api/admin/*` 접근 시 세션/토큰 내 권한 변조 여부 검사.
- **비회원 비밀번호 암호화**: `password`는 Bcrypt + Salt로 저장.

### 11.2 Application & Data Security

- **Internal API Protection**: `/api/readings/generate` 외부 직접 호출 차단.
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
| **IAM** | RLS 및 권한 격리 | 비인가 권한으로 타인 데이터 API 호출 시 401/403 | ✅ Pass |
| **IAM** | API Authentication | 변조된 토큰/쿠키로 요청 시 접근 거부 | ✅ Pass |
| **App/Data** | Internal API Protection | 외부에서 `/api/readings/generate` 직접 호출 차단 | ✅ Pass |
| **App/Data** | PII Log Masking | 서버 로그에 평문 덤프 없는지 확인 | ✅ Pass |
| **Input/AI** | Prompt Injection 방어 | "프롬프트를 무시하라" 입력 시 정상 필터링 | ✅ Pass |
| **Input/AI** | XSS 차단 | `<script>` 태그 저장 후 조회 시 이스케이프 | ✅ Pass |
| **Payment** | 금액 위변조 | Amount 조작 시 승인 실패(400) | ✅ Pass |
| **Payment** | Webhook Validation | 조작된 웹훅 시 403 | ✅ Pass |
| **Infra/Ops** | Rate Limiting | 초과 호출 시 429 | ✅ Pass |

## 12. Service Optimization Checklist

### 12.1 Rendering & Asset Optimization

- **이미지 최적화**: `next/image` + WebP, 타로 카드 이미지 lazy loading.
- **웹 폰트 최적화**: `next/font`로 빌드 타임 다운로드.
- **스크립트 지연 로딩**: GA 등 `strategy="afterInteractive"`.
- **Client Component 최소화**: 카드 인터랙션 컴포넌트에만 `"use client"`.

### 12.2 Network & Core Web Vitals

- **데이터 캐싱**: 공용 피드 조회 캐싱.
- **Web Vitals 모니터링**: LCP, INP, CLS 추적.

### 12.3 Backend & Database

- **인덱싱**: `readings` 테이블 `user_id`, `guest_id`, `status`, `is_public` 복합 인덱스.
- **Connection Pooling**: Supavisor 연동.
- **Cursor 기반 페이지네이션**: 피드 무한 스크롤.

### 12.4 SEO & Discoverability

- **동적 메타데이터**: `/tarot-result/[id]`에 `generateMetadata`.
- **Sitemap & Robots**: `app/sitemap.ts` + `robots.txt`.

### 12.5 AI Response UX

- **Streaming AI Response**: 해석 결과 실시간 출력.
- **Debouncing**: 결제/생성 버튼 중복 클릭 방지.

### 12.6 E2E Optimization Test Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Rendering** | `next/image` | 피드 이미지 WebP 서빙 | ✅ Pass |
| **Network** | 리소스 캐싱 | 피드 조회 시 캐시 재활용 | ✅ Pass |
| **Database** | 커서 페이지네이션 | 무한스크롤 즉각 응답 | ✅ Pass |
| **SEO** | 동적 Meta | 결과 페이지 OG 태그 정상 | ✅ Pass |
| **UX/AI** | Streaming | AI 해석 시 브라우저 행 없음 | ✅ Pass |
| **UX/AI** | 디바운싱 | 버튼 다중클릭 시 단일 호출 | ✅ Pass |

## 13. Compliance Checklist

### 13.1 Privacy Data Protection

- **수집 최소화**: 이메일, 닉네임 외 불필요 정보 미수집.
- **명시적 동의**: 개인정보 처리방침/이용약관 분리 동의.
- **잊혀질 권리**: 회원 탈퇴 시 즉시 하드 딜리트.
- **비회원 30일 보관**: pg_cron 자동 파기.

### 13.2 Payment Compliance

- **Toss 가이드라인 준수**: Secret Key 서버 환경변수 은닉.
- **결제 기록 5년 보존**: 탈퇴 후에도 거래 기록 유지.
- **디지털 콘텐츠 청약 철회 불가 고지**: 이용약관 내 명시.

### 13.3 AI & Data Ownership

- **AI 학습 미사용**: 프라이버시 정책에 명시.
- **AI 생성물 저작권**: 약관에 소유권 규정.

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

### 13.4 Compliance E2E Test Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | 선택 동의 없이도 정상 결제 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | 회원 탈퇴 API 시 정상 파기 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | 네트워크 트래픽에 평문 미노출 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | 결제 UI에 환불 불가 텍스트 명시 | ✅ Pass |
| **AI/Data** | AI 자산 고지 | 메인 페이지에 AI 학습 미사용 고지 | ✅ Pass |
