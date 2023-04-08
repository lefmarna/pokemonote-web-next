import { Nature } from '@/types'

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

export const NATURES: Nature[] = [
  {
    name: 'いじっぱり',
    increasedStat: 'attack',
    decreasedStat: 'spAttack',
  },
  {
    name: 'うっかりや',
    increasedStat: 'spAttack',
    decreasedStat: 'spDefense',
  },
  {
    name: 'おくびょう',
    increasedStat: 'speed',
    decreasedStat: 'attack',
  },
  {
    name: 'おだやか',
    increasedStat: 'attack',
    decreasedStat: 'spDefense',
  },
  {
    name: 'おっとり',
    increasedStat: 'defense',
    decreasedStat: 'spAttack',
  },
  {
    name: 'おとなしい',
    increasedStat: 'defense',
    decreasedStat: 'spDefense',
  },
  {
    name: 'がんばりや',
    increasedStat: null,
    decreasedStat: null,
  },
  {
    name: 'きまぐれ',
    increasedStat: null,
    decreasedStat: null,
  },
  {
    name: 'さみしがり',
    increasedStat: 'attack',
    decreasedStat: 'defense',
  },
  {
    name: 'しんちょう',
    increasedStat: 'spDefense',
    decreasedStat: 'spAttack',
  },
  {
    name: 'すなお',
    increasedStat: null,
    decreasedStat: null,
  },
  {
    name: 'ずぶとい',
    increasedStat: 'attack',
    decreasedStat: 'defense',
  },
  {
    name: 'せっかち',
    increasedStat: 'defense',
    decreasedStat: 'speed',
  },
  {
    name: 'なまいき',
    increasedStat: 'spDefense',
    decreasedStat: 'speed',
  },
  {
    name: 'てれや',
    increasedStat: null,
    decreasedStat: null,
  },
  {
    name: 'のうてんき',
    increasedStat: 'defense',
    decreasedStat: 'spDefense',
  },
  {
    name: 'のんき',
    increasedStat: 'defense',
    decreasedStat: 'speed',
  },
  {
    name: 'ひかえめ',
    increasedStat: 'spAttack',
    decreasedStat: 'attack',
  },
  {
    name: 'まじめ',
    increasedStat: null,
    decreasedStat: null,
  },
  {
    name: 'むじゃき',
    increasedStat: 'speed',
    decreasedStat: 'spDefense',
  },
  {
    name: 'やんちゃ',
    increasedStat: 'attack',
    decreasedStat: 'spDefense',
  },
  {
    name: 'ゆうかん',
    increasedStat: 'attack',
    decreasedStat: 'speed',
  },
  {
    name: 'ようき',
    increasedStat: 'speed',
    decreasedStat: 'spAttack',
  },
  {
    name: 'れいせい',
    increasedStat: 'spAttack',
    decreasedStat: 'speed',
  },
  {
    name: 'わんぱく',
    increasedStat: 'defense',
    decreasedStat: 'spAttack',
  },
]
