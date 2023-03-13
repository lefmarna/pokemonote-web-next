import { atom } from 'recoil'
import { AuthUser, Nature, PokemonData, Stat } from '../types'

export const authUserState = atom<AuthUser | null>({
  key: 'authUserState',
  default: null,
})

export const rememberRouteState = atom({
  key: 'rememberRouteState',
  default: '',
})

export const pokemonDataState = atom<PokemonData[]>({
  key: 'pokemonDataState',
  default: [],
})

export const natureDataState = atom<Nature[]>({
  key: 'natureDataState',
  default: [],
})

export const selectedPokemonState = atom<PokemonData>({
  key: 'selectedPokemonState',
  default: {
    no: 567,
    name: 'アーケオス',
    form: '',
    ranks: [],
    evolutions: [],
    types: ['いわ', 'ひこう'],
    abilities: ['よわき'],
    hiddenAbilities: [],
    stats: [75, 140, 65, 112, 65, 110],
  },
})

export const selectedNatureState = atom<Nature>({
  key: 'selectedNatureState',
  default: {
    name: 'がんばりや',
    stats: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  },
})

export const levelState = atom<number | ''>({
  key: 'levelState',
  default: 50,
})
