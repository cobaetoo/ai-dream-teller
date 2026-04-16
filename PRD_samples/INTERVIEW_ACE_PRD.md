# Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: InterviewAce (AI 모의면접 코치)
- **목표**: 직무와 기업을 선택하면 AI가 면접 질문을 생성하고, 사용자의 답변을 분석해 피드백을 제공하는 수익형 웹 서비스.
- **핵심 가치 1**: 실제 면접처럼 제한 시간 내 답변을 작성하는 타이머 UI로 실전 감각 훈련.
- **핵심 가치 2**: STAR 기법, 구체성, 직무 연관성 등을 점수화하여 객관적이고 개선 가능한 피드백 제공.

## 2. 타겟 유저 (Target Audience)

- 취업/이직 준비 중인 20~35대.
- 면접이 불안하여 연습이 필요한 구직자.
- AI 피드백으로 답변을 반복 개선하고 싶은 유저.

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend & DB**: Next.js API Routes, Supabase
- **Payment**: Toss Payments
- **AI**: Gemini with gemini sdk

## 4. 디자인 가이드 (Design Guidelines)

- **Theme**: Professional, Confident, Focused.
- **Colors**: Deep Blue, Gold Accent, White.
- **Interactions**: 타이머 카운트다운, 점수 게이지 애니메이션, 질문 카드 슬라이드.

## 5. UX Flow & Layout (User Side)

### 5.1. Global Layout

1. **상단 네비게이션 바**: 홈 로고, 메뉴, 로그인/마이페이지.
2. **Body**: 각 페이지 내용.
3. **Footer**: 사업자 정보, 이용약관, 개인정보처리방침, 문의하기.
4. **Head & Meta**: SEO, Open Graph, GA4.

### 5.2. Page Details

1. **메인 랜딩페이지 (`/`)**
   - **Hero Section**: "AI 코치와 함께하는 모의면접, 자신감 있게 면접장에." CTA ("모의면접 시작").
   - **Feature Section**: 직무별 질문 생성, 타이머 실전 모드, STAR 기법 분석, 개선 포인트.
   - **Social Proof**: "3번 연습하고 실제 면접에서 같은 질문이 나왔어요" 등 후기.

2. **면접 설정 (`/interview-setup`)**
   - **직무 선택**: 개발자, 기획자, 디자이너, 영업, 마케팅, 인사, 재무, 일반 사무 등.
   - **기업 정보**: 기업명 (선택), 산업군, 기업 규모 (대기업/중견/스타트업/공기업).
   - **면접 유형**: 경력 / 신입.
   - **질문 카테고리**: 인성, 직무, 기업 이해, 상황 대처 (복수 선택).
   - **모드**: 단일 질문 연습 (`SINGLE` — 1문항) / 실전 모드 (`SESSION` — 연속 5~10문항).
   - **시간 제한**: 1분 / 2분 / 3분 / 제한 없음.

3. **결제 페이지 (`/payments`)**: 영수증 컨셉, 기본/프리미엄 플랜, 토스페이먼츠.

4. **모의면접 세션 (`/interview-session/[id]`)**
   - **질문 카드**: AI 생성 면접 질문 표시.
   - **타이머**: 카운트다운 타이머 (설정한 시간).
   - **답변 입력**: 텍스트 에어리어.
   - **제출**: 시간 내 제출 또는 시간 초과 시 자동 제출.
   - **실전 모드**: 다음 질문으로 자동 진행.
   - **진행 바**: 현재 문항 / 전체 문항.
   - **세션 복구**: 브라우저 새로고침 또는 의외 종료 시, `localStorage`에 저장된 세션 ID로 진행 중인 면접 세션 복구. 마지막으로 답변한 문항부터 이어서 진행.
   - **자동 저장**: 답변 입력 중 10초마다 자동 임시 저장 (draft). 세션 복구 시 임시 저장된 답변 복원.

5. **분석 리포트 (`/interview-result/[id]`)**
   - **종합 점수**: 0-100 게이지.
   - **문항별 분석**: STAR 충족도, 구체성, 직무 연관성, 개선 포인트.
   - **강점/약점**: 전체 세션 기반 강점과 보완점.
   - **추천 학습 자료**: 약점 기반 추천.
   - **프리미엄**: 직무별 딥다이브 + 이력서 연동 + 모의면접 세션 무제한.

6. **유저 마이페이지 (`/my-page`)**: 면접 히스토리, 점수 추이 그래프, 프로필 수정.
7. **비회원 로그인 (`/guest-login`)**, **비회원 주문 조회 (`/guest-check`)**, **회원 로그인 (`/auth`)**.

### 5.3. E2E Test Checklist

| 구분 | 테스트 대상 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **Landing** | `Home (/)` | CTA -> `/interview-setup` | ✅ Pass |
| **Auth** | `Guest Login` | 비회원 로그인 | ✅ Pass |
| **Setup** | `interview-setup` | 직무/기업/카테고리 선택 | ✅ Pass |
| **Payment** | `payments` | 토스 위젯, 결제 성공 | ✅ Pass |
| **Session** | `interview-session/[id]` | 질문 표시, 타이머, 답변 입력, 제출 | ✅ Pass |
| **Timer** | 타이머 | 카운트다운, 시간 초과 자동 제출 | ✅ Pass |
| **Result** | `interview-result/[id]` | 종합 점수, 문항별 분석, 차트 | ✅ Pass |
| **My Page** | `my-page` | 히스토리, 점수 추이 | ✅ Pass |

### 5.4. Guest Checkout 구현 리스트

| 구분 | 주요 기능 | 구현 여부 | E2E 테스트 |
|---|---|---|---|
| **Frontend** | 비회원 폼 | ✅ 완료 | ✅ 완료 |
| **Backend** | Guest 분기 | ✅ 완료 | ✅ 완료 |
| **Backend** | Bcrypt 해싱 | ✅ 완료 | ✅ 완료 |
| **Database** | RLS 설정 | ✅ 완료 | ✅ 완료 |

## 6. Admin UX Flow & Layout

1. **대시보드 (`/admin`)**: 매출, 가입자, 직무별 인기, 평균 점수 분포.
2. **주문 내역 (`/admin/order-list`)**: 주문 테이블.
3. **주문 상세 (`/admin/order-list/[id]`)**: 면접 설정, 질문/답변, 분석 결과, 재시도/취소.
4. **유저 리스트 (`/admin/user-list`)**: 회원/비회원.
5. **질문 DB 관리 (`/admin/questions`)**: 기본 질문 템플릿 관리.

### Admin API

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **GET** | `/api/admin/stats` | 통계 | Admin |
| **GET** | `/api/admin/orders` | 주문 | Admin |
| **GET** | `/api/admin/orders/[id]` | 상세 | Admin |
| **POST** | `/api/admin/orders/[id]/retry` | 재분석 | Admin |
| **POST** | `/api/admin/orders/[id]/cancel` | 취소 | Admin |
| **GET** | `/api/admin/users` | 회원 | Admin |
| **GET** | `/api/admin/questions` | 질문 템플릿 | Admin |
| **POST** | `/api/admin/questions` | 질문 생성 | Admin |
| **PATCH** | `/api/admin/questions/[id]` | 질문 수정 | Admin |

## 7. 운영 및 정책

### 7.1. 예외 및 실패 처리

- AI 분석 지연/오류 시 자동 재시도(1회). 최종 실패 시 결제 자동 취소.
- 비회원 데이터 30일 보관 후 삭제.
- AI 분석은 참고용이며 실제 면접 결과를 보장하지 않음.

### 7.2. 면접 세션 관리
- **세션 만료**: 생성 후 24시간 이내 미완료 시 자동 만료 (status → `EXPIRED`)
- **동시 세션 제한**: 1인당 최대 1개 활성 세션 (기존 세션 완료/만료 후 신규 생성 가능)
- **분석 결과 보관**: 완료된 세션의 분석 결과는 무기한 보관 (회원 탈퇴 시까지)

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

## 8. API Specification

### 8.1. Auth & Users

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/auth/guest` | 비회원 로그인 | Public |
| **POST** | `/api/auth/logout` | 로그아웃 | User, Guest |
| **GET** | `/api/users/me` | 내 정보 | User |
| **PATCH** | `/api/users/me` | 프로필 수정 | User |

### 8.2. Sessions (면접 세션)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/sessions` | 면접 세션 생성 (설정 정보 포함) | User, Guest |
| **POST** | `/api/sessions/generate` | 내부 AI 질문 생성 | Internal |
| **GET** | `/api/sessions` | 내 세션 목록 | User |
| **GET** | `/api/sessions/[id]` | 세션 상세 (질문+답변) | Owner |

### 8.3. Answers (답변)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/sessions/[id]/answers` | 답변 제출 | User, Guest |
| **POST** | `/api/sessions/[id]/draft` | 답변 임시 저장 (자동 저장용) | User, Guest |
| **POST** | `/api/sessions/[id]/analyze` | 내부 AI 답변 분석 | Internal |

### 8.4. Payments

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| **POST** | `/api/payments/confirm` | 결제 승인 | User, Guest |
| **GET** | `/api/payments/[orderId]` | 결제 상태 | Owner |
| **POST** | `/api/webhooks/toss` | 웹훅 | Public (IP 제한) |

### 8.5. 공통 API 규약

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

**3. public.interview_sessions (면접 세션)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `user_id` | `uuid` | Null | FK `profiles.id` |
| `guest_id` | `uuid` | Null | FK `guests.id` |
| `job_type` | `text` | **NN** | 'DEVELOPER', 'PLANNER', 'DESIGNER', 'SALES', 'MARKETING', 'HR', 'FINANCE', 'GENERAL' |
| `company_name` | `text` | Null | 기업명 |
| `industry` | `text` | Null | 산업군 |
| `company_size` | `text` | Null | 'LARGE', 'MID', 'STARTUP', 'PUBLIC' |
| `career_type` | `text` | **NN** | 'EXPERIENCED', 'NEW' |
| `categories` | `jsonb` | **NN** | 선택 카테고리 ['PERSONALITY', 'JOB', 'COMPANY', 'SITUATION'] |
| `mode` | `text` | **NN** | 'SINGLE', 'SESSION' |
| `time_limit` | `integer` | Null | 제한 시간 (초). Null = 제한 없음 |
| `total_questions` | `integer` | **NN** | 총 질문 수 |
| `status` | `text` | **NN** | `PENDING`, `IN_PROGRESS`, `COMPLETED`, `FAILED` |
| `overall_score` | `integer` | Null | 종합 점수 (0-100) |
| `started_at` | `timestamptz` | Null | 세션 시작 시각 (타이머 서버 검증용) |
| `draft_answers` | `jsonb` | Null | 임시 저장된 답변 [{question_id, content, saved_at}] |
| `created_at` | `timestamptz` | **NN** | 생성 일시 |

**4. public.questions (면접 질문)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `session_id` | `uuid` | **NN** | FK `interview_sessions.id` |
| `question_text` | `text` | **NN** | 질문 내용 |
| `category` | `text` | **NN** | 'PERSONALITY', 'JOB', 'COMPANY', 'SITUATION' |
| `order_index` | `integer` | **NN** | 순서 |

**5. public.answers (답변 및 분석)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `question_id` | `uuid` | **NN** | FK `questions.id` (Unique) |
| `content` | `text` | **NN** | 답변 내용 |
| `time_spent` | `integer` | Null | 소요 시간 (초) |
| `star_score` | `integer` | Null | STAR 충족도 (0-100) |
| `specificity` | `integer` | Null | 구체성 (0-100) |
| `job_relevance` | `integer` | Null | 직무 연관성 (0-100) |
| `improvement_points` | `jsonb` | Null | 개선 포인트 |
| `strength_points` | `jsonb` | Null | 강점 |
| `score` | `integer` | Null | 문항 점수 (0-100) |

**6. public.question_templates (관리자 질문 템플릿)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `uuid` | **NN** | PK |
| `job_type` | `text` | **NN** | 직무 |
| `category` | `text` | **NN** | 카테고리 |
| `question_text` | `text` | **NN** | 질문 |
| `is_active` | `boolean` | **NN** | 활성 여부 |

**7. public.orders (주문 및 결제)**

| Column | Type | Null | Description |
|:---|:---|:---|:---|
| `id` | `text` | **NN** | PK (Toss Order ID) |
| `session_id` | `uuid` | **NN** | FK `interview_sessions.id` (Unique) |
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

-- interview_sessions: 소유자만 접근 (user_id 또는 guest_id 매칭)
CREATE POLICY "Owner full access" ON interview_sessions FOR ALL
  USING (user_id = auth.uid() OR guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid);

-- orders: 소유자만 조회
CREATE POLICY "Owner order access" ON orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM interview_sessions WHERE interview_sessions.id = orders.session_id AND (interview_sessions.user_id = auth.uid() OR interview_sessions.guest_id = (current_setting('request.jwt.claims'::text, true)::json ->> 'guest_id')::uuid)));
```

### 인덱스 전략

| 테이블 | 인덱스 | 용도 |
|---|---|---|
| interview_sessions | `(user_id, status)` | 사용자별 목록 조회 |
| interview_sessions | `(guest_id, status)` | 비회원 목록 조회 |
| orders | `(created_at DESC)` | Admin 주문 리스트 |
| orders | `(status)` | 결제 상태별 필터 |

### Connection Pooling
- Supabase Supavisor 사용 (Transaction Mode)
- Pool size: 20 connections

## 10. API E2E Test Scenarios

| ID | Method | Endpoint | Scenario | Status |
|:---|:---|:---|:---|:---|
| API-A-01 | POST | `/api/auth/guest` | 비회원 로그인 | ✅ Pass |
| API-S-01 | POST | `/api/sessions` | 세션 생성 | ✅ Pass |
| API-S-02 | POST | `/api/sessions/generate` | 질문 생성 | ✅ Pass |
| API-S-03 | GET | `/api/sessions/[id]` | 세션 상세 | ✅ Pass |
| API-AN-01 | POST | `/api/sessions/[id]/answers` | 답변 제출 | ✅ Pass |
| API-AN-02 | POST | `/api/sessions/[id]/analyze` | AI 분석 | ✅ Pass |
| API-P-01 | POST | `/api/payments/confirm` | 결제 성공 | ✅ Pass |
| API-AD-01 | GET | `/api/admin/stats` | 통계 | ✅ Pass |
| API-AD-02 | POST | `/api/admin/questions` | 질문 템플릿 생성 | ✅ Pass |
| API-AD-03 | POST | `/api/admin/orders/[id]/retry` | 재분석 | ✅ Pass |
| API-AD-04 | POST | `/api/admin/orders/[id]/cancel` | 취소 | ✅ Pass |

## 11. Security Checklist

| 카테고리 | 점검 항목 | 테스트 시나리오 | 상태 |
|:---|:---|:---|:---|
| **IAM** | RLS | 비인가 접근 차단 | ✅ Pass |
| **App** | Internal API | generate/analyze 외부 호출 차단 | ✅ Pass |
| **Input** | Prompt Injection | 악의적 답변 필터링 | ✅ Pass |
| **Payment** | 금액 위변조 | 조작 시 400 | ✅ Pass |
| **Timer** | 클라이언트 조작 | 서버 세션 생성 시 `started_at` 기록, 답변 제출 시 `server_time() - started_at`으로 실제 소요 시간 계산. 클라이언트 타이머 조작 무의미 | ✅ Pass |
| **Infra** | Rate Limiting | 초과 시 429 | ✅ Pass |

### Security Implementation Details

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

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Rendering** | 질문 카드 lazy loading | ✅ Pass |
| **Network** | 세션 결과 캐싱 | ✅ Pass |
| **Database** | sessions(user_id, status), answers(question_id) 인덱싱 | ✅ Pass |
| **SEO** | 동적 Meta | ✅ Pass |
| **UX/AI** | 분석 결과 실시간 출력 | ✅ Pass |
| **UX** | 타이머 정확도 (서버 시간 기준) | ✅ Pass |

## 13. Compliance Checklist

| 카테고리 | 점검 항목 | 상태 |
|:---|:---|:---|
| **Privacy** | 강제 동의 방지 | ✅ Pass |
| **Privacy** | 잊혀질 권리 | ✅ Pass |
| **Payment** | Secret Key 노출 방지 | ✅ Pass |
| **Payment** | 청약 철회 불가 고지 | ✅ Pass |
| **AI/Data** | AI 학습 미사용 고지 | ✅ Pass |
| **AI/Data** | 분석 결과 참고용 고지 | ✅ Pass |

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
- 회원 탈퇴 시: 결제 기록은 개인식별정보(이메일, 닉네임)를 익명화하여 보존
- 5년 경과 후: 결제 기록 완전 삭제
- 비회원 결제 기록: 30일 후 개인정보 마스킹, 결제 기록만 5년 보존
