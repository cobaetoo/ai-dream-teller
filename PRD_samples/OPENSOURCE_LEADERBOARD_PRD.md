# PRD: AI Open Source & Tools Ranking Hub

> 코드명: **ai-stage-live**

## 1. 배경 & 문제 정의

### 문제
- AI 에이전트, 하네스, CLI 툴, SDK, 스킬 생태계가 폭발적으로 확장 중
- 소식이 하루 단위로 쏟아져 **정보 피로** 발생
- 소식을 놓치면 **FOMO**, 다 따라가자니 **시간 부족**
- "지금 진짜 쓸 만한 게 뭔지" 한눈에 파악할 방법이 없음

### 기회
- GitHub Stars, 다운로드 수, 커뮤니티 반응 등 **객관적 지표**는 이미 존재
- 이를 한 곳에서 랭킹으로 보여주면 **의사결정 비용**을 획기적으로 낮출 수 있음

---

## 2. 제품 한 줄 요약

**"AI 생태계 오픈소스·툴 랭킹을 실시간으로 보여주는 단일 대시보드"**

---

## 3. 타겟 사용자

| 페르소나 | 특짭 |
|---|---|
| AI 개발자 | 매일 새로 나오는 프레임워크·SDK 중 뭘 써야 할지 고민 |
| CTO / 팀 리드 | 도입할 툴의 성숙도와 커뮤니티 규모를 빠르게 평가해야 함 |
| AI 트렌드 관심자 | FOMO 없이 핵심만 파악하고 싶은 일반 개발자 |

---

## 4. 언어 정책

- **서비스 UI**: 영어 (글로벌 시장 타겟)
- **개발 과정 커뮤니케이션**: 한국어

---

## 5. 핵심 기능 (MVP)

### 5.1 싱글 페이지 랭킹 보드 (context7.com 스타일)
- **모든 조작이 랜딩 페이지 하나에서 완료**되는 UX
- 페이지 이동 없이 카테고리·필터·정렬을 전환하면 즉시 리스트가 갱신됨
- URL 쿼리 파라미터로 상태가 유지되어 공유 가능 (예: `/?category=agents&sort=stars`)
- 카테고리 예시:
  - AI Agents / Agent Frameworks
  - AI Coding Tools (CLI, IDE extensions)
  - LLM Inference & Serving
  - RAG & Vector DB
  - Fine-tuning & Training
  - Evaluation & Benchmarks
  - Multimodal (Vision, Audio, Video)
  - MCP Servers & Tools
- 기본 정렬: **종합 점수** (아래 스코어링 참조)
- 사용자가 정렬 기준을 Stars / Growth / Recent Activity 등으로 변경 가능

### 5.2 프로젝트 카드
각 프로젝트는 다음 정보를 포함한 카드로 표시:

```
┌─────────────────────────────────────────┐
│ #3  claude-code                         │
│ ─────────────────────────────────────── │
│ Stars  120k  │  Forks  8.2k  │  +15%/w  │
│ Language: TypeScript                     │
│ Last commit: 2 hours ago                │
│ License: Apache-2.0                     │
│ ─────────────────────────────────────── │
│ AI coding CLI by Anthropic. Supports ... │
│ Tags: #agent #cli #coding               │
│ [GitHub] [Docs] [Demo]                  │
└─────────────────────────────────────────┘
```

카드 클릭 시 `/project/[id]` 상세 페이지로 이동.

### 5.3 프로젝트 상세 페이지 (`/project/[id]`)
개별 프로젝트를 위한 전용 라우트:
- **프로젝트 요약**: 어떤 목적의 프로젝트인지, 핵심 기능은 무엇인지 간단 요약
- **스코어 분해**: 종합 점수를 각 차원별로 시각화 (레이더 차트 등)
- **Star 히스토리**: 시계열 차트로 성장 추이 표시
- **README 미리보기**: GitHub README를 인라인 렌더링
- **관련 프로젝트**: 같은 카테고리의 유사 프로젝트 추천

### 5.4 종합 점수 (Composite Score)
단일 지표에 의존하지 않고 다차원 복합 점수 사용:

#### 성장성 (Growth)
| 지표 | 설명 |
|---|---|
| Star Velocity | 최근 7/30일 Star 증가량. 절대값보다 속도가 핵심 |
| Fork/Star 비율 | 단순 북마크(Star) 대비 실사용 의지(Fork) 비율 |

#### 활성도 (Activity)
| 지표 | 설명 |
|---|---|
| 최근 30일 커밋 수 | 유지보수 활성 여부 |
| 마지막 커밋·릴리즈 날짜 | 30일 이내 여부로 가중치 부여 |
| PR 머지 속도 | 메인테이너 대응 속도 |

#### 건강도 (Health)
| 지표 | 설명 |
|---|---|
| Issue 해결률 | Closed / Total Issues 비율 |
| Active Contributor 수 | 특정 1~2인 의존 여부, 커뮤니티 지속 가능성 판단 |

#### 생태계 (Ecosystem)
| 지표 | 설명 |
|---|---|
| Dependent repo 수 | 타 프로젝트에서 얼마나 의존하는지 |
| npm/PyPI 다운로드 수 | 실제 설치·사용량 (Phase 2) |

##### 글로벌 채택도 보정 (Global Adoption Adjustment)
절대 GitHub 메트릭(stars, forks)만으로는 특정 지역 내수 인기와 글로벌 채택을 구분할 수 없음. Ecosystem 점수에 아래 보정을 적용하여, 데이터를 제거하지 않고도 글로벌 관점에서 의미 있는 프로젝트가 상위에 노출되도록 조정.

| 보정 항목 | 조건 | Ecosystem 페널티 | 근거 |
|---|---|---|---|
| 높은 Fork/Star 비율 | fork/star > 30% | -10 | 튜토리얼·과제·실습형 프로젝트는 fork 비율이 비정상적으로 높음. 실제 툴 사용이 아닌 "복제 후 수정" 패턴 |
| 중국어 전용 설명 | description이 중국어로만 작성 (영문 20자 미만) | -10 | 글로벌 도달이 제한적이라는 신호. 이중언어 설명은 페널티 없음 |
| 두 조건 모두 충족 | 위 두 조건 동시 만족 | -15 | 누적 적용 |

**적용 원칙**:
- 특정 국가/언어를 차단하는 것이 아니라, **글로벌 채택 신호가 약한 프로젝트의 Ecosystem 점수를 보정**하는 것
- 이중언어(bilingual) 프로젝트는 페널티 대상에서 제외
- Phase 2에서 HN 언급·Reddit 점수·다운로드 수 등 추가 글로벌 신호가 도입되면 페널티 기반 방식을 자연스럽게 대체

#### AI 핵심도 (AI Relevance)
프로젝트가 AI 생태계에 얼마나 핵심적인지를 평가. "AI 기반"을 표방하지만 실제로는 AI가 부가기능에 불과한 프로젝트와, AI 자체가 코어인 프로젝트를 구분.

| 지표 | 설명 |
|---|---|
| 핵심 AI 키워드 매칭 | llm, agent, rag, fine-tuning, inference 등 AI 핵심 키워드가 description·topics에 포함된 수 |
| AI 토픽 태그 | ai, ml, machine-learning, deep-learning, nlp 등 태그 보유 여부 |
| 주변 신호 감지 | 면접 가이드, 로우코드, 관리 시스템, 코딩 챌린지 등 AI 주변부 성격 감지 시 감점 |

**가산 요인** (최대 +45):
- 핵심 AI 키워드 (llm, agent, rag, fine-tuning 등) 1개당 +5 (최대 +30)
- AI 관련 토픽 태그 1개당 +3 (최대 +15)
- "ai-driven"/"ai-powered" 표현 +5

**감산 요인** (최대 -40):
- 주변부 신호 (면접, 튜토리얼, 로우코드, 관리시스템 등) 1개당 -15 (최대 -40)

**점수 범위**: 0-100, 기본값 50

**적용 예시**:
- `langchain` (agent, llm, retrieval 등): ~95
- `JavaGuide` (면접 가이드): ~20
- `JeecgBoot` (로우코드, 관리시스템): ~25
- `dify` (agent, workflow, llm): ~90

#### 완성도 (Maturity)
| 지표 | 설명 |
|---|---|
| 문서화 점수 | README 길이·구조, 공식 Docs 페이지 존재 여부 |
| 테스트 커버리지 | Codecov 연동, CI 통과율 |

#### AI 특화 (AI-Specific)
| 지표 | 설명 |
|---|---|
| 논문 인용 여부 | arxiv 링크 존재 여부 |
| 벤치마크 점수 | Papers with Code 연동 |

#### 커뮤니티 (Community) — Phase 2 추가
| 지표 | 설명 |
|---|---|
| Upvote/Downvote 비율 | 커뮤니티 추천도. (upvote - downvote) / total votes |
| 마이 툴킷 등록 수 | "N users use this" — 실제 사용자 수 |
| 투표 참여율 | 조회수 대비 투표수 비율 (Phase 3) |

#### 스코어링 공통 원칙
- **Star Velocity에 높은 가중치** → 신규 프로젝트가 상위에 노출될 수 있도록 보장
- **릴리즈 날짜 기준 Decay Factor** → 오래 방치된 프로젝트는 점수 자연 하락
- **카테고리별 정규화 필수** → LLM 프레임워크 vs CLI 툴은 Star 스케일 자체가 다름
- MVP에서는 GitHub API로 수집 가능한 지표만 사용. Hugging Face·Papers with Code·소셜 반응은 Phase 2에서 추가.
- **종합 점수는 6차원 가중 평균**: Growth 18%, Activity 17%, Health 17%, Ecosystem 18%, Maturity 12%, AI Relevance 18%
- Phase 2에서 Community 차원이 추가되면 6차원 → 7차원으로 확장. 초기 Community 가중치는 낮게(5~10%) 설정 후 데이터 축적 후 조정.

### 5.5 필터 & 검색 (랜딩 페이지 내)
- 카테고리 필터 (복수 선택)
- 언어 필터 (TypeScript, Python, Rust, Go, ...)
- 라이선스 필터 (MIT, Apache, GPL, ...)
- 키워드 검색
- 모든 필터 변경은 URL 쿼리 파라미터로 동기화 → 북마크·공유 가능

### 5.6 트렌드 표시
- **Rising Fast**: 최근 7일 Star 성장률 Top 10
- **Just Launched**: 최근 30일 내 등록된 프로젝트
- **Weekly Digest**: 주간 변화 요약 (새 진입, 순위 변동)

### 5.7 사용자 인증 & 마이 툴킷
- **로그인**: GitHub OAuth 단일 로그인 (Supabase Auth)
- **마이 툴킷 (My Toolkit)**: 로그인한 사용자가 자신이 실제 사용 중인 프로젝트를 저장
  - 랭킹 보드의 각 프로젝트 행에 "내 툴킷에 추가" 버튼 (아이콘: `Wrench` 또는 `Plus`)
  - 이미 추가된 프로젝트는 채워진 아이콘으로 표시, 클릭 시 제거
  - `/my-toolkit` 페이지에서 저장한 프로젝트를 카테고리별로 모아보기
  - 마이 툴킷 데이터는 Supabase `user_toolkits` 테이블에 저장 (user_id, project_id, added_at)
- **마이 툴킷 통계**: 각 프로젝트에 "N users use this" 표시 → 이 지표는 종합 점수의 생태계(Ecosystem) 지표에 반영

### 5.8 커뮤니티 Upvote / Downvote
- **Upvote/Downvote**: 로그인한 사용자가 각 프로젝트에 대해 추천/비추천 투표
- **투표 UI**:
  - 랭킹 보드의 각 프로젝트 행에 ▲/▼ 버튼 배치 (Up/Down 아이콘)
  - 프로젝트 상세 페이지에도 동일한 투표 UI 배치
  - 현재 투표수 (예: `+142`)를 버튼 사이에 표시
  - 사용자가 이미 투표한 경우 해당 방향이 하이라이트, 다시 클릭하면 투표 취소
- **투표 규칙**:
  - 1인 1프로젝트 1표 (Up 또는 Down 중 하나, 변경 가능)
  - 비로그인 사용자는 투표수만 볼 수 있고, 클릭 시 로그인 유도
  - 투표 취소: 같은 방향을 다시 클릭하면 투표 철회
- **점수 반영**:
  - 커뮤니티 점수(Community Score) = upvote - downvote
  - 종합 점수의 새로운 차원 "Community" 추가 (기존 5차원 → 6차원)
  - 가중치는 초기에 낮게 설정 (5~10%) 후 커뮤니티가 활성화되면 조정
- **데이터 모델**:
  - `project_votes` 테이블: user_id, project_id, vote_type (up/down), created_at
  - 집계는 `project_vote_stats` 뷰 또는 materialized view로 캐싱
  - 투표수는 실시간 반영 (Supabase Realtime 또는 optimistic update)
- **어뷰징 방지**:
  - Rate limiting: 1분당 최대 10회 투표
  - 신규 계정(가입 24시간 이내)은 투표 권한 제한
  - 이상 탐지: 단기간 대량 downvote 패턴 감지 시 자동 플래그

### 5.9 Task-Based Stack Guides (유스케이스 탐색)

#### 문제 인식
현재 랭킹 보드는 **프로젝트가 무엇인지**(카테고리)는 보여주지만, **내가 하려는 작업에 무엇이 필요한지**는 알려주지 못함. 실제 개발자는 "RAG 프로젝트를 찾자"가 아니라 "챗봇을 만들고 싶은데 뭘 써야 하지?"라고 접근. 하나의 작업에 inference + agent framework + RAG + evaluation 등 여러 카테고리의 조합이 필요하지만, 현재 UI에서는 카테고리를 하나씩 따로 탐색해야 함.

#### 핵심 아이디어
**"재료 레시피"** 모델 — 요리 레시피가 여러 재료를 묶어서 보여주듯, AI 개발 과제(유스케이스)별로 필요한 프로젝트 스택을 큐레이션된 가이드로 제시.

#### 데이터 기반 설계 근거
기존 3,197개 프로젝트의 tag 분석 결과, 유스케이스별로 자연스럽게 여러 카테고리가 교차함:

| 유스케이스 | 관련 프로젝트 수 | 카테고리 분포 |
|---|---|---|
| Build an AI Agent | 458 | agents(245) + inference(64) + mcp(41) + rag(34) + coding-tools(39) |
| Build a Chatbot | 219 | agents(55) + inference(54) + rag(34) + multimodal(28) |
| Deploy LLM | 67 | inference(53) + rag(3) + multimodal(7) |
| Build a RAG App | 73 | rag(52) + agents(10) + inference(7) |
| Fine-tune a Model | 88 | fine-tuning(41) + inference(25) + rag(8) |
| Evaluate LLM | 83 | evaluation(61) + inference(8) + rag(7) |
| Local AI Setup | 68 | inference(49) + multimodal(6) + rag(4) |

#### Stack Guide 구조
각 가이드는 **단계(Pipeline Stage)** 들로 구성. 각 단계는 1개 카테고리에 매핑되고, 해당 카테고리의 상위 프로젝트를 추천:

```
Stack Guide: "Build a Chatbot"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1. LLM Backend]  →  [2. Agent Framework]  →  [3. Knowledge Base]  →  [4. Evaluation]
   inference            agents                  rag                    evaluation
   ┌──────────┐         ┌──────────┐           ┌──────────┐          ┌──────────┐
   │ ollama   │         │ langchain│           │ chromadb │          │ ragas    │
   │ vllm     │         │ crewai  │           │ llama    │          │ trulens  │
   │ llama    │         │ autogen │           │ qdrant   │          │ deepeval │
   └──────────┘         └──────────┘           └──────────┘          └──────────┘
```

#### 초기 가이드 목록 (8개)

| 가이드 | 파이프라인 단계 | 태그 기반 필터 |
|---|---|---|
| Build an AI Agent | Framework → LLM → Tools/MCP → Memory | agent, agents, ai-agents, agentic, tool-use |
| Build a Chatbot | LLM → Framework → Knowledge → Eval | chatbot, chatgpt, conversation |
| Deploy LLM at Scale | Inference → Serving → Monitoring | inference, serving, deployment |
| Build a RAG App | Vector DB → Embeddings → Framework → Eval | rag, retrieval, vector, embedding |
| Fine-tune a Model | Data → Training → Eval → Deployment | fine-tuning, lora, peft, training |
| Evaluate LLM Performance | Benchmarks → Red-teaming → Metrics | benchmark, evaluation, safety |
| Run AI Locally | Runtime → Models → Quantization | local, ollama, quantization, gguf |
| Build Multimodal App | Vision → Audio → Framework | vision, audio, image-generation, whisper |

#### UI 디자인 (랜딩 페이지 내)

**진입점**: 카테고리 탭 행 아래에 **"What are you building?"** 섹션 배치. 가로 스크롤 가능한 가이드 카드 행:

```
┌─────────────────────────────────────────────────────────────┐
│  What are you building?                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ 🤖 AI Agent  │ │ 💬 Chatbot   │ │ 🚀 Deploy LLM│ ←→     │
│  │ Framework →  │ │ LLM → FW →  │ │ Inference →  │        │
│  │ LLM → Tools  │ │ KB → Eval   │ │ Serving → .. │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

**확장 뷰**: 가이드 카드 클릭 시, 파이프라인 단계별 상세 프로젝트를 인라인 확장 또는 모달로 표시:
- 각 단계는 카테고리 기준으로 상위 3개 프로젝트를 카드로 표시
- 각 프로젝트 카드에는 이름, score, stars, 한 줄 설명
- "View all →" 링크로 해당 카테고리·필터가 적용된 랭킹 보드로 이동
- 파이프라인 단계 간에 화살표/커넥터로 흐름 시각화

**핵심 UX 원칙**:
- **Zero-friction**: 추가 페이지 이동 없이 랜딩 페이지에서 인라인 확장
- **Discoverable**: "What are you building?"이라는 질문 형태의 헤딩으로 진입 유도
- **Actionable**: 추천 프로젝트를 바로 클릭하여 상세 페이지로 이동 가능
- **Shareable**: 각 가이드는 URL로 공유 가능 (예: `/?guide=chatbot`)

#### 데이터 모델

가이드 정의는 정적 JSON으로 관리 (빌드 타임 포함):

```typescript
interface StackGuide {
  id: string;           // "chatbot"
  title: string;        // "Build a Chatbot"
  emoji: string;        // "💬"
  tags: string[];       // ["chatbot", "chatgpt", "conversation"]
  stages: {
    label: string;      // "LLM Backend"
    category: Category; // "inference"
    description: string;// "Choose a runtime to serve your LLM"
  }[];
}
```

프로젝트 추천은 실시간 계산: 각 단계의 `category` + `tags` 교집합으로 필터링 후 score 순 정렬하여 상위 3개 노출. 별도 큐레이션 DB 불필요.

#### 구현 우선순위
- **Phase 1.5** (MVP 직후): 8개 가이드 정의 + 인라인 확장 UI. 데이터는 기존 tag + category 조합으로 자동 생성
- **Phase 2**: 사용자 커스텀 스택 (마이 툴킷과 연동), 가이드별 커뮤니티 upvote
- **Phase 3**: AI 추천 — 사용자의 작업 설명을 자연어로 입력받아 LLM이 적절한 스택 가이드 자동 생성

---

## 6. 핵심 지표 (KPI)

| 지표 | 목표 (런칭 3개월) |
|---|---|
| DAU | 5,000+ |
| 등록 프로젝트 수 | 500+ |
| 데이터 갱신 주기 | 하루 N회 (6시간 간격) |
| 페이지 로드 시간 | < 2초 |
| 가입자 수 (Phase 2 런칭 후) | 1,000+ |
| 마이 툴킷 평균 저장 수 | 5개/유저 |
| 투표 참여율 | DAU의 30% 이상이 월 1회 이상 투표 |

---

## 7. 데이터 파이프라인

### 데이터 소스

| 소스 | 수집 내용 | 방법 |
|---|---|---|
| GitHub REST/GraphQL API | Star, Fork, Contributor, 커밋 빈도, Issue/PR, 릴리즈 주기 | API 직접 호출 (rate limit → 토큰 풀링) |
| Hugging Face Hub API | 모델·데이터셋·Space 트렌딩, 다운로드 수, like 수, 파이프라인 태그 | API 직접 호출 |
| GitHub Trending 스크래핑 | Daily/Weekly 트렌딩 레포 | 페이지 스크래핑 |
| Papers with Code API | 논문-코드 연결 레포 추적, 벤치마크 점수 | API 직접 호출 |
| Hacker News Algolia API | "Show HN" 중 AI 관련 프로젝트, 언급 수 | API 직접 호출 |
| Reddit API | r/LocalLLaMA, r/MachineLearning 등 언급 링크·upvote | API 직접 호출 |
| Product Hunt API | AI 카테고리 신규 런칭 프로젝트 | API 직접 호출 |
| awesome-* 리스트 | awesome-llm, awesome-agents 등 큐레이션 레포 | 주기적 파싱 (시드 데이터) |
| LLM 에이전트 파이프라인 | AI 뉴스레터, X 인플루언서 피드 → 프로젝트명·링크·설명 JSON 파싱 | LLM 에이전트 자동화 |

### GitHub Search API 수집 기준 (핵심)

GitHub Search API는 무인증 시 **10 req/min, 1000 results/query** 제한. 이 한도 내에서 최대한 많은 프로젝트를 커버하기 위해 아래 기준 적용:

**1. 검색 전략**
- `per_page=100` (최대)으로 요청
- `topic:` 필터를 사용하지 않음 — AI 프로젝트 대부분이 토픽을 달지 않음
- 정렬은 `sort=stars&order=desc`로 Star가 높은 프로젝트 우선
- Stars 하한선 없음 (단, 최종적으로 0스타 레포는 제외)

**2. 검색 쿼리 설계**
카테고리당 1~3개 쿼리를 사용하되, 포괄적인 키워드로 넓게 검색:

| 카테고리 | 쿼리 예시 |
|---|---|
| Agents | `"ai agent"`, `"llm agent"`, `"autonomous agent"`, `"langchain"` |
| Coding Tools | `"copilot"`, `"ai coding"`, `"code assistant"`, `"ai ide"` |
| Inference | `"llm inference"`, `"model serving"`, `"ollama"`, `"vllm"` |
| RAG | `"rag"`, `"vector database"`, `"embedding"`, `"retrieval augmented"` |
| Fine-tuning | `"fine-tuning"`, `"lora"`, `"qlora"`, `"peft"` |
| Evaluation | `"llm benchmark"`, `"model evaluation"`, `"ai benchmark"` |
| Multimodal | `"stable diffusion"`, `"image generation"`, `"text to speech"`, `"whisper"` |
| MCP | `"mcp server"`, `"model context protocol"` |
| General AI | `"machine learning"`, `"deep learning"`, `"neural network"`, `"pytorch"`, `"tensorflow"` |
| Foundations | `"gpt"`, `"bert"`, `"transformer"`, `"llama"`, `"diffusion"` |

**3. awesome-* 리스트 → GitHub 메타데이터 조회**
- awesome-* 리스트에서 수집한 레포 전체 목록을 GitHub Search API에 `repo:owner/name` 조건으로 배치 조회
- Search API의 `q=` 에 여러 `repo:` 조건을 OR로 연결하여 1회 요청에 최대 30개 레포 메타데이터 확보
- 이 과정을 awesome-* 전체 레포가 커버될 때까지 반복

**4. HN/Reddit → GitHub 레포 추출**
- HN "Show HN" 포스트와 Reddit 포스트에서 `github.com/owner/repo` 패턴을 추출
- 추출된 레포 목록을 위와 같은 방식으로 GitHub API에서 메타데이터 조회
- 이미 수집된 레포는 중복 제거

**5. Hugging Face → GitHub 교차 참조**
- Hugging Face 트렌딩 모델/스페이스 중 GitHub 레포가 있는 경우 메타데이터 보완에 활용
- HF 전용 항목(모델, 데이터셋)은 별도 항목으로 프로젝트 목록에 포함 가능

### 수집 주기
| 소스 | 주기 | 방식 |
|---|---|---|
| GitHub 메타데이터 | 6시간 (하루 4회) | Cron + Serverless Function |
| Hugging Face 트렌딩 | 6시간 (하루 4회) | Cron + API |
| Star 히스토리 | 일 1회 | GitHub Archive (GH Archive) |
| 트렌드 감지 | 시간 단위 | Star 급증 감지 로직 |
| 소셜 반응 (HN, Reddit, PH) | 일 1회 | API polling |
| awesome-* 리스트 | 주 1회 | 큐레이션 레포 파싱 |

### 프로젝트 등록 방식
- **자동**: GitHub Trending + starred repo 모니터링으로 신규 프로젝트 자동 발굴
- **수동**: 사용자가 GitHub URL을 제출하면 큐에 들어가고 검토 후 등록
- **초기 시드**: 다중 소스(GitHub Search, awesome-*, HN, Reddit, HuggingFace)를 교차 참조하여 최대한 많은 프로젝트를 발굴. 목표: **1회 수집 시 500개 이상**

### Supabase 테이블 설계 (Phase 2)
```
profiles
  id          uuid    PK (auth.users.id 참조)
  username    text
  avatar_url  text
  created_at  timestamptz

user_toolkits
  id          uuid    PK
  user_id     uuid    FK → profiles.id
  project_id  uuid    FK → projects.id
  added_at    timestamptz
  UNIQUE(user_id, project_id)

project_votes
  id          uuid    PK
  user_id     uuid    FK → profiles.id
  project_id  uuid    FK → projects.id
  vote_type   text    CHECK IN ('up', 'down')
  created_at  timestamptz
  UNIQUE(user_id, project_id)
```

---

## 8. 기술 스택

| 레이어 | 기술 | 비고 |
|---|---|---|
| Framework | **Next.js** (App Router) | SSR + RSC로 빠른 초기 로드, SEO |
| Language | **TypeScript** | 전체 코드베이스 타입 안전성 |
| Styling | **Tailwind CSS** + **shadcn/ui** | 담백한 UI, 일관된 컴포넌트 |
| Database | **Supabase** (PostgreSQL) | 실시간 업데이트, Auth 내장 |
| 배포 | **Vercel** | Next.js 네이티브 통합, Edge Functions |
| 데이터 수집 | **GitHub Actions** (cron) + TypeScript | GitHub API 호출에 최적화 |
| 차트 | Recharts | Star 히스토리 등 시계열 차트 |
| 상태 관리 | TanStack Query | 서버 상태 캐싱 & 갱신 |

---

## 9. 페이지 구조

```
/                    → 싱글 페이지 랭킹 보드 (모든 필터·카테고리·정렬, Stack Guides 인라인 포함, context7.com 스타일)
/project/[id]        → 프로젝트 상세 (요약, 스코어 분해, Star 히스토리, README)
/submit              → 프로젝트 제출 폼 (Phase 2)
/about               → 스코어링 알고리즘 설명
```

> 핵심 원칙: 랜딩 페이지(`/`)에서 모든 탐색이 완료되어야 함. `/project/[id]`는 심층 정보를 위한 보조 라우트.

---

## 10. 로드맵

### Phase 1 — MVP (4주)
- [ ] 프로젝트 초기 세팅 (Next.js + Supabase + Vercel + shadcn/ui)
- [ ] ~200개 시드 프로젝트 데이터베이스 구축
- [ ] GitHub API 데이터 수집 파이프라인 (하루 N회)
- [ ] 싱글 페이지 랭킹 보드 UI (필터, 카테고리, 정렬 → URL 쿼리 동기화)
- [ ] 프로젝트 카드 컴포넌트
- [ ] 프로젝트 상세 페이지 (목적 요약, 기능 개요)
- [ ] 종합 점수 계산 로직
- [ ] 반응형 모바일 대응

### Phase 2 — Growth (8주)
- [ ] 로그인 — GitHub OAuth 단일 로그인 (Supabase Auth)
- [ ] 마이 툴킷: "내 툴킷에 추가" 버튼 + `/my-toolkit` 페이지
- [ ] 커뮤니티 Upvote/Downvote — 랭킹 보드 + 상세 페이지에 투표 UI
- [ ] 투표 기반 Community Score 차원을 종합 점수에 추가 (6차원화)
- [ ] 마이 툴킷 "N users use this" 표시 → Ecosystem 지표에 반영
- [ ] 투표 어뷰징 방지 (rate limit, 신규 계정 제한, 이상 탐지)
- [ ] 프로젝트 제출 기능
- [ ] Weekly Digest (이메일 / 웹)
- [ ] npm/PyPI 다운로드 수, Hugging Face, Papers with Code 연동
- [ ] Star 히스토리 시계열 차트
- [ ] 비교 모드 (프로젝트 간 side-by-side 비교)

### Phase 3 — Community
- [ ] 사용자 리뷰 / 평점
- [ ] 커뮤니티 큐레이션 (사용자가 직접 카테고리 제안/투표)
- [ ] OSS contributions 연동 (누가 어떤 AI 프로젝트에 기여했는지)
- [ ] API 공개 (다른 서비스에서 랭킹 데이터 사용 가능)

---

## 11. 디자인 원칙

1. **정보 밀도 우선** — 한 화면에 최대한 많은 의미 있는 정보를. 화려함보다 실용성
2. **원 페이지 UX** — context7.com처럼 랜딩에서 모든 탐색이 끝나야 함
3. **스캐닝 가능** — 숫자와 색상 코딩으로 3초 내에 상황 파악 가능
4. **FOMO 해소** — "이 페이지만 보면 놓치는 것 없다"는 확신을 주기
5. **담백한 UI** — 장식 최소화, shadcn/ui 기반 타이포그래피와 여백으로 계층 구조 표현
6. **Dark-first** — 다크 모드를 기본 테마로. 라이트/다크 토글은 상단 네비게이션에 배치
7. **모바일 퍼스트 반응형** — 모바일 화면에서 카테고리·지표가 번잡하지 않도록 점진적 공개(Progressive Disclosure) 적용

---

## 12. UI/UX 세부 설계

### 12.1 테마
- **기본 테마**: 다크 모드
- **전환**: 상단 헤더 우측에 토글 버튼 배치 (Sun/Moon 아이콘)
- 시스템 설정(prefers-color-scheme) 존중하되, 사용자가 직접 선택하면 그 선택을 localStorage에 저장하여 유지
- `next-themes` 라이브러리 사용

### 12.2 랭킹 보드 — 다지표 테이블 레이아웃
프로젝트 리스트는 카드가 아닌 **테이블 형태**로 표시하여 여러 평가지표를 한 행에 배치.
각 지표 컬럼 헤더에는 직관적인 아이콘을 함께 배치하여 텍스트만 읽지 않고도 어떤 지표인지 즉시 파악 가능:

| 지표 | 아이콘 | Lucide 아이콘명 | 의미 |
|---|---|---|---|
| Stars | ★ | `Star` | 커뮤니티 인기도 |
| Forks | ⑂ | `GitFork` | 실사용 의향 |
| Growth | ↑ | `TrendingUp` | 최근 7일 Star 증가 속도 |
| Activity | ⚡ | `Zap` | 최근 30일 커밋·유지보수 활성도 |
| Health | ♥ | `Heart` | Issue 해결률·컨트리뷰터 다양성 |
| Score | ◎ | `Gauge` | 종합 복합 점수 |

- 아이콘은 컬럼 헤더 텍스트 앞에 배치 (예: `⚡ Activity`)
- 모바일 카드 뷰에서도 각 지표 칩 앞에 동일 아이콘 사용
- 아이콘 크기: 헤더 12px, 모바일 칩 10px — 텍스트보다 작게 유지하여 번잡하지 않게

#### 지표 헤더 툴팁
각 지표 컬럼 헤더에 마우스 호버 시 해당 지표의 의미를 짧게 설명하는 툴팁 표시.

**지표별 툴팁 설명**:
| 지표 | 툴팁 텍스트 |
|---|---|
| Stars | Total GitHub stars — community popularity |
| Forks | Total forks — real-world usage intent |
| Growth | Stars gained in the last 7 days |
| Activity | Maintenance score based on recent commits & releases |
| Health | Project health — issue resolution & contributor diversity |
| Score | Composite score across all dimensions |

**데스크톱 & 태블릿 (≥768px)**:
- `SortableHeader` 컴포넌트에 `Tooltip` 적용 (`side="bottom"`)
- 정렬 기능(클릭)과 툴팁(호버)이 동시에 동작하도록 `TooltipTrigger` 안에 버튼 배치

**모바일 (<768px)**:
- 터치 환경에서는 호버가 없으므로, 모바일 카드 내 지표 칩에는 `title` 속성으로 대체
- 길게 누르면 브라우저 기본 툴팁이 표시되어 최소한의 정보 제공

**데스크톱 (≥1024px)** — 풀 테이블
```
| # | Project        | ★Stars ↕ | ⑂Forks ↕ | ↑Growth ↕ | ⚡Activity ↕ | ♥Health ↕ | ◎Score ↕ |
|---|----------------|----------|----------|-----------|-------------|-----------|----------|
| 1 | transformers   | 142k     | 28.4k    | +380      | 98          | 92        | 96       |
| 2 | ollama         | 135k     | 11.2k    | +680      | 88          | 82        | 91       |
```
- **컬럼 헤더 클릭으로 정렬**: 별도의 정렬 드롭다운 없이 테이블 컬럼 헤더 자체가 정렬 트리거
- 클릭 시 해당 컬럼 기준 **내림차순** → 다시 클릭 시 **오름차순** 토글
- 현재 정렬 중인 컬럼 헤더에 방향 화살표 표시 (▼ 내림차순, ▲ 오름차순)
- 비활성 컬럼 헤더에는 희미한 ↕ 아이콘으로 "클릭 가능함"을 암시
- Score 컬럼은 색상 코딩 (≥90: 초록, ≥80: 파랑, ≥70: 노랑)
- Growth 컬럼도 색상 코딩으로 급상승 프로젝트 시각적 구분
- 행 클릭 시 `/project/[id]`로 이동
- 기본 정렬: Score 내림차순

**태블릿 (768–1023px)** — 핵심 지표만, 동일한 컬럼 헤더 정렬
```
| # | Project      | ★Stars ↕ | ↑Growth ↕ | ◎Score ↕ |
|---|--------------|----------|-----------|----------|
| 1 | transformers | 142k     | +380      | 96       |
```
- Stars, Growth, Score 3개 핵심 컬럼만 표시, 컬럼 헤더 클릭 정렬 동일

**모바일 (<768px)** — 카드 + 아이콘 지표 칩 (2행 분리)
- 모바일은 테이블 헤더가 없으므로 별도의 미니 정렬 셀렉트 유지 (컨트롤 행에 배치)
- 지표 칩을 **2행**으로 분리하여 좁은 화면에서 글자 겹침 방지
- 1행: Stars, Growth (실적 지표)
- 2행: Activity, Health, AI (품질 지표)
```
┌──────────────────────────────┐
│ 1  transformers         96   │
│ huggingface · Python         │
│ ★ 142k      ↑ +380/7d       │
│ ⚡ 98  ♥ 92%  🧠 95          │
└──────────────────────────────┘
```
- 카드 내부 지표 칩에 아이콘 배치
- 각 행은 `flex-wrap`으로 자동 줄바꿈, `gap-x-3 gap-y-1` 간격 유지

**모바일 컨트롤 행 최적화**:
- 검색 Input: `flex-1 min-w-0`으로 가변 폭
- Sort/Language Select: `w-auto min-w-[100px]`으로 축소
- 전체 컨트롤 행: `flex-wrap`으로 자연스러운 줄바꿈 허용
- 프로젝트 수 카운트: 모바일에서도 표시 (컨트롤 행 아래)

### 12.3 카테고리 탭 — 모바일 최적화
- **데스크톱**: 가로 탭 나열 (현재 방식)
- **모바일**: 수평 스크롤 가능한 칩(Chip) 행으로 전환
  - `overflow-x-auto` + `flex-nowrap` 적용
  - 현재 선택된 카테고리가 항상 보이도록 scroll-into-view
  - 좌우 스크롤 힌트를 위해 양 끝에 fade gradient 오버레이 적용

### 12.4 카테고리 설명 툴팁
각 카테고리 탭에 간단한 설명을 제공하여, 처음 방문한 사용자가 각 카테고리가 무엇을 담당하는지 즉시 파악 가능.

**카테고리별 설명**:
| 카테고리 | 설명 |
|---|---|
| AI Agents & Frameworks | Autonomous agents and frameworks for building AI-powered workflows |
| AI Coding Tools | AI-powered coding assistants, CLI tools, and IDE extensions |
| LLM Inference & Serving | Runtime engines for deploying and serving language models |
| RAG & Vector DB | Retrieval-Augmented Generation frameworks and vector databases |
| Fine-tuning & Training | Tools and frameworks for fine-tuning and training models |
| Evaluation & Benchmarks | Frameworks for evaluating and benchmarking LLM performance |
| Multimodal | Models and tools handling vision, audio, and video modalities |
| MCP Servers & Tools | Model Context Protocol servers and integrations |

**데스크톱 (≥768px)**:
- 카테고리 탭에 마우스 호버 시 툴팁(`Tooltip`)으로 설명 표시
- shadcn/ui `Tooltip` 컴포넌트 사용 (`delayDuration: 300`)
- 툴팁은 탭 아래쪽(`side="bottom"`)에 표시
- 선택 여부와 관계없이 모든 카테고리 탭에 호버 툴팁 적용
- "All" 탭에는 툴팁 미표시

**모바일 (<768px)**:
- 터치 환경에서는 호버가 없으므로, 선택된 카테고리 탭 아래에 인라인 설명 텍스트를 항상 표시 (subtitle 형태)
- 카테고리 전환 시 설명도 함께 변경
- "All" 선택 시 설명 미표시
- 스타일: 작은 텍스트(`text-xs`), `text-muted-foreground` 색상
- overflow-x-auto 컨테이너 내에 있으므로 툴팁 대신 인라인 텍스트 방식 유지

---

## 13. 리스크 & 대응

| 리스크 | 대응 |
|---|---|
| GitHub API Rate Limit | ETag 캐싱 + Conditional Requests, OAuth 인증으로 한도 확장 |
| Star 조작 (bot farming) | 성장 패턴 이상 감지 로직, 점수 반영 시 페널티 |
| 카테고리 경계 모호 | 초기에는 수동 분류 → 추후 커뮤니티 투표로 보정 |
| 유지비 | Vercel/Supabase 무료 티어 내 MVP 운영, 트래픽 증가 시 후원 모델 |
| 싱글 페이지 성능 | TanStack Query 캐싱, ISR(Incremental Static Regeneration), 가상 스크롤링으로 대응 |

---

## 14. E2E 테스트 체크리스트

> 현재 구현된 기능을 기준으로, 사용자 시나리오 관점에서 작성.
> 모바일(375px) / 태블릿(768px) / 데스크톱(1280px) 세 뷰포트에서 각각 검증 필요한 항목은 `[M/T/D]` 태그로 표기.

### 14.1 페이지 로드 & 렌더링

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-001 | `/` 접속 시 랭킹 보드가 정상 렌더링 | 헤더(AI Stage Live + 토글), 서브타이틀, 카테고리 탭, 컨트롤(검색/정렬/언어), 프로젝트 리스트 모두 표시 |
| E2E-002 | 페이지 타이틀이 "AI Stage Live" | `<title>` 메타 확인 |
| E2E-003 | 기본 정렬이 Composite Score 내림차순 | 첫 번째 프로젝트가 최고 score를 가진 프로젝트 |
| E2E-004 | `/project/{id}` 접속 시 상세 페이지 렌더링 | 프로젝트명, owner, 요약, 기능 목록, 스코어 분해, 통계 그리드, 외부 링크 모두 표시 |
| E2E-005 | 존재하지 않는 `/project/nonexistent` 접속 | 404 페이지 표시 |
| E2E-006 | 상세 페이지에서 "← Back to ranking" 클릭 | `/` 로 이동, 이전 필터 상태는 초기화 (쿼리 파라미터 없는 상태) |

### 14.2 카테고리 필터

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-010 | "All" 탭 클릭 | 전체 프로젝트 표시, URL `?category=` 파라미터 없음 |
| E2E-011 | 개별 카테고리 탭 클릭 (agents) | agents 카테고리 프로젝트만 표시, URL이 `?category=agents`로 변경 |
| E2E-012 | 카테고리 전환 (agents → rag) | 리스트가 rag 프로젝트로 갱신, URL 갱신 |
| E2E-013 | 카테고리 선택 시 프로젝트 수 카운트 | 우측 "N projects" 숫자가 필터 결과와 일치 |
| E2E-014 | `[M]` 모바일에서 카테고리 탭 수평 스크롤 | 터치 스와이프로 좌우 스크롤 가능, 스크롤바 숨김 |
| E2E-015 | `[M]` 모바일 fade gradient 힌트 | 좌우 끝에 반투명 fade 오버레이가 보여 스크롤 가능함을 암시 |
| E2E-016 | `[M]` 카테고리 선택 시 auto scroll-into-view | 선택된 탭이 가시 영역으로 자동 스크롤 |

### 14.3 정렬

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-020 | 기본 정렬: Composite Score | 리스트가 score 내림차순으로 정렬 |
| E2E-021 | 정렬을 "Most Stars"로 변경 | stars 수 내림차순으로 재정렬, URL `?sort=stars` |
| E2E-022 | 정렬을 "Fastest Growing"로 변경 | starVelocity7d 내림차순, URL `?sort=growth` |
| E2E-023 | 정렬을 "Most Active"로 변경 | recentCommits30d 내림차순, URL `?sort=activity` |
| E2E-024 | 정렬을 "Recently Updated"로 변경 | lastCommitAt 내림차순, URL `?sort=recent` |

### 14.4 언어 필터

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-030 | 언어를 "Python"으로 변경 | Python 프로젝트만 표시, URL `?language=Python` |
| E2E-031 | 언어를 "TypeScript"로 변경 후 카테고리도 변경 | 두 필터가 AND 조건으로 동작 (TypeScript + 해당 카테고리) |
| E2E-032 | 언어를 "All Languages"로 되돌리기 | 전체 프로젝트 복원, URL에서 language 파라미터 제거 |

### 14.5 검색

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-040 | 검색어 "ollama" 입력 | 이름에 "ollama"가 포함된 프로젝트만 표시 |
| E2E-041 | 검색어 "agent" 입력 | 이름 또는 설명 또는 태그에 "agent"가 포함된 프로젝트 표시 |
| E2E-042 | 검색어 "xyznonexist" 입력 | "No projects match your filters." 빈 상태 메시지 표시 |
| E2E-043 | 검색어 입력 후 삭제 | 전체 프로젝트 복원 |
| E2E-044 | 검색 + 카테고리 조합 | 검색어와 카테고리 필터가 AND 조건으로 동작 |
| E2E-045 | 검색어 입력 시 URL 동기화 | URL에 `?q=검색어` 반영 |

### 14.6 URL 상태 동기화

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-050 | 필터 변경 후 URL 복사 → 새 탭에서 열기 | 동일한 필터 상태로 복원 |
| E2E-051 | `/?category=agents&sort=stars&language=Python` 직접 접속 | 세 필터 모두 올바르게 적용된 상태로 렌더링 |
| E2E-052 | 필터 변경 후 브라우저 뒤로가기 | 이전 필터 상태로 복원 |
| E2E-053 | 필터 변경 후 브라우저 앞으로가기 | 다시 변경된 필터 상태로 복원 |
| E2E-054 | "All" 상태에서 URL에 파라미터 없음 | `http://host/` 만으로 기본 상태 로드 |

### 14.7 테마 (Dark/Light 모드)

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-060 | 첫 방문 시 다크 모드 | `<html>` 에 `class="dark"` 부여됨, 배경이 어두운 색 |
| E2E-061 | 토글 버튼 클릭 → 라이트 모드 전환 | `<html>` 에서 `dark` 클래스 제거, 배경이 밝은 색 |
| E2E-062 | 라이트 모드에서 다시 토글 → 다크 모드 복원 | `dark` 클래스 재부여 |
| E2E-063 | 테마 변경 후 페이지 새로고침 | localStorage에 저장된 테마가 유지됨 |
| E2E-064 | 랭킹 보드 지표 색상 코딩이 두 테마에서 모두 가독성 좋음 | emerald-600(성장), score 색상이 라이트/다크 배경에서 모두 읽힘 |
| E2E-065 | 프로젝트 상세 페이지에서도 테마 정상 동작 | 상세 페이지 배경, 텍스트, 카드가 테마에 맞게 렌더링 |
| E2E-066 | 토글 버튼 아이콘 전환 | 다크: Moon 표시, 라이트: Sun 표시 |

### 14.8 반응형 레이아웃

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-070 | `[D]` ≥1024px — 풀 테이블 8컬럼 표시 | #, Project, ★Stars, ⑂Forks, ↑Growth, ⚡Activity, ♥Health, ◎Score 컬럼 모두 보임 |
| E2E-071 | `[T]` 768–1023px — 5컬럼 표시 | #, Project, ★Stars, ↑Growth, ◎Score 만 보임, Forks/Activity/Health 숨김 |
| E2E-072 | `[M]` <768px — 카드 레이아웃 | 테이블 대신 카드 형태, Score 우측 크게, 하단에 아이콘 지표 칩 |
| E2E-073 | `[M]` 모바일 카드에 아이콘 지표 칩 표시 | ★ Stars, ↑ Growth, ⚡ Activity, ♥ Health 4개 칩이 아이콘과 함께 인라인 표시 |
| E2E-074 | `[M]` 모바일 카드에서 프로젝트명 truncate | 긴 프로젝트명이 말줄임(...) 처리 |
| E2E-075 | 모든 뷰포트에서 프로젝트 행/카드 클릭 → 상세 페이지 이동 | 링크 정상 동작 |

### 14.9 프로젝트 상세 페이지

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-080 | 프로젝트 헤더 정보 | 이름, owner, description, language Badge, license Badge, category Badge, tags |
| E2E-081 | 종합 점수 표시 | 우측에 큰 숫자로 score 표시, 색상 코딩 적용 |
| E2E-082 | Summary 카드 | 프로젝트 요약 텍스트가 정상 렌더링 |
| E2E-083 | Key Features 리스트 | features 배열의 항목이 bullet list로 표시 |
| E2E-084 | Score Breakdown — 6개 차원 | Growth, Activity, Health, Ecosystem, Maturity, AI Relevance 각각 progress bar + 숫자 |
| E2E-085 | Statistics 그리드 — 8개 항목 | Stars, Forks, Contributors, Commits(30d), Star Growth(7d), Star Growth(30d), Open Issues, Issue Resolution |
| E2E-086 | GitHub 외부 링크 | `target="_blank"` 로 새 탭에서 열림 |
| E2E-087 | homepageUrl 있는 프로젝트 — Website 링크 표시 | Claude Code 등 homepage가 있는 프로젝트에만 Website 링크 노출 |
| E2E-088 | homepageUrl 없는 프로젝트 — Website 링크 미표시 | Ollama 등 homepage 없는 프로젝트는 GitHub 링크만 |
| E2E-089 | 랭킹 보드의 score와 상세 페이지의 score 일치 | 동일 프로젝트의 점수가 양쪽에서 동일 |

### 14.10 지표 아이콘

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-090 | `[D/T]` 테이블 헤더에 아이콘 표시 | Star, GitFork, TrendingUp, Zap, Heart, Gauge 아이콘이 컬럼 헤더 텍스트 앞에 위치 |
| E2E-091 | `[D]` 데스크톱 행에 아이콘 표시 | 각 지표 셀에 해당 아이콘이 숫자 앞에 위치 |
| E2E-092 | `[M]` 모바일 카드 지표 칩에 아이콘 표시 | Star, TrendingUp, Zap, Heart 아이콘이 10px 크기로 각 칩에 표시 |

### 14.12 컬럼 헤더 정렬 (Column Header Sorting)

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-110 | `[D]` Score 컬럼 헤더 클릭 → Score 내림차순 | 기본 상태에서 Score 헤더 클릭 시 Score 높은 순 정렬, URL `?sort=score&dir=desc` |
| E2E-111 | `[D]` Score 컬럼 헤더 다시 클릭 → Score 오름차순 | 동일 헤더 재클릭 시 오름차순 전환, URL `?sort=score&dir=asc` |
| E2E-112 | `[D]` Stars 컬럼 헤더 클릭 → Stars 내림차순 | Stars 헤더 클릭 시 Stars 많은 순 정렬, URL `?sort=stars&dir=desc` |
| E2E-113 | `[D]` Forks 컬럼 헤더 클릭 → Forks 내림차순 | Forks 헤더 클릭 시 Forks 많은 순 정렬, URL `?sort=forks&dir=desc` |
| E2E-114 | `[D]` Growth 컬럼 헤더 클릭 → Growth 내림차순 | Growth 헤더 클릭 시 성장률 높은 순 정렬 |
| E2E-115 | `[D]` Activity 컬럼 헤더 클릭 → Activity 내림차순 | Activity 헤더 클릭 시 활성도 높은 순 정렬 |
| E2E-116 | `[D]` Health 컬럼 헤더 클릭 → Health 내림차순 | Health 헤더 클릭 시 건강도 높은 순 정렬 |
| E2E-117 | `[D]` 활성 컬럼에 ▼/▲ 방향 표시 | 현재 정렬 컬럼 헤더에 ArrowDown(desc) 또는 ArrowUp(asc) 아이콘 표시 |
| E2E-118 | `[D]` 비활성 컬럼에 ↕ 힌트 표시 | 정렬 중이 아닌 컬럼 헤더에 ChevronsUpDown 아이콘이 희미하게 표시 |
| E2E-119 | `[T]` 태블릿 컬럼 헤더 클릭 정렬 | Stars, Growth, Score 3개 컬럼 헤더 모두 클릭 정렬 동작 |
| E2E-120 | `[M]` 모바일에서 정렬 Select 존재 | 모바일 뷰포트에서 정렬 드롭다운이 표시되고 정상 동작 |
| E2E-121 | `[M]` 모바일 정렬 Select에 방향 표시 | 현재 정렬 항목에 ▼(desc) 또는 ▲(asc) 기호가 표시 |
| E2E-122 | `[D]` 정렬 변경 후 URL 공유 → 동일 상태 복원 | `?sort=stars&dir=asc` URL을 새 탭에서 열었을 때 오름차순 Stars 정렬 상태로 로드 |
| E2E-123 | `[D]` 정렬 변경 후 브라우저 뒤로가기 | 이전 정렬 상태(score desc)로 복원 |
| E2E-124 | `[D]` 정렬 + 카테고리 조합 | agents 카테고리에서 Stars 헤더 클릭 → agents 프로젝트가 Stars 순으로 정렬 |
| E2E-125 | `[D]` 정렬 + 검색 조합 | "llm" 검색 후 Stars 헤더 클릭 → 검색 결과 내 Stars 순 정렬 |
| E2E-126 | `[D]` 정렬 드롭다운 미표시 (데스크톱) | 데스크톱/태블릿 뷰포트에서 정렬 Select가 보이지 않음 (컬럼 헤더로만 정렬) |

### 14.11 접근성 & 엣지 케이스

| # | 테스트 케이스 | 검증 포인트 |
|---|---|---|
| E2E-100 | 키보드 Tab으로 카테고리 탭 탐색 | Tab 키로 각 탭에 포커스 이동, Enter로 선택 가능 |
| E2E-101 | 키보드 Tab으로 프로젝트 행 탐색 | Tab 키로 각 프로젝트 링크에 포커스, Enter로 상세 페이지 이동 |
| E2E-102 | 테마 토글 버튼 `aria-label` | 스크린 리더가 "Toggle theme" 읽음 |
| E2E-103 | 헤더 sticky 동작 | 스크롤해도 헤더가 상단에 고정 |
| E2E-104 | 카테고리 필터 결과 0개 | "No projects match your filters." 메시지 표시 |
| E2E-105 | `[M]` 모바일에서 컨트롤 행 줄바꿈 | 검색, 정렬, 언어 필터가 줄바꿈되어도 레이아웃 깨지지 않음 |

---

## 15. 성능 최적화 항목

> 현재 3,197개 프로젝트 / 6.1MB JSON을 기준으로 분석.
> MECE 5계층으로 분류: **데이터 아키텍처 · 렌더링 성능 · 번들 최적화 · 빌드 & 배포 · UX 체감 성능**

### 15.1 데이터 아키텍처 (Data Layer)

| # | 항목 | 현재 상태 | 개선 방안 | 우선순위 |
|---|---|---|---|---|
| PERF-001 | **6.1MB JSON 전체 번들 포함** | `projects.json`을 static import → 전체가 클라이언트 JS 번들에 들어감 | API Route 또는 RSC에서 데이터 로드, 클라이언트에는 최소 필드만 전달 | P0 |
| PERF-002 | **데이터 분할 없음** | 3,197개 프로젝트가 단일 JSON 파일 | 카테고리별·페이지별 chunk 분할, 또는 DB(Supabase)로 마이그레이션 | P0 |
| PERF-003 | **필터·정렬 전량 클라이언트 처리** | 3,197개 배열을 브라우저에서 filter + sort | 서버 사이드 필터링(Search Params → Server Component) 또는 API Route로 이관 | P0 |
| PERF-004 | **검색이 선형 탐색 O(n)** | `Array.filter`로 name/description/tags 순회 | 클라이언트: Fuse.js 퍼지 검색 + 인덱스 사전 빌드. 서버:全文 검색(DB) | P1 |
| PERF-005 | **ProjectRow에 불필요 필드 포함** | description(평균 418자), summary, features 등 전체 필드 전달 | 리스트 뷰용 경량 타입(ProjectListItem) 분리 — description은 60자만, summary/features/excluded | P1 |
| PERF-006 | **scoreBreakdown 중복 계산** | 클라이언트에서 healthPercent 재계산 | healthPercent를 빌드타임에 projects.json에 포함 | P2 |

### 15.2 렌더링 성능 (Rendering Layer)

| # | 항목 | 현재 상태 | 개선 방안 | 우선순위 |
|---|---|---|---|---|
| PERF-010 | **3,197개 DOM 노드 전부 렌더링** | `.map()`으로 전체 프로젝트를 DOM에 직렬 렌더링 | 가상 스크롤링(`@tanstack/react-virtual` 또는 `react-window`) 도입 — 뷰포트 내 ~20개만 렌더 | P0 |
| PERF-011 | **ProjectRow 리렌더링 비효율** | `React.memo` 미사용 → 필터·정렬 변경 시 3,197개 전체 리렌더 | `React.memo` + key 최적화로 변경된 항목만 리렌더 | P0 |
| PERF-012 | **반응형 레이아웃 3벌 동시 렌더** | Desktop/Tablet/Mobile 3개 `<Link>`를 CSS `display:none`으로 전환 | CSS가 아닌 `useMediaQuery` 훅으로 1개만 렌더, 또는 `ResizeObserver` + 조건부 렌더링 | P1 |
| PERF-013 | **useMemo 재계산 빈도** | category·sort·dir·language·search 변경마다 3,197개 sort 재실행 | sort 로직을 Web Worker로 오프로드, 또는 사전 정렬 인덱스(각 컬럼별 sorted 배열)를 빌드타임에 생성 | P2 |
| PERF-014 | **SortableHeader 컴포넌트 리렌더** | 6~8개 헤더가 상위 상태 변경마다 전부 리렌더 | `React.memo`로 감싸기 — currentSort·currentDir만 비교 | P2 |

### 15.3 번들 최적화 (Bundle & Network Layer)

| # | 항목 | 현재 상태 | 개선 방안 | 우선순위 |
|---|---|---|---|---|
| PERF-020 | **lucide-react 전체 패키지 참조** | named import 사용 중이나 tree-shaking 확인 필요 | `@lucide/lab` 분리, 사용 아이콘 10개만 개별 import 또는 SVG 스프라이트로 교체 | P1 |
| PERF-021 | **shadcn/ui 컴포넌트 8개 로드** | Select, Input, Card, Badge, Separator, Tooltip, Button, Tabs | 번들 분석(`@next/bundle-analyzer`)으로 실제 크기 파악 후 불필요한 의존(불필요한 Radix 서브모듈) 제거 | P1 |
| PERF-022 | **CSS 크기 검증 누락** | Tailwind v4 + shadcn CSS 변수 전체 로드 | `@tailwindcss/postcss` Purge 검증, 미사용 유틸리티 클래스 제거 확인 | P2 |
| PERF-023 | **동적 import 미사용** | RankingBoard가 정적 import | 상세 페이지(Recharts 등 Phase 2 추가 컴포넌트)는 `next/dynamic`으로 지연 로드 | P2 |
| PERF-024 | **폰트 최적화** | Geist Sans + Geist Mono (latin subset) | 현재 양호. 추가 폰트 도입 시 `next/font/google` 유지, variable font 활용 | P3 |

### 15.4 빌드 & 배포 (Build & Deploy Layer)

| # | 항목 | 현재 상태 | 개선 방안 | 우선순위 |
|---|---|---|---|---|
| PERF-030 | **generateStaticParams 50개 제한** | `projects.slice(0, 50)`로 50개만 SSG | 상위 200~500개로 확대, 나머지는 ISR(`revalidate`) 또는 dynamic rendering | P0 |
| PERF-031 | **ISR / revalidation 미설정** | 정적 빌드만, 데이터 갱신 시 전체 리빌드 필요 | `export const revalidate = 21600` (6시간) 설정으로 ISR 도입 | P0 |
| PERF-032 | **Cloudflare Workers 번들 한계** | `@opennextjs/cloudflare` 사용, 번들 크기 제한 존재 | 6.1MB JSON이 번들에 포함되면 Workers 한계(25MB) 초과 위험. API Route 분리 필수 | P0 |
| PERF-033 | **API Route 부재** | 데이터 소스가 정적 JSON 파일뿐 | `/api/projects` Route Handler 도입 → DB 또는 KV 스토리지에서 페이지네이션 쿼리 | P1 |
| PERF-034 | **빌드 타임 번들 분석 미설정** | `@next/bundle-analyzer` 미설치 | 설정 후 CI에서 번들 크기 리포트 생성, regression 감시 | P2 |
| PERF-035 | **이미지 최적화 파이프라인 없음** | 프로젝트 아바타·OG 이미지 미사용(현재) | Phase 2에서 프로젝트 아이콘 도입 시 `next/image` + CDN 캐싱 | P3 |

### 15.5 UX 체감 성능 (Perceived Performance)

| # | 항목 | 현재 상태 | 개선 방안 | 우선순위 |
|---|---|---|---|---|
| PERF-040 | **초기 로딩 스켈레톤 없음** | Suspense fallback이 `"Loading..."` 텍스트만 | 카테고리 탭 + 프로젝트 행 Skeleton UI (shimmer) 제공 | P0 |
| PERF-041 | **필터 전환 시 즉각 피드백 없음** | 필터 결과가 늦게 나타나면 "멈춤"으로 인식 | Optimistic UI — 필터 클릭 즉시 스켈레톤 표시, 결과 도착 후 교체 | P1 |
| PERF-042 | **페이지 전환 로딩 없음** | 상세 페이지 이동 시 빈 화면 | `loading.tsx` 추가하여 스켈레톤 표시, 또는 `next/navigation` `useTransition` 활용 | P1 |
| PERF-043 | **URL 동기화 과도 트리거** | 타이핑 시 매 keystroke마다 `router.push` | 검색 입력에 debounce(300ms) 적용, URL 업데이트는 debounce 후 | P1 |
| PERF-044 | **TTFB·FCP·LCP 메트릭 미측정** | Web Vitals 모니터링 없음 | `next/font`로 LCP 최적화(현재 양호). Lighthouse CI 또는 Vercel Speed Insights 도입 | P2 |
| PERF-045 | **모바일 스크롤 성능** | 수천 개 DOM 노드로 인한 스크롤 버벅임 예상 | PERF-010(가상 스크롤) 해결이 근본치. 추가: `will-change: transform` + passive touch listener | P1 |

### 우선순위 매트릭스

```
         영향 ↑
         │
    P0   │  PERF-001,002,003    PERF-010,011
         │  (데이터 분리)        (가상스크롤)
         │  PERF-030,031,032    PERF-040
         │  (ISR, API Route)    (스켈레톤)
         │
  ───────┼─────────────────────────────────→ 노력 ↑
         │
    P1   │  PERF-004,005        PERF-012,043
         │  (경량타입, 검색)     (반응형, debounce)
         │  PERF-020,021,033    PERF-041,042,045
         │  (번들분석, API)      (optimistic, 로딩)
         │
    P2   │  PERF-006,013,014    PERF-022,023,024
         │                      PERF-034,044
    P3   │                      PERF-035
```

### 권장 구현 순서

**1차 (P0 — 즉시)**: PERF-010(가상 스크롤) → PERF-001,002,003(데이터 분리 + API Route) → PERF-040(스켈레톤) → PERF-030,031(ISR)

**2차 (P1 — 2주 내)**: PERF-011(React.memo) → PERF-005(경량 타입) → PERF-043(debounce) → PERF-012(반응형 최적화) → PERF-033(API Route)

**3차 (P2 — Phase 2)**: PERF-004(퍼지 검색) → PERF-013(Web Worker) → PERF-034(번들 분석) → PERF-044(Web Vitals)
