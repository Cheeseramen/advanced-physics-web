import Sidebar from '@/components/Sidebar'

const groups = [
  {
    title: 'Ⅵ-1. 특수 상대성 이론',
    sections: [
      { title: '맥스웰 방정식과 갈릴레이 변환의 충돌', slug: '1-01-galilean-conflict' },
      { title: '에테르 가설의 출현과 쇠퇴', slug: '1-02-ether' },
      { title: '로런츠 변환과 상대성 이론', slug: '1-03-lorentz' },
      { title: '시간 팽창과 길이 수축', slug: '1-04-time-length' },
      { title: '상대론적 역학', slug: '1-05-relativistic-mechanics' },
      { title: '📋 핵심 정리', slug: '1-summary' },
    ],
  },
  {
    title: 'Ⅵ-2. 일반 상대성 이론',
    sections: [
      { title: '뉴턴 중력의 한계', slug: '2-01-newton-limits' },
      { title: '등가 원리', slug: '2-02-equivalence' },
      { title: '시공간의 곡률과 측지선', slug: '2-03-spacetime' },
      { title: '중력에 의한 시간 팽창', slug: '2-04-grav-time-dilation' },
      { title: '아인슈타인 장방정식', slug: '2-05-field-equation' },
      { title: '슈바르츠실트 해와 반지름', slug: '2-06-schwarzschild' },
      { title: '일반 상대론의 관측 결과', slug: '2-07-observations' },
      { title: '📋 핵심 정리', slug: '2-summary' },
    ],
  },
]

export default function VolVILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar volume="vol-vi" volumeTitle="Ⅵ. 상대성이론" groups={groups} />
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-3xl prose">{children}</div>
      </main>
    </div>
  )
}
