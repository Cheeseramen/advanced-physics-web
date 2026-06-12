import Sidebar from '@/components/Sidebar'

const groups = [
  {
    title: 'Ⅶ-1. 빛과 물질의 이중성',
    sections: [
      { title: '고전물리학의 한계', slug: '1-01-classical-limits' },
      { title: '영의 이중슬릿 간섭', slug: '1-02-double-slit' },
      { title: '광전효과', slug: '1-03-photoelectric' },
      { title: '콤프턴 산란', slug: '1-04-compton' },
      { title: '드브로이 물질파', slug: '1-05-de-broglie' },
      { title: '보어 원자 모형', slug: '1-06-bohr' },
      { title: '전자 회절', slug: '1-07-diffraction' },
      { title: '🃏 매칭 퀴즈', slug: '1-quiz' },
      { title: '📋 핵심 정리', slug: '1-summary' },
    ],
  },
  {
    title: 'Ⅶ-2. 파동함수와 확률적 세계',
    sections: [
      { title: '파동함수와 확률 해석', slug: '2-01-wave-function' },
      { title: '슈뢰딩거 방정식', slug: '2-02-schrodinger' },
      { title: '불확정성 원리', slug: '2-03-uncertainty' },
      { title: '이중슬릿과 중첩 원리', slug: '2-04-superposition' },
      { title: '측정과 파동함수 붕괴', slug: '2-05-measurement' },
      { title: '🃏 매칭 퀴즈', slug: '2-quiz' },
      { title: '📋 핵심 정리', slug: '2-summary' },
    ],
  },
]

export default function VolVIILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar volume="vol-vii" volumeTitle="Ⅶ. 양자역학" groups={groups} />
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-3xl prose">{children}</div>
      </main>
    </div>
  )
}
