import Link from 'next/link'

const toc = [
  {
    title: 'Ⅴ-1. 전하가 만드는 전기장',
    sections: [
      { num: '1-01', title: '전기장', href: '/vol-v/1-01-electric-field' },
      { num: '1-02', title: '전기선속과 가우스 법칙', href: '/vol-v/1-02-gauss' },
      { num: '1-03', title: '가우스 법칙의 미분형', href: '/vol-v/1-03-gauss-differential' },
      { num: '1-04', title: '전위', href: '/vol-v/1-04-potential' },
      { num: '1-05', title: '전기와 관련된 물리량 비교', href: '/vol-v/1-05-comparison' },
      { num: '1-06', title: '축전기', href: '/vol-v/1-06-capacitor' },
      { num: '📋', title: '중단원 핵심 정리', href: '/vol-v/1-summary' },
    ],
  },
  {
    title: 'Ⅴ-2. 전류가 만드는 자기장',
    sections: [
      { num: '2-01', title: '전류', href: '/vol-v/2-01-current' },
      { num: '2-02', title: '비오-사바르 법칙', href: '/vol-v/2-02-biot-savart' },
      { num: '2-03', title: '암페어 법칙', href: '/vol-v/2-03-ampere' },
      { num: '2-04', title: '솔레노이드 내부의 자기장', href: '/vol-v/2-04-solenoid' },
      { num: '📋', title: '중단원 핵심 정리', href: '/vol-v/2-summary' },
    ],
  },
  {
    title: 'Ⅴ-3. 로런츠 힘과 전자기 유도',
    sections: [
      { num: '3-01', title: '로런츠 힘', href: '/vol-v/3-01-lorentz' },
      { num: '3-02', title: '자기선속과 패러데이 법칙', href: '/vol-v/3-02-faraday' },
      { num: '3-03', title: '운동 기전력', href: '/vol-v/3-03-motional-emf' },
      { num: '3-04', title: '인덕턴스', href: '/vol-v/3-04-inductance' },
      { num: '3-05', title: '상호 유도', href: '/vol-v/3-05-mutual-inductance' },
      { num: '📋', title: '중단원 핵심 정리', href: '/vol-v/3-summary' },
    ],
  },
  {
    title: 'Ⅴ-4. 전기 회로',
    sections: [
      { num: '4-01', title: '키르히호프 법칙', href: '/vol-v/4-01-kirchhoff' },
      { num: '4-02', title: 'RC 회로', href: '/vol-v/4-02-rc-circuit' },
      { num: '4-03', title: 'RL 회로', href: '/vol-v/4-03-rl-circuit' },
      { num: '4-04', title: '교류 회로와 리액턴스', href: '/vol-v/4-04-ac-reactance' },
      { num: '4-05', title: 'LC 회로', href: '/vol-v/4-05-lc-circuit' },
      { num: '4-06', title: 'RLC 회로', href: '/vol-v/4-06-rlc-circuit' },
      { num: '📋', title: '중단원 핵심 정리', href: '/vol-v/4-summary' },
    ],
  },
  {
    title: 'Ⅴ-5. 맥스웰 방정식과 전자기파',
    sections: [
      { num: '5-01', title: '변위 전류', href: '/vol-v/5-01-displacement-current' },
      { num: '5-02', title: '맥스웰 방정식', href: '/vol-v/5-02-maxwell' },
      { num: '5-03', title: '전자기파', href: '/vol-v/5-03-em-waves' },
      { num: '5-04', title: '전자기파의 에너지와 세기', href: '/vol-v/5-04-em-energy' },
      { num: '📋', title: '중단원 핵심 정리', href: '/vol-v/5-summary' },
    ],
  },
]

export default function VolVPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-1 text-3xl font-bold text-[#791215]">Ⅴ. 전자기학</h1>
      <p className="mb-6 text-gray-400">Electromagnetism</p>

      <p className="mb-6 leading-7 text-gray-700">
        전하와 전류가 만들어내는 전기장과 자기장, 그리고 이 둘을 통합하는 맥스웰 방정식.
        패러데이의 통찰에서 맥스웰의 완성까지, 전자기학은 빛의 본질까지 설명하는
        물리학의 가장 우아한 체계 중 하나다.
      </p>

      <div className="mb-10 rounded-xl border-l-4 border-[#791215] bg-[#fceded] px-6 py-5">
        <p className="text-2xl font-bold text-[#791215]">전기와 자기는 하나인가?</p>
      </div>

      <div className="space-y-8">
        {toc.map((unit) => (
          <div key={unit.title}>
            <h2 className="mb-3 text-base font-bold text-[#791215]">{unit.title}</h2>
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 overflow-hidden">
              {unit.sections.map((sec) => (
                <Link
                  key={sec.href}
                  href={sec.href}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-[#f9eaea] transition-colors group"
                >
                  <span className="w-10 shrink-0 text-center text-xs font-mono text-gray-400 group-hover:text-[#791215]">
                    {sec.num}
                  </span>
                  <span className="text-sm text-gray-700 group-hover:text-[#791215]">
                    {sec.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
