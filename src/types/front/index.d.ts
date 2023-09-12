import type {
  Nature,
  PokemonBasicInfo,
  PokemonSummary,
  User,
} from '@/types/openapi/schemas'

type NatureName = Nature['name']

type Rank = 'legendary' | 'mythical' | 'mega' | 'sv' | 'NotInPokedex'

export type RankCheckbox = Readonly<{
  text: string
  value: Exclude<Rank, 'NotInPokedex'>
}>

export type Pokemon = Readonly<{
  basicInfo: PokemonBasicInfo
  level: number | null
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
  [K in keyof T]: T[K] | null
}

export type NullableStats = Nullable<Stats>

export type ShowUser = {
  user: User
  pokemons: PokemonSummary[]
}
