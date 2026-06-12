'use client'
import { useState, useEffect } from 'react'

export default function QuantumJumpEasterEgg() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('open-quantum-jump', onOpen)
    return () => window.removeEventListener('open-quantum-jump', onOpen)
  }, [])

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data === 'close-quantum-jump') setOpen(false)
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
        <button
          onClick={() => setOpen(false)}
          className="absolute -top-9 right-0 text-sm text-gray-400 hover:text-white transition-colors px-2 py-1"
        >
          ESC / 닫기 ✕
        </button>
        <iframe
          src="/simulations/quantum-jump.html"
          width={600}
          height={440}
          style={{ border: 'none', display: 'block', borderRadius: '8px' }}
        />
      </div>
    </div>
  )
}
