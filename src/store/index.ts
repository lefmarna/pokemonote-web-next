import { atom } from 'recoil'
import { Nature, PokemonData, Stat } from '../types'

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

export const statsState = atom<Stat[]>({
  key: 'statsState',
  default: [
    {
      name: 'ＨＰ',
      initial: 'H',
      individualValue: 31,
      effortValue: '',
      realNumber: 150,
    },
    {
      name: 'こうげき',
      initial: 'A',
      individualValue: 31,
      effortValue: '',
      realNumber: 160,
    },
    {
      name: 'ぼうぎょ',
      initial: 'B',
      individualValue: 31,
      effortValue: '',
      realNumber: 85,
    },
    {
      name: 'とくこう',
      initial: 'C',
      individualValue: 31,
      effortValue: '',
      realNumber: 132,
    },
    {
      name: 'とくぼう',
      initial: 'D',
      individualValue: 31,
      effortValue: '',
      realNumber: 85,
    },
    {
      name: 'すばやさ',
      initial: 'S',
      individualValue: 31,
      effortValue: '',
      realNumber: 130,
    },
  ],
})
