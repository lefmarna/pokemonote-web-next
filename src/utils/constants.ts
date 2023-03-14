// ポケモンの性格補正
export const UPPER_NATURE = 1.1
export const LOWER_NATURE = 0.9

// ポケモンのレベル
export const DEFAULT_LEVEL = 50
export const MAX_LEVEL = 100
export const MIN_LEVEL = 1

// ポケモンの3値
export const MAX_EV = 252
export const MAX_TOTAL_EV = 510
export const MAX_IV = 31
export const MAX_REAL_NUMBER = 999

// ポケモンのステータスのindex番号（順番を保証してほしいため、オブジェクトではなく配列で管理する）
export const HP_INDEX = 0
export const ATTACK_INDEX = 1
export const DEFENCE_INDEX = 2
export const SP_ATTACK_INDEX = 3
export const SP_DEFENCE_INDEX = 4
export const SPEED_INDEX = 5

// ポケモンのステータスの数
export const STATS_LENGTH = 6

export const RANKS = [
  { id: 1, magnification: 6, percent: 400 },
  { id: 2, magnification: 5, percent: 350 },
  { id: 3, magnification: 4, percent: 300 },
  { id: 4, magnification: 3, percent: 250 },
  { id: 5, magnification: 2, percent: 200 },
  { id: 6, magnification: 1, percent: 150 },
  { id: 7, magnification: 0, percent: 100 },
  { id: 8, magnification: -1, percent: 67 },
  { id: 9, magnification: -2, percent: 50 },
  { id: 10, magnification: -3, percent: 40 },
  { id: 11, magnification: -4, percent: 33 },
  { id: 12, magnification: -5, percent: 29 },
  { id: 13, magnification: -6, percent: 25 },
]
