'use client'

export default function SecretCat() {
  return (
    <span
      className="text-red-200 text-lg cursor-default select-none hover:text-red-300 transition-colors mt-8 block text-right"
      onClick={() => window.dispatchEvent(new Event('open-easter-egg'))}
      title=""
    >
      =^. .^=
    </span>
  )
}
