'use client'
import { useState, useEffect } from 'react'

export default function SecretCat() {
  const [sparkling, setSparkling] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setSparkling(true), 8000)
    return () => clearTimeout(t)
  }, [])

  return (
    <span
      className="text-lg cursor-default select-none mt-8 block text-right"
      style={{
        color: sparkling ? undefined : '#ffffff',
        animation: sparkling ? 'cat-sparkle 2.5s ease-in-out infinite' : undefined,
      }}
      onClick={() => window.dispatchEvent(new Event('open-easter-egg'))}
    >
      =^. .^=
    </span>
  )
}
