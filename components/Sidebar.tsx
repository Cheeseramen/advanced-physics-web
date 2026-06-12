'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Section {
  title: string
  slug: string
}

interface ChapterGroup {
  title: string
  sections: Section[]
}

interface SidebarProps {
  volume: string
  volumeTitle: string
  groups: ChapterGroup[]
}

export default function Sidebar({ volume, volumeTitle, groups }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openChapters, setOpenChapters] = useState<boolean[]>(groups.map(() => true))
  const pathname = usePathname()

  // 화면 너비에 따라 초기 상태 결정 (데스크톱: 열림, 모바일: 닫힘)
  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 768)
    let prevMobile = window.innerWidth < 768
    const handleResize = () => {
      const nowMobile = window.innerWidth < 768
      if (prevMobile !== nowMobile) {
        setSidebarOpen(!nowMobile)
        prevMobile = nowMobile
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 모바일에서 페이지 이동 시 자동 닫힘
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }, [pathname])

  const toggleChapter = (i: number) => {
    setOpenChapters((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  return (
    <>
      {/* 모바일 배경 오버레이 — 탭하면 닫힘 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 모바일 햄버거 버튼 (사이드바 닫혔을 때만 표시) */}
      {!sidebarOpen && (
        <button
          className="fixed left-3 top-[52px] z-30 rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 shadow-sm md:hidden"
          onClick={() => setSidebarOpen(true)}
          title="사이드바 열기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-30 shrink-0 border-r border-gray-200 bg-gray-50 transition-all duration-300 overflow-hidden
          md:relative md:inset-auto md:z-auto
          ${sidebarOpen ? 'w-64' : 'w-0 md:w-10'}
        `}
      >
        {/* 사이드바 토글 (데스크톱용) */}
        <div className={`flex ${sidebarOpen ? 'justify-end' : 'justify-center'} p-2`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-[#791215] transition-colors"
            title={sidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* 내비게이션 */}
        {sidebarOpen && (
          <div className="overflow-y-auto px-4 pb-5" style={{ height: 'calc(100% - 40px)' }}>
            <Link
              href={`/${volume}`}
              className="mb-4 block text-base font-bold text-[#791215]"
            >
              {volumeTitle}
            </Link>

            {groups.map((ch, i) => (
              <div key={ch.title} className="mb-3">
                <button
                  onClick={() => toggleChapter(i)}
                  className="flex w-full items-center justify-between rounded px-1 py-1 text-left text-xs font-semibold tracking-wide text-[#791215] hover:bg-[#f9eaea] transition-colors"
                >
                  <span>{ch.title}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3 w-3 shrink-0 transition-transform duration-200 ${openChapters[i] ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openChapters[i] && (
                  <ul className="mt-1 space-y-0.5">
                    {ch.sections.map((sec) => (
                      <li key={sec.slug}>
                        <Link
                          href={`/${volume}/${sec.slug}`}
                          className="block rounded px-2 py-2.5 text-sm text-gray-600 hover:bg-[#f9eaea] hover:text-[#791215]"
                        >
                          {sec.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  )
}
