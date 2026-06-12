import Sidebar from '@/components/Sidebar'

const groups = [
  {
    title: 'Ⅴ-1. 전하가 만드는 전기장',
    sections: [
      { title: '전기장', slug: '1-01-electric-field' },
      { title: '전기선속과 가우스 법칙', slug: '1-02-gauss' },
      { title: '가우스 법칙의 미분형', slug: '1-03-gauss-differential' },
      { title: '전위', slug: '1-04-potential' },
      { title: '전기와 관련된 물리량 비교', slug: '1-05-comparison' },
      { title: '축전기', slug: '1-06-capacitor' },
      { title: '📋 핵심 정리', slug: '1-summary' },
    ],
  },
  {
    title: 'Ⅴ-2. 전류가 만드는 자기장',
    sections: [
      { title: '전류', slug: '2-01-current' },
      { title: '비오-사바르 법칙', slug: '2-02-biot-savart' },
      { title: '암페어 법칙', slug: '2-03-ampere' },
      { title: '솔레노이드 내부의 자기장', slug: '2-04-solenoid' },
      { title: '📋 핵심 정리', slug: '2-summary' },
    ],
  },
  {
    title: 'Ⅴ-3. 로런츠 힘과 전자기 유도',
    sections: [
      { title: '로런츠 힘', slug: '3-01-lorentz' },
      { title: '자기선속과 패러데이 법칙', slug: '3-02-faraday' },
      { title: '운동 기전력', slug: '3-03-motional-emf' },
      { title: '인덕턴스', slug: '3-04-inductance' },
      { title: '상호 유도', slug: '3-05-mutual-inductance' },
      { title: '📋 핵심 정리', slug: '3-summary' },
    ],
  },
  {
    title: 'Ⅴ-4. 전기 회로',
    sections: [
      { title: '키르히호프 법칙', slug: '4-01-kirchhoff' },
      { title: 'RC 회로', slug: '4-02-rc-circuit' },
      { title: 'RL 회로', slug: '4-03-rl-circuit' },
      { title: '교류 회로와 리액턴스', slug: '4-04-ac-reactance' },
      { title: 'LC 회로', slug: '4-05-lc-circuit' },
      { title: 'RLC 회로', slug: '4-06-rlc-circuit' },
      { title: '📋 핵심 정리', slug: '4-summary' },
    ],
  },
  {
    title: 'Ⅴ-5. 맥스웰 방정식과 전자기파',
    sections: [
      { title: '변위 전류', slug: '5-01-displacement-current' },
      { title: '맥스웰 방정식', slug: '5-02-maxwell' },
      { title: '전자기파', slug: '5-03-em-waves' },
      { title: '전자기파의 에너지와 세기', slug: '5-04-em-energy' },
      { title: '📋 핵심 정리', slug: '5-summary' },
    ],
  },
]

export default function VolVLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar volume="vol-v" volumeTitle="Ⅴ. 전자기학" groups={groups} />
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-3xl prose">{children}</div>
      </main>
    </div>
  )
}
