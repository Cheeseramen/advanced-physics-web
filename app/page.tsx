import Link from 'next/link'

const volumes = [
  {
    id: 'V',
    roman: 'Ⅴ',
    title: '전자기학',
    subtitle: 'Electromagnetism',
    topics: ['맥스웰 방정식', '전자기파', '전자기 유도', '전기 회로'],
    href: '/vol-v',
    available: true,
  },
  {
    id: 'VI',
    roman: 'Ⅵ',
    title: '상대성이론',
    subtitle: 'Relativity',
    topics: ['특수상대론', '시공간', '블랙홀', '일반상대론'],
    href: '/vol-vi',
    available: true,
  },
  {
    id: 'VII',
    roman: 'Ⅶ',
    title: '양자역학',
    subtitle: 'Quantum Mechanics',
    topics: ['광전효과', '물질파', '파동함수', '슈뢰딩거 방정식'],
    href: '/vol-vii',
    available: true,
  },
]

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-14 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#791215]">
          보인고등학교 · 2026
        </p>
        <h1 className="mb-3 text-5xl font-bold text-gray-900">고급물리학</h1>
        <p className="text-lg text-gray-500">Advanced Physics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {volumes.map((vol) => (
          <div
            key={vol.id}
            className={`rounded-xl border-2 p-6 transition-shadow ${
              vol.available
                ? 'border-[#791215] bg-white hover:shadow-lg'
                : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
          >
            <div className="mb-4">
              <span className="text-3xl font-bold text-[#791215]">
                {vol.roman}
              </span>
            </div>
            <h2 className="mb-1 text-xl font-bold text-gray-900">
              {vol.title}
            </h2>
            <p className="mb-4 text-sm text-gray-400">{vol.subtitle}</p>
            <ul className="mb-6 space-y-1">
              {vol.topics.map((t) => (
                <li key={t} className="text-sm text-gray-600">
                  · {t}
                </li>
              ))}
            </ul>
            {vol.available ? (
              <Link
                href={vol.href}
                className="block w-full rounded-lg bg-[#791215] py-2 text-center text-sm font-semibold text-white hover:bg-[#5a0e10]"
              >
                학습 시작
              </Link>
            ) : (
              <div className="block w-full rounded-lg bg-gray-200 py-2 text-center text-sm text-gray-400">
                준비 중
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
