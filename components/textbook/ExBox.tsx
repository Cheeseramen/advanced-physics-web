interface ExBoxProps {
  num?: string
  title: string
  children: React.ReactNode
}

export default function ExBox({ num, title, children }: ExBoxProps) {
  return (
    <div className="relative my-6 rounded border border-[#c45a5c]">
      <div className="absolute -top-3.5 left-4 rounded border border-[#c45a5c] bg-[#f9f7f7] px-3 py-0.5 text-sm font-bold text-[#791215]">
        {num ? `예제 ${num}` : '예제'}&ensp;{title}
      </div>
      <div className="rounded bg-[#f9f7f7] p-5 pt-6 [&_.katex-display]:!block [&_.katex-display]:!text-center">
        {children}
      </div>
    </div>
  )
}
