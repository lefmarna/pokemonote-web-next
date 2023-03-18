import { PokemonData } from '@/types'
import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const selectedPokemonRecoilState = atom<PokemonData>({
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

export const useSelectedPokemonState = () => {
  return useRecoilValue(selectedPokemonRecoilState)
}

export const useSelectedPokemonMutators = () => {
  const setSelectedPokemon = useSetRecoilState(selectedPokemonRecoilState)

  /**
   * ポケモンを更新する
   */
  const updateSelectedPokemon = useCallback(
    (pokemon: PokemonData) => {
      setSelectedPokemon(pokemon)
    },
    [setSelectedPokemon]
  )

  return { updateSelectedPokemon }
}
