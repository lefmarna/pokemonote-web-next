export type Nature = {
  name: string
  stats: number[]
}

type Rank = 'legendary' | 'mythical' | 'mega' | 'sv'

export type RankCheckbox = {
  text: string
  value: Rank
}

export type PokemonData = {
  no: number
  name: string
  form: string
  ranks: Rank[]
  evolutions: number[]
  baseStats: Stats
}

type Stats = {
  hp: number
  attack: number
  defense: number
  spAttack: number
  spDefense: number
  speed: number
}

type Nullable<T> = {
  [K in keyof T]: T[K] | ''
}

type NullableStats = Nullable<Stats>

export type Pokemon = {
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
