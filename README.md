# 고급물리학 웹 교재

[![Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel&logoColor=white)](https://advanced-physics-web.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![p5.js](https://img.shields.io/badge/p5.js-1.9.0-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)

보인고등학교 고급물리학 인터랙티브 웹 교재 + AI 튜터.

**→ [advanced-physics-web.vercel.app](https://advanced-physics-web.vercel.app/)**

---

[![사이트 미리보기](https://api.microlink.io/?url=https://advanced-physics-web.vercel.app/vol-vii&screenshot=true&meta=false&embed=screenshot.url)](https://advanced-physics-web.vercel.app/)

---

## 구성

| 권 | 주제 | 단원 수 |
|----|------|---------|
| Ⅴ권 | 전자기학 | 19단원 |
| Ⅵ권 | 상대성이론 | 13단원 |
| Ⅶ권 | 양자역학 | 14단원 |

각 단원은 이론 설명, KaTeX 수식, 인터랙티브 시뮬레이션, 매칭 퀴즈, 핵심 정리로 구성된다.

---

## 주요 기능

- **KaTeX 수식 렌더링** — MDX 기반 교재, 수식 전체 서버사이드 렌더링
- **p5.js 인터랙티브 시뮬레이션** — 흑체복사·이중슬릿·광전효과·무한 퍼텐셜 우물
- **AI 튜터 챗봇** — Google Gemini 기반, 현재 페이지 맥락 자동 주입
- **매칭 퀴즈** — 스톱워치 타이머, 포커 카드 플립 애니메이션
- **양자 슈터 게임** — 에너지 전이·흡수·방출을 슈팅 게임으로 체험
- **이스터에그 3종** — 슈뢰딩거 고양이 / 하이젠베르크 게임 / 양자 도약 게임
- **모바일 완전 대응** — 터치 조작, 반응형 레이아웃

---

## 기술 스택

| 역할 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router, Turbopack) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 |
| 콘텐츠 | MDX + remark-math + rehype-katex |
| 시뮬레이션 | p5.js 1.9.0 |
| AI 챗봇 | Google Gemini API (`gemini-3.5-flash`) |
| 배포 | Vercel |

---

## 로컬 실행

```bash
cd web
npm install
npm run dev   # http://localhost:3000
```

`.env.local` 파일에 Gemini API 키가 필요하다:

```
GEMINI_API_KEY=your_api_key_here
```

---

## 이스터에그

양자역학 파트에 숨겨진 인터랙티브 이스터에그 3종이 있다.

| 트리거 | 내용 |
|--------|------|
| 측정 단원 하단 `=^. .^=` 클릭 | 슈뢰딩거의 고양이 — 상자를 열어 생사 확인 |
| 사이트 어디서나 `hbar` 타이핑 | 하이젠베르크 게임 — 파동 그물로 전자 포획 |
| 보어 모형 단원의 에너지 준위 식 클릭 | 양자 도약 게임 — 광자를 흡수해 들뜨기 |
