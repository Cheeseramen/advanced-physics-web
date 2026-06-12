import Link from 'next/link'

const toc = [
  {
    title: 'Ⅶ-1. 빛과 물질의 이중성',
    sections: [
      { num: '1-01', title: '고전물리학의 한계', href: '/vol-vii/1-01-classical-limits' },
      { num: '1-02', title: '빛의 파동성 — 영의 이중슬릿 간섭 실험', href: '/vol-vii/1-02-double-slit' },
      { num: '1-03', title: '빛의 입자성 — 광전효과', href: '/vol-vii/1-03-photoelectric' },
      { num: '1-04', title: '콤프턴 산란과 광자의 운동량', href: '/vol-vii/1-04-compton' },
      { num: '1-05', title: '드브로이 물질파', href: '/vol-vii/1-05-de-broglie' },
      { num: '1-06', title: '보어 원자 모형', href: '/vol-vii/1-06-bohr' },
      { num: '1-07', title: '전자 회절과 파동-입자 이중성', href: '/vol-vii/1-07-diffraction' },
      { num: '📝', title: '매칭 퀴즈', href: '/vol-vii/1-quiz' },
      { num: '📋', title: '중단원 핵심 정리', href: '/vol-vii/1-summary' },
    ],
  },
  {
    title: 'Ⅶ-2. 파동함수와 확률적 세계',
    sections: [
      { num: '2-01', title: '파동함수와 확률 해석', href: '/vol-vii/2-01-wave-function' },
      { num: '2-02', title: '슈뢰딩거 방정식', href: '/vol-vii/2-02-schrodinger' },
      { num: '2-03', title: '불확정성 원리', href: '/vol-vii/2-03-uncertainty' },
      { num: '2-04', title: '이중슬릿 실험과 중첩 원리', href: '/vol-vii/2-04-superposition' },
      { num: '2-05', title: '측정과 파동함수 붕괴', href: '/vol-vii/2-05-measurement' },
      { num: '📝', title: '매칭 퀴즈', href: '/vol-vii/2-quiz' },
      { num: '📋', title: '중단원 핵심 정리', href: '/vol-vii/2-summary' },
    ],
  },
]

export default function VolVIIPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-1 text-3xl font-bold text-[#791215]">Ⅶ. 양자역학</h1>
      <p className="mb-6 text-gray-400">Quantum Mechanics</p>

      <p className="mb-6 leading-7 text-gray-700">
        19세기 말까지 완벽해 보이던 고전물리학은 세 가지 현상 앞에서 침묵했다.
        흑체복사, 광전효과, 그리고 원자 스펙트럼. 이 단원은 고전물리학의 붕괴에서
        시작하여, 양자역학이라는 전혀 새로운 세계관이 어떻게 탄생했는지를 추적한다.
      </p>

      <div className="mb-10 rounded-xl border-l-4 border-[#791215] bg-[#fceded] px-6 py-5">
        <p className="text-2xl font-bold text-[#791215]">왜 고전물리학은 실패했는가?</p>
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
