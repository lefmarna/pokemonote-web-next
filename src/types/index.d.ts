export * from './openapi'

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
  level: number | null
  nature: Nature
  ivs: NullableStats
  evs: NullableStats
  description: string
}>

export type PokemonParams = {
  name: string
  nature: string
  lv: number | null
  hp_iv: number | null
  hp_ev: number | null
  hp: number
  attack_iv: number | null
  attack_ev: number | null
  attack: number
  defence_iv: number | null
  defence_ev: number | null
  defence: number
  sp_attack_iv: number | null
  sp_attack_ev: number | null
  sp_attack: number
  sp_defence_iv: number | null
  sp_defence_ev: number | null
  sp_defence: number
  speed_iv: number | null
  speed_ev: number | null
  speed: number
  description: string
  is_public: 0 | 1
}

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
  [K in keyof T]: T[K] | null
}

export type NullableStats = Nullable<Stats>

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
    isAuthenticated: boolean
  }>

export type Email = {
  email: string
}

export type ShowUser = {
  user: User
  pokemons: PokemonSummary[]
}
