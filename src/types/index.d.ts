type NatureName =
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

export type Nature = Readonly<{
  name: NatureName
  increasedStat: StatsKey | null
  decreasedStat: StatsKey | null
}>

type Rank = 'legendary' | 'mythical' | 'mega' | 'sv' | 'NotInPokedex'

export type RankCheckbox = Readonly<{
  text: string
  value: Exclude<Rank, 'NotInPokedex'>
}>

export type PokemonBasicInfo = Readonly<{
  no: number
  name: string
  form: string
  ranks: ReadonlyArray<Rank>
  evolutions: ReadonlyArray<number>
  baseStats: Stats
}>

export type Pokemon = Readonly<{
  basicInfo: PokemonBasicInfo
  level: number | ''
  nature: Nature
  ivs: NullableStats
  evs: NullableStats
  description: string
}>

export type Stats = Readonly<{
  hp: number
  attack: number
  defense: number
  spAttack: number
  spDefense: number
  speed: number
}>

export type StatsKey = keyof Stats

type Nullable<T> = {
  [K in keyof T]: T[K] | ''
}

type NullableStats = Nullable<Stats>

export type PokemonSummary = Readonly<{
  id: number
  lv: number
  name: string
  nature: string
  stats: string
  sum_effort_value: number
  user: User
}>

export type LoginParams = {
  email: string
  password: string
}

export type User = Readonly<{
  nickname: string
  username: string
}>

export type AuthUser = User &
  Readonly<{
    id: number | null
    email: string
    email_verified_at: boolean
  }>
