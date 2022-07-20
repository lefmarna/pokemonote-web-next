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
