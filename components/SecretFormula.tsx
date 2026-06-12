'use client'
import { useState, useEffect } from 'react'
import katex from 'katex'

export default function SecretFormula({ formula }: { formula: string }) {
  const [hinted, setHinted] = useState(false)
  const html = katex.renderToString(formula, { displayMode: true, throwOnError: false })

  useEffect(() => {
    const t = setTimeout(() => setHinted(true), 6000)
    return () => clearTimeout(t)
  }, [])

  return (
    <span
      className="dm block overflow-x-auto text-center cursor-default select-none"
      style={hinted ? { animation: 'hint-sparkle 2.5s ease-in-out infinite' } : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={() => window.dispatchEvent(new Event('open-quantum-jump'))}
    />
  )
}
