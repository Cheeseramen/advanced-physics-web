import katex from 'katex'

export default function DisplayMath({ formula }: { formula: string }) {
  const html = katex.renderToString(formula, {
    displayMode: true,
    throwOnError: false,
  })
  return (
    <span
      className="dm block overflow-x-auto text-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
