'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import SimModal from './SimModal'

interface SimKeywordProps {
  children: React.ReactNode
  keyword?: string
  context?: string
  src?: string
  external?: boolean
}

export default function SimKeyword({ children, keyword, context, src, external }: SimKeywordProps) {
  const [html, setHtml] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const kw = keyword ?? (typeof children === 'string' ? children : '')

  async function handleClick() {
    if (loading) return
    if (external && src) { window.open(src, '_blank', 'noopener,noreferrer'); return }
    if (src || html) { setOpen(true); return }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: kw, context }),
      })
      const data = await res.json()
      if (data.error) setError(data.error)
      else { setHtml(data.html); setOpen(true) }
    } catch {
      setError('시뮬레이션 생성에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <span
        onClick={handleClick}
        title="클릭하면 시뮬레이션을 볼 수 있어요"
        className="cursor-pointer bg-yellow-200 hover:bg-yellow-300 px-1 rounded-sm transition-colors"
      >
        {loading ? '⏳ ' : ''}{children}
      </span>
      {error && (
        <span className="ml-2 text-xs text-red-500">{error}</span>
      )}
      {open && (src || html) && createPortal(
        <SimModal
          src={src}
          html={html ?? undefined}
          keyword={kw}
          onClose={() => setOpen(false)}
        />,
        document.body
      )}
    </>
  )
}
