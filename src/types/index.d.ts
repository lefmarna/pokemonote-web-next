export type Nature = {
  name: string
  stats: number[]
}

export type PokemonData = {
  no: number
  name: string
  form: string
  ranks: string[]
  evolutions: number[]
  types: string[]
  abilities: string[]
  hiddenAbilities: string[]
  stats: number[]
  total?: number
}

export type Stat = {
  name: string
  initial: string
  individualValue: number | ''
  effortValue: number | ''
  realNumber: number | ''
}
