# GymBrain Product Requirements Document (PRD)

## Product Overview

GymBrain is a comprehensive gym management SaaS platform for fitness center administrators, providing an all-in-one solution for gym operations, member management, and business analytics.

---

## Stakeholders & User Roles

### Platform Architecture

GymBrain operates as a multi-tenant SaaS platform:

```
Platform Provider (GymBrain)
    │
    ├── B2B Clients (Gym Owners/Admins)
    │       │
    │       ├── Staff (Trainers, Front Desk)
    │       │
    │       └── B2C Customers (Gym Members)
    │
    └── External Integrations
            ├── Google (OAuth)
            ├── Kakao (OAuth)
            └── Toss Payments
```

### User Roles

| Role | DB `role` Value | Description | Access Level | tenant_id |
|------|----------------|-------------|--------------|-----------|
| **Super Admin** | `super_admin` | GymBrain platform team | All tenants + platform management | NULL |
| **Gym Owner** | `owner` | Tenant administrators | Tenant Admin (their gym only) | Required |
| **Manager** | `manager` | Gym managers, supervisors | Operational management | Required |
| **Trainer** | `trainer` | Personal trainers, coaches | Fitness-focused operations | Required |
| **Member** | `member` | Gym members | Self-service (own data only) | Required |

---

## Role-Based Access Control (RBAC)

### Permission Legend

| Symbol | Meaning |
|--------|---------|
| ✓ | Full Access (View + Create + Edit + Delete) |
| R | Read Only (View) |
| R/W | Read + Write (View + Create + Edit) |
| O | Own Data Only |
| - | No Access |

### Permission Matrix

| Feature | Super Admin | Gym Owner | Manager | Trainer | Member |
|---------|:-----------:|:---------:|:-------:|:-------:|:------:|
| **Platform Management** |
| Create/Delete Tenants | ✓ | - | - | - | - |
| View All Tenants | ✓ | - | - | - | - |
| Manage All Users | ✓ | - | - | - | - |
| **Dashboard** |
| Center Overview | ✓ | ✓ | ✓ | R | - |
| Revenue Charts | ✓ | ✓ | ✓ | R | - |
| **Members** |
| Member List | ✓ | ✓ | ✓ | R/W | - |
| Add/Edit Member | ✓ | ✓ | ✓ | R/W | O |
| Delete Member | ✓ | ✓ | - | - | - |
| **Payments** |
| Payment History | ✓ | ✓ | ✓ | R | O |
| Generate Payment QR | ✓ | ✓ | ✓ | ✓ | - |
| Generate Virtual Account | ✓ | ✓ | ✓ | ✓ | - |
| Refunds | ✓ | ✓ | - | - | - |
| **Payment Requests** |
| Create Payment Request | ✓ | ✓ | ✓ | ✓ | - |
| Send Payment Link (SMS/Email) | ✓ | ✓ | ✓ | ✓ | - |
| View Payment Requests | ✓ | ✓ | ✓ | R | - |
| Cancel Payment Request | ✓ | ✓ | ✓ | - | - |
| **Staff** |
| Staff List | ✓ | ✓ | ✓ | R | - |
| Add/Edit Staff | ✓ | ✓ | ✓ | - | O |
| Delete Staff | ✓ | ✓ | - | - | - |
| **Workouts & Health** |
| Routine Templates | ✓ | ✓ | ✓ | ✓ | R |
| Create Routine | ✓ | ✓ | ✓ | ✓ | - |
| Health Records | ✓ | ✓ | ✓ | R/W | O |
| **Classes** |
| Class Schedule | ✓ | ✓ | ✓ | ✓ | R |
| Create Class | ✓ | ✓ | ✓ | ✓ | - |
| Class Attendance | ✓ | ✓ | ✓ | ✓ | O |
| **Analytics** |
| Revenue Reports | ✓ | ✓ | ✓ | R | - |
| Export Data | ✓ | ✓ | ✓ | - | - |
| **Settings** |
| Gym Profile | ✓ | ✓ | R | - | - |
| Integrations | ✓ | ✓ | - | - | - |

### Menu Access by Role

| Menu | Super Admin | Owner | Manager | Trainer | Member |
|------|:-----------:|:-----:|:-------:|:-------:|:------:|
| Dashboard (All Tenants) | ✓ | - | - | - | - |
| Dashboard | ✓ | ✓ | ✓ | ✓ | - |
| Members | ✓ | ✓ | ✓ | ✓ | - |
| Staff | ✓ | ✓ | ✓ | R | - |
| Workouts/Routines | ✓ | ✓ | ✓ | ✓ | O |
| Health Logs | ✓ | ✓ | ✓ | ✓ | O |
| Classes | ✓ | ✓ | ✓ | ✓ | R |
| Payments | ✓ | ✓ | ✓ | ✓ | O |
| Analytics | ✓ | ✓ | ✓ | R | - |
| Settings | ✓ | ✓ | R | - | O |
| Platform Settings | ✓ | - | - | - | - |

---

## Feature Specifications

### 1. Member Management

- Member profiles with contact info, membership status
- Electronic contracts for memberships
- Payment link sending via SMS/email
- Auto push notifications for payments, classes, expirations

### 2. Class Management

- Visual calendar for class scheduling
- Auto attendance system (check-in/check-out)
- Monthly statistics (attendance rates, popular classes)

### 3. Center Management

- Dashboard overview (real-time status)
- Revenue tracking (by period and product type)
- Staff management (scheduling, roles)
- Multi-branch support

### 4. Payment Management

- QR code payment
- Virtual account generation
- Credit card payments
- Kakao Pay / Toss Pay

### 5. Additional Features

- Business analytics
- Daily routine generator
- Health & workout logging
- Multi-language support (Korean, English)

---

## Authentication

### Supported Login Methods

| Provider | Use Case | Target Users |
|----------|----------|--------------|
| **Google** | Universal login | All user types |
| **Kakao** | Korean market | Korean gyms & members |
| **Email/Password** | Fallback | Users without social accounts |

### OAuth Setup

#### Google OAuth

1. Create OAuth 2.0 credentials in Google Cloud Console
2. Configure redirect URI: `https://<project>.supabase.co/auth/v1/callback`
3. Required scopes: `email`, `profile`

#### Kakao OAuth

1. Create application in Kakao Developers
2. Configure redirect URI: `https://<project>.supabase.co/auth/v1/callback`
3. Required scopes: `profile`, `account_email`

### Supabase Configuration

Enable providers in Supabase Dashboard > Authentication > Providers

---

## Toss Payments Integration

### Supported Payment Methods

| Method | Description | Use Case |
|--------|-------------|----------|
| **QR Code** | Instant payment QR | In-person member payments |
| **Virtual Account** | One-time bank account | Bank transfer payments |
| **Credit Card** | Direct card payment | Online membership |
| **Kakao Pay** | Kakao wallet | Mobile payments |
| **Toss Pay** | Toss app | Mobile payments |

### Payment Flow

**QR Code:**
1. Staff generates payment QR (amount, member ID, purpose)
2. Member scans with banking app
3. Toss processes payment
4. Webhook confirms to GymBrain
5. Payment record updated

**Virtual Account:**
1. Staff generates virtual account for member
2. Unique account number created (valid for X hours)
3. Member transfers money
4. Toss detects deposit
5. Webhook confirms to GymBrain
6. Payment record updated

### Webhook Events

| Event | Description |
|-------|-------------|
| `payment.confirmed` | Payment completed |
| `payment.failed` | Payment failed |
| `virtual_account.deposited` | VA deposit received |
| `refund.completed` | Refund processed |

### Payment Request (결제 요청) - Phase 2

회원에게 QR 코드 또는 결제 링크를 전송하여 원격 결제를 요청하는 기능입니다. 결제 완료 시 자동으로 매출 내역에 반영됩니다.

#### 기능 개요

| 기능 | 설명 |
|------|------|
| **QR 코드 생성** | 결제 정보가 포함된 QR 코드 생성 |
| **결제 링크 생성** | SMS/이메일 전송용 결제 URL 생성 |
| **자동 매출 반영** | 결제 왑훅 수신 시 payments 테이블 자동 저장 |
| **결제 상태 추적** | 요청 → 결제 대기 → 완료/취소 상태 관리 |

#### 사용자 시나리오

**1. QR 코드 결제 요청 (현장)**
1. 직원이 회원 선택 후 결제 금액/카테고리 입력
2. "QR 코드 생성" 버튼 클릭
3. QR 코드 모달 표시
4. 회원이 스마트폰으로 QR 스캔
5. Toss 결제 페이지에서 결제 진행
6. 결제 완료 → Webhook 수신 → 매출 자동 등록
7. 직원에게 결제 완료 알림 표시

**2. 결제 링크 발송 (원격)**
1. 직원이 회원 선택 후 결제 정보 입력
2. "결제 링크 발송" 버튼 클릭
3. SMS 또는 이메일 선택
4. 회원에게 결제 링크 전송
5. 회원이 링크 클릭 → Toss 결제 페이지
6. 결제 완료 → Webhook 수신 → 매출 자동 등록
7. 직원 및 회원에게 결제 완료 알림

#### 데이터베이스 스키마 확장

```sql
-- 결제 요청 테이블
CREATE TABLE payment_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  trainer_id UUID REFERENCES staff(id) ON DELETE SET NULL,

  -- 결제 정보
  amount DECIMAL(12,2) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('pt', 'rental', 'pilates', 'other')),
  description VARCHAR(500),

  -- Toss Payment 정보
  toss_payment_key VARCHAR(255),
  toss_order_id VARCHAR(255) UNIQUE NOT NULL,  -- 고유 주문 ID

  -- 링크/QR 정보
  payment_url VARCHAR(500),  -- 결제 페이지 URL
  qr_code_url VARCHAR(500),  -- QR 코드 이미지 URL
  expires_at TIMESTAMPTZ,     -- 만료 시간 (기본 24시간)

  -- 상태
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'paid', 'cancelled', 'expired')),

  -- 발송 정보
  send_method VARCHAR(50) CHECK (send_method IN ('qr', 'sms', 'email')),
  sent_at TIMESTAMPTZ,

  -- 결제 완료 시 매출 연동
  payment_id UUID REFERENCES payments(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payment_requests_tenant ON payment_requests(tenant_id);
CREATE INDEX idx_payment_requests_status ON payment_requests(tenant_id, status);
CREATE INDEX idx_payment_requests_order_id ON payment_requests(toss_order_id);
```

#### API 엔드포인트

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| POST | `/payment-requests` | 결제 요청 생성 | owner, manager, trainer |
| GET | `/payment-requests` | 결제 요청 목록 | owner, manager |
| GET | `/payment-requests/:id` | 결제 요청 상세 | owner, manager |
| POST | `/payment-requests/:id/send-sms` | SMS 발송 | owner, manager, trainer |
| POST | `/payment-requests/:id/send-email` | 이메일 발송 | owner, manager, trainer |
| POST | `/payment-requests/:id/cancel` | 결제 요청 취소 | owner, manager |
| POST | `/api/webhooks/toss` | Toss Webhook 수신 | Public (검증 필요) |

**Request Body (POST /payment-requests):**

```json
{
  "member_id": "uuid",
  "trainer_id": "uuid-or-null",
  "amount": 550000,
  "category": "pt",
  "description": "PT 10회권 결제",
  "send_method": "sms"
}
```

#### Webhook 처리 로직

```
Toss Webhook 수신
    │
    ├── payload 검증 (서명 확인)
    │
    ├── payment_requests 테이블에서 toss_order_id로 조회
    │
    ├── status 업데이트 (paid)
    │
    ├── payments 테이블에 자동 생성
    │   ├── tenant_id
    │   ├── member_id
    │   ├── trainer_id
    │   ├── category
    │   ├── amount
    │   ├── payment_method (tossPay/card 등)
    │   ├── payment_date (현재 날짜)
    │   └── payment_request_id (연동)
    │
    └── 알림 발송
        ├── 직원에게 (결제 완료 알림)
        └── 회원에게 (영수증)
```

#### UI 구성요소

| Component | Description |
|-----------|-------------|
| **PaymentRequestModal** | 결제 요청 생성 모달 |
| **QRCodeDisplay** | QR 코드 표시 컴포넌트 |
| **PaymentLinkSender** | SMS/이메일 발송 옵션 |
| **PaymentRequestList** | 결제 요청 목록 (상태별) |
| **PaymentStatusBadge** | 상태 표시 뱃지 |

#### Frontend 화면

**1. 결제 요청 생성 모달**
- 회원 선택 드롭다운
- 결제 카테고리 (PT/공간대관/필라테스)
- 금액 입력
- 설명 입력
- 발송 방식 선택 (QR/SMS/이메일)

**2. QR 코드 표시 화면**
- QR 코드 이미지 (큰 사이즈)
- 결제 정보 요약
- 수동 결제 확인 버튼
- 공유/다운로드 버튼

**3. 결제 요청 관리 페이지**
- 요청 목록 테이블
- 상태 필터 (대기/발송/완료/취소/만료)
- 회원 검색
- 재발송 버튼

#### 알림 연동 (선택사항)

| Event | Notification |
|-------|--------------|
| 결제 요청 발송 | 회원에게 SMS/이메일 |
| 결제 완료 | 직원에게 인앱 알림 |
| 결제 완료 | 회원에게 영수증 SMS/이메일 |
| 결제 실패 | 직원에게 알림 |
| 요청 만료 | 직원에게 알림 |

#### 보안 고려사항

- Webhook 서명 검증 (Toss Secret Key)
- 결제 URL 1회용 또는 만료 시간 설정 (기본 24시간)
- 금액 변조 방지 (서버에서 금액 검증)
- 중복 결제 방지 (idempotency key 사용)
- HTTPS 필수

---

## Frontend Requirements

### Core Technologies

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 |
| State | React Context + Zustand |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query |
| Charts | Recharts / Chart.js |
| Date | date-fns |
| Icons | Lucide React |

### UI Components

| Component | Description |
|-----------|-------------|
| ThemeToggle | Light/Dark mode switch |
| LanguageSwitcher | Korean/English toggle |
| Dashboard Cards | Stats with charts |
| Data Tables | Sortable, filterable lists |
| QR Code Display | Payment QR modal |
| Calendar | Class scheduling |
| Charts | Revenue, attendance graphs |
| Navigation | Sidebar, breadcrumbs |

### Mobile Responsive Design

#### Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |

#### Layout Behavior

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Sidebar | Fixed (256px) | Drawer | Drawer |
| Header | Full controls | Condensed | Hamburger |
| Tables | Full table | Horizontal scroll | Card list |
| Forms | 2-column | 1-column | Stacked |
| Modals | Centered | Full-width | Bottom sheet |

#### Touch Requirements

- Minimum touch target: 44px × 44px
- Minimum spacing: 8px gap
- Swipe gestures for common actions
- Pull-to-refresh on lists

### Custom Hooks

| Hook | Description |
|------|-------------|
| `useIsMobile` | Detects mobile viewport (< 768px), returns boolean for responsive layouts |

### Implemented Responsive Behaviors
| Page | Mobile Behavior | Desktop Behavior |
|------|-----------------|------------------|
| **Members** | Grid view only (1-column), 3-col stats, inline filters, list/grid toggle |
| **Schedule** | Daily view only, FAB for PT registration, Google Calendar-style UX | Daily/Weekly toggle, trainer columns, larger grid |
| **Modals** | Full-width, bottom-positioned | Centered, max-width 480px |

---

## Theme & Language

### Theme (Light/Dark)

| Element | Light | Dark |
|---------|-------|------|
| Background | `#ffffff` | `#0a0a0a` |
| Foreground | `#171717` | `#ededed` |
| Primary | `#2563eb` | `#3b82f6` |
| Border | `#e5e7eb` | `#374151` |
| Card | `#ffffff` | `#1f2937` |

Implementation: `next-themes`, persisted in localStorage

### Language (i18n)

| Feature | Value |
|---------|-------|
| Supported Locales | Korean (ko), English (en) |
| Default | Korean (ko) |
| Routing | URL-based (`/ko/...`, `/en/...`) |
| Library | `next-intl` |

### Settings Page Features

The Settings page now includes comprehensive branding and customization capabilities:

#### Key Color (Brand Color)
- **Preset Colors**: 8 predefined colors (Blue, Purple, Green, Orange, Pink, Red, Teal, Indigo)
- **Custom Color Picker**: Native color picker input with hex code input
- **Real-time Preview**: Primary/Secondary button previews showing selected color
- **Persistence**: Saved to localStorage via ThemeContext

#### Logo Upload
- **Drag & Drop Zone**: Visual upload area with dashed border
- **Image Preview**: 64x64 preview thumbnail with recommended size info
- **Remove Option**: Delete logo button to **Storage**: Base64 encoded in localStorage via ThemeContext
#### Theme Toggle (Light/Dark/System)
- **Three modes**: Light, Dark, System Default
- **Live Preview**: Changes apply immediately across the UI
- **CSS Variables**: Global theme variables update via `--color-*` properties
- **Dark Mode Color Adjustment**: Key color brightness increased by 20% in dark mode for better visibility

#### Language Setting
- **Two languages**: Korean (ko) and English (en)
- **Live Updates**: All UI labels update immediately when language changes
- **Persistent**: Saved to localStorage via ThemeContext

#### Implementation Details
- **ThemeContext.tsx**: Centralized React Context for global theme state
- **localStorage Key**: `gymbrain-theme-settings`
- **CSS Variables**: Dynamically injected into `<html>` element
- **Auto-persistence**: Settings automatically load on page refresh

---

## Performance Requirements

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |

---

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatible
- Color contrast ratios

---

## Super Admin Frontend (`/admin`)

### Overview

별도의 라우트 그룹 `app/(admin)/`으로 플랫폼 관리자 전용 UI를 제공합니다. 기존 `(dashboard)` 레이아웃과 분리된 독립적인 AdminLayout을 사용합니다.

### Route Structure

```
app/(admin)/
├── layout.tsx              # AdminLayout (별도 사이드바/네비게이션)
├── page.tsx                # Admin 대시보드
├── tenants/
│   ├── page.tsx            # 테넌트(헬스장) 목록
│   └── [id]/
│       └── page.tsx        # 테넌트 상세
├── users/
│   └── page.tsx            # 전체 사용자 관리
├── billing/
│   └── page.tsx            # 구독/결제 관리
├── analytics/
│   └── page.tsx            # 플랫폼 분석
└── settings/
    └── page.tsx            # 플랫폼 설정
```

### Authentication & Authorization

```
Login → JWT 검증 → users.role 확인
  │
  ├── role = 'super_admin'
  │     → /admin 접근 허용
  │     → AdminLayout 렌더링
  │
  ├── role != 'super_admin' && path.startsWith('/admin')
  │     → 403 Forbidden 또는 /dashboard로 리다이렉트
  │
  └── role = 'super_admin' && path = '/dashboard'
        → /admin으로 리다이렉트
```

**Middleware (Next.js):** `/admin/*` 경로에 대해 `super_admin` role 검증 수행

### AdminLayout

기존 `DashboardLayout` 구조를 재사용하되, 사이드바 메뉴와 브랜딩을 분리합니다.

#### Sidebar Menu

| Menu | Icon | Route | Description |
|------|:----:|-------|-------------|
| Admin Dashboard | 📊 | `/admin` | 플랫폼 전체 현황 |
| Tenants | 🏢 | `/admin/tenants` | 헬스장(테넌트) 관리 |
| Users | 👥 | `/admin/users` | 전체 사용자 관리 |
| Billing | 💳 | `/admin/billing` | 구독/결제 관리 |
| Analytics | 📈 | `/admin/analytics` | 플랫폼 분석 리포트 |
| Settings | ⚙️ | `/admin/settings` | 플랫폼 설정 |
| ← Back to Gym | 🏠 | `/dashboard` | 테넌트 대시보드로 이동 |

#### Layout Features

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Sidebar | Fixed 256px, collapsible to 80px | Drawer (slide-out) |
| Header | Page title, notifications | Hamburger, title |
| Theme | Light/Dark (공유) | Light/Dark (공유) |
| Language | KO/EN (공유) | KO/EN (공유) |
| Branding | GymBrain 로고 (플랫폼 브랜드) | 아이콘만 |

> 기존 ThemeContext, LanguageContext를 그대로 재사용합니다. AdminLayout만 별도 컴포넌트로 작성합니다.

### Page Specifications

#### 1. Admin Dashboard (`/admin`)

플랫폼 전체 현황을 한눈에 파악하는 대시보드입니다.

**Stats Cards (4개)**

| Card | Data Source | Example |
|------|------------|---------|
| Total Tenants | COUNT(tenants) | 12 |
| Total Members | SUM(members) across tenants | 3,840 |
| Monthly Platform Revenue | SUM(payments) current month | ₩148,500,000 |
| Active Subscriptions | COUNT(tenants WHERE subscription_status='active') | 10 |

**테넌트 요약 테이블**

| Column | Description |
|--------|-------------|
| 헬스장명 | tenant.name |
| Plan | tenant.plan (basic/pro/enterprise) |
| 구독 상태 | subscription_status 뱃지 |
| 회원 수 | COUNT(members) |
| 월 매출 | SUM(payments) current month |
| 등록일 | tenant.created_at |

- 검색: 헬스장명
- 필터: 구독 상태, Plan
- 정렬: 회원 수, 매출, 등록일
- 클릭 시 → `/admin/tenants/:id`

**알림 카드**

| Alert | Condition |
|-------|-----------|
| 구독 만료 임박 | `trial_ends_at` < 7일 이내 |
| 미결제 테넌트 | `subscription_status = 'past_due'` |
| 최근 가입 | `created_at` < 7일 이내 |

**차트**

| Chart | Type | Description |
|-------|------|-------------|
| 월별 플랫폼 매출 | Line/Area | 전체 테넌트 합산 매출 트렌드 |
| 테넌트별 매출 분포 | Bar | Top 10 테넌트 매출 비교 |
| 구독 플랜 분포 | Donut | basic/pro/enterprise 비율 |

#### 2. Tenants (`/admin/tenants`)

**목록 페이지**

| UI Component | Description |
|-------------|-------------|
| 검색바 | 헬스장명, 대표자명, 이메일 검색 |
| 필터 | 구독 상태 (trial/active/past_due/cancelled), Plan |
| 테이블 | 헬스장명, slug, Plan, 구독 상태, 회원 수, 매출, 전화, 생성일 |
| 테넌트 생성 버튼 | "새 헬스장" 모달 열기 |
| 페이지네이션 | 10개/20개/50개 선택 |

**테넌트 생성 모달**

| Field | Type | Required | Default |
|-------|------|:--------:|---------|
| 헬스장명 | text input | ✓ | - |
| URL 슬러그 | text input | ✓ | auto-generated from name |
| Plan | select (basic/pro/enterprise) | ✓ | basic |
| 대표 전화 | tel input | - | - |
| 대표 이메일 | email input | - | - |
| 주소 | text input | - | - |
| 사업자등록번호 | text input | - | - |
| 초기 Owner 이메일 | email input | ✓ | - |
| Trial 기간 | date picker | - | +14일 |

**테넌트 상세 페이지 (`/admin/tenants/:id`)**

탭 구조:

| Tab | Content |
|-----|---------|
| 개요 | 기본 정보, 통계 카드, 최근 활동 |
| 회원 | 해당 테넌트의 회원 목록 (읽기 전용) |
| 매출 | 해당 테넌트의 매출 내역 (읽기 전용) |
| 지출 | 해당 테넌트의 지출 내역 (읽기 전용) |
| PT 세션 | 해당 테넌트의 PT 스케줄 (읽기 전용) |
| 직원 | 해당 테넌트의 직원 목록 (읽기 전용) |
| 설정 | 테넌트 설정 수정, 구독 관리, 데이터 관리 |

**개요 탭 Stats Cards**

| Card | Description |
|------|-------------|
| 총 회원 | active/inactive/frozen/expired 분포 |
| 월 매출 | 이번 달 매출 + 전월 대비 |
| 월 지출 | 이번 달 지출 + 전월 대비 |
| 이번 달 PT | 세션 수 + 완료율 |

**설정 탭 — 구독 관리**

| Action | Description |
|--------|-------------|
| Plan 변경 | basic ↔ pro ↔ enterprise |
| 구독 상태 변경 | trial → active, active → cancelled 등 |
| Trial 연장 | trial_ends_at 수정 |
| 데이터 초기화 | 테넌트의 모든 데이터 삭제 (위험, 확인 모달) |

#### 3. Users (`/admin/users`)

**사용자 목록**

| Column | Description |
|--------|-------------|
| 이름 | user.name |
| 이메일 | user.email |
| 역할 | user.role 뱃지 |
| 소속 헬스장 | tenant.name (super_admin은 "플랫폼") |
| 가입일 | user.created_at |

- 검색: 이름, 이메일
- 필터: 역할 (super_admin/owner/manager/trainer/member), 소속 테넌트
- 정렬: 이름, 가입일

**사용자 상세 모달**

| Field | Description |
|-------|-------------|
| 기본 정보 | 이름, 이메일, 역할, 소속, 가입일 |
| 활동 요약 | 최근 로그인, 생성한 결제 수, 등록한 회원 수 |
| 역할 변경 | 드롭다운 (소유자 변경 시 주의) |
| 비활성화 | 토글 (auth.users 차단) |

#### 4. Billing (`/admin/billing`)

**구독 현황 대시보드**

| Component | Description |
|-----------|-------------|
| Plan 분포 카드 | basic/pro/enterprise 테넌트 수 |
| MRR 카드 | Monthly Recurring Revenue (추정) |
| Trial 전환율 | trial → active 전환율 |

**테넌트별 결제 현황 테이블**

| Column | Description |
|--------|-------------|
| 헬스장명 | tenant.name |
| Plan | tenant.plan |
| 구독 상태 | 뱃지 (active/past_due/cancelled/trial) |
| 시작일 | 구독 시작일 |
| 다음 결제일 | 예정일 |
| Trial 만료일 | trial_ends_at |

- 필터: 구독 상태, Plan
- 클릭 시 테넌트 상세 설정 탭으로 이동

#### 5. Analytics (`/admin/analytics`)

**플랫폼 전체 분석 리포트**

| Section | Charts/Components |
|---------|-------------------|
| 매출 분석 | 월별 전체 매출 트렌드 (Line), 테넌트별 매출 TOP10 (Bar), 카테고리별 매출 분포 (Donut) |
| 회원 분석 | 전체 회원 증감 추이 (Line), 테넌트별 회원 분포 (Bar), 멤버십 상태 분포 (Donut) |
| PT 세션 분석 | 전체 세션 수 추이 (Line), 카테고리별 분포 (PT/필라테스), 상태별 분포 (완료/취소/노쇼) |
| 지출 분석 | 카테고리별 지출 분포 (Donut), 월별 지출 추이 (Line) |

**공통 컨트롤**

| Control | Options |
|---------|---------|
| 기간 선택 | 3M / 6M / 12M / Custom |
| 테넌트 필터 | 전체 / 개별 테넌트 선택 |
| 차트 타입 전환 | Line / Area / Bar |
| 내보내기 | CSV / 이미지 |

#### 6. Settings (`/admin/settings`)

**탭 구조**

| Tab | Description |
|-----|-------------|
| 플랫폼 설정 | 플랫폼 이름, 로고, 지원 이메일, 기본 Trial 기간 |
| 구독 플랜 | Plan별 가격/기능 설정 (basic/pro/enterprise) |
| 알림 설정 | 구독 만료 알림, 미결제 알림 발송 설정 |
| 감사 로그 | 관리자 활동 로그 (누가, 언제, 무엇을) |

**감사 로그 테이블**

| Column | Description |
|--------|-------------|
| 시간 | timestamp |
| 관리자 | admin name |
| 액션 | tenant.create / user.role_change / subscription.update 등 |
| 대상 | tenant name / user email |
| 상세 | JSON diff 또는 description |

### Shared Components 재사용

| 기존 컴포넌트 | Admin 재사용 |
|--------------|-------------|
| DashboardLayout | 구조 참고 → AdminLayout 신규 작성 |
| Stats Cards | 그대로 재사용 (데이터만 다름) |
| Data Tables | 그대로 재사용 (컬럼만 다름) |
| Charts (Recharts) | 그대로 재사용 |
| 모달 (등록/수정) | 그대로 재사용 |
| ThemeToggle | 그대로 재사용 |
| LanguageSwitcher | 그대로 재사용 |
| useIsMobile hook | 그대로 재사용 |

### Frontend Implementation Specification

#### Component Architecture

```
app/(admin)/
├── layout.tsx                          # AdminLayout (Client Component)
├── page.tsx                            # Admin Dashboard (Server Component)
├── loading.tsx                         # Admin 공통 Skeleton
├── error.tsx                           # Admin 공통 Error Boundary
├── tenants/
│   ├── page.tsx                        # Tenant 목록 (Server Component)
│   ├── loading.tsx                     # Tenant 목록 Skeleton
│   ├── [id]/
│   │   ├── page.tsx                    # Tenant 상세 (Server Component)
│   │   ├── loading.tsx                 # Tenant 상세 Skeleton
│   │   └── _components/
│   │       ├── TenantOverview.tsx       # 개요 탭
│   │       ├── TenantMembers.tsx        # 회원 탭 (읽기 전용)
│   │       ├── TenantSales.tsx          # 매출 탭 (읽기 전용)
│   │       ├── TenantExpenses.tsx       # 지출 탭 (읽기 전용)
│   │       ├── TenantSessions.tsx       # PT 세션 탭 (읽기 전용)
│   │       ├── TenantStaff.tsx          # 직원 탭 (읽기 전용)
│   │       └── TenantSettings.tsx       # 설정 탭
│   └── _components/
│       ├── TenantTable.tsx             # 테이블
│       └── TenantCreateModal.tsx       # 생성 모달
├── users/
│   ├── page.tsx                        # Users 목록 (Server Component)
│   ├── loading.tsx                     # Users Skeleton
│   └── _components/
│       ├── UserTable.tsx               # 사용자 테이블
│       └── UserDetailModal.tsx         # 상세/역할변경 모달
├── billing/
│   ├── page.tsx                        # Billing 대시보드 (Server Component)
│   ├── loading.tsx                     # Billing Skeleton
│   └── _components/
│       ├── BillingOverview.tsx          # 요약 카드 + MRR
│       └── BillingTable.tsx             # 테넌트별 결제 현황
├── analytics/
│   ├── page.tsx                        # Analytics (Server Component)
│   ├── loading.tsx                     # Analytics Skeleton
│   └── _components/
│       ├── AnalyticsControls.tsx        # 기간/테넌트 필터
│       ├── RevenueAnalysis.tsx          # 매출 분석 섹션
│       ├── MemberAnalysis.tsx           # 회원 분석 섹션
│       ├── SessionAnalysis.tsx          # PT 세션 분석 섹션
│       └── ExpenseAnalysis.tsx          # 지출 분석 섹션
└── settings/
    ├── page.tsx                        # Settings (Server Component)
    ├── loading.tsx                     # Settings Skeleton
    └── _components/
        ├── PlatformSettingsForm.tsx     # 플랫폼 설정 폼
        ├── SubscriptionPlanManager.tsx  # 구독 플랜 관리
        ├── NotificationSettings.tsx     # 알림 설정
        └── AuditLogTable.tsx            # 감사 로그

components/admin/
├── AdminLayout.tsx                     # Admin 전용 레이아웃
├── AdminSidebar.tsx                    # Admin 사이드바
├── AdminHeader.tsx                     # Admin 헤더
├── AdminStatsCard.tsx                  # 통계 카드 (공통)
├── AdminStatusBadge.tsx                # 구독/테넌트 상태 뱃지
├── AdminSearchBar.tsx                  # 검색바 (공통)
├── AdminFilterBar.tsx                  # 필터 바 (공통)
└── AdminConfirmModal.tsx               # 위험 작업 확인 모달

app/api/admin/                          # Server Actions (Route Handlers)
├── dashboard/route.ts                  # GET /api/admin/dashboard
├── tenants/
│   ├── route.ts                        # GET, POST /api/admin/tenants
│   └── [id]/
│       ├── route.ts                    # GET, PUT, DELETE /api/admin/tenants/:id
│       └── subscription/route.ts       # PUT /api/admin/tenants/:id/subscription
├── users/
│   ├── route.ts                        # GET /api/admin/users
│   └── [id]/
│       ├── role/route.ts               # PUT /api/admin/users/:id/role
│       └── status/route.ts             # PUT /api/admin/users/:id/status
├── billing/
│   ├── overview/route.ts               # GET /api/admin/billing/overview
│   └── tenants/route.ts               # GET /api/admin/billing/tenants
├── analytics/
│   ├── platform/route.ts               # GET /api/admin/analytics/platform
│   ├── revenue/route.ts                # GET /api/admin/analytics/revenue
│   ├── members/route.ts                # GET /api/admin/analytics/members
│   └── sessions/route.ts               # GET /api/admin/analytics/sessions
└── settings/
    ├── route.ts                        # GET, PUT /api/admin/settings
    └── audit-logs/route.ts             # GET /api/admin/audit-logs
```

#### Data Fetching Strategy

| Page | Rendering | Data Fetching | Cache |
|------|-----------|---------------|-------|
| Admin Dashboard | Server Component | Server Action → Direct Supabase query (service_role) | revalidate: 30s |
| Tenants 목록 | Server Component | Server Action → Paginated query | revalidate: 0 (ISR) |
| Tenant 상세 | Server Component | Server Action → JOIN query | revalidate: 30s |
| Users | Server Component | Server Action → Cross-tenant query | revalidate: 30s |
| Billing | Server Component | Server Action → Aggregation query | revalidate: 60s |
| Analytics | Client Component | TanStack Query → Route Handler | staleTime: 5min |
| Settings | Client Component | TanStack Query → Route Handler | staleTime: 10min |

> **Server Components**는 `createClient(service_role)` 사용 → RLS 우회, 모든 테넌트 데이터 접근 가능
> **Client Components**는 `createClient(anon)` + Authorization header → RLS 통한 super_admin 검증

**TanStack Query 키 구조:**

```ts
const adminKeys = {
  dashboard:    ['admin', 'dashboard'],
  tenants: {
    all:        ['admin', 'tenants'],
    list: (f)   ['admin', 'tenants', 'list', f],     // f = filters
    detail: (id)=> ['admin', 'tenants', 'detail', id],
  },
  users: {
    all:        ['admin', 'users'],
    list: (f)   ['admin', 'users', 'list', f],
    detail: (id)=> ['admin', 'users', 'detail', id],
  },
  billing: {
    overview:   ['admin', 'billing', 'overview'],
    tenants: (f)=> ['admin', 'billing', 'tenants', f],
  },
  analytics: {
    revenue: (f)=> ['admin', 'analytics', 'revenue', f],
    members: (f)=> ['admin', 'analytics', 'members', f],
    sessions: (f)=>['admin', 'analytics', 'sessions', f],
    platform: (f)=>['admin', 'analytics', 'platform', f],
  },
  settings:    ['admin', 'settings'],
  auditLogs: (f)=>['admin', 'audit-logs', f],
}
```

#### State Management

**URL State (nuqs 또는 searchParams):**

| Page | URL Params | Example |
|------|-----------|---------|
| Tenants | `?search=&status=&plan=&sort=&order=&page=&limit=` | `?status=trial&plan=basic&page=1` |
| Users | `?search=&role=&tenant_id=&sort=&order=&page=&limit=` | `?role=owner&page=2` |
| Billing | `?status=&plan=` | `?status=past_due` |
| Analytics | `?period=&tenant_id=&start_date=&end_date=` | `?period=6M` |
| Audit Logs | `?admin_id=&action=&target_type=&start_date=&end_date=&page=` | `?action=tenant.create` |

**Form State (React Hook Form + Zod):**

| Form | Schema |
|------|--------|
| 테넌트 생성 | `tenantCreateSchema` (name, slug, plan, owner_email, trial_days) |
| 구독 변경 | `subscriptionUpdateSchema` (plan, subscription_status, trial_ends_at) |
| 사용자 역할 변경 | `userRoleUpdateSchema` (role, tenant_id?) |
| 사용자 상태 변경 | `userStatusUpdateSchema` (is_active, reason) |
| 플랫폼 설정 | `platformSettingsSchema` (platformName, supportEmail, defaultTrialDays, notifications) |
| 구독 플랜 가격 | `planPriceSchema` (price, max_members, max_staff, features) |

**Mutation 시 TanStack Query invalidation:**

```ts
// 테넌트 생성 후
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['admin', 'tenants'] })
  queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] })
}

// 구독 변경 후
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['admin', 'tenants', 'detail', id] })
  queryClient.invalidateQueries({ queryKey: ['admin', 'billing'] })
  queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] })
}
```

#### Mobile Responsive Design

| Page | Desktop (≥1024px) | Tablet (768-1023px) | Mobile (< 768px) |
|------|---------|--------|--------|
| **Admin Dashboard** | 4-col stats, 2-col chart, full table | 2-col stats, stacked charts, scrollable table | 1-col stats, stacked charts, card list |
| **Tenants 목록** | Full table with 7+ columns | Horizontal scroll table | Card list (이름, Plan, 상태, 회원수) |
| **Tenant 상세** | Tab bar horizontal, 2-col layout | Tab bar horizontal, 1-col | Tab bar sticky horizontal or dropdown, 1-col |
| **Users** | Full table with filters | Scrollable table | Card list with search |
| **Billing** | 3-col cards + table | 2-col cards + scrollable table | 1-col cards + card list |
| **Analytics** | 2x2 chart grid + controls | 1-col chart stack + controls | 1-col chart stack, collapsed controls |
| **Settings** | Tab bar left sidebar + form | Tab bar horizontal + form | Tab bar dropdown + stacked form |
| **테넌트 생성 모달** | Centered, max-width 560px | Centered, full-width | Bottom sheet, full-height |
| **Confirm 모달** | Centered, max-width 400px | Centered | Bottom sheet |

**모바일 터치 타겟:**
- 모든 버튼/링크 최소 44x44px
- 리스트 아이템 최소 높이 56px
- 필터/탭 스와이프 제스처 지원

#### Loading & Error States

**Skeleton UI (loading.tsx):**

| Page | Skeleton 구성 |
|------|-------------|
| Dashboard | StatsCardSkeleton x4 + TableSkeleton(5 rows) + ChartSkeleton x2 |
| Tenants | SearchBarSkeleton + FilterBarSkeleton + TableSkeleton(10 rows) |
| Tenant 상세 | TabsSkeleton + StatsCardSkeleton x4 + TableSkeleton(5 rows) |
| Users | SearchBarSkeleton + FilterBarSkeleton + TableSkeleton(10 rows) |
| Billing | StatsCardSkeleton x3 + TableSkeleton(10 rows) |
| Analytics | ControlsSkeleton + ChartSkeleton x4 |
| Settings | TabsSkeleton + FormSkeleton |

**Error States (error.tsx):**

| Error | UI |
|-------|-----|
| 403 Forbidden | "관리자 권한이 필요합니다" + 로그인 버튼 |
| 404 Not Found | "리소스를 찾을 수 없습니다" + 뒤로가기 버튼 |
| 500 Server Error | "일시적인 오류가 발생했습니다" + 재시도 버튼 |
| Network Error | "네트워크 연결을 확인해주세요" + 재시도 버튼 |

**Empty States:**

| Page | Empty Condition | UI |
|------|----------------|-----|
| Tenants | 테넌트 0개 | "아직 등록된 헬스장이 없습니다" + "새 헬스장 등록" 버튼 |
| Users | 사용자 0명 | "등록된 사용자가 없습니다" |
| Audit Logs | 로그 0건 | "기록된 활동 로그가 없습니다" |
| Search 결과 없음 | 모든 페이지 | "검색 결과가 없습니다" + 필터 초기화 버튼 |

**Optimistic Updates:**

| Action | Optimistic Behavior |
|--------|-------------------|
| 구독 상태 변경 | 즉시 뱃지/카드 업데이트, 실패 시 롤백 |
| 사용자 역할 변경 | 즉시 역할 뱃지 업데이트, 실패 시 롤백 |
| 사용자 비활성화 | 즉시 행 비활성화 스타일, 실패 시 롤백 |

#### AdminStatusBadge 상태별 색상

**구독 상태 (subscription_status):**

| Status | Label | Color (Light) | Color (Dark) |
|--------|-------|---------------|--------------|
| `trial` | 트라이얼 | bg-blue-100 text-blue-800 | bg-blue-900 text-blue-200 |
| `active` | 활성 | bg-green-100 text-green-800 | bg-green-900 text-green-200 |
| `past_due` | 미결제 | bg-red-100 text-red-800 | bg-red-900 text-red-200 |
| `cancelled` | 해지 | bg-gray-100 text-gray-800 | bg-gray-700 text-gray-300 |

**사용자 역할 (role):**

| Role | Label | Color (Light) | Color (Dark) |
|------|-------|---------------|--------------|
| `super_admin` | 플랫폼 관리자 | bg-purple-100 text-purple-800 | bg-purple-900 text-purple-200 |
| `owner` | 오너 | bg-indigo-100 text-indigo-800 | bg-indigo-900 text-indigo-200 |
| `manager` | 매니저 | bg-blue-100 text-blue-800 | bg-blue-900 text-blue-200 |
| `trainer` | 트레이너 | bg-green-100 text-green-800 | bg-green-900 text-green-200 |
| `member` | 회원 | bg-gray-100 text-gray-800 | bg-gray-700 text-gray-300 |

**플랜 (plan):**

| Plan | Label | Color (Light) | Color (Dark) |
|------|-------|---------------|--------------|
| `basic` | 베이직 | bg-slate-100 text-slate-800 | bg-slate-700 text-slate-200 |
| `pro` | 프로 | bg-blue-100 text-blue-800 | bg-blue-900 text-blue-200 |
| `enterprise` | 엔터프라이즈 | bg-amber-100 text-amber-800 | bg-amber-900 text-amber-200 |

#### i18n (Admin 페이지)

**번역 키 구조:**

```json
{
  "admin": {
    "nav": {
      "dashboard": "관리자 대시보드",
      "tenants": "헬스장 관리",
      "users": "사용자 관리",
      "billing": "구독/결제",
      "analytics": "분석 리포트",
      "settings": "플랫폼 설정",
      "backToGym": "헬스장으로 돌아가기"
    },
    "dashboard": {
      "title": "플랫폼 대시보드",
      "totalTenants": "전체 헬스장",
      "totalMembers": "전체 회원",
      "monthlyRevenue": "월 플랫폼 매출",
      "activeSubscriptions": "활성 구독",
      "alerts": { ... }
    },
    "tenants": {
      "title": "헬스장 관리",
      "create": "새 헬스장 등록",
      "search": "헬스장명, 대표자명, 이메일 검색",
      "columns": { ... },
      "detail": { ... },
      "subscription": { ... }
    },
    "users": { ... },
    "billing": { ... },
    "analytics": { ... },
    "settings": { ... },
    "common": {
      "confirm": "확인",
      "cancel": "취소",
      "save": "저장",
      "delete": "삭제",
      "search": "검색",
      "filter": "필터",
      "reset": "초기화",
      "loading": "불러오는 중...",
      "noData": "데이터가 없습니다",
      "confirmDanger": "이 작업은 되돌릴 수 없습니다. 정말 진행하시겠습니까?"
    }
  }
}
```

#### Audit Log 자동 기록

모든 Admin API Route Handler에서 감사 로그를 자동으로 기록합니다:

| Action | Target Type | Details Example |
|--------|-------------|-----------------|
| `tenant.create` | tenant | `{ name, slug, plan, owner_email }` |
| `tenant.update` | tenant | `{ previous: {...}, new: {...} }` |
| `tenant.delete` | tenant | `{ name, deleted_data_summary }` |
| `subscription.update` | tenant | `{ previous_plan, new_plan, previous_status, new_status }` |
| `user.role_change` | user | `{ previous_role, new_role, tenant_id }` |
| `user.ban` | user | `{ reason }` |
| `user.unban` | user | `{}` |
| `settings.update` | settings | `{ previous: {...}, new: {...} }` |
| `plan.price_update` | settings | `{ plan_name, previous_price, new_price }` |

> API Route에서 service_role 클라이언트로 `audit_logs` 테이블에 INSERT. IP 주소는 `request.headers.get('x-forwarded-for')`에서 추출.

---

## Data Flow

```
Users (Gym Owner, Staff, Member)
    │
    ├── Login ──► Auth Service
    │                  │
    └── Operations ──► Core Services
                           │
                           ▼
                       Database
                           │
    External Services ◄────┘
    (Toss Payments)
```

---

## Supabase Database Schema (PostgreSQL)

> **Note**: This is a specification document. Actual implementation will be done separately.

### Core Tables

#### 1. tenants (테넌트/헬스장)

Multi-tenant SaaS architecture - each gym is a separate tenant.

```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  plan VARCHAR(50) NOT NULL DEFAULT 'basic',
  settings JSONB DEFAULT '{}',  -- branding, keyColor, logo

  -- Business Info (확장성)
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  business_number VARCHAR(50),  -- 사업자등록번호

  -- Subscription
  subscription_status VARCHAR(50) DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'past_due', 'cancelled')),
  trial_ends_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. users (사용자)

Linked to Supabase Auth.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,  -- NULL for super_admin (platform-level)
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'owner', 'manager', 'trainer', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(tenant_id, email),
  UNIQUE(email) WHERE tenant_id IS NULL  -- super_admin emails are globally unique
);

-- super_admin: Platform-level admin (GymBrain team)
--   - tenant_id is NULL (not bound to any single tenant)
--   - Has full access to ALL tenants' data
--   - Can create/delete tenants, manage all resources
--   - Bypasses tenant-level RLS restrictions
```

#### 3. staff (직원/트레이너)

```sql
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('manager', 'trainer', 'front')),
  specialization VARCHAR(50) CHECK (specialization IN ('PT', '필라테스', 'both')),
  phone VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4. members (회원)

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Basic Info
  name VARCHAR(255) NOT NULL,
  gender VARCHAR(10) CHECK (gender IN ('남', '여')),
  phone VARCHAR(50),
  birth_date DATE,

  -- Membership Info
  membership_type VARCHAR(100) NOT NULL,  -- '프리미엄 PT', 'PT 10회권', etc.
  membership_start DATE NOT NULL,
  membership_end DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'frozen', 'expired', 'expiring')),
  trainer_id UUID REFERENCES staff(id) ON DELETE SET NULL,

  -- Meta
  notes TEXT,
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 5. payments (매출/결제)

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  trainer_id UUID REFERENCES staff(id) ON DELETE SET NULL,

  category VARCHAR(50) NOT NULL CHECK (category IN ('pt', 'rental', 'pilates', 'other')),
  amount DECIMAL(12,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('card', 'cash', 'transfer', 'kakaoPay', 'tossPay', 'virtualAccount')),
  payment_date DATE NOT NULL,
  notes TEXT,

  -- 결제 요청 연동 (Phase 2)
  payment_request_id UUID REFERENCES payment_requests(id) ON DELETE SET NULL,
  toss_payment_key VARCHAR(255),  -- Toss 결제 키

  created_by UUID REFERENCES users(id),  -- who recorded this payment

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 6. expenses (지출)

```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,

  category VARCHAR(50) NOT NULL CHECK (category IN ('wages', 'rent', 'utilities', 'equipment', 'marketing', 'maintenance', 'other')),
  amount DECIMAL(12,2) NOT NULL,
  expense_date DATE NOT NULL,
  description VARCHAR(500),
  notes TEXT,

  created_by UUID REFERENCES users(id),  -- who recorded this expense

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 7. pt_sessions (PT/필라테스 세션)

```sql
CREATE TABLE pt_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  trainer_id UUID REFERENCES staff(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE NOT NULL,

  category VARCHAR(50) NOT NULL CHECK (category IN ('PT', '필라테스')),
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 8. payment_requests (결제 요청) - Phase 2

```sql
CREATE TABLE payment_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  trainer_id UUID REFERENCES staff(id) ON DELETE SET NULL,

  -- 결제 정보
  amount DECIMAL(12,2) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('pt', 'rental', 'pilates', 'other')),
  description VARCHAR(500),

  -- Toss Payment 정보
  toss_payment_key VARCHAR(255),
  toss_order_id VARCHAR(255) UNIQUE NOT NULL,  -- 고유 주문 ID

  -- 링크/QR 정보
  payment_url VARCHAR(500),  -- 결제 페이지 URL
  qr_code_url VARCHAR(500),  -- QR 코드 이미지 URL
  expires_at TIMESTAMPTZ,     -- 만료 시간 (기본 24시간)

  -- 상태
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'paid', 'cancelled', 'expired')),

  -- 발송 정보
  send_method VARCHAR(50) CHECK (send_method IN ('qr', 'sms', 'email')),
  sent_at TIMESTAMPTZ,

  -- 결제 완료 시 매출 연동
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Indexes

```sql
-- Performance indexes
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_users_role ON users(role);  -- super_admin lookup
CREATE INDEX idx_staff_tenant ON staff(tenant_id);
CREATE INDEX idx_members_tenant ON members(tenant_id);
CREATE INDEX idx_members_status ON members(tenant_id, status);
CREATE INDEX idx_members_trainer ON members(tenant_id, trainer_id);
CREATE INDEX idx_payments_tenant_date ON payments(tenant_id, payment_date);
CREATE INDEX idx_payments_member ON payments(tenant_id, member_id);
CREATE INDEX idx_expenses_tenant_date ON expenses(tenant_id, expense_date);
CREATE INDEX idx_pt_sessions_tenant_date ON pt_sessions(tenant_id, session_date);
CREATE INDEX idx_pt_sessions_trainer ON pt_sessions(tenant_id, trainer_id);
CREATE INDEX idx_pt_sessions_member ON pt_sessions(tenant_id, member_id);
-- Payment Requests (Phase 2)
CREATE INDEX idx_payment_requests_tenant ON payment_requests(tenant_id);
CREATE INDEX idx_payment_requests_status ON payment_requests(tenant_id, status);
CREATE INDEX idx_payment_requests_member ON payment_requests(tenant_id, member_id);
CREATE INDEX idx_payment_requests_order_id ON payment_requests(toss_order_id);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE pt_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_requests ENABLE ROW LEVEL SECURITY;  -- Phase 2

-- ============================================================
-- Helper Functions for RLS
-- ============================================================

-- Returns the current user's tenant_id (NULL for super_admin)
CREATE OR REPLACE FUNCTION public.user_tenant_id()
RETURNS UUID LANGUAGE SQL STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id FROM users WHERE id = auth.uid()
$$;

-- Returns the current user's role
CREATE OR REPLACE FUNCTION public.user_role()
RETURNS VARCHAR LANGUAGE SQL STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM users WHERE id = auth.uid()
$$;

-- Returns TRUE if current user is a super_admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'super_admin')
$$;

-- ============================================================
-- RLS Policies
-- ============================================================

-- Role-based permissions:
-- - super_admin: Full CRUD on ALL tenants + tenant management (cross-tenant access)
-- - owner: Full CRUD on their tenant's resources
-- - manager: Read + Create + Update (no Delete)
-- - trainer: Read + Create + Update on assigned resources
-- - member: Read only (own data)

-- ---------- tenants ----------
-- super_admin: full access to all tenants (create, read, update, delete)
-- tenant users: read their own tenant only; owner can update
CREATE POLICY "super_admin full access on tenants"
  ON tenants FOR ALL
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

CREATE POLICY "Users can view their own tenant"
  ON tenants FOR SELECT
  USING (id = public.user_tenant_id());

CREATE POLICY "Only owner can update tenant"
  ON tenants FOR UPDATE
  USING (id = public.user_tenant_id() AND public.user_role() = 'owner');

-- ---------- users ----------
CREATE POLICY "super_admin can view all users"
  ON users FOR SELECT
  USING (public.is_super_admin());

CREATE POLICY "Users can view same tenant users"
  ON users FOR SELECT
  USING (tenant_id = public.user_tenant_id());

CREATE POLICY "super_admin can manage all users"
  ON users FOR ALL
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- Example: Members table RLS
CREATE POLICY "Users can only see their tenant's members"
  ON members FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "super_admin can access all members"
  ON members FOR ALL
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

CREATE POLICY "Only owner/manager/trainer can insert members"
  ON members FOR INSERT
  WITH CHECK (tenant_id IN (
    SELECT tenant_id FROM users
    WHERE id = auth.uid() AND role IN ('owner', 'manager', 'trainer')
  ));

-- Example: Payment Requests table RLS (Phase 2)
CREATE POLICY "Users can only see their tenant's payment_requests"
  ON payment_requests FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "super_admin can access all payment_requests"
  ON payment_requests FOR ALL
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

CREATE POLICY "Only owner/manager/trainer can create payment_requests"
  ON payment_requests FOR INSERT
  WITH CHECK (tenant_id IN (
    SELECT tenant_id FROM users
    WHERE id = auth.uid() AND role IN ('owner', 'manager', 'trainer')
  ));
```

### Utility Functions & Triggers

```sql
-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply to all tables with updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON staff
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON expenses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON pt_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON payment_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
```

### Phase 2 Tables (Future Expansion)

```sql
-- 회원 멤버십 변경 이력 (Phase 2)
CREATE TABLE membership_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE NOT NULL,

  -- 변경 내용
  previous_type VARCHAR(100),
  new_type VARCHAR(100) NOT NULL,
  previous_end DATE,
  new_end DATE NOT NULL,
  change_reason VARCHAR(255),  -- 'renewal', 'upgrade', 'downgrade', 'freeze'

  changed_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 운동 루틴 템플릿 (Phase 2)
CREATE TABLE workout_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  trainer_id UUID REFERENCES staff(id) ON DELETE SET NULL,

  name VARCHAR(255) NOT NULL,
  description TEXT,
  exercises JSONB NOT NULL,  -- [{name, sets, reps, weight, rest_sec}]
  category VARCHAR(50) CHECK (category IN ('strength', 'cardio', 'flexibility', 'mixed')),

  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 건강/운동 로그 (Phase 2)
CREATE TABLE health_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE NOT NULL,

  log_date DATE NOT NULL,
  weight DECIMAL(5,2),
  body_fat DECIMAL(5,2),
  muscle_mass DECIMAL(5,2),
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Phase 2 tables
CREATE INDEX idx_membership_history_member ON membership_history(tenant_id, member_id);
CREATE INDEX idx_workout_templates_tenant ON workout_templates(tenant_id);
CREATE INDEX idx_health_logs_member_date ON health_logs(tenant_id, member_id, log_date);
```

### Admin Tables (Platform Management)

> **Note**: `/admin` 라우트에서 사용하는 플랫폼 관리 전용 테이블입니다. 모든 테이블은 RLS 없이 (서비스 역(Service Role) 키로만 접근) 또는 RLS에서 `super_admin`만 허용합니다.

#### 1. subscription_plans (구독 플랜 정의)

```sql
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,       -- 'basic', 'pro', 'enterprise'
  display_name VARCHAR(255) NOT NULL,       -- '베이직', '프로', '엔터프라이즈'
  price DECIMAL(10,2) NOT NULL,            -- 월 가격 (KRW)
  max_members INTEGER,                   -- NULL = 무제한
  max_staff INTEGER,                      -- NULL = 무제한
  features JSONB NOT NULL DEFAULT '[]',     -- ["members", "schedule", "sales", "expenses", "analytics", "billing"]
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 초기 데이터 시드
INSERT INTO subscription_plans (name, display_name, price, max_members, max_staff, features, sort_order) VALUES
  ('basic', '베이직', 99000, 200, 5,
   '["members", "schedule", "sales"]'::jsonb, 1);

INSERT INTO subscription_plans (name, display_name, price, max_members, max_staff, features, sort_order) VALUES
  ('pro', '프로', 199000, 1000, 20,
   '["members", "schedule", "sales", "expenses", "analytics"]'::jsonb, 2);

INSERT INTO subscription_plans (name, display_name, price, max_members, max_staff, features, sort_order) VALUES
  ('enterprise', '엔터프라이즈', 399000, NULL, NULL,
   '["all"]'::jsonb, 3);
```

#### 2. subscription_history (구독 변경 이력)

```sql
CREATE TABLE subscription_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,

  -- 변경 내용
  previous_plan VARCHAR(100),            -- 이전 플랜
  new_plan VARCHAR(100) NOT NULL,         -- 새 플랜
  previous_status VARCHAR(50),            -- 이전 구독 상태
  new_status VARCHAR(50) NOT NULL,         -- 새 구독 상태
  change_reason VARCHAR(255),             -- 'upgrade', 'downgrade', 'trial_start', 'trial_end', 'cancellation', 'reactivation'

  -- 메타
  changed_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscription_history_tenant ON subscription_history(tenant_id);
```

#### 3. platform_payments (플랫폼 결제 이력)

```sql
CREATE TABLE platform_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,

  amount DECIMAL(12,2) NOT NULL,
  plan_name VARCHAR(100) NOT NULL,          -- 결제 시점의 플랜명
  billing_period_start DATE NOT NULL,        -- 결제 기간 시작
  billing_period_end DATE NOT NULL,          -- 결제 기간 종료
  payment_method VARCHAR(50),               -- 'card', 'bank_transfer', 'auto'
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  paid_at TIMESTAMPTZ,

  -- 외부 결제 연동
  external_payment_key VARCHAR(255),        -- Toss/PG 결제 키

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_platform_payments_tenant ON platform_payments(tenant_id);
CREATE INDEX idx_platform_payments_status ON platform_payments(tenant_id, status);
CREATE INDEX idx_platform_payments_period ON platform_payments(billing_period_start, billing_period_end);
```

#### 4. audit_logs (관리자 감사 로그)

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- who
  admin_id UUID REFERENCES users(id) NOT NULL,
  admin_name VARCHAR(255) NOT NULL,            -- snapshot (조인 없이 조회 가능)

  -- what
  action VARCHAR(100) NOT NULL,                -- 'tenant.create', 'tenant.update', 'user.role_change', 'subscription.update', 'settings.update', 'user.ban', 'user.unban'
  target_type VARCHAR(50) NOT NULL,             -- 'tenant', 'user', 'subscription', 'settings'
  target_id UUID,                               -- 대상 리소스 ID
  target_name VARCHAR(255),                     -- 대상 리소스 이름 snapshot

  -- details
  details JSONB,                                -- 변경 전/후 값: {"previous": {...}, "new": {...}}
  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_target ON audit_logs(target_type, target_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

#### 5. platform_settings (플랫폼 설정)

```sql
CREATE TABLE platform_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 초기 설정 시드
INSERT INTO platform_settings (key, value, description) VALUES
  ('platform_name', '"GymBrain"', '플랫폼 이름');

INSERT INTO platform_settings (key, value, description) VALUES
  ('support_email', '"support@gymbrain.kr"', '지원 이메일');

INSERT INTO platform_settings (key, value, description) VALUES
  ('default_trial_days', '14', '기본 트라이얼 기간 (일)');

INSERT INTO platform_settings (key, value, description) VALUES
  ('notifications', '{
    "trialExpiring": true,
    "trialExpiringDaysBefore": 3,
    "pastDueAlert": true,
    "newTenantAlert": true
  }'::jsonb, '알림 설정');
```

### Existing Table Modifications for Admin Support

#### users 테이블 추가 컬럼

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS
  is_active BOOLEAN DEFAULT TRUE,
  last_sign_in_at TIMESTAMPTZ;

CREATE INDEX idx_users_is_active ON users(is_active);
```

#### tenants 테이블 추가 컬럼

```sql
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- tenants.plan을 subscription_plans.name을 참조하도록 변경
-- (기존 CHECK 제약 유지하되나, 값이 subscription_plans.name과 일치해야 함)
CREATE INDEX idx_tenants_owner ON tenants(owner_id);
CREATE INDEX idx_tenants_subscription_status ON tenants(subscription_status);
```

> **Note**: REST API specification based on frontend requirements. Implementation will use Next.js API Routes / Server Actions.

### Base URL

```
/api/v1
```

### Authentication

All endpoints require Supabase Auth JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

#### Authorization Middleware

```
Request → Extract JWT → Supabase Auth → Load user (users table)
  │
  ├── super_admin (tenant_id IS NULL)
  │     → Skip tenant_id filtering → Cross-tenant access
  │
  └── Tenant User (tenant_id NOT NULL)
        → Auto-inject tenant_id filter on all queries
        → Check role-based permissions per endpoint
```

**Key Rules:**
- `super_admin` users have `tenant_id = NULL` and bypass all tenant-level RLS
- All other users: `tenant_id` is automatically extracted from their user record and applied as a filter
- `created_by` fields are auto-populated from `auth.uid()` on POST — never accepted from client

---

### 0. Tenants API (Platform Admin)

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/tenants` | List all tenants | super_admin |
| GET | `/tenants/:id` | Get tenant details | super_admin, owner(own) |
| POST | `/tenants` | Create new tenant | super_admin |
| PUT | `/tenants/:id` | Update tenant | super_admin, owner(own) |
| DELETE | `/tenants/:id` | Delete tenant (soft) | super_admin |

**Request Body (POST /tenants):**

```json
{
  "name": "피트니스 센터 강남점",
  "slug": "fitness-gangnam",
  "plan": "basic",
  "phone": "02-1234-5678",
  "email": "info@fitness-gangnam.kr",
  "address": "서울시 강남구 테헤란로 123",
  "business_number": "123-45-67890"
}
```

**Request Body (PUT /tenants/:id):**

```json
{
  "name": "피트니스 센터 강남점 (수정)",
  "phone": "02-9876-5432",
  "email": "new@fitness-gangnam.kr",
  "address": "서울시 강남구 역삼로 456",
  "settings": { "keyColor": "#3b82f6", "logo": "..." }
}
```

---

### 1. Members API

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/members` | List members (paginated) | super_admin, owner, manager, trainer |
| GET | `/members/:id` | Get member details | super_admin, owner, manager, trainer, member(own) |
| POST | `/members` | Create member | super_admin, owner, manager, trainer |
| PUT | `/members/:id` | Update member | super_admin, owner, manager |
| DELETE | `/members/:id` | Delete member | super_admin, owner |

**Query Parameters (GET /members):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10, max: 100) |
| `search` | string | Search by name or phone |
| `status` | string | Filter: active, inactive, frozen, expired, expiring |
| `trainer_id` | UUID | Filter by trainer |
| `sort` | string | Sort field: name, registration_date, membership_end |
| `order` | string | Sort order: asc, desc |

**Request Body (POST/PUT):**

```json
{
  "name": "홍길동",
  "gender": "남",
  "phone": "010-1234-5678",
  "birth_date": "1990-01-15",
  "membership_type": "PT 10회권",
  "membership_start": "2026-03-01",
  "membership_end": "2026-05-01",
  "trainer_id": "uuid-or-null",
  "notes": "특이사항"
}
```

---

### 2. Staff API

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/staff` | List staff | super_admin, owner, manager, trainer |
| GET | `/staff/:id` | Get staff details | super_admin, owner, manager |
| POST | `/staff` | Create staff | super_admin, owner |
| PUT | `/staff/:id` | Update staff | super_admin, owner, manager(self) |
| DELETE | `/staff/:id` | Delete staff | super_admin, owner |

**Query Parameters (GET /staff):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by name |
| `role` | string | Filter: manager, trainer, front |
| `specialization` | string | Filter: PT, 필라테스 |

---

### 3. Payments API (Sales)

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/payments` | List payments | super_admin, owner, manager, trainer |
| GET | `/payments/:id` | Get payment details | super_admin, owner, manager |
| POST | `/payments` | Create payment | super_admin, owner, manager, trainer |
| PUT | `/payments/:id` | Update payment | super_admin, owner, manager |
| DELETE | `/payments/:id` | Delete payment | super_admin, owner |

**Query Parameters (GET /payments):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `month` | string | Filter by month (YYYY-MM) |
| `category` | string | Filter: pt, rental, pilates, other |
| `payment_method` | string | Filter: card, cash, transfer, kakaoPay, tossPay, virtualAccount |
| `trainer_id` | UUID | Filter by trainer |
| `member_id` | UUID | Filter by member |
| `search` | string | Search member/trainer name |
| `tenant_id` | UUID | Filter by tenant (super_admin only) |

**Request Body (POST):**

```json
{
  "member_id": "uuid-or-null",
  "trainer_id": "uuid-or-null",
  "category": "pt",
  "amount": 550000,
  "payment_method": "card",
  "payment_date": "2026-03-27",
  "notes": "PT 10회권"
}
```

> **Note**: `created_by` is auto-populated from `auth.uid()` server-side. Category accepts: `pt`, `rental`, `pilates`, `other`.

---

### 4. Payment Requests API (Phase 2)

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/payment-requests` | List payment requests | super_admin, owner, manager, trainer |
| GET | `/payment-requests/:id` | Get request details | super_admin, owner, manager, trainer |
| POST | `/payment-requests` | Create payment request | super_admin, owner, manager, trainer |
| POST | `/payment-requests/:id/send-sms` | Send via SMS | super_admin, owner, manager, trainer |
| POST | `/payment-requests/:id/send-email` | Send via email | super_admin, owner, manager, trainer |
| POST | `/payment-requests/:id/cancel` | Cancel request | super_admin, owner, manager |
| POST | `/webhooks/toss` | Toss webhook handler | Public (signed) |

**Query Parameters (GET /payment-requests):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter: pending, sent, paid, cancelled, expired |
| `member_id` | UUID | Filter by member |
| `start_date` | string | Date range start |
| `end_date` | string | Date range end |

**Request Body (POST /payment-requests):**

```json
{
  "member_id": "uuid",
  "trainer_id": "uuid-or-null",
  "amount": 550000,
  "category": "pt",
  "description": "PT 10회권",
  "send_method": "sms"
}
```

> **Note**: Category accepts: `pt`, `rental`, `pilates`, `other`.

**Response (POST /payment-requests):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "toss_order_id": "GB-20260327-XXXXX",
    "payment_url": "https://pay.toss.im/...",
    "qr_code_url": "https://qr.toss.im/...",
    "expires_at": "2026-03-28T14:30:00Z",
    "status": "pending"
  }
}
```

---

### 5. Expenses API

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/expenses` | List expenses | super_admin, owner, manager |
| GET | `/expenses/:id` | Get expense details | super_admin, owner, manager |
| POST | `/expenses` | Create expense | super_admin, owner, manager |
| PUT | `/expenses/:id` | Update expense | super_admin, owner, manager |
| DELETE | `/expenses/:id` | Delete expense | super_admin, owner |

**Query Parameters (GET /expenses):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `month` | string | Filter by month (YYYY-MM) |
| `category` | string | Filter: wages, rent, utilities, equipment, marketing, maintenance, other |

**Request Body (POST):**

```json
{
  "category": "equipment",
  "amount": 500000,
  "expense_date": "2026-03-27",
  "description": "덤벨 세트 구매",
  "notes": "비고 메모"
}
```

> **Note**: `created_by` is auto-populated from `auth.uid()` server-side.

---

### 6. PT Sessions API

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/pt-sessions` | List PT sessions | super_admin, owner, manager, trainer |
| GET | `/pt-sessions/:id` | Get session details | super_admin, owner, manager, trainer, member(own) |
| POST | `/pt-sessions` | Create session | super_admin, owner, manager, trainer |
| PUT | `/pt-sessions/:id` | Update session | super_admin, owner, manager, trainer(own) |
| DELETE | `/pt-sessions/:id` | Delete session | super_admin, owner, manager |
| PATCH | `/pt-sessions/:id/status` | Update session status | super_admin, owner, manager, trainer(own) |

**Query Parameters (GET /pt-sessions):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | string | Filter by date (YYYY-MM-DD) |
| `start_date` | string | Date range start |
| `end_date` | string | Date range end |
| `trainer_id` | UUID | Filter by trainer |
| `member_id` | UUID | Filter by member |
| `status` | string | Filter: scheduled, completed, cancelled, no_show |

**Request Body (POST):**

```json
{
  "trainer_id": "uuid",
  "member_id": "uuid",
  "category": "PT",
  "session_date": "2026-03-27",
  "start_time": "10:00",
  "end_time": "11:00",
  "notes": "메모"
}
```

---

### 7. Analytics API

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/analytics/dashboard` | Dashboard stats | super_admin, owner, manager, trainer |
| GET | `/analytics/revenue` | Revenue analytics | super_admin, owner, manager |
| GET | `/analytics/expenses` | Expense analytics | super_admin, owner, manager |
| GET | `/analytics/profit` | Profit/Loss statement | super_admin, owner, manager |
| GET | `/analytics/members` | Member analytics | super_admin, owner, manager |
| GET | `/analytics/pt-sessions` | PT session analytics | super_admin, owner, manager, trainer |
| GET | `/analytics/platform` | Platform-wide stats (all tenants) | super_admin |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `period` | string | Period: 3M, 6M, 12M, custom |
| `start_date` | string | Custom start date |
| `end_date` | string | Custom end date |
| `category` | string | Category filter |

**Response Example (GET /analytics/dashboard):**

```json
{
  "success": true,
  "data": {
    "todayVisitors": 47,
    "monthlyRevenue": 12450000,
    "activeMembers": 324,
    "todayPTSessions": 18,
    "expiringMembers": 12,
    "revenueTrend": [...],
    "membershipDistribution": {...}
  }
}
```

---

### 8. Auth API

Handled by Supabase Auth:

| Endpoint | Description |
|----------|-------------|
| `POST /auth/signup` | Register new user |
| `POST /auth/login` | Login with email/password |
| `POST /auth/logout` | Logout |
| `GET /auth/user` | Get current user |
| `POST /auth/callback` | OAuth callback |

#### Super Admin Seed Process

```bash
# Super Admin은 최초 1회 CLI 또는 SQL으로 수동 생성:
# 1. Supabase Auth에서 사용자 생성
# 2. users 테이블에 role='super_admin', tenant_id=NULL 로 직접 INSERT
INSERT INTO users (id, email, name, role, tenant_id)
VALUES (
  auth.uid(),  -- 방금 생성한 auth.users의 id
  'admin@gymbrain.kr',
  'GymBrain 관리자',
  'super_admin',
  NULL
);
```

> **Security Note**: Super Admin은 앱 UI에서 가입할 수 없으며, DB 직접 접근 또는 Supabase Dashboard를 통해서만 생성/관리됩니다.

---

### Standard Response Format

**Success Response:**

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      { "field": "amount", "message": "Amount must be positive" }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `CONFLICT` | 409 | Resource conflict |
| `INTERNAL_ERROR` | 500 | Server error |

---

### 9. Admin API (Platform Management)

> **Auth**: 모든 엔드포인트는 `super_admin` role 전용. 일반 사용자 접근 시 `403 FORBIDDEN`.

#### 9-1. Admin Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | 플랫폼 전체 현황 통계 |

**Response:**

```json
{
  "success": true,
  "data": {
    "totalTenants": 12,
    "totalMembers": 3840,
    "monthlyPlatformRevenue": 148500000,
    "activeSubscriptions": 10,
    "trialTenants": 2,
    "pastDueTenants": 1,
    "recentTenants": [
      { "id": "uuid", "name": "피트니스 강남점", "plan": "basic", "createdAt": "2026-03-25" }
    ],
    "alerts": {
      "expiringTrials": [
        { "id": "uuid", "name": "피트니스 잠실점", "trialEndsAt": "2026-04-01" }
      ],
      "pastDue": [
        { "id": "uuid", "name": "헬스장 부산점", "subscriptionStatus": "past_due" }
      ]
    },
    "revenueTrend": [
      { "month": "2025-10", "revenue": 98000000 },
      { "month": "2025-11", "revenue": 105000000 }
    ],
    "planDistribution": { "basic": 6, "pro": 4, "enterprise": 2 }
  }
}
```

---

#### 9-2. Tenants Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/tenants` | 테넌트 목록 (검색/필터/페이지네이션) |
| GET | `/admin/tenants/:id` | 테넌트 상세 + 통계 |
| POST | `/admin/tenants` | 새 테넌트 생성 (+ 초기 Owner) |
| PUT | `/admin/tenants/:id` | 테넌트 정보 수정 |
| PUT | `/admin/tenants/:id/subscription` | 구독 상태/플랜 변경 |
| DELETE | `/admin/tenants/:id` | 테넌트 삭제 (soft) |

**Query Parameters (GET /admin/tenants):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | 페이지 번호 (default: 1) |
| `limit` | number | 페이지당 항목 수 (default: 20, max: 100) |
| `search` | string | 헬스장명, 대표자명, 이메일, 슬러그 검색 |
| `subscription_status` | string | 필터: trial, active, past_due, cancelled |
| `plan` | string | 필터: basic, pro, enterprise |
| `sort` | string | 정렬: name, created_at, revenue, members |
| `order` | string | 정렬 순서: asc, desc |

**Response (GET /admin/tenants):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "피트니스 센터 강남점",
      "slug": "fitness-gangnam",
      "plan": "basic",
      "subscriptionStatus": "active",
      "phone": "02-1234-5678",
      "email": "info@fitness-gangnam.kr",
      "businessNumber": "123-45-67890",
      "stats": {
        "memberCount": 324,
        "monthlyRevenue": 12450000,
        "activeStaffCount": 8,
        "todayPTSessions": 18
      },
      "trialEndsAt": null,
      "createdAt": "2026-01-15T09:00:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 12, "totalPages": 1 }
}
```

**Request Body (POST /admin/tenants):**

```json
{
  "name": "피트니스 센터 강남점",
  "slug": "fitness-gangnam",
  "plan": "basic",
  "phone": "02-1234-5678",
  "email": "info@fitness-gangnam.kr",
  "address": "서울시 강남구 테헤란로 123",
  "business_number": "123-45-67890",
  "owner_email": "owner@fitness-gangnam.kr",
  "owner_name": "김대표",
  "trial_days": 14
}
```

> **Note**: `owner_email`과 `owner_name`이 제공되면, Supabase Auth에 Owner 계정이 자동 생성되고 초대 이메일이 발송됩니다. `trial_days` 기본값은 14일입니다.

**Request Body (PUT /admin/tenants/:id/subscription):**

```json
{
  "plan": "pro",
  "subscription_status": "active",
  "trial_ends_at": "2026-04-15T00:00:00Z"
}
```

---

#### 9-3. Admin Users Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | 전체 사용자 목록 (크로스 테넌트) |
| GET | `/admin/users/:id` | 사용자 상세 정보 |
| PUT | `/admin/users/:id/role` | 사용자 역할 변경 |
| PUT | `/admin/users/:id/status` | 사용자 활성/비활성 |

**Query Parameters (GET /admin/users):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | 페이지 번호 (default: 1) |
| `limit` | number | 페이지당 항목 수 (default: 20) |
| `search` | string | 이름, 이메일 검색 |
| `role` | string | 필터: super_admin, owner, manager, trainer, member |
| `tenant_id` | string | 특정 테넌트 소속 필터 |
| `sort` | string | 정렬: name, created_at |
| `order` | string | 정렬 순서: asc, desc |

**Response (GET /admin/users):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "owner@fitness.kr",
      "name": "김대표",
      "role": "owner",
      "tenantId": "uuid",
      "tenantName": "피트니스 센터 강남점",
      "isActive": true,
      "lastSignIn": "2026-03-27T14:30:00Z",
      "createdAt": "2026-01-15T09:00:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 }
}
```

**Request Body (PUT /admin/users/:id/role):**

```json
{
  "role": "manager",
  "tenant_id": "uuid"
}
```

> **Warning**: 소유자(role=owner) 변경 시 해당 테넌트의 기존 owner를 manager로 강등해야 합니다. 클라이언트에서 확인 모달 필요.

**Request Body (PUT /admin/users/:id/status):**

```json
{
  "is_active": false,
  "reason": "약관 위반"
}
```

> **Note**: `is_active: false` 시 Supabase Auth의 사용자도 비활성화(ban) 처리됩니다.

---

#### 9-4. Admin Billing

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/billing/overview` | 구독/결제 현황 대시보드 |
| GET | `/admin/billing/tenants` | 테넌트별 결제 현황 목록 |

**Response (GET /admin/billing/overview):**

```json
{
  "success": true,
  "data": {
    "planDistribution": { "basic": 6, "pro": 4, "enterprise": 2 },
    "monthlyRecurringRevenue": 8500000,
    "trialConversionRate": 0.75,
    "activeCount": 10,
    "trialCount": 2,
    "pastDueCount": 1,
    "cancelledCount": 0,
    "revenueByPlan": {
      "basic": 2400000,
      "pro": 3600000,
      "enterprise": 2500000
    }
  }
}
```

**Response (GET /admin/billing/tenants):**

```json
{
  "success": true,
  "data": [
    {
      "tenantId": "uuid",
      "tenantName": "피트니스 센터 강남점",
      "plan": "pro",
      "subscriptionStatus": "active",
      "startedAt": "2026-01-15",
      "trialEndsAt": null,
      "nextBillingDate": "2026-04-15"
    }
  ]
}
```

---

#### 9-5. Platform Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/analytics/platform` | 플랫폼 전체 분석 |
| GET | `/admin/analytics/revenue` | 전체 테넌트 매출 분석 |
| GET | `/admin/analytics/members` | 전체 테넌트 회원 분석 |
| GET | `/admin/analytics/sessions` | 전체 테넌트 PT 세션 분석 |

**Query Parameters (공통):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `period` | string | 기간: 3M, 6M, 12M, custom |
| `start_date` | string | 커스텀 시작일 |
| `end_date` | string | 커스텀 종료일 |
| `tenant_id` | string | 특정 테넌트 필터 (없으면 전체) |

**Response (GET /admin/analytics/platform):**

```json
{
  "success": true,
  "data": {
    "totalTenants": 12,
    "totalMembers": 3840,
    "totalRevenue": 148500000,
    "totalExpenses": 82300000,
    "totalProfit": 66200000,
    "totalPTSessions": 1240,
    "revenueByCategory": { "pt": 85000000, "rental": 32000000, "pilates": 25000000, "other": 6500000 },
    "revenueTrend": [
      { "month": "2025-10", "revenue": 98000000, "expenses": 55000000, "profit": 43000000 }
    ],
    "tenantRanking": [
      { "tenantId": "uuid", "tenantName": "피트니스 강남점", "revenue": 24500000, "memberCount": 324 }
    ],
    "memberGrowth": [
      { "month": "2025-10", "newMembers": 120, "churnedMembers": 15, "netGrowth": 105 }
    ]
  }
}
```

---

#### 9-6. Admin Settings & Audit Log

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/settings` | 플랫폼 설정 조회 |
| PUT | `/admin/settings` | 플랫폼 설정 수정 |
| GET | `/admin/audit-logs` | 감사 로그 조회 |

**Response (GET /admin/settings):**

```json
{
  "success": true,
  "data": {
    "platformName": "GymBrain",
    "supportEmail": "support@gymbrain.kr",
    "defaultTrialDays": 14,
    "plans": {
      "basic": { "price": 99000, "maxMembers": 200, "maxStaff": 5, "features": ["members", "schedule", "sales"] },
      "pro": { "price": 199000, "maxMembers": 1000, "maxStaff": 20, "features": ["members", "schedule", "sales", "expenses", "analytics"] },
      "enterprise": { "price": 399000, "maxMembers": null, "maxStaff": null, "features": ["all"] }
    },
    "notifications": {
      "trialExpiring": true,
      "trialExpiringDaysBefore": 3,
      "pastDueAlert": true,
      "newTenantAlert": true
    }
  }
}
```

**Request Body (PUT /admin/settings):**

```json
{
  "platformName": "GymBrain",
  "supportEmail": "support@gymbrain.kr",
  "defaultTrialDays": 14,
  "plans": {
    "basic": { "price": 99000, "maxMembers": 200, "maxStaff": 5 }
  },
  "notifications": {
    "trialExpiring": true,
    "trialExpiringDaysBefore": 3
  }
}
```

**Query Parameters (GET /admin/audit-logs):**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | 페이지 번호 (default: 1) |
| `limit` | number | 페이지당 항목 수 (default: 50) |
| `admin_id` | UUID | 특정 관리자 필터 |
| `action` | string | 액션 필터: tenant.create, tenant.update, user.role_change, subscription.update, settings.update |
| `target_type` | string | 대상 타입: tenant, user |
| `start_date` | string | 시작일 |
| `end_date` | string | 종료일 |

**Response (GET /admin/audit-logs):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "adminId": "uuid",
      "adminName": "GymBrain 관리자",
      "action": "tenant.create",
      "targetType": "tenant",
      "targetId": "uuid",
      "targetName": "피트니스 센터 강남점",
      "details": { "plan": "basic", "owner_email": "owner@fitness.kr" },
      "ipAddress": "192.168.1.1",
      "createdAt": "2026-03-27T14:30:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 50, "total": 340, "totalPages": 7 }
}
```

### Backend Implementation Guide (Admin API)

> Next.js App Router 기반 Route Handler 구현 가이드입니다.

#### Authentication & Authorization Flow

```
Client Request (Bearer JWT)
    │
    ▼
Next.js Middleware (middleware.ts)
    │
    ├── path.startsWith('/admin') ?
    │     │
    │     ▼
    │   Supabase getUser(jwt)
    │     │
    │     ├── user exists ?
    │     │     ▼
    │     │   SELECT role FROM users WHERE id = user.id
    │     │     │
    │     │     ├── role = 'super_admin' → next()
    │     │     └── else → redirect('/dashboard')
    │     │
    │     └── !user → redirect('/login')
    │
    └── other paths → next()
```

**Route Handler 내부 검증:**

```ts
// 모든 admin Route Handler에서 수행
1. createServerClient() → getUser() 로 JWT 검증
2. users 테이블 WHERE id = auth.uid() → role 조회
3. role !== 'super_admin' → 403 반환
4. service_role 클라이언트로 실제 쿼리 수행
```

**Supabase 클라이언트 선택 기준:**

| 작업 | 클라이언트 | 이유 |
|------|-----------|------|
| JWT 검증 | `createServerClient(anon)` | RLS 통한 권한 확인 |
| Cross-tenant 데이터 읽기 | `createServerClient(service_role)` | RLS 우회 필요 |
| 감사 로그 기록 | `createServerClient(service_role)` | RLS 우회 필요 |
| Tenant 생성 (Auth) | `createServerClient(service_role)` | auth.admin API 필요 |
| 설정 읽기 | `createServerClient(anon)` + RLS | super_admin 정책으로 접근 가능 |

#### 공통 Route Handler 래퍼

```ts
// lib/admin-handler.ts

type AdminContext = {
  adminId: string
  adminName: string
  serviceClient: SupabaseClient  // service_role
}

type AdminHandler = (
  req: Request,
  ctx: AdminContext,
  params: Record<string, string>
) => Promise<Response>

// 인증 + 감사 로그 자동 기록
function withAdminAuth(handler: AdminHandler): (req: Request, ctx: RouteContext) => Promise<Response>

// withAdminAuth 내부 로직:
// 1. JWT 검증 → 401 if invalid
// 2. role = super_admin 확인 → 403 if not
// 3. AdminContext 생성
// 4. handler 실행
// 5. 성공 시 audit_logs INSERT (action/target/details 자동 추출)
// 6. 표준 응답 래핑
```

**표준 응답 형식:**

```ts
// 성공
successResponse(data, meta?, status = 200)

// 실패
errorResponse(code, message, details?, status)
// code: 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'CONFLICT' | 'INTERNAL_ERROR'
```

**Zod 검증 적용:**

| Route Handler | Zod Schema |
|--------------|------------|
| POST /admin/tenants | `tenantCreateSchema` |
| PUT /admin/tenants/:id | `tenantUpdateSchema` |
| PUT /admin/tenants/:id/subscription | `subscriptionUpdateSchema` |
| PUT /admin/users/:id/role | `userRoleUpdateSchema` |
| PUT /admin/users/:id/status | `userStatusUpdateSchema` |
| PUT /admin/settings | `platformSettingsSchema` |
| GET (query params) | `paginationSchema` + 각 페이지 filter schema |

```ts
// lib/validations/admin.ts

const tenantCreateSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  plan: z.enum(['basic', 'pro', 'enterprise']).default('basic'),
  phone: z.string().max(50).optional(),
  email: z.string().email().max(255).optional(),
  address: z.string().max(500).optional(),
  business_number: z.string().max(50).optional(),
  owner_email: z.string().email(),
  owner_name: z.string().min(1).max(255),
  trial_days: z.number().int().min(0).max(90).default(14),
})

const subscriptionUpdateSchema = z.object({
  plan: z.enum(['basic', 'pro', 'enterprise']).optional(),
  subscription_status: z.enum(['trial', 'active', 'past_due', 'cancelled']).optional(),
  trial_ends_at: z.string().datetime().optional(),
})

const userRoleUpdateSchema = z.object({
  role: z.enum(['owner', 'manager', 'trainer', 'member']),
  tenant_id: z.string().uuid(),
})

const userStatusUpdateSchema = z.object({
  is_active: z.boolean(),
  reason: z.string().max(500).optional(),
})

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
})

const auditLogFilterSchema = paginationSchema.extend({
  admin_id: z.string().uuid().optional(),
  action: z.string().optional(),
  target_type: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
})
```

#### Supabase 쿼리 패턴

**Cross-tenant 집계 (Admin Dashboard):**

```sql
-- 플랫폼 전체 통계 (단일 RPC 또는 병렬 쿼리)
-- 1. 전체 테넌트 수
SELECT count(*) FROM tenants;

-- 2. 전체 회원 수
SELECT count(*) FROM members;

-- 3. 이번 달 전체 매출
SELECT coalesce(sum(amount), 0)
FROM payments
WHERE payment_date >= date_trunc('month', now())
  AND payment_date < date_trunc('month', now()) + interval '1 month';

-- 4. 활성 구독 수
SELECT count(*) FROM tenants WHERE subscription_status = 'active';

-- 5. 플랜 분포
SELECT plan, count(*) FROM tenants GROUP BY plan;

-- 6. 월별 매출 트렌드 (최근 12개월)
SELECT to_char(payment_date, 'YYYY-MM') as month, sum(amount) as revenue
FROM payments
WHERE payment_date >= date_trunc('month', now()) - interval '12 months'
GROUP BY month ORDER BY month;
```

> **주의**: service_role 클라이언트로 직접 실행. RLS 우회.

**테넌트 목록 (검색/필터/페이지네이션):**

```sql
-- GET /admin/tenants
SELECT
  t.*,
  count(DISTINCT m.id) as member_count,
  coalesce(sum(p.amount), 0) as monthly_revenue
FROM tenants t
LEFT JOIN members m ON m.tenant_id = t.id
LEFT JOIN payments p ON p.tenant_id = t.id
  AND p.payment_date >= date_trunc('month', now())
  AND p.payment_date < date_trunc('month', now()) + interval '1 month'
WHERE
  (:search IS NULL OR t.name ILIKE '%' || :search || '%'
    OR t.email ILIKE '%' || :search || '%'
    OR t.slug ILIKE '%' || :search || '%')
  AND (:subscription_status IS NULL OR t.subscription_status = :subscription_status)
  AND (:plan IS NULL OR t.plan = :plan)
GROUP BY t.id
ORDER BY :sort :order
LIMIT :limit OFFSET :offset;
```

**테넌트 상세 (JOIN 집계):**

```sql
-- GET /admin/tenants/:id
-- 병렬 쿼리 (Promise.all)
[
  -- 1. 테넌트 기본 정보
  SELECT * FROM tenants WHERE id = :id;

  -- 2. 통계
  SELECT
    (SELECT count(*) FROM members WHERE tenant_id = :id) as total_members,
    (SELECT count(*) FROM members WHERE tenant_id = :id AND status = 'active') as active_members,
    (SELECT coalesce(sum(amount), 0) FROM payments WHERE tenant_id = :id
      AND payment_date >= date_trunc('month', now())) as monthly_revenue,
    (SELECT coalesce(sum(amount), 0) FROM expenses WHERE tenant_id = :id
      AND expense_date >= date_trunc('month', now())) as monthly_expenses,
    (SELECT count(*) FROM pt_sessions WHERE tenant_id = :id
      AND session_date >= date_trunc('month', now())) as monthly_sessions,

  -- 3. 최근 활동 (10건)
  (SELECT json_agg(row_to_json(p))
   FROM (SELECT * FROM payments WHERE tenant_id = :id ORDER BY created_at DESC LIMIT 5) p)
  AS recent_payments,

  -- 4. 직원 수
  SELECT count(*) FROM staff WHERE tenant_id = :id AND is_active = true;
]
```

**크로스 테넌트 사용자 목록:**

```sql
-- GET /admin/users
SELECT
  u.id, u.email, u.name, u.role, u.is_active, u.last_sign_in_at, u.created_at,
  t.name as tenant_name,
  t.id as tenant_id
FROM users u
LEFT JOIN tenants t ON t.id = u.tenant_id
WHERE
  (:search IS NULL OR u.name ILIKE '%' || :search || '%'
    OR u.email ILIKE '%' || :search || '%')
  AND (:role IS NULL OR u.role = :role)
  AND (:tenant_id IS NULL OR u.tenant_id = :tenant_id)
ORDER BY :sort :order
LIMIT :limit OFFSET :offset;
```

> **Note**: `LEFT JOIN` tenants — super_admin은 `tenant_id IS NULL`이므로 `t.name`이 NULL이면 "플랫폼"으로 표시.

#### Tenant 생성 트랜잭션

```
POST /admin/tenants
    │
    ├── 1. Request Body Zod 검증
    │
    ├── 2. slug 중복 확인
    │     SELECT FROM tenants WHERE slug = :slug
    │     → 409 CONFLICT if exists
    │
    ├── 3. Supabase Auth 관리자 생성 (service_role)
    │     supabase.auth.admin.createUser({
    │       email: owner_email,
    │       password: temporaryPassword,  // 랜덤 생성
    │       email_confirm: true,
    │     })
    │     → 실패 시 500 반환, 여기서 중단
    │
    ├── 4. 트랜잭션 시작 (Supabase RPC or sequential inserts)
    │     │
    │     ├── a. INSERT INTO tenants (name, slug, plan, ..., owner_id, trial_ends_at)
    │     │     trial_ends_at = now() + trial_days
    │     │
    │     ├── b. INSERT INTO users (id, tenant_id, email, name, role='owner')
    │     │     id = auth.admin.createUser 결과의 id
    │     │
    │     ├── c. INSERT INTO subscription_history
    │     │     (tenant_id, new_plan, new_status='trial', change_reason='tenant_creation')
    │     │
    │     └── d. (선택) 초대 이메일 발송
    │           password set link 전송 via supabase.auth.admin.inviteUserByEmail
    │           또는 custom email
    │
    ├── 5. 트랜잭션 실패 시 롤백
    │     a-c 중 하나라도 실패 → 이미 생성된 auth.user 삭제
    │     supabase.auth.admin.deleteUser(userId)
    │     → 500 에러 응답
    │
    └── 6. Audit log 기록 + 201 응답
          action: 'tenant.create', target: tenant
```

> **롤백 전략**: Supabase는 DB 트랜잭션과 Auth를 별도로 관리하므로, Auth 생성 성공 후 DB INSERT 실패 시 `auth.admin.deleteUser()`로 정리.

#### Tenant 삭제 (Soft Delete)

```
DELETE /admin/tenants/:id
    │
    ├── 1. 확인: 테넌트 존재 여부
    │
    ├── 2. Soft Delete 전략 선택:
    │     ├── 옵션 A: tenants.subscription_status = 'cancelled'로 변경
    │     │         + 모든 관련 staff/members is_active = false
    │     │         (데이터 보존, 복구 가능)
    │     │
    │     └── 옵션 B: ON DELETE CASCADE로 실제 삭제
    │               (데이터 영구 삭제, 위험)
    │               → AdminConfirmModal에서 "데이터 영구 삭제" 확인 필요
    │
    ├── 3. Supabase Auth: 해당 테넌트의 모든 사용자 ban
    │     for each user in tenant.users:
    │       auth.admin.updateUserById(id, { ban_duration: '876000h' }) // ~100년
    │
    └── 4. Audit log 기록 + 200 응답
```

> **PRD 권장**: 옵션 A (soft delete). 30일 후 hard delete는 별도 배치 또는 수동.

#### Audit Log 자동 기록

**withAdminAuth 래퍼에서 자동 처리:**

```ts
// Route Handler 실행 후 성공/실패 여부와 관계없이 기록
// 1. handler 실행 전: startTime 캡처
// 2. handler 실행 후: audit_logs INSERT

// action/target 자동 추출 규칙:
// - POST /admin/tenants       → action: 'tenant.create', target: {type: 'tenant', id: response.data.id}
// - PUT  /admin/tenants/:id   → action: 'tenant.update', target: {type: 'tenant', id: params.id}
// - DELETE /admin/tenants/:id → action: 'tenant.delete', target: {type: 'tenant', id: params.id}
// - PUT  /admin/users/:id/role → action: 'user.role_change', target: {type: 'user', id: params.id}
// - PUT  /admin/settings      → action: 'settings.update', target: {type: 'settings', id: 'platform'}

// details 구성:
// - CREATE: request body 전체
// - UPDATE: { previous: 이전값, new: request body }
// - DELETE: { name: 삭제된 리소스명 }
// - ROLE_CHANGE: { previous_role, new_role }
```

**수동 감사 로그 (선택):**

```ts
// 테넌트 생성처럼 여러 단계가 있는 작업은 각 단계별로 상세 기록
await logAudit({
  action: 'tenant.create',
  targetType: 'tenant',
  targetId: tenant.id,
  targetName: tenant.name,
  details: { plan, owner_email, slug, trial_days },
  adminId: ctx.adminId,
  adminName: ctx.adminName,
  ipAddress: request.headers.get('x-forwarded-for'),
  userAgent: request.headers.get('user-agent'),
})
```

#### API Route 파일 구조

```
app/api/admin/
├── dashboard/
│   └── route.ts                        # GET
├── tenants/
│   ├── route.ts                        # GET (목록), POST (생성)
│   └── [id]/
│       ├── route.ts                    # GET (상세), PUT (수정), DELETE (삭제)
│       └── subscription/
│           └── route.ts                # PUT (구독 변경)
├── users/
│   ├── route.ts                        # GET (목록)
│   └── [id]/
│       ├── role/
│       │   └── route.ts                # PUT (역할 변경)
│       └── status/
│           └── route.ts                # PUT (활성/비활성)
├── billing/
│   ├── overview/
│   │   └── route.ts                    # GET
│   └── tenants/
│       └── route.ts                    # GET
├── analytics/
│   ├── platform/
│   │   └── route.ts                    # GET
│   ├── revenue/
│   │   └── route.ts                    # GET
│   ├── members/
│   │   └── route.ts                    # GET
│   └── sessions/
│       └── route.ts                    # GET
└── settings/
    ├── route.ts                        # GET, PUT
    └── audit-logs/
        └── route.ts                    # GET
```

#### Rate Limiting & 보안

| 보안 항목 | 설정 |
|-----------|------|
| Rate Limit | 100 req/min per admin user (Upstash Redis or in-memory) |
| CORS | 동일 출처만 (Next.js API Route 기본값) |
| Input Sanitization | Zod 검증 + SQL Injection 방지 (Supabase 파라미터화 쿼리) |
| XSS 방지 | Response에 HTML 태그 포함 불가 (JSON API) |
| CSRF | Next.js SameSite 쿠키 + Authorization header |
| IP 로깅 | 모든 mutation 감사 로그에 IP 기록 |
| 동시성 제어 | 구독 상태 변경 시 optimistic locking (updated_at 비교) |

#### Error Handling 가이드

| 에러 상황 | HTTP Status | Code | 처리 |
|-----------|-------------|------|------|
| JWT 만료/무효 | 401 | UNAUTHORIZED | 클라이언트에서 자동 토큰 갱신 후 재시도 |
| super_admin 아님 | 403 | FORBIDDEN | 403 페이지 또는 /dashboard 리다이렉트 |
| 테넌트/사용자 없음 | 404 | NOT_FOUND | "리소스를 찾을 수 없습니다" |
| slug 중복 | 409 | CONFLICT | "이미 사용 중인 슬러그입니다" |
| Zod 검증 실패 | 400 | VALIDATION_ERROR | 필드별 에러 메시지 배열 |
| Supabase 연결 실패 | 500 | INTERNAL_ERROR | "일시적인 오류입니다. 잠시 후 재시도해주세요." |
| Auth 사용자 생성 실패 | 500 | INTERNAL_ERROR | 롤백 후 에러 응답 |

---

## MVP Implementation Priority

Based on gym owner feedback (2026-03-26):

### Phase 1: Core Features (MVP) - HIGH PRIORITY

#### 1. Revenue Management by Category
- Categories: PT, Space Rental, Pilates
- Revenue breakdown and totals
- Member payment history (trainer, method, date)
- Date range filtering (monthly default)
- Payment CRUD
- **Implemented UI Features:**
  - Statistics cards (Total Revenue, PT Revenue, Rental Revenue, Pilates Revenue)
  - Search by member name or trainer
  - Filters: Month, Category, Payment Method, Trainer
  - Revenue table with payment details
  - Revenue registration modal
  - Reset filters button
  - Mobile responsive layout
  - **Graph & Analytics Features:**
    - **Monthly Revenue Trend Chart (Line/Area Chart)**
      - Displays last 6 months by default
      - Period selector: 3M / 6M / 12M / Custom
      - Category breakdown overlay (toggleable series)
      - Interactive tooltips with detailed amounts
      - Trend line with growth indicators
    - **Revenue by Category Chart (Donut/Pie Chart)**
      - Shows revenue distribution by category
      - Interactive legend with category filtering
      - Percentage and amount labels
      - Color-coded categories
    - **Period Comparison**
      - Compare with previous period (MoM)
      - Growth rate percentage display
      - Visual comparison bars
    - **Chart Controls**
      - Period range selector (date picker)
      - Category filter for charts
      - Chart type toggle (Line/Area/Bar)
      - Export chart as image

#### 2. Expense Management
- Expense recording
- Date range viewing
- Monthly summary
- Category tracking
- Net profit calculation (Revenue - Expenses)
- **Implemented UI Features:**
  - Income Statement format design
  - Statistics cards (Monthly Revenue, Monthly Expenses, Monthly Profit)
  - Month selector (last 12 months)
  - Summary/Detail view toggle
    - Summary view: Category-based revenue/expense aggregation, net profit calculation
    - Detail view: Revenue/expense transaction table
  - Revenue categories: PT Revenue, Space Rental, Pilates, Other Revenue
  - Expense categories: Wages, Rent, Utilities, Equipment, Marketing, Maintenance, Other Expenses
  - Profit Margin display
  - Reset filters button
  - Expense registration modal:
    - Category selection (7 categories)
    - Date picker (defaults to today)
    - Amount input (KRW suffix)
    - Description input
    - Cancel/Register buttons
  - Revenue registration only via Sales page
  - Mobile responsive layout
  - **Graph & Analytics Features:**
    - **Monthly Financial Trend Chart (Combined Chart)**
      - Revenue vs Expenses comparison (bars)
      - Net profit trend line
      - Period selector: 3M / 6M / 12M / Custom
      - Dual Y-axis for amounts
      - Profit/Loss color coding
    - **Expense by Category Chart (Donut/Pie Chart)**
      - Shows expense distribution by category
      - Interactive legend with category filtering
      - Percentage and amount labels
      - Color-coded categories
    - **Revenue vs Expense Comparison (Bar Chart)**
      - Side-by-side monthly comparison
      - Stacked category view option
      - Profit/Loss highlighting
      - Summary statistics below chart
    - **Period Comparison**
      - Compare with previous period
      - Expense reduction/growth percentage
      - Category-wise comparison
    - **Chart Controls**
      - Period range selector (date picker)
      - Category filter for charts
      - Chart type toggle
      - Export chart as image

#### 3. Member Management
- Complete member list
- Profile CRUD
- Membership status tracking
- Search and filter
- **Implemented UI Features:**
  - Statistics cards (Total, Active, Expiring Soon)
  - Search by name or phone number
  - Filter by status (Active, Frozen, Expired) and trainer
  - List/Grid view toggle (desktop only)
  - **Mobile: Grid view only** - Optimized 1-column card layout for better readability
  - Member registration modal with:
    - Basic info (name, gender, birth date, phone)
    - Membership info (type, start/end dates, trainer, notes)
  - **Member detail modal:**
    - Full member profile view
    - Basic info section (name, gender, phone, registration date)
    - Membership info section (type, period, trainer)
    - Status badge with color coding
    - Quick edit button
  - **Member edit modal:**
    - Editable fields: name, gender, phone, membership type, dates, trainer, notes
    - Pre-populated with existing member data
    - Save/Cancel buttons
  - Membership types: Premium PT, PT 10/20 Sessions, Pilates 3/6 Months, Gym Pass
  - Status indicators with color coding
  - Days remaining until expiration display
  - Responsive mobile layout (stacked cards)

#### 4. PT Schedule
- Time grid view (6:00 AM - 12:00 AM)
- Trainer-specific schedules
- Client-trainer assignment
- Shared view (owner + trainers)
- Daily/weekly calendar
- **Implemented UI Features:**
  - Daily view: Time grid with trainer columns
  - Weekly view: 7-day calendar with time slots
  - Trainer filter (All or specific trainer)
  - Date navigation with "Today" button
  - Session count display
  - Session cards with:
    - Member name, time, category (PT/Pilates)
    - Status badge (Scheduled, Completed, Cancelled, No Show)
  - Category color coding (Blue for PT, Pink for Pilates)
  - Legend panel for categories and statuses
  - PT registration modal with:
    - Category selection (PT/Pilates)
    - Trainer selection (filtered by category)
    - Member selection
    - Date and time pickers
    - Notes field
  - Responsive mobile layout
  - **Mobile-Optimized Features:**
    - **Daily-only view** - Weekly view hidden on mobile for better UX
    - **Floating Action Button (FAB)** - PT registration button fixed at bottom-right corner, icon-only
    - **Compact session cards** - No time display in cards (left column already shows time)
    - **Google Calendar-style UX** - Simplified header, sticky navigation, scrollable time grid
    - **Session count** - Shows number of PT sessions for selected date
    - **Dynamic calendar height** - Uses `calc(100vh - 220px)` for full viewport utilization without bottom cutoff
    - **Date navigation** - Left/right arrow buttons to navigate between dates
    - **Mini calendar** - Tap date header to open mini calendar picker for quick date selection
    - **Today button** - Quick return to today's date (hidden when already on today)
    - **Multi-trainer columns** - When "All Trainers" selected, displays trainer columns at top with horizontal scroll

### Phase 2: Enhanced Features

- Electronic contracts
- Push notifications
- Health & workout logs
- Analytics dashboard
- Multi-branch support

---

## Future Considerations

- Multi-branch integration
- Wearable device data sync
- Email/SMS provider integrations
- Analytics services
- Naver OAuth (additional Korean provider)

---

# GymBrain 제품 요구사항 문서 (PRD)

## 제품 개요

GymBrain은 피트니스 센터 관리자를 위한 종합 헬스장 관리 SaaS 플랫폼입니다.

## 이해관계자 및 사용자 역할

| 역할 | 설명 | 접근 수준 |
|------|------|-----------|
| **플랫폼 제공자** | GymBrain 팀 | 슈퍼 관리자 (모든 테넌트) |
| **헬스장 소유자** | 테넌트 관리자 | 테넌트 관리자 (해당 헬스장만) |
| **매니저** | 헬스장 매니저 | 운영 관리 |
| **트레이너** | 퍼스널 트레이너 | 피트니스 운영 |
| **회원** | 헬스장 회원 | 셀프 서비스 (본인 데이터만) |

## MVP 개발 우선순위

헬스장 운영자 피드백 기반 (2026-03-26):

### 1단계: 핵심 기능 (MVP) - 최우선

#### 1. 카테고리별 매출 관리
- 카테고리: PT, 공간 대관, 필라테스
- 매출 내역 및 합계
- 회원 결제 내역 (담당 선생님, 결제 수단, 결제 일자)
- 기간별 필터 (기본: 월 단위)
- 결제 CRUD
- **구현된 UI 기능:**
  - 통계 카드 (총 매출, PT 매출, 대관 매출, 필라테스 매출)
  - 회원명/트레이너 검색
  - 필터: 월, 카테고리, 결제수단, 트레이너
  - 결제 상세 테이블
  - 매출 등록 모달
  - **그래프 & 분석 기능:**
    - **월별 매출 트렌드 차트 (선/영역 차트)**
      - 기본 최근 6개월 표시
      - 기간 선택: 3개월 / 6개월 / 12개월
      - 카테고리별 세분화 (토글 가능)
      - 인터랙티브 툴팁 (상세 금액)
      - 추세선 및 성장 지표 표시
    - **카테고리별 매출 비중 (도넛/파이 차트)**
      - 카테고리별 매출 분포
      - 인터랙티브 범례 (카테고리 필터링)
      - 비율 및 금액 라벨
      - 색상 코딩 카테고리
    - **기간 비교**
      - 전월 대비 비교
      - 성장률 퍼센트 표시
      - 월별 추세 인디케이터
    - **차트 컨트롤**
      - 기간 범위 선택 (날짜 피커)
      - 카테고리 필터
      - 차트 타입 전환 (선/영역/막대)
      - 이미지 내보내기 (선택사항)

#### 2. 지출 관리
- 지출 기록
- 기간별 조회
- 월별 요약
- 카테고리 추적
- 순수익 계산 (매출 - 지출)
- **구현된 UI 기능:**
  - 손익계산서 형태 디자인
  - 통계 카드 (월별 수익, 비용, 순이익)
  - 월 선택 필터 (최근 12개월)
  - 요약/상세 뷰 전환
    - 요약 뷰: 카테고리별 수익/비용 집계, 순이익 계산
    - 상세 뷰: 수익/지출 거래 내역 테이블
  - 수익 카테고리: PT 매출, 공간 대관, 필라테스, 기타 수익
  - 비용 카테고리: 인건비, 임대료, 공과금, 장비 구매, 마케팅, 유지보수, 기타 비용
  - 수익률 (Profit Margin) 표시
  - 필터 초기화 버튼
  - 지출 등록 모달:
    - 카테고리 선택 (7개: 인건비, 임대료, 공과금, 장비 구매, 마케팅, 유지보수, 기타)
    - 날짜 선택 (기본값: 오늘)
    - 금액 입력 ("원" 단위 표시)
    - 내역 입력
    - 취소/등록 버튼
  - 수익 등록은 매출 관리 페이지에서만 가능
  - 모바일 반응형 레이아웃
  - **그래프 & 분석 기능:**
    - **월별 재무 트렌드 차트 (복합 차트)**
      - 수익 vs 지출 비교 (막대)
      - 순이익 추세선
      - 기간 선택: 3개월 / 6개월 / 12개월
      - 이중 Y축 (금액)
      - 수익/손실 색상 구분
    - **카테고리별 지출 비중 (도넛/파이 차트)**
      - 카테고리별 지출 분포
      - 인터랙티브 범례 (카테고리 필터링)
      - 비율 및 금액 라벨
      - 색상 코딩 카테고리
    - **수익 vs 지출 비교 (막대 차트)**
      - 월별 병렬 비교
      - 스택 카테고리 뷰 옵션
      - 수익/손실 하이라이트
      - 차트 하단 요약 통계
    - **기간 비교**
      - 전월 대비 비교
      - 지출 감소/증가율 퍼센트
      - 카테고리별 비교
    - **차트 컨트롤**
      - 기간 범위 선택 (날짜 피커)
      - 카테고리 필터
      - 차트 타입 전환
      - 이미지 내보내기 (선택사항)

#### 3. 회원 관리
- 전체 회원 목록
- 프로필 CRUD
- 멤버십 상태 추적
- 검색 및 필터
- **구현된 UI 기능:**
  - 통계 카드 (전체, 활성, 만료 임박)
  - 이름/연락처 검색
  - 상태별 필터 (활성, 일시중단, 만료) 및 트레이너 필터
  - 목록/카드 뷰 전환 (데스크톱만)
  - **모바일: 카드 뷰만 표시** - 가독성 향상을 위한 1열 최적화 레이아웃
  - 회원 등록 모달:
    - 기본 정보 (이름, 성별, 생년월일, 연락처)
    - 멤버십 정보 (종류, 시작/종료일, 트레이너, 메모)
  - **회원 상세보기 모달:**
    - 전체 회원 프로필 조회
    - 기본 정보 섹션 (이름, 성별, 연락처, 등록일)
    - 멤버십 정보 섹션 (종류, 기간, 담당 트레이너)
    - 상태 뱃지 색상 표시
    - 빠른 수정 버튼
  - **회원 수정 모달:**
    - 수정 가능 항목: 이름, 성별, 연락처, 멤버십 종류, 기간, 트레이너, 메모
    - 기존 회원 데이터 자동 로드
    - 저장/취소 버튼
  - 멤버십 종류: 프리미엄 PT, PT 10/20회권, 필라테스 3/6개월, 헬스 이용권
  - 상태별 색상 표시
  - 만료까지 남은 일수 표시
  - 모바일 반응형 레이아웃

#### 4. PT 스케줄표
- 시간 그리드 뷰 (오전 6시 ~ 자정)
- 트레이너별 스케줄
- 회원-트레이너 배정
- 공유 뷰 (운영자 + 트레이너)
- 일간/주간 캘린더
- **구현된 UI 기능:**
  - 일간 뷰: 시간 그리드 + 트레이너별 컬럼
  - 주간 뷰: 7일 캘린더 + 시간 슬롯
  - 트레이너 필터 (전체 또는 특정 트레이너)
  - 날짜 네비게이션 + "오늘" 버튼
  - 세션 수 표시
  - 세션 카드: 회원명, 시간, 카테고리 (PT/필라테스)
  - 상태 뱃지 (예정, 완료, 취소, 노쇼)
  - 카테고리 색상 구분 (PT: 파랑, 필라테스: 분홍)
  - 범례 패널 (카테고리 및 상태)
  - PT 등록 모달:
    - 카테고리 선택 (PT/필라테스)
    - 트레이너 선택 (카테고리별 필터링)
    - 회원 선택
    - 날짜/시간 선택
    - 메모 입력
  - 모바일 반응형 레이아웃
  - **모바일 최적화 기능:**
    - **일간 뷰 전용** - 모바일에서는 주간 뷰 숨김으로 UX 개선
    - **플로팅 액션 버튼 (FAB)** - PT 등록 버튼이 우측 하단 고정, 아이콘만 표시
    - **간소화된 세션 카드** - 카드 내 시간 표시 제거 (좌측 컬럼에 이미 시간 표시됨)
    - **Google Calendar 스타일 UX** - 간소화된 헤더, 고정 네비게이션, 시간 그리드만 스크롤 (페이지 스크롤 차단)
    - **세션 수 표시** - 선택된 날짜의 PT 개수 표시
    - **동적 캘린더 높이** - `calc(100vh - 220px)` 사용으로 뷰포트 전체 활용, 하단 잘림 현상 해결
    - **날짜 네비게이션** - 좌/우 화살표 버튼으로 날짜 이동
    - **미니 캘린더** - 날짜 헤더 탭 시 미니 캘린더 피커로 빠른 날짜 선택
    - **오늘 버튼** - 오늘 날짜로 빠른 복귀 (오늘인 경우 숨김)
    - **다중 트레이너 컬럼** - "전체 트레이너" 선택 시 상단에 트레이너별 컬럼 표시, 가로 스크롤 지원

### 2단계: 확장 기능

- 전자 계약서
- 푸시 알림
- 건강 및 운동 기록
- 분석 대시보드
- 다지점 지원

---

## E2E Test Results (Frontend)

>테스트 일시: 2026-03-27
> 테스트 환경: localhost:3000, Chrome (Headless)

### 1. Dashboard (대시보드)

| 테스트 항목 | 상태 | 특이사항 |
|------------|:----:|----------|
| 페이지 로드 | ✅ | HTTP 200 |
| 사이드바 네비게이션 표시 | ✅ | 모든 메뉴 정상 표시 |
| 통계 카드 표시 (방문 회원, 월 매출, 활성 회원, 오늘 PT) | ✅ | Today's Visitors 47, Monthly Revenue ₩12,450,000, Active Members 324, Today's PT 18 |
| 빠른 작업 버튼 표시 | ✅ | 회원 추가, 매출 기록, 지출 기록, PT 등록 |
| 다크모드 토글 | ✅ | 정상 동작, 버튼 텍스트 변경됨 |
| 언어 토글 (KO↔EN) | ✅ | 정상 동작, 메뉴 언어 변경됨 |

### 2. Revenue Management (매출 관리)

| 테스트 항목 | 상태 | 특이사항 |
|------------|:----:|----------|
| **UI Components** |||
| 통계 카드 표시 (총 매출, PT, 대관, 필라테스) | ✅ | 정상 표시 |
| 회원명/트레이너 검색 | ✅ | "김철수" 검색 결과 정상 필터링 |
| 월 필터 드롭다운 | ✅ | 12개월 옵션 표시 |
| 카테고리 필터 드롭다운 | ✅ | PT/Rental/Pilates 옵션 |
| 결제수단 필터 드롭다운 | ✅ | 6개 옵션 표시 |
| 트레이너 필터 드롭다운 | ✅ | 4명 트레이너 표시 |
| 필터 변경 시 리셋 버튼 표시 | ✅ | PT 선택 시 리셋 버튼 나타남 |
| 리셋 버튼 필터 초기화 | ✅ | 모든 필터 기본값으로 복원 |
| **Revenue Registration Modal** |||
| 모달 열기 ("Add Sale" 버튼) | ✅ | 정상 열림 |
| 회원 선택 드롭다운 | ✅ | 회원 목록 + 외부(비회원) |
| 카테고리 선택 드롭다운 | ✅ | PT/Space Rental/Pilates |
| 금액 입력 필드 | ✅ | 숫자 입력 가능 |
| 결제수단 선택 드롭다운 | ✅ | 6개 옵션 (이모지 포함) |
| 트레이너 선택 드롭다운 | ✅ | 4명 트레이너 |
| 날짜 선택 | ✅ | 기본값: 오늘 |
| 메모 입력 | ✅ | 텍스트 입력 가능 |
| 취소 버튼 | ✅ | 모달 닫힘 |
| 등록 버튼 | ✅ | 버튼 표시됨 |
| X 버튼으로 모달 닫기 | ✅ | aria-label 추가, 클릭 영역 개선 (36x36px) |
| 외부 클릭으로 모달 닫기 | ✅ | 오버레이 클릭 시 모달 닫힘 |
| 가로 스크롤 방지 | ✅ | overflowX: hidden 적용 |
| **Charts & Analytics** |||
| 월별 매출 트렌드 차트 렌더링 | ✅ | ComposedChart 정상 렌더링 |
| 기간 선택기 (3M/6M/12M) | ✅ | 버튼 표시됨 |
| 카테고리별 매출 비중 차트 | ✅ | PieChart 정상 렌더링 (PT 100%) |
| 기간 비교 카드 | ✅ | This Period/Previous Period/Growth Rate 표시 |
| **Mobile Responsive** |||
| 모바일 레이아웃 | ✅ | 테이블 컬럼 축소, 사이드바 햄버거 메뉴 |
| **Mobile Sticky Button (NEW)** |||
| Sticky 버튼 하단 여백 | ✅ | marginBottom: 80px 적용, 마지막 행(714) < 버튼 상단(740), 스크롤 시 컨텐츠 가림 없음 |

### 3. Expense Management (지출 관리)

| 테스트 항목 | 상태 | 특이사항 |
|------------|:----:|----------|
| **UI Components** |||
| 통계 카드 (월별 수익, 비용, 순이익) | ✅ | Monthly Revenue ₩3,680,000, Expenses ₩6,830,000, Profit ₩-3,150,000 |
| 수익률 (Profit Margin) 표시 | ✅ | -85.6% 표시 |
| 월 선택 필터 | ✅ | 12개월 드롭다운 |
| 요약/상세 뷰 전환 | ✅ | Summary/Detail 버튼 토글 |
| 필터 초기화 버튼 | ✅ | Reset 버튼 표시 |
| **Summary View** |||
| 손익계산서 형태 디자인 | ✅ | Income Statement 형태 정상 표시 |
| 수익 섹션 카테고리별 표시 | ✅ | PT/Space Rental/Pilates/Other Revenue |
| 비용 섹션 카테고리별 표시 | ✅ | 7개 카테고리 (Wages, Rent, Utilities, Equipment, Marketing, Maintenance, Other) |
| 순이익/순손실 스타일링 | ✅ | Net Loss ₩-3,150,000 빨간색 표시 |
| **Detail View** |||
| 타입 필터 (All/Income/Expense) | ✅ | Income/Expense 드롭다운 |
| 카테고리 필터 | ✅ | 수익 4개 + 비용 7개 카테고리 |
| 거래 내역 테이블 | ✅ | Date/Type/Category/Description/Amount 컬럼, 16개 거래 표시 |
| **Expense Registration Modal** |||
| 모달 열기 | ✅ | "Add Expense" 버튼으로 열림 |
| 카테고리 선택 (7개) | ✅ | Wages/Rent/Utilities/Equipment/Marketing/Maintenance/Other Expenses |
| 날짜 선택 (기본값: 오늘) | ✅ | 2026-03-26 기본값 |
| 금액 입력 ("원" 단위) | ✅ | 숫자 입력 필드 |
| 내역 입력 | ✅ | "Enter Description" 플레이스홀더 |
| 비고(메모) 입력 (NEW) | ✅ | textarea 필드, 선택 입력, 3줄 높이 |
| 취소/등록 버튼 | ✅ | Cancel/Register 버튼 표시 |
| X 버튼으로 모달 닫기 | ✅ | aria-label 추가, 클릭 영역 개선 (36x36px) |
| 외부 클릭으로 모달 닫기 | ✅ | 오버레이 클릭 시 모달 닫힘 |
| 가로 스크롤 방지 | ✅ | overflowX: hidden 적용 |
| **Charts & Analytics** |||
| 월별 재무 트렌드 차트 | ✅ | Revenue/Expenses/Net Profit 라인차트 |
| 카테고리별 지출 비중 차트 | ✅ | PieChart (Equipment/Maintenance/Marketing/Other/Rent/Utilities/Wages) |
| 기간 비교 카드 | ✅ | Revenue/Expenses/Net Profit +0.0% |
| **Revenue Registration Restriction** |||
| "Add Revenue" 버튼 없음 | ✅ | "Add Revenue" 버튼 없음 확인 |
| **Mobile Responsive** |||
| 모바일 레이아웃 | ✅ | 통계 카드 스택, 차트 정상 표시 |
| **Mobile Sticky Button (NEW)** |||
| Sticky 버튼 하단 여백 | ✅ | marginBottom: 80px 적용, 마지막 컨텐츠(716) < 버튼 상단(740), 스크롤 시 컨텐츠 가림 없음 |

### 4. Member Management (회원 관리)

| 테스트 항목 | 상태 | 특이사항 |
|------------|:----:|----------|
| **UI Components** |||
| 통계 카드 (전체, 활성, 만료 임박) | ✅ | 4개 카드 정상 표시 (전체 50, 활성 35, 일시중단 8, 만료 7) |
| 이름 검색 | ✅ | 검색 필드 정상 작동 |
| 연락처 검색 | ✅ | 검색 필드 정상 작동 |
| 상태 필터 (활성/일시중단/만료) | ✅ | 4개 옵션 드롭다운 정상 |
| 트레이너 필터 | ✅ | 5개 트레이너 + 전체 옵션 |
| 필터 초기화 버튼 | ✅ | 버튼 표시됨 |
| 목록/카드 뷰 전환 (데스크톱) | ✅ | 토글 버튼 정상 작동, **기본 뷰: 목록 (list)** |
| 검색 입력창 돋보기 아이콘 | ✅ | 아이콘 잘림 문제 수정 (lineHeight: 0, display: block 적용) |
| **Member List** |||
| 회원 카드 표시 | ✅ | 카드 레이아웃 정상 |
| 상태 뱃지 색상 | ✅ | 활성(초록), 일시중단(노랑), 만료(빨강) |
| 만료까지 남은 일수 표시 | ✅ | "D-7" 형태로 표시 |
| 멤버십 종류 표시 | ✅ | PT, 필라테스, GX 등 표시 |
| **Member Registration Modal** |||
| 모달 열기 | ✅ | "회원 추가" 버튼으로 열림 |
| 기본 정보 필드 (이름, 성별, 생년월일, 연락처) | ✅ | 4개 필드 모두 표시 |
| 멤버십 정보 필드 (종류, 시작/종료일, 트레이너, 메모) | ✅ | 모든 필드 정상 |
| 4개 멤버십 종류 드롭다운 | ✅ | PT 10회, PT 20회, 필라테스, GX |
| **Mobile Responsive** |||
| 모바일 레이아웃 | ✅ | 카드 뷰만 표시, 터치 친화적 |
| **Mobile Sticky Button (NEW)** |||
| Sticky 버튼 하단 여백 | ✅ | marginBottom: 80px 적용, 마지막 카드 하단(716) < 버튼 상단(740), 스크롤 시 컨텐츠 가림 없음 |
| **Infinite Scroll / Load More (NEW)** |||
| 초기 10명 표시 | ⏳ | 테스트 필요 |
| "전체 X명 중 10명 표시" 인디케이터 | ⏳ | 테스트 필요 |
| 더보기 버튼 표시 | ⏳ | 테스트 필요 |
| 더보기 버튼 클릭 시 10명 추가 로드 | ⏳ | 테스트 필요 |
| 로딩 중 스피너 표시 | ⏳ | 테스트 필요 |
| 모든 회원 로드 후 "더 이상 회원이 없습니다" 표시 | ⏳ | 테스트 필요 |
| 필터 변경 시 목록 리셋 (10명 표시) | ⏳ | 테스트 필요 |
| 검색어 변경 시 목록 리셋 | ⏳ | 테스트 필요 |

### 5. PT Schedule (PT 스케줄표)

| 테스트 항목 | 상태 | 특이사항 |
|------------|:----:|----------|
| **UI Components** |||
| 일간 뷰 시간 그리드 (6AM-12AM) | ✅ | 18개 시간 슬롯 표시 |
| 주간 뷰 7일 캘린더 | ✅ | 7일 캘린더 정상 전환 |
| 트레이너 필터 | ✅ | 드롭다운 정상 작동 |
| 날짜 네비게이션 (이전/다음) | ✅ | 좌/우 화살표 버튼 정상 |
| "오늘" 버튼 | ✅ | 버튼 클릭 시 오늘 날짜로 이동 |
| 세션 수 표시 | ✅ | 상단에 세션 수 표시 |
| **Session Display** |||
| 세션 카드 (회원명, 시간, 카테고리) | ✅ | 카드 형태로 정상 표시 |
| 상태 뱃지 (예정/완료/취소/노쇼) | ✅ | 4가지 상태 색상 구분 |
| 카테고리 색상 (PT: 파랑, 필라테스: 분홍) | ✅ | 카테고리별 색상 적용 |
| 범례 패널 | ✅ | 하단에 범례 표시 |
| **PT Registration Modal** |||
| 모달 열기 (시간 슬롯 클릭) | ✅ | 빈 슬롯 클릭 시 모달 열림 |
| 카테고리 선택 (PT/필라테스) | ✅ | 2개 옵션 드롭다운 |
| 트레이너 목록 카테고리별 필터링 | ✅ | 카테고리에 따른 트레이너 필터링 |
| 회원 선택 | ✅ | 회원 드롭다운 정상 |
| 날짜/시간 선택 | ✅ | 날짜 picker, 시간 슬롯 선택 |
| 메모 입력 | ✅ | 메모 필드 표시 |
| **Mobile Responsive** |||
| 모바일 레이아웃 | ✅ | 세로 스크롤 시간표 |
| **Mobile Date Navigation (NEW)** |||
| 날짜 네비게이션 좌/우 화살표 | ✅ | 2026.03.27 → 2026.03.26 → 2026.03.27 정상 동작 |
| 날짜 헤더 탭 시 미니 캘린더 표시 | ✅ | 날짜 버튼 클릭 시 캘린더 팝업 정상 |
| 미니 캘린더 월 이동 (이전/다음) | ✅ | ChevronLeft/Right 버튼 정상 동작 |
| 미니 캘린더 날짜 선택 | ✅ | 날짜 선택 후 해당 날짜로 이동, 캘린더 자동 닫힘 |
| 미니 캘린더 외부 클릭 시 닫기 | ✅ | 캘린더 영역 외 클릭 시 자동 닫힘 |
| "오늘" 버튼 표시 (오늘이 아닐 때) | ✅ | 2026.03.26 선택 시 "오늘" 버튼 표시됨 |
| "오늘" 버튼 클릭 시 오늘로 이동 | ✅ | 클릭 시 2026.03.27로 복귀, 버튼 숨김 |
| **Mobile Multi-Trainer View (NEW)** |||
| "전체 트레이너" 선택 시 트레이너 컬럼 표시 | ✅ | 김철수, 이영희, 박민수, 최수진 4개 컬럼 표시 |
| 트레이너 컬럼 가로 스크롤 | ✅ | 4명 트레이너는 스크롤 없이 표시 (375px에 맞게 최적화) |
| 트레이너별 세션 카드 정렬 | ✅ | 각 트레이너 컬럼 하단 세션 카드 정렬 |
| 동시간대 여러 트레이너 세션 표시 | ✅ | 홍길동(07:00), 김영희(09:00), 이수현(10:00) 등 동시간대 세션 표시 |
| **Mobile Calendar Height (NEW)** |||
| 캘린더 하단 잘림 없음 | ✅ | 동적 높이 적용으로 하단 잘림 없음 |
| 스크롤 시 마지막 시간대 표시 | ✅ | 스크롤 하단에서 23:00 시간대 정상 표시 |
| **Scroll Behavior (NEW)** |||
| 페이지 자체 스크롤 방지 | ✅ | document.body.style.overflow = "hidden" (useEffect + + DashboardLayout cleanup 보존 |
| 캘린더 내부 스크롤만 허용 | ✅ | 시간 그리드 영역만 overflow-y: auto 적용 |
| 페이지 이탈 시 스크롤 복원 | ✅ | cleanup 함수로 overflow = "unset" 복원 |
| 페이지 진입 시 스크롤 잠금 | ✅ | useEffect로 진입 시 overflow = "hidden" 설정 |
| DashboardLayout과 충돌 없 | ✅ | DashboardLayout cleanup 로 다른 페이지 스크롤 유지 |
| **Current Time Indicator (NEW)** |||
| 현재 시간 가로선 표시 | ✅ | 빨간색 가로선 + 시간 라벨 (예: 14:30) |
| 시스템 시간대 자동 감지 | ✅ | new Date()로 기기 로컬 시간 사용 |
| 오늘 날짜에서만 표시 | ✅ | isToday() 체크로 오늘만 인디케이터 표시 |
| 페이지 로드 시 현재 시간으로 스크롤 | ✅ | 현재 시간 중심으로 캘린더 뷰 자동 정렬 |
| 1분마다 자동 업데이트 | ✅ | setInterval로 60초마다 시간 갱신 |

### 6. Staff Management (직원 관리)

| 테스트 항목 | 상태 | 특이사항 |
|------------|:----:|----------|
| **UI Components** |||
| 직원 목록 표시 | ✅ | 8명 직원 카드 형태로 표시 |
| 이름 검색 | ✅ | 검색 필드 정상 작동 |
| 역할 필터 | ✅ | 3개 역할 (트레이너/매니저/프론트) |
| 필터 초기화 버튼 | ✅ | 버튼 표시됨 |
| **Staff Cards** |||
| 직원 정보 (이름, 역할, 연락처) | ✅ | 이름, 역할, 전화번호 표시 |
| 전문 분야 표시 (트레이너) | ✅ | 전문 분야 태그로 표시 (PT, 필라테스 등) |
| **Mobile Responsive** |||
| 모바일 레이아웃 | ✅ | 2열 그리드 → 1열 스택 |
| **Mobile Sticky Button (NEW)** |||
| Sticky 버튼 하단 여백 | ✅ | marginBottom: 80px 적용, 컨텐츠 하단(715) < 버튼 상단(740), 스크롤 시 컨텐츠 가림 없음 |

### 7. Cross-Cutting Tests (공통 테스트)

| 테스트 항목 | 상태 | 특이사항 |
|------------|:----:|----------|
| **Theme Support** |||
| 라이트 테마 | ⏳ | 테스트 필요 |
| 다크 테마 | ✅ | 정상 동작 |
| 테마 토글 페이지 간 유지 | ⏳ | 테스트 필요 |
| **i18n Support** |||
| 한국어 번역 | ✅ | 정상 표시 |
| 영어 번역 | ✅ | 정상 표시 |
| 언어 전환 | ✅ | 정상 동작 |
| **Navigation** |||
| 사이드바 네비게이션 (데스크톱) | ✅ | 정상 동작 |
| 모바일 메뉴 (햄버거) | ⏳ | 테스트 필요 |
| 모든 메뉴 항목 네비게이션 | ✅ | 정상 동작 |
| 활성 메뉴 항목 하이라이트 | ⏳ | 테스트 필요 |
| **Performance** |||
| 페이지 로드 시간 < 3초 | ⏳ | 테스트 필요 |
| 차트 렌더링 | ⏳ | 테스트 필요 |
| 레이아웃 시프트 없음 | ⏳ | 테스트 필요 |

### 테스트 상태 범례

| 기호 | 의미 |
|:----:|------|
| ✅ | 통과 (Pass) |
| ❌ | 실패 (Fail) |
| ⏳ | 테스트 필요 (Pending) |
| ⚠️ | 부분 통과 (Partial) |

### 알려진 이슈

| 이슈 | 설명 | 영향도 |
|------|------|--------|
| 로케일 라우팅 | `/ko/dashboard` 경로 404 반환 | 낮음 ( `/dashboard` 사용 가능) |
