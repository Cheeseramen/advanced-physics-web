'use client'
import { useState, useEffect } from 'react'

export default function EasterEgg() {
  const [phase, setPhase] = useState<'hidden' | 'box' | 'result'>('hidden')
  const [alive, setAlive] = useState(false)

  useEffect(() => {
    const onOpen = () => setPhase('box')
    window.addEventListener('open-easter-egg', onOpen)
    return () => window.removeEventListener('open-easter-egg', onOpen)
  }, [])

  const handleOpen = () => {
    setAlive(Math.random() < 0.5)
    setPhase('result')
  }

  const handleClose = () => setPhase('hidden')

  if (phase === 'hidden') return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {phase === 'box' && (
          <>
            <div className="text-center mb-6">
              {/* 중첩 상태: 두 이모지가 겹쳐 깜빡임 */}
              <div className="relative inline-block text-7xl mb-4 select-none" style={{ height: '4.5rem' }}>
                <span className="animate-bounce inline-block">📦</span>
                <span
                  className="absolute inset-0 flex items-center justify-center text-5xl pointer-events-none"
                  style={{ animation: 'superpose-a 1.4s ease-in-out infinite' }}
                >😺</span>
                <span
                  className="absolute inset-0 flex items-center justify-center text-5xl pointer-events-none"
                  style={{ animation: 'superpose-b 1.4s ease-in-out infinite' }}
                >💀</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                상자 안의 고양이는<br />
                <span className="font-bold text-[#791215]">살아있는 동시에 죽어있다.</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">— 관찰하기 전까지는 두 상태의 중첩 —</p>
            </div>
            <button
              onClick={handleOpen}
              className="w-full bg-[#791215] text-white py-2.5 rounded-lg font-bold hover:bg-[#5a0d0f] transition-colors"
            >
              상자 열기 — 관찰하기
            </button>
          </>
        )}

        {phase === 'result' && (
          <>
            <div className="text-center mb-5">
              <div className="text-7xl mb-3 select-none">{alive ? '😺' : '💀'}</div>
              <p className="font-bold text-lg text-[#791215]">
                {alive ? '고양이가 살아있습니다!' : '고양이가 죽어있습니다.'}
              </p>
              <p className="text-xs text-gray-400 mt-1">파동함수가 붕괴했습니다.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
              <div className="bg-[#fceded] rounded-lg p-3">
                <p className="font-bold text-[#791215] text-xs mb-1.5">슈뢰딩거</p>
                <p className="text-gray-700 leading-snug">
                  {alive
                    ? '휴... 다행이군요.'
                    : '이번엔 안됐군요.'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-bold text-gray-500 text-xs mb-1.5">하이젠베르크</p>
                <p className="text-gray-700 leading-snug">
                  {alive
                    ? '하지만 지금 어디 있는지는 모르죠.'
                    : '관찰이 결과를 만든 겁니다.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full border border-gray-200 text-gray-500 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              닫기
            </button>
          </>
        )}
      </div>
    </div>
  )
}
