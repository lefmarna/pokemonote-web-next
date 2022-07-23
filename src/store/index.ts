import { atom } from 'recoil'
import { Nature, PokemonData } from '../types'

export const authUserState = atom({
  key: 'authUserState',
  default: {
    id: null,
    username: '',
    nickname: '',
    email: '',
    email_verified_at: false,
  },
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
