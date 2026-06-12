'use client'

import { useState, useEffect, useRef } from 'react'
import katex from 'katex'
import { QUIZ_DATA, type QuizPair as Pair } from '@/lib/quizData'

interface Card {
  id: string
  type: 'title' | 'formula'
  pairId: number
  content: string
  isFormula: boolean
}

function formatTime(ms: number) {
  const total = Math.floor(ms / 100)
  const tenths = total % 10
  const secs = Math.floor(total / 10) % 60
  const mins = Math.floor(total / 600)
  return `${mins}:${String(secs).padStart(2, '0')}.${tenths}`
}

export default function QuizMatch({ quizId }: { quizId: string }) {
  const pairs: Pair[] = QUIZ_DATA[quizId] ?? []
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<string[]>([])
  const [checking, setChecking] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef<number>(0)

  useEffect(() => { init() }, [])

  useEffect(() => {
    if (timerRunning) {
      startRef.current = Date.now() - elapsed
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current)
      }, 100)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [timerRunning])

  function init() {
    const all: Card[] = []
    pairs.forEach((p, i) => {
      all.push({ id: `t-${i}`, type: 'title',   pairId: i, content: p.title,                    isFormula: false })
      all.push({ id: `f-${i}`, type: 'formula', pairId: i, content: p.formula ?? p.note ?? '', isFormula: !!p.formula })
    })
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]]
    }
    setCards(all)
    setFlipped([])
    setMatched(new Set())
    setWrong([])
    setChecking(false)
    setElapsed(0)
    setTimerRunning(false)
  }

  function handleClick(card: Card) {
    if (checking || flipped.includes(card.id) || matched.has(card.id)) return
    if (!timerRunning) setTimerRunning(true)

    const next = [...flipped, card.id]
    setFlipped(next)

    if (next.length < 2) return

    setChecking(true)
    const [id1, id2] = next
    const c1 = cards.find(c => c.id === id1)!
    const c2 = cards.find(c => c.id === id2)!

    if (c1.pairId === c2.pairId && c1.type !== c2.type) {
      setTimeout(() => {
        setMatched(prev => {
          const next = new Set([...prev, id1, id2])
          if (next.size === cards.length) setTimerRunning(false)
          return next
        })
        setFlipped([])
        setChecking(false)
      }, 500)
    } else {
      setWrong(next)
      setTimeout(() => {
        setFlipped([])
        setWrong([])
        setChecking(false)
      }, 900)
    }
  }

  const done = matched.size === cards.length && cards.length > 0

  return (
    <div className="my-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-sm font-bold text-gray-700">매칭 퀴즈</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="font-mono text-sm tabular-nums text-gray-600">{formatTime(elapsed)}</span>
          </div>
          <span className="text-xs text-gray-400">{matched.size / 2} / {pairs.length}</span>
          <button
            onClick={init}
            className="rounded-lg border border-[#791215] px-3 py-1 text-xs font-semibold tracking-wide text-[#791215] hover:bg-[#79121510] transition-colors"
          >
            RESET
          </button>
        </div>
      </div>

      {done && (
        <div className="mb-4 rounded-xl bg-green-50 border border-green-200 py-2 text-center text-sm font-semibold text-green-700">
          모두 완료! <span className="font-mono">{formatTime(elapsed)}</span>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 mx-auto max-w-[544px]">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.has(card.id)
          const isMatched = matched.has(card.id)
          const isWrong = wrong.includes(card.id)

          return (
            <button
              key={card.id}
              onClick={() => handleClick(card)}
              className={`
                relative flex w-[130px] h-[110px] shrink-0 items-center justify-center rounded-xl border-2 p-2 text-center
                overflow-hidden transition-all duration-200 select-none shadow-md
                ${!isFlipped
                  ? 'border-2 border-black bg-black cursor-pointer hover:opacity-90'
                  : isMatched
                    ? 'border-green-400 bg-green-50 cursor-default'
                    : isWrong
                      ? 'border-red-400 bg-red-50 cursor-pointer'
                      : 'border-[#79121540] bg-white cursor-pointer'
                }
              `}
            >
              {!isFlipped ? (
                <>
                  <div className="absolute inset-[2px] border-2 border-white z-0 pointer-events-none" />
                  <div className="absolute inset-[4px] border-2 border-black z-0 pointer-events-none" />
                  <div className="absolute inset-[6px] overflow-hidden z-0 pointer-events-none">
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        top: '50%', left: '50%',
                        width: '300px', height: '300px',
                        transform: 'translate(-50%, -50%) rotate(45deg)',
                        background: 'conic-gradient(#791215 90deg, #fff 90deg 180deg, #791215 180deg 270deg, #fff 270deg)',
                        backgroundSize: '22px 22px',
                        backgroundPosition: 'center',
                      }}
                    />
                  </div>
                </>
              ) : card.isFormula ? (
                <span
                  className="text-[11px] leading-tight"
                  dangerouslySetInnerHTML={{
                    __html: katex.renderToString(card.content, { throwOnError: false, displayMode: false })
                  }}
                />
              ) : (
                <span className={`text-xs leading-tight ${card.type === 'title' ? 'font-semibold' : 'italic'} ${isMatched ? 'text-green-700' : 'text-gray-800'}`}>
                  {card.content}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
