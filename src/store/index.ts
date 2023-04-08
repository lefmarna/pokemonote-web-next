import { atom } from 'recoil'
import { Nature, PokemonBasicInfo } from '../types'

export const pokemonDataState = atom<PokemonBasicInfo[]>({
  key: 'pokemonDataState',
  default: [],
})

export const natureDataState = atom<Nature[]>({
  key: 'natureDataState',
  default: [],
})
