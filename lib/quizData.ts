export interface QuizPair {
  title: string
  formula?: string
  note?: string
}

export const QUIZ_DATA: Record<string, QuizPair[]> = {
  'vol-vii-1': [
    { title: '플랑크 가정',      formula: 'E = nhf' },
    { title: '광전효과',         formula: 'K_{\\max} = hf - \\phi' },
    { title: '광자의 운동량',    formula: 'p = \\dfrac{h}{\\lambda}' },
    { title: '보어 에너지 준위', formula: 'E_n = -\\dfrac{13.6\\,\\text{eV}}{n^2}' },
    { title: '드브로이 물질파',  formula: '\\lambda = \\dfrac{h}{p}' },
    { title: '파동-입자 이중성', note: '관찰 방법에 따라 파동으로도, 입자로도 행동한다' },
  ],
  'vol-vii-2': [
    { title: '확률밀도',        formula: '|\\psi(x,t)|^2' },
    { title: '정규화 조건',     formula: '\\int_{-\\infty}^{\\infty}|\\psi|^2\\,dx = 1' },
    { title: '슈뢰딩거 방정식', formula: 'i\\hbar\\,\\frac{\\partial\\psi}{\\partial t} = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2\\psi}{\\partial x^2} + V\\psi' },
    { title: '불확정성 원리',   formula: '\\Delta x\\,\\Delta p \\geq \\dfrac{\\hbar}{2}' },
    { title: '중첩 원리',       formula: '\\psi = \\psi_1 + \\psi_2' },
    { title: '파동함수 붕괴',   note: '측정하는 순간 중첩된 파동함수가 하나의 상태로 확정된다' },
  ],
}
