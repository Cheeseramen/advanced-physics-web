import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Link from 'next/link'
import ChatWidget from '@/components/ChatWidget'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: '고급물리학 | 보인고등학교',
  description: '보인고등학교 고급물리학 인터랙티브 교재',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="min-h-screen font-[var(--font-noto)] antialiased">
        <header className="border-b border-gray-200 bg-white px-6 py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span className="text-sm text-gray-500">보인고등학교</span>
            <Link href="/" className="font-bold text-[#791215] hover:opacity-70 transition-opacity">고급물리학</Link>
            <span className="text-sm text-gray-500">박세훈 T.</span>
          </div>
        </header>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
