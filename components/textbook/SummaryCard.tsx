import katex from 'katex'

interface SummaryCardProps {
  title: string
  formula?: string
  note?: string
  desc: string
}

export default function SummaryCard({ title, formula, note, desc }: SummaryCardProps) {
  const html = formula
    ? katex.renderToString(formula, { displayMode: false, throwOnError: false })
    : null

  return (
    <div className="summary-card flex flex-col rounded-xl border-2 border-[#791215] bg-[#fceded]">
      <div className="border-b border-[#791215]/20 px-4 py-2">
        <p className="text-sm font-bold text-[#791215]">{title}</p>
      </div>
      <div className="flex flex-1 items-center justify-center overflow-hidden rounded-sm bg-white px-4 py-3 text-center">
        {html ? (
          <span dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <p className="text-center text-sm leading-relaxed text-gray-700">{note}</p>
        )}
      </div>
      <div className="border-t border-[#791215]/20 px-4 py-2">
        <p className="text-center text-xs text-gray-500">{desc}</p>
      </div>
    </div>
  )
}
