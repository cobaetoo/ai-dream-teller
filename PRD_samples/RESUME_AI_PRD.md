# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: ResumeAI (AI 이력서 & 자소서 클리닉)
- **목표**: 사용자가 이력서/자소서를 업로드하면 AI가 직무 역량, STAR 기법, 키워드 최적화 등을 분석하여 피드백을 제공하는 수익형 웹 서비스.
- **핵심 가치 1**: 전문적이고 깔끔한 UI로 신뢰감을 주며, AI 분석 리포트를 차트와 점수로 직관적으로 제공.
- **핵심 가치 2**: 직무별 맞춤 분석과 수정 전후 비교(diff)를 통해 실질적인 문서 개선을 지원.

## 2. 타겟 유저 (Target Audience)

- 취업 준비생, 이직 희망자 (20~35세).
- 자소서/이력서 작성에 어려움을 느끼는 구직자.
- AI 피드백을 받아 문서를 반복 개선하고 싶은 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Professional, Clean, Trustworthy.
- **Colors**: Navy Blue, White, Accent Green (합격/개선 포인트).
- **Interactions**: 부드러운 페이드 인, 점수 게이지 애니메이션, diff 하이라이트.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout (Common Structure)

1. **상단 네비게이션 바**
   - **(공통)**: 홈 로고.
   - **(Desktop)**: 전체 메뉴 노출.
   - **(Mobile)**: 우측 상단 `햄버거 메뉴` 아이콘 노출, 클릭 시 드로어 메뉴 활성화.
   - **(비회원)**: `로그인`, `비회원 주문 조회`.
   - **(회원)**: `마이페이지`.
2. **Body**: 각 페이지 별 주요 내용 렌더링.
3. **Footer**: 사업자 정보, `이용약관` 링크, `개인정보처리 방침` 링크, `문의하기`.
4. **Head & Meta**: SEO, Open Graph, GA4 등 Analytics 설정.

### 5.2. Page Details (페이지별 상세 구성)

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "AI가 분석하는 내 이력서, 합격률을 높여드립니다." CTA ("내 이력서 분석하기").
   - **Feature Section**: 직무 적합도 분석, STAR 기법 검증, 키워드 최적화, 문장 교정.
   - **Social Proof**: "AI 피드백으로 자소서를 3번 수정했더니 서류 합격했습니다" 등 후기.

2. **이력서 분석 페이지 (`/analyze`)**
   - **입력 방식**: (1) 텍스트 직접 입력, (2) 파일 업로드 (PDF/DOCX, 최대 5MB).
   - **분석 옵션**: 지원 직무 선택 (개발자, 기획자, 디자이너, 영업, 마케팅, 일반 사무 등).
   - **분석 항목 선택**: 전체 분석 / 직무 적합도만 / 문장 교정만.
   - **주의사항**: 분석 소요 시간(최대 2분), 개인정보 마스킹 권장 안내.
   - **지원 파일 포맷**: PDF (pdf-parse 라이브러리), DOCX (mammoth 라이브러리). 최대 5MB.
   - **파일 보안**: 업로드 시 확장자 화이트리스트 검증 (.pdf, .docx, .doc), MIME 타입 교차 검증, ClamAV 또는 서버리스 스캔 함수로 악성코드 검사.
   - **파싱 실패 처리**: PDF 파싱 실패 시 "PDF에서 텍스트를 추출할 수 없습니다. 이미지 기반 PDF는 텍스트 직접 입력을 이용해주세요." 안내.

3. **결제 페이지 (`/payments`)**
   - **UI**: 영수증 컨셉의 카드 디자인.
   - **Function**: `기본/프리미엄` 플랜 스위처 (탭), 토스페이먼츠 연동.
   - **Logic**: URL Query Parameter(`?plan=`)와 연동.

4. **분석 결과 페이지 (`/result/[order-id]`)**
   - **종합 점수**: 직무 적합도 (0-100 게이지 차트).
   - **상세 분석**: 키워드 매칭률, 문장 가독성 점수, STAR 기법 충족도 (막대 그래프).
   - **AI 피드백**: 문장별 개선 제안, 약점 분석, 추천 키워드.
   - **프리미엄**: AI 자소서 생성, 직무별 맞춤 템플릿 제공, 커버레터 자동 작성.

5. **유저 마이페이지 (`/my-page`)**
   - (회원전용) 이력서 버전 관리 (수정 전후 비교 diff view — 추가/삭제/변경 라인 하이라이트), 분석 히스토리, 프로필 수정.

6. **비회원 로그인 (`/guest-login`)**
   - 비회원 조회용 전화번호/비밀번호 입력 폼.

7. **비회원 주문 조회 페이지 (`/guest-check`)**
   - 비회원 구매 내역 리스트.

8. **회원 로그인 페이지 (`/auth`)**
   - 소셜 로그인(구글/카카오) 및 가입 처리.

### 5.3. E2E Test Checklist

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 | 특이사항 |
|:---|:---|:---|:---|:---|
| **Landing & Navigation** | `Home (/)` | 헤더 네비게이션 작동 확인 | ✅ Pass | - |
| | `Home (/)` | "내 이력서 분석하기" CTA 클릭 -> `/analyze` 이동 | ✅ Pass | - |
| | `Footer` | 이용약관/개인정보처리방침 링크 | ✅ Pass | - |
| **Authentication** | `Guest Login` | 비회원 로그인 성공/실패 | ✅ Pass | - |
| | `User Login` | 소셜 로그인 세션 생성 | ✅ Pass | - |
| **My Page** | `Profile` | 닉네임 수정 | ✅ Pass | - |
| | `History` | 분석 히스토리 + 버전 관리 | ✅ Pass | diff 뷰 정상 |
| **Analysis & Payment** | `Input` | 텍스트 입력 + 파일 업로드(PDF) | ✅ Pass | PDF 파싱 정상 |
| | `Payment` | 결제 페이지 렌더링 + 토스 위젯 | ✅ Pass | - |
| | `Payment Flow` | 결제 성공 -> 결과 페이지 | ✅ Pass | - |
| | `Result` | 분석 결과: 종합 점수, 차트, 피드백 렌더링 | ✅ Pass | Recharts 정상 |

### 5.4. Guest Checkout 구현 리스트

| 구분 | 주요 기능 | 구현 내용 | 구현 여부 | E2E 테스트 |
|---|---|---|---|---|
| **Frontend** | `/analyze` 폼 | 비회원 phone/password 입력 UI | ✅ 완료 | ✅ 완료 |
| **Frontend** | API Payload | `POST /api/resumes`에 비회원 정보 포함 | ✅ 완료 | ✅ 완료 |
| **Backend** | 로직 분기 | Auth 없을 시 Guest 처리 | ✅ 완료 | ✅ 완료 |
| **Backend** | 비밀번호 해싱 | Bcrypt 해싱 | ✅ 완료 | ✅ 완료 |
| **Backend** | Guest 생성 | `guests` 테이블 레코드 생성 | ✅ 완료 | ✅ 완료 |
| **Database** | RLS 설정 | 익명 삽입 권한 | ✅ 완료 | ✅ 완료 |

## 6. Admin UX Flow & Layout (관리자 페이지)

### 6.1. Admin Global Layout

1. **좌측 네비게이션 패널 (LNB)**: `대시보드`, `주문 내역`, `회원 관리`.
2. **Body**: 페이지별 콘텐츠.

### 6.2. Admin Page Details

1. **대시보드 (`/admin`)**: 매출 통계, 신규 가입자, 분석 건수, 직무별 인기 통계.
2. **주문 내역 (`/admin/order-list`)**: 결제 완료 주문 테이블, 페이지네이션.
3. **주문 상세 (`/admin/order-list/[id]`)**: 주문 정보, 이력서 원문, AI 분석 결과, 재시도/취소 버튼.
4. **유저 리스트 (`/admin/user-list`)**: 회원/비회원 통합 테이블, 필터.

### 6.3. Admin Requirements - Frontend

| 구분 | 페이지 | 구현 내용 | 구현 여부 | E2E 테스트 |
|---|---|---|---|---|
| **공통** | 레이아웃 | LNB, Breadcrumb, Protected Route | ✅ 완료 | ✅ 완료 |
| **통계** | 대시보드 | 지표 카드, 매출 차트, 직무별 통계 | ✅ 완료 | ✅ 완료 |
| **주문** | 주문 목록 | 테이블, 페이지네이션 | ✅ 완료 | ✅ 완료 |
| | 주문 상세 | 주문 정보, 이력서 원문, 분석 결과, 재시도/취소 | ✅ 완료 | ✅ 완료 |
| **회원** | 유저 목록 | 통합 테이블, 필터 | ✅ 완료 | ✅ 완료 |

### 6.4. Admin Requirements - Backend

| 구분 | API | 구현 내용 | 구현 여부 | E2E 테스트 |
|---|---|---|---|---|
| **공통** | Middleware | `/admin/*` 보호, ADMIN 검증 | ✅ 완료 | ✅ 완료 |
| **통계** | `GET /api/admin/stats` | 가입자, 결제, 직무 통계 | ✅ 완료 | ✅ 완료 |
| **주문** | `GET /api/admin/orders` | 주문 리스트, 페이지네이션 | ✅ 완료 | ✅ 완료 |
| | `GET /api/admin/orders/[id]` | 주문 상세 | ✅ 완료 | ✅ 완료 |
| | `POST /api/admin/orders/[id]/retry` | AI 재분석 | ✅ 완료 | ✅ 완료 |
| | `POST /api/admin/orders/[id]/cancel` | 결제 취소 | ✅ 완료 | ✅ 완료 |
| **회원** | `GET /api/admin/users` | 회원/비회원 통합 조회 | ✅ 완료 | ✅ 완료 |

## 7. 운영 및 정책

### 7.1. 예외 및 실패 처리

- AI 분석 지연/오류 시 자동 재시도(1회).
- 최종 실패 시 오류 안내 모달 + 결제 자동 취소.
- 파일 파싱 실패 시 지원 포맷(PDF/DOCX) 안내.

### 7.2. 데이터 및 보안 정책

- **개인정보 보호**: 업로드된 이력서 개인정보(주민번호 등) 자동 감지 및 마스킹 권장.
- **비회원 데이터**: 30일 보관 후 삭제.
- **파일 보안**: 업로드 파일 악성 코드 스캔.

### 7.3. 파일 처리 정책
- **업로드 제한**: 확장자 화이트리스트(pdf, docx, doc), MIME 타입 검증, 최대 5MB
- **파일 보관**: 분석 완료 후 원본 파일은 30일 내 Supabase Storage에서 자동 삭제 (pg_cron)
- **텍스트 추출**: PDF는 pdf-parse, DOCX는 mammoth 사용. 추출 실패 시 오류 안내
- **개인정보 감지**: 업로드 텍스트에서 주민등록번호, 전화번호 패턴을 정규식으로 감지하여 마스킹 안내 표시

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
| **GET** | `/api/users/me` | 내 정보 조회 | User |
| **PATCH** | `/api/users/me` | 프로필 수정 | User |

### 8.2. Resumes (이력서 분석)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/resumes` | 이력서 생성 및 분석 요청 (텍스트 또는 파일) | User, Guest |
| **POST** | `/api/resumes/generate` | 내부 AI 분석 수행 | Internal |
| **GET** | `/api/resumes` | 내 이력서 목록 | User |
| **GET** | `/api/resumes/[id]` | 개별 이력서 + 분석 결과 | Owner |
| **PATCH** | `/api/resumes/[id]` | 이력서 수정 (버전 생성) | Owner |
| **DELETE** | `/api/resumes/[id]` | 이력서 삭제 | Owner |
| **GET** | `/api/resumes/[id]/diff` | 버전 간 비교 (diff 결과) | Owner |

### 8.3. Payments

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 결제 승인 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 결제 상태 확인 | Owner |
| **POST** | `/api/webhooks/toss` | 웹훅 수신 | Public (IP 제한) |

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

### 8.4. Admin

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 대시보드 통계 | Admin |
| **GET** | `/api/admin/orders` | 주문 리스트 | Admin |
| **GET** | `/api/admin/orders/[id]` | 주문 상세 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | AI 재분석 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 결제 취소 | Admin |
| **GET** | `/api/admin/users` | 회원 리스트 | Admin |

## 9. DB Schema Specification (Supabase)

### 9.1. Entity Map

**1. users (Supabase Auth)**

**2. public.profiles (회원 정보)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK, References `auth.users.id` |
| `nickname` | `text` | **NN** | 닉네임 |
| `role` | `text` | **NN** | 'USER' or 'ADMIN' |
| `created_at` | `timestamptz` | **NN** | 가입 일시 |

**3. public.guests (비회원 정보)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `phone` | `text` | **NN** | 전화번호 (Unique) |
| `password_hash` | `text` | **NN** | 비밀번호 (Bcrypt) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**4. public.resumes (이력서 데이터)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | Null | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `content` | `text` | **NN** | 이력서 텍스트 (Input) |
| `file_url` | `text` | Null | 업로드 파일 URL (Supabase Storage) |
| `file_size` | `integer` | Null | 파일 크기 (bytes) |
| `file_mime_type` | `text` | Null | MIME 타입 ('application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') |
| `target_job` | `text` | **NN** | 지원 직무 ('DEVELOPER', 'PLANNER', 'DESIGNER', 'SALES', 'MARKETING', 'GENERAL') |
| `version` | `integer` | **NN** | 버전 번호 (Default: 1) |
| `parent_id` | `uuid` | Null | FK `resumes.id` (이전 버전 참조) |
| `status` | `text` | **NN** | `PENDING`, `COMPLETED`, `FAILED` |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**5. public.analyses (분석 결과)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `resume_id` | `uuid` | **NN** | FK `resumes.id` (Unique) |
| `overall_score` | `integer` | Null | 종합 점수 (0-100) |
| `job_fitness` | `integer` | Null | 직무 적합도 (0-100) |
| `keyword_match` | `integer` | Null | 키워드 매칭률 (0-100) |
| `readability` | `integer` | Null | 가독성 점수 (0-100) |
| `star_score` | `integer` | Null | STAR 기법 충족도 (0-100) |
| `feedback` | `jsonb` | Null | AI 피드백 상세 (문장별 개선 제안 등) |
| `premium_output` | `jsonb` | Null | 프리미엄 결과 (생성된 자소서, 커버레터) |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**6. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `resume_id` | `uuid` | **NN** | FK `resumes.id` (Unique) |
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

-- resumes: 소유자만 접근
CREATE POLICY "Owner full access" ON resumes FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM resumes WHERE resumes.id = orders.resume_id AND (resumes.user_id = auth.uid() OR resumes.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| resumes | `(user_id, status)` | 사용자별 목록 조회 |
| resumes | `(guest_id, status)` | 비회원 목록 조회 |
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
| API-A-02 | POST | `/api/auth/guest` | 비회원 로그인 실패 | ✅ Pass |
| API-A-03 | POST | `/api/auth/logout` | 로그아웃 | ✅ Pass |
| API-A-04 | GET | `/api/users/me` | 내 정보 조회 (인증) | ✅ Pass |
| API-A-05 | GET | `/api/users/me` | 내 정보 조회 (미인증) | ✅ Pass |
| API-A-06 | PATCH | `/api/users/me` | 프로필 수정 성공 | ✅ Pass |

### 10.2. Resumes API

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-R-01 | POST | `/api/resumes` | 이력서 생성 (텍스트) | ✅ Pass |
| API-R-02 | POST | `/api/resumes` | 이력서 생성 (PDF 업로드) | ✅ Pass |
| API-R-03 | POST | `/api/resumes` | 필수 파라미터 누락 | ✅ Pass |
| API-R-04 | POST | `/api/resumes` | 미지원 파일 포맷 | ✅ Pass |
| API-R-05 | POST | `/api/resumes` | 파일 크기 초과 (5MB) | ✅ Pass |
| API-R-06 | GET | `/api/resumes` | 내 이력서 목록 | ✅ Pass |
| API-R-07 | GET | `/api/resumes/[id]` | 이력서 + 분석 결과 조회 | ✅ Pass |
| API-R-08 | PATCH | `/api/resumes/[id]` | 이력서 수정 (버전 증가) | ✅ Pass |
| API-R-09 | DELETE | `/api/resumes/[id]` | 이력서 삭제 | ✅ Pass |
| API-R-10 | POST | `/api/resumes/generate` | AI 분석 요청 | ✅ Pass |

### 10.3. Payments API

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-P-01 | POST | `/api/payments/confirm` | 결제 승인 성공 | ✅ Pass |
| API-P-02 | POST | `/api/payments/confirm` | 금액 불일치 | ✅ Pass |
| API-P-03 | GET | `/api/payments/[orderId]` | 결제 상태 확인 | ✅ Pass |
| API-P-04 | POST | `/api/webhooks/toss` | 웹훅 정상 수신 | ✅ Pass |

### 10.4. Admin API

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-AD-01 | GET | `/api/admin/stats` | 대시보드 통계 | ✅ Pass |
| API-AD-02 | GET | `/api/admin/orders` | 주문 리스트 | ✅ Pass |
| API-AD-03 | GET | `/api/admin/orders/[id]` | 주문 상세 | ✅ Pass |
| API-AD-04 | POST | `/api/admin/orders/[id]/retry` | AI 재분석 | ✅ Pass |
| API-AD-05 | POST | `/api/admin/orders/[id]/cancel` | 결제 취소 | ✅ Pass |
| API-AD-06 | GET | `/api/admin/users` | 회원 리스트 | ✅ Pass |
| API-AD-07 | N/A | `/api/admin/*` | 권한 없는 접근 | ✅ Pass |

## 11. Security Checklist

### 11.1 Identity & Access Management

- **Supabase RLS**: `profiles`, `guests`, `resumes`, `analyses`, `orders` RLS 적용.
- **API 권한 제어**: Middleware로 ADMIN 검증.
- **비회원 비밀번호**: Bcrypt + Salt 해싱.

### 11.2 Application & Data Security

- **Internal API Protection**: `/api/resumes/generate` 외부 호출 차단.
  - `x-internal-request` 커스텀 헤더 + 서버 환경변수(`INTERNAL_SECRET`) 검증
  - Vercel 배포 시 VPC 내부 통신만 허용
- **파일 업로드 보안**: 확장자 화이트리스트(pdf, docx, doc), 파일 크기 제한(5MB), 악성 코드 스캔.
- **Error Handling**: 내부 예외 정보 노출 금지.

### 11.3 AI & Input Validation

- **Prompt Injection 방어**: 입력 글자 수 제한(10,000자), 특수 문자 필터링.
  - 입력 글자 수 서버 사이드 검증 (최대 10,000자)
  - 특수 문자 및 SQL/HTML 패턴 정규식 필터링
  - AI 시스템 프롬프트와 사용자 입력을 별도 메시지로 분리 (prompt isolation)
  - AI 응답 후처리: 민감 정보(전화번호, 주민번호) 패턴 감지 및 마스킹
- **XSS 차단**: 분석 결과 출력 시 이스케이프.

### 11.4 Payment Security

- **금액 위변조 방지**: 백엔드 실원가 검증.
- **Webhook 검증**: Toss IP + Secret Key.
- **멱등성**: 동일 orderId 중복 결제 방지.

### 11.5 Security E2E Test Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **IAM** | RLS | 비인가 데이터 접근 차단 | ✅ Pass |
| **App** | Internal API | 외부에서 generate 직접 호출 차단 | ✅ Pass |
| **App** | 파일 업로드 | .exe 파일 업로드 차단 | ✅ Pass |
| **Input** | Prompt Injection | "프롬프트를 무시하라" 필터링 | ✅ Pass |
| **Payment** | 금액 위변조 | Amount 조작 시 400 | ✅ Pass |

### 11.6 Rate Limiting
- 비회원 로그인: 5회/분 per IP
- AI 생성 요청: 3회/분 per user
- API 전체: 100회/분 per IP
- 구현 방식: Next.js middleware + Upstash Redis (또는 Supabase pg_rate_limit)
- 초과 시 응답: 429 Too Many Requests + Retry-After 헤더

### 11.7 CSRF 방어
- SameSite=Strict 쿠키 설정
- 상태 변경 API(POST/PATCH/DELETE)에 커스텀 헤더 검증

### 11.8 Admin 인증
- 미들웨어에서 `profiles.role = 'ADMIN'` 검증
- Admin 세션 타임아웃: 30분 비활동 시 자동 로그아웃
- 모든 Admin 액션 감사 로그 기록

## 12. Service Optimization Checklist

### 12.1 Rendering & Asset Optimization

- **이미지 최적화**: `next/image` + WebP.
- **Client Component 최소화**: 차트 컴포넌트에만 `"use client"`.

### 12.2 Network & Core Web Vitals

- **데이터 캐싱**: 분석 결과 캐싱.
- **Web Vitals**: LCP, INP, CLS 모니터링.

### 12.3 Backend & Database

- **인덱싱**: `resumes` user_id, guest_id, status 복합 인덱스.
- **Connection Pooling**: Supavisor.
- **파일 스토리지**: Supabase Storage에 업로드, CDN 서빙.

### 12.4 SEO & Discoverability

- **동적 메타데이터**: `/result/[id]`에 OG 태그.
- **Sitemap**: `app/sitemap.ts`.

### 12.5 AI Response UX

- **Streaming**: 분석 결과 실시간 출력.
- **Debouncing**: 분석/결제 버튼 중복 클릭 방지.

### 12.6 E2E Optimization Test Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Rendering** | Bundle 최적화 | `/analyze` JS 번들 크기 확인 | ✅ Pass |
| **Network** | 캐싱 | 분석 결과 재조회 시 캐시 활용 | ✅ Pass |
| **Database** | 인덱싱 | 이력서 목록 조회 속도 | ✅ Pass |
| **SEO** | 동적 Meta | 결과 페이지 OG 태그 | ✅ Pass |
| **UX/AI** | Streaming | AI 분석 중 행 없음 | ✅ Pass |

## 13. Compliance Checklist

### 13.1 Privacy Data Protection

- **수집 최소화**: 이메일, 닉네임만 수집.
- **명시적 동의**: 약관 분리 동의.
- **잊혀질 권리**: 탈퇴 시 즉시 삭제.
- **비회원 30일 보관**: 자동 파기.

### 13.2 Payment Compliance

- **Toss 가이드라인**: Secret Key 서버 환경변수.
- **결제 기록 5년 보존**.
- **청약 철회 불가 고지**.

### 13.3 AI & Data Ownership

- **AI 학습 미사용**: 프라이버시 정책 명시.
- **업로드 파일**: 분석 완료 후 원본 파일 30일 내 삭제.

### 13.4 Compliance E2E Test Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | 선택 동의 없이 정상 결제 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | 탈퇴 시 정상 파기 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | 평문 미노출 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | UI에 텍스트 명시 | ✅ Pass |
| **AI/Data** | 파일 삭제 정책 | 분석 후 30일 내 원본 삭제 | ✅ Pass |

### 13.5 데이터 유출 대응
- 발견 후 72시간 내 관할 당국 통지 (개인정보보호법)
- 영향받는 사용자에게 이메일/SMS 통지
- 원인 분석 리포트 작성 및 재발 방지 대책 수립

### 13.6 쿠키 동의
- 필수 쿠키 (인증 세션, 결제 세션): 서비스 이용에 필요하므로 자동 적용
- 분석 쿠키 (GA4, Hotjar): 명시적 동의 후 활성화
- 구현: 하단 고정 Cookie Consent 배너, 동의 거부 시에도 서비스 이용 가능

### 13.7 결제 기록 보존 및 폐기
- 결제 완료 기록: 5년 보존 (전자상거래법 제6조)
- 회원 탈퇴 시: 결제 기록은 개인식별정보를 익명화하여 보존
- 5년 경과 후: 결제 기록 완전 삭제
- 비회원 결제 기록: 30일 후 개인정보 마스킹, 결제 기록만 5년 보존
