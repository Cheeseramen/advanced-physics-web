'use client'
import { useState, useEffect } from 'react'

export default function SecretCat() {
  const [phase, setPhase] = useState<'hidden' | 'sparkle' | 'visible'>('hidden')
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPhase('sparkle'), 8000)
    return () => clearTimeout(t)
  }, [])

  const color =
    phase === 'hidden'  ? '#ffffff' :
    phase === 'visible' ? (hovered ? '#791215' : '#fecaca') :
    undefined // sparkle 중엔 animation이 색상 담당

  return (
    <span
      className="text-lg cursor-default select-none mt-8 block text-right transition-colors"
      style={{
        color,
        animation: phase === 'sparkle' ? 'cat-sparkle 2.5s ease-in-out forwards' : undefined,
      }}
      onAnimationEnd={() => setPhase('visible')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.dispatchEvent(new Event('open-easter-egg'))}
    >
      =^. .^=
    </span>
  )
}
