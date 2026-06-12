'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import katex from 'katex'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function renderMath(text: string): string {
  // 스트리밍 중 미완성 $$ 쌍이면 display math 렌더링 건너뜀
  const ddCount = (text.match(/\$\$/g) || []).length
  let safe = text
  if (ddCount % 2 !== 0) {
    // 마지막 열린 $$부터 끝까지 제거 후 렌더링
    safe = text.replace(/\$\$(?![\s\S]*\$\$)[\s\S]*$/, '')
  }

  let result = safe.replace(/\$\$([\s\S]+?)\$\$/g, (_, formula) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false })
    } catch {
      return `$$${formula}$$`
    }
  })

  // 미완성 $ 쌍도 동일하게 처리
  const stripped = result.replace(/\$\$[\s\S]*?\$\$/g, '')
  const sCount = (stripped.match(/\$/g) || []).length
  if (sCount % 2 !== 0) {
    result = result.replace(/\$(?!\$)(?![\s\S]*\$)[\s\S]*$/, '')
  }

  result = result.replace(/\$([^\n$]+?)\$/g, (_, formula) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false })
    } catch {
      return `$${formula}$`
    }
  })
  return result
}

function AssistantMessage({ content }: { content: string }) {
  if (!content) return <span className="animate-pulse">●●●</span>

  // 굵게(**...**), 기울임(*...*), 줄바꿈 처리 후 수식 렌더링
  const html = renderMath(
    content
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>')
  )
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export default function ChatWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const volume = pathname.match(/^\/(vol-v[i]*)/)?.[1] ?? null

  useEffect(() => {
    setMessages([])
  }, [volume])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [open])

  useEffect(() => {
    function handleSimChat(e: Event) {
      const { keyword } = (e as CustomEvent).detail
      const msg = `방금 "${keyword}" 시뮬레이션을 봤어. 이 시뮬레이션에서 무엇을 볼 수 있는지 설명해줘.`
      setOpen(true)
      sendMessage(msg, messages, keyword)
    }
    window.addEventListener('open-sim-chat', handleSimChat)
    return () => window.removeEventListener('open-sim-chat', handleSimChat)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  async function sendMessage(text: string, currentMessages = messages, simKeyword?: string) {
    if (!text || loading) return

    const next: Message[] = [...currentMessages, { role: 'user', content: text }]
    setMessages(next)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, currentPage: pathname, simKeyword }),
      })

      if (!res.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }])
        setLoading(false)
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let reply = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        reply += decoder.decode(value, { stream: true })
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: reply },
        ])
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: '네트워크 오류가 발생했습니다.' }])
    }
    setLoading(false)
  }

  async function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    await sendMessage(text)
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#791215] text-white shadow-lg hover:bg-[#5a0d0f] transition-colors"
        aria-label="AI 튜터 열기"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* 채팅 패널 */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* 헤더 */}
          <div className="flex items-center gap-2 rounded-t-2xl bg-[#791215] px-4 py-3 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">AI</div>
            <div>
              <div className="text-sm font-semibold">고급물리학 튜터</div>
              <div className="text-xs text-red-200">Gemini · 전자기학/상대성이론/양자역학</div>
            </div>
          </div>

          {/* 메시지 목록 */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-sm text-gray-400 mt-8">
                교재 내용에 대해 질문해보세요!<br />
                <span className="text-xs">예: 가우스 법칙이 뭐야?</span>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-[#791215] text-white rounded-br-sm whitespace-pre-wrap'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {m.role === 'assistant'
                    ? <AssistantMessage content={m.content} />
                    : m.content
                  }
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* 입력창 */}
          <div className="border-t border-gray-100 px-3 py-2 flex gap-2">
            <input
              className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#791215] focus:ring-1 focus:ring-[#791215]"
              placeholder="질문 입력..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
              disabled={loading}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#791215] text-white disabled:opacity-40 hover:bg-[#5a0d0f] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
