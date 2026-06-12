'use client'
import { useState, useEffect, useRef } from 'react'

const SEQ = ['h', 'b', 'a', 'r']

export default function HeisenbergEasterEgg() {
  const [open, setOpen] = useState(false)
  const idxRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // hbar 시퀀스 감지
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key.toLowerCase() === SEQ[idxRef.current]) {
        idxRef.current++
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => { idxRef.current = 0 }, 3000)
        if (idxRef.current === SEQ.length) {
          idxRef.current = 0
          setOpen(true)
        }
      } else {
        idxRef.current = 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // iframe 내부 ESC → postMessage로 닫기
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data === 'close-heisenberg') setOpen(false)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
      onClick={() => setOpen(false)}
    >
      <div className="relative" onClick={e => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button
          onClick={() => setOpen(false)}
          className="absolute -top-9 right-0 text-sm text-gray-400 hover:text-white transition-colors px-2 py-1"
        >
          ESC / 닫기 ✕
        </button>
        <iframe
          src="/simulations/heisenberg-easter-egg.html"
          width={600}
          height={440}
          style={{ border: 'none', display: 'block', borderRadius: '8px' }}
        />
      </div>
    </div>
  )
}
