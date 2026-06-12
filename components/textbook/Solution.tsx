'use client'

import { useState } from 'react'

export default function Solution({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="rounded-lg border-2 border-[#791215] px-4 py-2 text-sm font-semibold text-[#791215] transition hover:bg-[#791215] hover:text-white"
        >
          정답 확인
        </button>
      ) : (
        <>
          <div className="mb-2 flex items-center justify-between">
            <p className="font-bold text-gray-700">[풀이]</p>
            <button
              onClick={() => setRevealed(false)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              가리기
            </button>
          </div>
          <div>{children}</div>
        </>
      )}
    </div>
  )
}
