'use client'

interface SimModalProps {
  keyword: string
  onClose: () => void
  src?: string    // 정적 파일 경로
  html?: string   // 동적 생성 HTML
}

export default function SimModal({ keyword, onClose, src, html }: SimModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-[#791215] px-4 py-3 text-white">
          <span className="font-semibold">{keyword} 시뮬레이션</span>
          <button
            onClick={onClose}
            className="ml-8 text-white/80 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        {src ? (
          <iframe
            src={src}
            width={480}
            height={320}
            className="block border-0"
            title={`${keyword} 시뮬레이션`}
          />
        ) : (
          <iframe
            srcDoc={html}
            sandbox="allow-scripts"
            width={480}
            height={320}
            className="block border-0"
            title={`${keyword} 시뮬레이션`}
          />
        )}
        <div className="flex items-center justify-between px-4 py-2">
          <button
            onClick={() => {
              onClose()
              window.dispatchEvent(new CustomEvent('open-sim-chat', { detail: { keyword } }))
            }}
            className="rounded-lg bg-[#791215] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5a0e10] transition-colors"
          >
            AI에게 질문하기 →
          </button>
          <span className="text-xs text-gray-400">외부 클릭 또는 ✕로 닫기</span>
        </div>
      </div>
    </div>
  )
}
