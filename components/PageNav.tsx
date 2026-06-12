import Link from 'next/link'

interface Chapter {
  slug: string
  title: string
  highlight?: boolean
}

interface PageNavProps {
  prev: Chapter | null
  next: Chapter | null
  basePath: string
}

export default function PageNav({ prev, next, basePath }: PageNavProps) {
  return (
    <div className="mt-14 flex items-stretch gap-3 border-t border-gray-200 pt-6">
      {prev ? (
        <Link
          href={`/${basePath}/${prev.slug}`}
          className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm hover:border-[#791215] hover:bg-[#fceded] transition-colors group"
        >
          <span className="text-gray-400 group-hover:text-[#791215]">←</span>
          <span className="text-gray-500 group-hover:text-[#791215] line-clamp-1">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/${basePath}/${next.slug}`}
          className={`flex flex-1 items-center justify-end gap-3 rounded-xl border px-4 py-3 text-sm transition-colors group ${
            next.highlight
              ? 'border-[#791215] bg-white hover:bg-[#fceded]'
              : 'border-gray-200 hover:border-[#791215] hover:bg-[#fceded]'
          }`}
        >
          <span className={`line-clamp-1 text-right ${next.highlight ? 'font-bold text-[#791215]' : 'text-gray-500 group-hover:text-[#791215]'}`}>
            {next.title}
          </span>
          <span className={next.highlight ? 'text-[#791215]' : 'text-gray-400 group-hover:text-[#791215]'}>→</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
