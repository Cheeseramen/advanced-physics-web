import { readFile } from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import LawBox from '@/components/textbook/LawBox'
import ExBox from '@/components/textbook/ExBox'
import SummaryBox from '@/components/textbook/SummaryBox'
import Solution from '@/components/textbook/Solution'
import Result from '@/components/textbook/Result'
import DisplayMath from '@/components/textbook/DisplayMath'
import SummaryCard from '@/components/textbook/SummaryCard'
import SummaryGrid from '@/components/textbook/SummaryGrid'
import QuizMatch from '@/components/textbook/QuizMatch'
import PageNav from '@/components/PageNav'
import SimKeyword from '@/components/SimKeyword'
import PhetButton from '@/components/PhetButton'
import { getAdjacentChapters } from '@/lib/chapters'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#791215]">{children}</h1>
      <div className="mt-1.5 h-px bg-[#791215]/40" />
    </div>
  )
}

function SubSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-[#791215] mt-7 mb-2">{children}</h2>
  )
}

const components = { h1: SectionTitle, h2: SubSectionTitle, LawBox, ExBox, SummaryBox, Solution, Result, DisplayMath, SummaryCard, SummaryGrid, SimKeyword, QuizMatch, PhetButton }

interface Props {
  params: Promise<{ chapter: string }>
}

export default async function ChapterPage({ params }: Props) {
  const { chapter } = await params
  const filePath = path.join(process.cwd(), 'content', 'vol-vii', `${chapter}.mdx`)

  let source: string
  try {
    source = await readFile(filePath, 'utf8')
  } catch {
    notFound()
  }

  const { prev, next } = getAdjacentChapters(chapter, 'vol-vii')

  return (
    <>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath, remarkGfm],
            rehypePlugins: [rehypeKatex],
          },
        }}
        components={components}
      />
      <PageNav prev={prev} next={next} basePath="vol-vii" />
    </>
  )
}
