# 🎱 loffle-front

> In-progress 🔥

로플 프로젝트의 배포 사이트

🔗 https://loffle.netlify.app/

<br>

## 🎨 Demo

|                                               <b>시작 페이지</b>                                                |                                                  <b>로그인</b>                                                  |                                               <b>응모권 구매</b>                                                |
| :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| <img src=https://user-images.githubusercontent.com/24728385/139404425-e358076c-2d36-46fc-8e05-08a4756e1a20.gif> | <img src=https://user-images.githubusercontent.com/24728385/139404687-d36457bf-430e-4527-9e49-9dcec26edc5a.gif> | <img src=https://user-images.githubusercontent.com/24728385/139404770-9df88142-af70-4eda-a59a-2efba576d38a.gif> |
|                                                 <b>응모하기</b>                                                 |                                               <b>게시물 검색</b>                                                |                                               <b>게시물 작성</b>                                                |
| <img src=https://user-images.githubusercontent.com/24728385/139404863-693a0e29-b2b2-4e9e-919a-629513d06af3.gif> | <img src=https://user-images.githubusercontent.com/24728385/139404919-c7834cf1-bde4-47a8-ab99-75fbff04f2ae.gif> | <img src=https://user-images.githubusercontent.com/24728385/139404975-a6371e32-38b8-4e91-9999-05373894230b.gif> |
|                                             <b>당첨 후기 게시판</b>                                             |                                                 <b>공지사항</b>                                                 |                                                   <b>QnA</b>                                                    |
| <img src=https://user-images.githubusercontent.com/24728385/139405074-181ad906-1f1f-4232-b6cc-a715ad8051b7.gif> | <img src=https://user-images.githubusercontent.com/24728385/139405149-ce19773d-e06e-42b6-b8dd-40fb2c1af41a.gif> | <img src=https://user-images.githubusercontent.com/24728385/139405207-c4870e38-681c-406f-9207-4fd066e96c94.gif> |

<br>

## 🛠️ Stacks

<p style="display:flex;justify-content:start;align-items:center;gap:1em;width:100%;">
  <img src="https://user-images.githubusercontent.com/24728385/139563435-9775ba00-aad4-412b-855e-de827b01831d.png" alt="react" width=10%>
  <img src="https://user-images.githubusercontent.com/24728385/139563492-9ed6afd7-7eac-4518-9f5b-87b8d2b274cc.png" alt="tailwind_css" width=10%>
  <img src="https://user-images.githubusercontent.com/24728385/139563538-bc0b4710-d81a-4d15-9afd-97cce54dfade.png" alt="javascript" width=10%>
  <img src="https://user-images.githubusercontent.com/24728385/139563714-403f467b-3ac3-4996-898f-95e375702f85.png" alt="eslint" width=10%>
  <img src="https://user-images.githubusercontent.com/24728385/139563756-21492ec0-a3f4-4334-b4d1-4a563249a6fc.png" alt="prettier" width=10%>
  <img src="https://cdn.worldvectorlogo.com/logos/webpack-icon.svg" alt="webpack" width=10%>
  <img src="https://static.cdnlogo.com/logos/f/54/figma.svg" alt="figma" width=10%>
</p>

- React - 컴포넌트개발 라이브러리
- Tailwind CSS - 마크업
- JavaScript (ES6 +)
- eslint, prettier - 소스 품질관리
- Webpack - 빌드 자동화 및 최적화
- Figma - UI 설계/디자인

<br>

## 💬 Descriptions

- 모바일 환경을 우선으로 제작하였습니다 (Mobile First)
- 커뮤니티, 티켓 구매 및 래플 응모 기능 구현
- Netlify를 이용하여 배포

<br>

## 💡 All Features

> Last Updated on: October 29, 2021

- INDEX

  - 제품 이미지 슬라이드 (auto play carousel banner)
  - 실시간 응모 바로가기 버튼
  - 자유 게시판, 당첨 후기 게시판, 공지사항
  - 좌우 슬라이드가 가능한 당첨 후기 게시판 썸네일 카드

- 자유게시판

  - 게시물
    - 작성, 읽기(Paginiation), 수정, 삭제 + 좋아요
  - 댓글
    - 작성, 읽기(Infinity Scroll), 삭제
  - 검색 (제목, 내용, 댓글)
  - 정렬 (최신순, 과거순)
  - 공유 (URL, Email, SNS)
  - 익명 사용자는 읽기만 가능

- 당첨 후기 게시판

  - 게시물
    - 작성, 읽기(Infinity Scroll), 수정, 삭제 + 좋아요
  - 댓글
    - 작성, 읽기(Infinity Scroll), 수정, 삭제
  - 검색 (내용, 댓글)
  - 정렬 (최신순, 과거순)
  - 공유 (URL, Email, SNS)
  - 익명 사용자는 읽기만 가능

- 공지사항
  - 게시물
    - 읽기 (Infiniry Scroll, Accordion)
- QnA
  - 질문
    - 작성, 읽기(Infinity Scroll), 수정, 삭제
  - 답변
    - 작성, 읽기(Infinity Scroll), 수정, 삭제
  - 익명 사용자는 읽기만 가능
- 로그인 / 회원가입
  - react-hook-form을 활용한 validation 체크
  - 회원가입 유무에 따라 진행되는 로그인/회원가입 프로세스
  - 이메일, 닉네임, 전화번호 입력시 자동 중복 확인
    - check-{information} API 활용
  - localStorage를 사용하여 유저별 token 발급 및 로그인 상태 유지
- 마이페이지
  - 응모권 상세 내역 조회(구매 내역, 사용 내역, 반환 내역)
  - 회원 정보 조회
  - 로그아웃
- 응모권
  - 응모권 수량 확인 / 구매
  - 익명 사용자는 로그인 후 사용가능
- 응모하기

  - 실시간 응모중인 raffle 리스트 확인 (load-more button)
  - 제품 사진 리스트 Carousel Slider 적용
  - 응모 종료까지 실시간 카운트 다운
  - 실시간 응모 현황 보기 (Pagination)
    - 본인이 몇번째로 응모했는지 확인하는 버튼
  - 응모 상태(대기, 진행, 취소, 실패) 마다 달라지는 theme

<br>

- 📓 Wiki (예정)
