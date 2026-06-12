import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'

const SIMULATE_PROMPT = `당신은 고등학교 물리 시뮬레이션 코드를 생성하는 AI입니다.

규칙:
- 완전한 HTML 파일 하나만 출력하라. 설명, 마크다운 코드블록 없이 순수 HTML만.
- p5.js CDN: https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js
- 캔버스 크기는 width=480, height=320으로 createCanvas(480, 320) 사용
- body { margin: 0; overflow: hidden; background: #fff; }
- 한국어 레이블 사용
- 슬라이더나 버튼 같은 인터랙티브 요소 포함
- 물리적으로 정확하게 구현하라
- 색상은 흰 배경에 선명하게`

export async function POST(req: NextRequest) {
  const { keyword, context } = await req.json()

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.5-flash',
    systemInstruction: SIMULATE_PROMPT,
  })

  const prompt = `키워드: "${keyword}"${context ? `\n맥락: ${context}` : ''}

이 물리 개념을 직관적으로 보여주는 인터랙티브 p5.js 시뮬레이션 HTML을 만들어라.`

  try {
    const result = await model.generateContent(prompt)
    let html = result.response.text().trim()
    html = html.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim()
    return Response.json({ html })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return Response.json({ error: msg }, { status: 500 })
  }
}
