export type Volume = 'vol-v' | 'vol-vi' | 'vol-vii'

export interface Chapter {
  slug: string
  title: string
  highlight?: boolean
}

export const VOL_V_CHAPTERS: Chapter[] = [
  { slug: '1-01-electric-field',        title: '전기장' },
  { slug: '1-02-gauss',                 title: '전기선속과 가우스 법칙' },
  { slug: '1-03-gauss-differential',    title: '가우스 법칙의 미분형' },
  { slug: '1-04-potential',             title: '전위' },
  { slug: '1-05-comparison',            title: '전기와 관련된 물리량 비교' },
  { slug: '1-06-capacitor',             title: '축전기' },
  { slug: '1-summary',                  title: 'Ⅴ-1 중단원 핵심 정리',           highlight: true },
  { slug: '2-01-current',               title: '전류',                            highlight: true },
  { slug: '2-02-biot-savart',           title: '비오-사바르 법칙' },
  { slug: '2-03-ampere',                title: '암페어 법칙' },
  { slug: '2-04-solenoid',              title: '솔레노이드 내부의 자기장' },
  { slug: '2-summary',                  title: 'Ⅴ-2 중단원 핵심 정리',           highlight: true },
  { slug: '3-01-lorentz',               title: '로런츠 힘',                       highlight: true },
  { slug: '3-02-faraday',               title: '자기선속과 패러데이 법칙' },
  { slug: '3-03-motional-emf',          title: '운동 기전력' },
  { slug: '3-04-inductance',            title: '인덕턴스' },
  { slug: '3-05-mutual-inductance',     title: '상호 유도' },
  { slug: '3-summary',                  title: 'Ⅴ-3 중단원 핵심 정리',           highlight: true },
  { slug: '4-01-kirchhoff',             title: '키르히호프 법칙',                 highlight: true },
  { slug: '4-02-rc-circuit',            title: 'RC 회로' },
  { slug: '4-03-rl-circuit',            title: 'RL 회로' },
  { slug: '4-04-ac-reactance',          title: '교류 회로와 리액턴스' },
  { slug: '4-05-lc-circuit',            title: 'LC 회로' },
  { slug: '4-06-rlc-circuit',           title: 'RLC 회로' },
  { slug: '4-summary',                  title: 'Ⅴ-4 중단원 핵심 정리',           highlight: true },
  { slug: '5-01-displacement-current',  title: '변위 전류',                       highlight: true },
  { slug: '5-02-maxwell',               title: '맥스웰 방정식' },
  { slug: '5-03-em-waves',              title: '전자기파' },
  { slug: '5-04-em-energy',             title: '전자기파의 에너지와 세기' },
  { slug: '5-summary',                  title: 'Ⅴ-5 중단원 핵심 정리',           highlight: true },
]

export const VOL_VI_CHAPTERS: Chapter[] = [
  { slug: '1-01-galilean-conflict',     title: '맥스웰 방정식과 갈릴레이 변환의 충돌' },
  { slug: '1-02-ether',                 title: '에테르 가설의 출현과 쇠퇴' },
  { slug: '1-03-lorentz',               title: '로런츠 변환과 상대성 이론' },
  { slug: '1-04-time-length',           title: '시간 팽창과 길이 수축' },
  { slug: '1-05-relativistic-mechanics', title: '상대론적 역학' },
  { slug: '1-summary',                  title: 'Ⅵ-1 중단원 핵심 정리',           highlight: true },
  { slug: '2-01-newton-limits',         title: '뉴턴 중력의 한계',                highlight: true },
  { slug: '2-02-equivalence',           title: '등가 원리' },
  { slug: '2-03-spacetime',             title: '시공간의 곡률과 측지선' },
  { slug: '2-04-grav-time-dilation',    title: '중력에 의한 시간 팽창' },
  { slug: '2-05-field-equation',        title: '아인슈타인 장방정식' },
  { slug: '2-06-schwarzschild',         title: '슈바르츠실트 해와 반지름' },
  { slug: '2-07-observations',          title: '일반 상대론의 관측 결과' },
  { slug: '2-summary',                  title: 'Ⅵ-2 중단원 핵심 정리',           highlight: true },
]

export const VOL_VII_CHAPTERS: Chapter[] = [
  { slug: '1-01-classical-limits',  title: '고전물리학의 한계' },
  { slug: '1-02-double-slit',       title: '영의 이중슬릿 간섭 실험' },
  { slug: '1-03-photoelectric',     title: '광전효과' },
  { slug: '1-04-compton',           title: '콤프턴 산란과 광자의 운동량' },
  { slug: '1-05-de-broglie',        title: '드브로이 물질파' },
  { slug: '1-06-bohr',              title: '보어 원자 모형' },
  { slug: '1-07-diffraction',       title: '전자 회절과 파동-입자 이중성' },
  { slug: '1-quiz',                 title: 'Ⅶ-1 매칭 퀴즈' },
  { slug: '1-summary',              title: 'Ⅶ-1 중단원 핵심 정리',         highlight: true },
  { slug: '2-01-wave-function',     title: '파동함수와 확률 해석',           highlight: true },
  { slug: '2-02-schrodinger',       title: '슈뢰딩거 방정식' },
  { slug: '2-03-uncertainty',       title: '불확정성 원리' },
  { slug: '2-04-superposition',     title: '이중슬릿 실험과 중첩 원리' },
  { slug: '2-05-measurement',       title: '측정과 파동함수 붕괴' },
  { slug: '2-quiz',                 title: 'Ⅶ-2 매칭 퀴즈' },
  { slug: '2-summary',              title: 'Ⅶ-2 중단원 핵심 정리',           highlight: true },
]

const VOLUME_CHAPTERS: Record<Volume, Chapter[]> = {
  'vol-v':   VOL_V_CHAPTERS,
  'vol-vi':  VOL_VI_CHAPTERS,
  'vol-vii': VOL_VII_CHAPTERS,
}

export function getAdjacentChapters(slug: string, volume: Volume) {
  const chapters = VOLUME_CHAPTERS[volume]
  const idx = chapters.findIndex((c) => c.slug === slug)
  return {
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
  }
}
