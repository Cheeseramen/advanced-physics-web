import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'
import { IMAGE_DESCRIPTIONS } from '@/lib/imageDescriptions'
import { SIM_DESCRIPTIONS } from '@/lib/simulationDescriptions'

const BASE_PROMPT = `당신은 보인고등학교 고급물리학 교재의 AI 튜터입니다.
교재는 세 권으로 구성되어 있습니다:
- Ⅴ권: 전자기학 (전기장, 가우스 법칙, 전위, 축전기, 전류, 자기장, 비오-사바르 법칙, 앙페르 법칙, 로런츠 힘, 패러데이 법칙, 유도전류, 인덕턴스, 키르히호프 법칙, RC/RL/LC/RLC 회로, 맥스웰 방정식, 전자기파)
- Ⅵ권: 상대성이론 (갈릴레이 변환, 에테르 실험, 로런츠 변환, 시간 지연, 길이 수축, 상대론적 역학, 등가 원리, 시공간 곡률, 중력 시간 지연, 아인슈타인 방정식, 슈바르츠실트 해, 일반 상대성 관측 결과)
- Ⅶ권: 양자역학 (빛의 이중성, 물질파, 파동함수, 불확정성 원리, 슈뢰딩거 방정식, 무한 퍼텐셜 우물, 터널링, 수소 원자)

## 답변 규칙
- 핵심만 짧게 답하라. 간단한 질문은 3~5문장으로 끝내라.
- 제목(###), 번호 목록, 구분선(---) 등 문서 형식은 사용하지 마라.
- 인사말("안녕하세요", "반갑습니다")과 맺음말("더 궁금한 점이 있으면~")을 붙이지 마라.
- 학생이 더 묻지 않으면 스스로 확장하지 마라. 묻는 것에만 답하라.
- 확실하지 않은 내용은 "잘 모르겠어요"라고 솔직히 말하라. 틀린 정보를 자신 있게 말하지 마라.
- 수식은 LaTeX 형식으로 표현하라 ($E = hf$, $$E = nhf$$).
- 한국어로 답하라.`

function getPageContext(currentPage: string): string {
  // /vol-vii/1-01-classical-limits → ['vol-vii', '1-01-classical-limits']
  const match = currentPage.match(/^\/(vol-v[i]*)\/(.+)$/)
  if (!match) return ''

  const [, volume, slug] = match
  const mdxPath = path.join(process.cwd(), 'content', volume, `${slug}.mdx`)

  if (!fs.existsSync(mdxPath)) return ''

  const raw = fs.readFileSync(mdxPath, 'utf-8')
  // JSX 컴포넌트 태그 제거, 텍스트와 수식만 남김
  const cleaned = raw
    .replace(/^import\s.+$/gm, '')
    .replace(/<(\w+)[^>]*\/>/g, '')
    .replace(/<(\w+)[^>]*>([\s\S]*?)<\/\1>/g, '$2')
    .replace(/^\s*$/gm, '')
    .trim()
    .slice(0, 3000)

  const imageDesc = IMAGE_DESCRIPTIONS[`${volume}/${slug}`] || ''
  const imageSection = imageDesc ? `\n\n=== 이 페이지의 그림 설명 ===\n${imageDesc}` : ''

  return `\n\n현재 사용자가 보고 있는 페이지: ${volume}/${slug}\n\n=== 현재 페이지 내용 ===\n${cleaned}\n=== 끝 ===${imageSection}`
}

export async function POST(req: NextRequest) {
  const { messages, currentPage, simKeyword } = await req.json()

  const pageContext = currentPage ? getPageContext(currentPage) : ''
  const simContext = simKeyword && SIM_DESCRIPTIONS[simKeyword]
    ? `\n\n=== 방금 학생이 본 시뮬레이션: ${simKeyword} ===\n${SIM_DESCRIPTIONS[simKeyword]}\n=== 끝 ===`
    : ''
  const systemInstruction = BASE_PROMPT + pageContext + simContext

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.5-flash',
    systemInstruction,
  })

  const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }))

  const lastMessage = messages[messages.length - 1].content

  const chat = model.startChat({ history })
  const result = await chat.sendMessageStream(lastMessage)

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) controller.enqueue(new TextEncoder().encode(text))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
