# Product Requirements Document(PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트 명**: AI DREAM TELLER (AI 꿈 해몽 서비스)
- **목표**: 사용자가 입력한 꿈 내용을 AI가 분석하여 심층적인 해몽과 조언을 제공하는 수익형 웹 서비스
- **핵심 가치 1**: 신비롭고 직관적인 UI 경험과 정확도 높은 AI 분석을 통해서 사용자에게 인사이트와 재미 제공.
- **핵심 가치 2**: 프로이트, 칼 융, 신경과학, 게슈탈트 등 해몽을 맡기고 싶은 전문 분야를 선택해서 해몽 요청 가능.

## 2. 타겟 유저(Target Audience)

- 꿈의 의미를 검색해보는 습관이 있는 20-40대 남녀.
- 모바일 환경에서 간편하게 결과를 확인하고 공유하고 싶어하는 유저.

## 3. 기술 스택(Tech Stack)

- **Web Framework**: Next.js 16.1.6(App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Backend & DB**: Next.js API Routes, Supabase
- **Payments**: Toss payments
- **AI**: Gemini with gemini sdk

## 4. 디자인 가이드(Design Guide)

- **Theme**: Mystical, Vibrant, Fluid
- **Colors**: Deep Purple, Neon Blue, Soft Pink (Aurora Gradients)
- **Interactions**: 부드러운 스크롤, 호버 시 빛나는 효과, 로딩 시 몽환적인 애니메이션

## 5. 프론트엔드 요구사항 (Frontend Requirements)

### 5.1 전체 레이아웃 (Global Layout)

1. **상단 네비게이션 바 (Header)**

- (공통) 홈 로고
- (비회원) 로그인, 비회원 주문 조회
- (회원) 마이페이지
- (반응형) 모바일 환경(md 미만)에서는 우측 상단 햄버거 메뉴 아이콘 제공. 클릭 시 위에서 아래로(Top) 내려오는 풀 너비(Full-width) Drawer를 통해 메뉴 노출 가능.

2. **Body**

- 각 페이지 별 주요 내용 렌더링

3. **Footer**

- 사업자 정보(상호명, 대표자, 사업자번호, 주소 등), 이용약관 링크, 개인정보처리 방침 링크, 문의하기 링크 포함
- 모든 페이지 하단에 고정 노출되는 글로벌 레이아웃 구조 적용

4. **Head & Meta**

- SEO, Open Graph, GA4 등 Analytics 설정

### 5.2 유저 UX 페이지 구성 (User UX Pages)

1. **메인 랜딩페이지 (`/`)**

- 서비스 한줄 소개
- 프로덕트 상세로 넘어가는 후킹 버튼(프로덕트 상세 페이지로 이동)
- 서비스에 대한 여러 feature 소개
- 이미 풀이된 이전 유저들의 꿈 해몽 텍스트 및 AI 이미지 예시 리스트 섹션(더보기 -> 예시 리스트 피드로 이동)

2. **프로덕트 상세 페이지 (`/dream-teller`)**

- 간략한 서비스 사용 소개
- 프로이트, 칼 융, 신경과학, 게슈탈트 등 해몽을 맡기고 싶은 전문 분야 선택
- 유저의 꿈 입력란
- 꿈 풀이 요청 버튼
- 안내 및 주의 사항
  - 보통 3분 이내에 생성이 완료됩니다.
  - 꿈 해석은 AI를 통해 정신분석, 신화, 상징학 데이터를 기반으로 생성됩니다.
  - 이 해석은 자기 이해를 돕기 위한 참고 자료이며, 의학적/심리학적 진단을 대체하지 않습니다.
- 구매 옵션 선택 섹션
  - (기본) 단순 텍스트 해석: 1,500원
  - (추가 옵션) AI 생성 이미지 추가: +500원

3. **결제 페이지 (`/payments`)**

- 영수증 디자인을 참고한 디자인의 결제 페이지
- 토스페이먼츠 위젯이 들어갈 섹션
- 회원 결제와 비회원 결제 모두 지원
- 결제가 성공적으로 완료된 후 회원은 마이페이지, 비회원은 비회원 주문 조회 페이지로 이동
- 결제에 실패했을 경우 입력한 꿈 정보가 사라지지 않고 결제 페이지에 그대로 머물러 있음

4. **해석 확인 페이지 (`/dream-result/[order-id]`)**

- 결제한 유저가 자신의 꿈 해석 및 AI 이미지(옵션)를 확인할 수 있는 페이지
- 해몽과 이미지 뿐 아니라 자신이 입력한 꿈 내용도 함께 확인할 수 있어야 함
- 다른 사람에게 공유할 수 있도록 링크 카피, 소셜 공유 버튼 섹션 하단 배치
- 회원의 경우 캘린더 라이브러리를 활용해 해몽이 이뤄진 날짜에 하이라이트 표시 및 해당 일자를 누를 경우 해당 해몽 결과 페이지로 넘어감

5. **유저의 마이페이지 (`/my-page`)**

- 회원 가입된 유저만 자신의 마이페이지 접근 가능
- 캘린더 라이브러리를 활용해 해몽이 이뤄진 날짜에 하이라이트 표시 및 해당 일자를 누를 경우 해당 해몽 결과 페이지로 넘어감
- 구매 내역 리스트가 캘린더 하단에 배치 및 해당 리스트 아이템을 누를 경우 해당 해몽 결과 확인 페이지로 넘어감
- 닉네임(수정 가능 기능), 로그인 한 소셜 서비스(구글 or 카카오) 로고, 이메일 주소, 로그아웃 버튼

6. **비회원 로그인 (`/guest-login`)**

- 간단한 페이지 소개
- 전화번호 및 비밀번호 입력 폼
- 비회원 주문 조회 버튼

7. **비회원 주문 조회 페이지 (`/guest-check`)**

- 6번에서 로그인 한 비회원이 자신의 구매 내역을 조회하는 페이지
- 구매내역 리스트가 배치되어 있고 해당 리스트 아이템을 눌렀을 때 해당 해몽 결과 확인 페이지로 이동

8. **이전 유저들의 과거 풀이 내역 리스트 피드 페이지 (`/feeds`)**

- 페이스북 형태의 피드
- 이미지가 있는 해몽 결과는 이미지와 텍스트가 함께 보여지고, 텍스트만 있는 해몽 결과는 텍스트만 보여짐

9. **회원 로그인 페이지 (`/auth`)**

- 구글 및 카카오 소셜 로그인만 존재
- 각 소셜 서비스로 성공적으로 로그인 후 리다이렉트는 2번 프로덕트 상세 페이지로 이동

### 5.3 관리자 UX 페이지 구성 (Admin UX Pages)

0. **관리자 페이지 기본 공통 레이아웃**

- 좌측 네비게이션 패널
  - 매출 조회
  - 주문 내역 리스트
- 네비게이션 패널을 제외하고는 각 관리자 메뉴 페이지별 내용 body

1. **관리자 메인 페이지 (`/admin`)**

- 기간별 매출 조회 대시보드(기본 화면)

2. **주문 내역 리스트 (`/admin/order-list`)**

- 결제가 완료된 주문 건 확인을 위한 리스트 표
- 각 리스트 아이템을 누르면 각 주문의 `3번 상세 주문 내역`으로 이동

3. **상세 주문 내역 (`/admin/order-list/[order-id]`)**

- 2번에 종속된 페이지
- 해당 주문의 회원/비회원 여부, 구매자 정보, 결제 완료 여부, 유저의 꿈 input, LLM이 생성한 해몽 텍스트, AI가 생성한 꿈 이미지(존재한다면), LLM 해몽 재생성 요청 버튼

4. **유저 리스트 (`/admin/user-list`)**

- 회원 and 비회원 유저 리스트 표 페이지
- 회원과 비회원을 필터링해서 볼 수 있는 기능
- 각 회원의 결제 여부를 확인할 수 있음

## 6. 백엔드 요구사항 및 API 구조 (Backend Requirements & API Structure)

프론트엔드와 독립적으로 기능할 수 있도록 RESTful하고 직관적인 API 구조로 Next.js Route Handlers(API Routes)를 설계합니다.

### 6.1 인증 및 권한 (Auth)
- `POST /api/auth/guest`
  - 설명: 전화번호와 비밀번호를 전달받아 비회원용 세션 토큰을 발급합니다.
  - 반환값: 비회원 인증 토큰.

### 6.2 사용자 (Users)
- `GET /api/users/me`
  - 설명: 현재 로그인한 회원/비회원의 프로필 및 기본 정보를 반환합니다.
- `PATCH /api/users/me`
  - 설명: 사용자의 프로필 정보(예: 닉네임)를 수정합니다.

### 6.3 주문 및 결제 (Orders & Payments)
- `GET /api/orders`
  - 설명: 현재 로그인한 사용자의 구매 이력 리스트를 반환합니다. (마이페이지 용도)
- `POST /api/orders`
  - 설명: 꿈 입력 데이터와 선택된 옵션, 전문 분야 등을 기반으로 주문서(Pending Order)를 생성합니다.
- `GET /api/orders/[id]`
  - 설명: 개별 주문에 대한 구매 정보 및 (생성 완료된) 꿈 해몽 결과를 반환합니다.
- `GET /api/orders/guest`
  - 설명: 발급받은 비회원 세션을 인증하여 해당 비회원의 주문 내역 리스트를 반환합니다.
- `POST /api/payments/confirm`
  - 설명: 토스페이먼츠 결제 위젯을 통해 승인된 결제 검증 및 완료 처리를 수행합니다. (결제 성공 시 AI 해몽 생성 로직 비동기 호출)

### 6.4 피드 (Feeds)
- `GET /api/feeds`
  - 설명: 사용자에게 노출할 이전 유저들의 공개 해몽 결과 목록을 페이지네이션과 함께 반환합니다. (메인 페이지, `/feeds` 용도)

### 6.5 AI 처리 (AI Processing)
- `POST /api/ai/generate`
  - 설명: 결제가 완료된 주문에 대해 Gemini API를 호출하여 해몽 텍스트와 AI 이미지를 생성하고 DB에 저장합니다. (서버 내부 호출 권장)

### 6.6 관리자 (Admin)
- `GET /api/admin/metrics`
  - 설명: 관리자 대시보드용으로 기간별 매출과 주문 통계 데이타를 반환합니다.
- `GET /api/admin/orders`
  - 설명: 시스템 전체의 주문 발생 내역 리스트를 페이지네이션 및 필터와 함께 반환합니다.
- `GET /api/admin/orders/[id]`
  - 설명: 상세 주문 내역에서 원본 꿈 텍스트, 사용자 정보, 결제 상태 및 해몽 결과를 반환합니다.
- `POST /api/admin/orders/[id]/regenerate`
  - 설명: 결과물 품질 이슈 등을 이유로 LLM 해몽 재생성을 트리거합니다.
- `GET /api/admin/users`
  - 설명: 회원 가입 유저와 비회원 유저 리스트를 조회하고, 최근 결제 여부 등을 함께 반환합니다.

## 7. 데이터베이스 스키마 (Database Schema)

Supabase PostgreSQL 환경을 기준으로 구성하되, 인증 테이블(`auth.users`)과 연결되는 어플리케이션 전용 Public 테이블을 정의합니다. MECE 원칙에 따라 명확히 역할을 분리했습니다.

### 7.1 Users (`users`)
회원(소셜)과 비회원의 정보를 통합 관리하는 테이블입니다.
- **`id`** (UUID, Primary Key, **Not Null**): 고유 식별자 (Supabase `auth.users`의 PK와 1:1 매핑)
- **`role`** (String, **Not Null**): 사용자 역할 (`member`, `guest`, `admin`)
- **`provider`** (String, **Not Null**): 가입 경로 (`google`, `kakao`, `guest`)
- **`email`** (String, Null): 회원 이메일 (소셜 로그인 회원용)
- **`nickname`** (String, Null): 사용자 닉네임
- **`phone_number`** (String, Null): 비회원 식별 및 주문 조회용 전화번호
- **`guest_password_hash`** (String, Null): 비회원용 암호화된 비밀번호
- **`created_at`** (Timestamp, **Not Null**): 계정 생성 일시
- **`updated_at`** (Timestamp, **Not Null**): 정보 최종 수정 일시

### 7.2 Orders (`orders`)
사용자의 꿈 분석 요청 및 토스페이먼츠 결제 내역을 매핑하는 테이블입니다.
- **`id`** (UUID, Primary Key, **Not Null**): 내부 시스템의 고유 주문 식별자
- **`order_number`** (String, Unique, **Not Null**): 토스페이먼츠의 `orderId`로 사용될 고유 주문 번호
- **`user_id`** (UUID, Foreign Key, **Not Null**): 결제를 진행한 `users.id` 참조
- **`total_amount`** (Integer, **Not Null**): 총 결제 금액
- **`payment_status`** (String, **Not Null**): 결제 상태 (`pending`, `paid`, `failed`, `refunded`)
- **`payment_key`** (String, Null): 토스페이먼츠 승인 키 (결제 성공 시 저장)
- **`dream_content`** (Text, **Not Null**): 유저가 직접 입력한 원본 꿈 내용
- **`expert_field`** (String, **Not Null**): 선택한 해몽 전문 분야 (`freud`, `jung`, `neuroscience`, `gestalt` 등)
- **`includes_image`** (Boolean, **Not Null**): AI 이미지 생성 옵션 구매 여부
- **`created_at`** (Timestamp, **Not Null**): 주문서 생성 일시
- **`updated_at`** (Timestamp, **Not Null**): 결제 및 상태 업데이트 일시

### 7.3 Dream Results (`dream_results`)
결제 완료 후 생성되는 AI 해몽 결과물과 이미지 URL, 피드 공개 여부를 담당하는 테이블입니다.
- **`id`** (UUID, Primary Key, **Not Null**): 고유 식별자
- **`order_id`** (UUID, Foreign Key / Unique, **Not Null**): 매칭되는 `orders.id` 참조 (1:1 관계)
- **`analysis_status`** (String, **Not Null**): 해몽 진행 상태 (`processing`, `completed`, `failed`)
- **`analysis_text`** (Text, Null): AI(Gemini)가 생성해낸 심층 해몽 텍스트
- **`image_url`** (String, Null): AI(Gemini)가 묘사해준 꿈 이미지 URL (옵션 미구매 시 Null)
- **`is_public`** (Boolean, **Not Null**): Feed 페이지 공유 노출 여부 (`true` or `false`)
- **`created_at`** (Timestamp, **Not Null**): 해몽 작업 최초 생성 일시
- **`updated_at`** (Timestamp, **Not Null**): 해몽 결과 또는 노출 여부 수정(Update) 통제용 일시
