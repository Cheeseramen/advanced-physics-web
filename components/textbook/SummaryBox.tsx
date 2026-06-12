interface SummaryBoxProps {
  title: string
  children: React.ReactNode
}

export default function SummaryBox({ title, children }: SummaryBoxProps) {
  return (
    <div className="relative my-8 rounded border-2 border-[#791215]">
      <div className="absolute -top-3.5 left-4 rounded bg-[#791215] px-3 py-0.5 text-sm font-bold text-white">
        {title}
      </div>
      <div className="rounded bg-[#fdf0f0] p-5 pt-6 [&_.katex-display]:!block [&_.katex-display]:!text-center">
        {children}
      </div>
    </div>
  )
}
