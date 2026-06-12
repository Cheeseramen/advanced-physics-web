'use client'
import { useState, useEffect } from 'react'

export default function QuantumShooterEmbed() {
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    if (!fullscreen) return
    const onMsg = (e: MessageEvent) => {
      if (e.data === 'close-sim') setFullscreen(false)
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [fullscreen])

  return (
    <>
      {/* 데스크탑: 페이지 인라인 embed (md 이상) */}
      <div className="hidden md:block w-full overflow-hidden rounded-xl border border-gray-700 shadow-2xl"
           style={{ aspectRatio: '600 / 440' }}>
        <iframe
          src="/simulations/quantum-shooter.html"
          className="w-full h-full border-0 block"
          title="양자 슈터"
        />
      </div>

      {/* 모바일: 전체화면 버튼 + 오버레이 (md 미만) */}
      <div className="md:hidden">
        <button
          onClick={() => setFullscreen(true)}
          className="w-full rounded-xl bg-[#0b0c10] border border-[#1a1f3a] py-5 text-center text-white font-bold text-base hover:bg-[#12141f] transition-colors"
        >
          🎮 전체화면으로 게임 시작
        </button>
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-[200] bg-black md:hidden">
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-3 right-3 z-10 bg-black/60 text-white/80 hover:text-white text-sm rounded-lg px-3 py-1.5"
          >
            ✕ 닫기
          </button>
          <iframe
            src="/simulations/quantum-shooter.html"
            className="w-full h-full border-0 block"
            title="양자 슈터"
          />
        </div>
      )}
    </>
  )
}
