# 고급물리학 웹 교재

보인고등학교 고급물리학 인터랙티브 웹 교재 + AI 튜터.

**배포 URL**: https://advanced-physics-web.vercel.app/

---

## 구성

| 권 | 주제 |
|----|------|
| Ⅴ권 | 전자기학 |
| Ⅵ권 | 상대성이론 |
| Ⅶ권 | 양자역학 |

각 단원은 이론 설명, KaTeX 수식, 인터랙티브 시뮬레이션, 매칭 퀴즈, 핵심 정리로 구성된다.

---

## 기술 스택

- **Framework**: Next.js / React / TypeScript
- **Styling**: Tailwind CSS v4
- **콘텐츠**: MDX + remark-math + rehype-katex
- **시뮬레이션**: p5.js 1.9.0
- **AI 챗봇**: Google Gemini API (`@google/generative-ai`)

---

## 로컬 실행

```bash
cd web
npm install
npm run dev   # http://localhost:3000
```

`web/.env.local` 파일에 아래 환경변수가 필요하다:

```
GEMINI_API_KEY=your_api_key_here
```

> 학교 네트워크에서는 Google API 도메인이 방화벽에 차단되어 AI 챗봇이 동작하지 않는다. 모바일 핫스팟 또는 배포 버전을 사용할 것.

---

## 배포

`main` 브랜치에 push하면 Vercel이 자동으로 재빌드 및 배포한다.

```bash
git add .
git commit -m "내용"
git push
```

Vercel 환경변수: 대시보드 → Settings → Environment Variables → `GEMINI_API_KEY`

---

## 시뮬레이션 현황

| 파일 | 챕터 | 상태 |
|------|------|------|
| `blackbody.html` | 1-01 고전물리학의 한계 | ✅ |
| `double-slit.html` | 1-02 이중슬릿 간섭 | ✅ |
| `photoelectric.html` | 1-03 광전효과 | ✅ |
| `quantum-well.html` | 2-02 슈뢰딩거 방정식 | ✅ |
| `compton.html` | 1-04 콤프턴 산란 | 🔲 |
| `uncertainty.html` | 2-03 불확정성 원리 | 🔲 |
