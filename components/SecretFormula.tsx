'use client'
import katex from 'katex'

export default function SecretFormula({ formula }: { formula: string }) {
  const html = katex.renderToString(formula, { displayMode: true, throwOnError: false })
  return (
    <span
      className="dm block overflow-x-auto text-center cursor-default select-none"
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={() => window.dispatchEvent(new Event('open-quantum-jump'))}
    />
  )
}
