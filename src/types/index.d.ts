type NatureNames =
  | 'いじっぱり'
  | 'うっかりや'
  | 'おくびょう'
  | 'おだやか'
  | 'おっとり'
  | 'おとなしい'
  | 'がんばりや'
  | 'きまぐれ'
  | 'さみしがり'
  | 'しんちょう'
  | 'すなお'
  | 'ずぶとい'
  | 'せっかち'
  | 'なまいき'
  | 'てれや'
  | 'のうてんき'
  | 'のんき'
  | 'ひかえめ'
  | 'まじめ'
  | 'むじゃき'
  | 'やんちゃ'
  | 'ゆうかん'
  | 'ようき'
  | 'れいせい'
  | 'わんぱく'

export type Nature = {
  readonly name: NatureNames
  readonly increasedStat: keyof Stats | null
  readonly decreasedStat: keyof Stats | null
}

type Rank = 'legendary' | 'mythical' | 'mega' | 'sv'

export type RankCheckbox = {
  text: string
  value: Rank
}

export type PokemonBasicInfo = {
  no: number
  name: string
  form: string
  ranks: Rank[]
  evolutions: number[]
  baseStats: Stats
}

export type Pokemon = {
  basicInfo: PokemonBasicInfo
  level: number | ''
  nature: NATURE
  ivs: NullableStats
  evs: NullableStats
}

export type Stats = {
  hp: number
  attack: number
  defense: number
  spAttack: number
  spDefense: number
  speed: number
}

export type StatsKeys = keyof Stats

type Nullable<T> = {
  [K in keyof T]: T[K] | ''
}

type NullableStats = Nullable<Stats>

export type PokemonSummary = {
  id: number
  lv: number
  name: string
  nature: string
  stats: string
  sum_effort_value: number
  user: User
}

export type Stat = {
  name: string
  initial: string
  individualValue: number | ''
  effortValue: number | ''
}

export type LoginParams = {
  email: string
  password: string
}

export type User = {
  nickname: string
  username: string
}

export type AuthUser = User & {
  id: number | null
  email: string
  email_verified_at: boolean
}
