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
    baseStats: {
      hp: 75,
      attack: 140,
      defense: 65,
      spAttack: 112,
      spDefense: 65,
      speed: 110,
    },
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
