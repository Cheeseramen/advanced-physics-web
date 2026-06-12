import Link from 'next/link'

const toc = [
  {
    title: 'Ⅵ-1. 특수 상대성 이론',
    sections: [
      { num: '1-01', title: '맥스웰 방정식과 갈릴레이 변환의 충돌', href: '/vol-vi/1-01-galilean-conflict' },
      { num: '1-02', title: '에테르 가설의 출현과 쇠퇴', href: '/vol-vi/1-02-ether' },
      { num: '1-03', title: '로런츠 변환과 상대성 이론', href: '/vol-vi/1-03-lorentz' },
      { num: '1-04', title: '시간 팽창과 길이 수축', href: '/vol-vi/1-04-time-length' },
      { num: '1-05', title: '상대론적 역학', href: '/vol-vi/1-05-relativistic-mechanics' },
      { num: '📋', title: '중단원 핵심 정리', href: '/vol-vi/1-summary' },
    ],
  },
  {
    title: 'Ⅵ-2. 일반 상대성 이론',
    sections: [
      { num: '2-01', title: '뉴턴 중력의 한계', href: '/vol-vi/2-01-newton-limits' },
      { num: '2-02', title: '등가 원리', href: '/vol-vi/2-02-equivalence' },
      { num: '2-03', title: '시공간의 곡률과 측지선', href: '/vol-vi/2-03-spacetime' },
      { num: '2-04', title: '중력에 의한 시간 팽창', href: '/vol-vi/2-04-grav-time-dilation' },
      { num: '2-05', title: '아인슈타인 장방정식', href: '/vol-vi/2-05-field-equation' },
      { num: '2-06', title: '슈바르츠실트 해와 반지름', href: '/vol-vi/2-06-schwarzschild' },
      { num: '2-07', title: '일반 상대론의 관측 결과', href: '/vol-vi/2-07-observations' },
      { num: '📋', title: '중단원 핵심 정리', href: '/vol-vi/2-summary' },
    ],
  },
]

export default function VolVIPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-1 text-3xl font-bold text-[#791215]">Ⅵ. 상대성이론</h1>
      <p className="mb-6 text-gray-400">Relativity</p>

      <p className="mb-6 leading-7 text-gray-700">
        뉴턴 역학과 맥스웰 전자기학의 충돌에서 시작된 혁명. 아인슈타인은 시간과 공간이
        절대적이지 않고 관측자에 따라 달라진다는 것을 보였다. 특수상대론에서 출발해,
        중력이 시공간의 곡률임을 밝히는 일반상대론까지.
      </p>

      <div className="mb-10 rounded-xl border-l-4 border-[#791215] bg-[#fceded] px-6 py-5">
        <p className="text-2xl font-bold text-[#791215]">빛의 속도는 왜 모든 관측자에게 같은가?</p>
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
