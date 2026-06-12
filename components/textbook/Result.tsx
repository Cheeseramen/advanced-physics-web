import katex from 'katex'

interface ResultProps {
  children?: React.ReactNode
  formula?: string
}

export default function Result({ children, formula }: ResultProps) {
  const html = formula
    ? katex.renderToString(formula, { displayMode: false, throwOnError: false })
    : null

  return (
    <div className="my-3 rounded border border-[#791215cc] bg-[#fffadc] px-4 py-1.5 text-center [&_.dm]:my-0">
      {html ? <span dangerouslySetInnerHTML={{ __html: html }} /> : children}
    </div>
  )
}
