# Admin Order List UI

* 너는 수익형 웹서비스 개발을 위한 최고의 Next.js 프론트엔드 개발자야.
  앞으로 @[.agents/PRD.md]문서를 기반으로 이 프로젝트의 관리자 페이지 프론트엔드 개발을 시작할거야. 
  
  백엔드 구현 여부는 신경쓰지 말고 더미데이터를 활용해서 @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L160] 관리자(어드민) 프론트엔드 작업만 진행해.
  다만 @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L252] 에 있는 어드민 백엔드 API 문서를 고려해서 나중에 백엔드 구축 후 바로 연동할 수 있도록 작업해.
  
  추후 해야 할 작업 또는 고쳐야 할 부분은 TODO 또는 FIX 플래그와 함께 주석을 달아둬.
  
  우선 어드민 공통(글로벌) 레이아웃부터 만들어.

* @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L169] 관리자 메인 페이지 부분 프론트엔드 사항을 구현해. 백엔드 API를 바로 구현하지 말고 더미데이터를 사용해서 구현해.

* 방금 구현한 내용을 @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L171] 요약해서 문서를 업데이트 해

* @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L176] 주문 내역 리스트 프론트엔드를 구현해.

* 방금 구현한 어드민 주문 내역 리스트에서 아래와 같은 에러가 발생중.
  
  ## Error Type
  Runtime ReferenceError
  
  ## Error Message
  cn is not defined

      at _temp (src/app/admin/order-list/page.tsx:157:43)
      at Array.map (<anonymous>:null:null)
      at AdminOrderListPage (src/app/admin/order-list/page.tsx:146:33)
  
  ## Code Frame
  > 157 |                           <div className={cn(
        |                                           ^
  
  Next.js version: 16.1.6 (Turbopack)

* @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L181] 상세 주문 내역 프론트엔드를 구현해

* @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L176] @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L181] 방금 구현한 두 가지 기능에 대해 PRD 문서에 각각 내용을 업데이트 해

* @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L192] 유저 리스트 페이지 프론트엔드를 구현해. 기능 구현 후 PRD 문서에 해당 내용을 업데이트 해

* @[/Users/user/Development/ai-dream-teller/.agents/PRD.md:L160] 구현한 관리자 프론트엔드 페이지 E2E 테스트 목록을 8.3 항목에 표 형태로 정리해. 바로 테스트를 시작하지 말고 표만 정리해.

* 현재 이 대화 세션에서 이루어진 모든 대화 파일을 있는 그대로 다운로드 받고 싶어. 파일명으로는 이 대화의 제목 달아줘. 해당 파일에서 AI의 응답은 삭제하고 유저가 입력한 프롬프트만 남겨줘. 해당 파일 내용에서 날짜와 시간으로 구분하는 내역은 모두 삭제하고 본 문서에 대해 정리 요약한 내용도 필요 없이 오직 유저의 프롬프트만 리스트로 정리해. 마크다운 저장 경로는 현재 프로젝트 내부의 `conversation_history` 안에 생성해.