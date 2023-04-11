import { PokemonBasicInfo } from '@/types'
import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

export const pokemonBasicInfosRecoilState = atom<PokemonBasicInfo[]>({
  key: 'pokemonBasicInfosState',
  default: [],
})

export const usePokemonBasicInfosState = () => {
  return useRecoilValue(pokemonBasicInfosRecoilState)
}

export const usePokemonBasicInfosSMutators = () => {
  const setPokemonBasicInfos = useSetRecoilState(pokemonBasicInfosRecoilState)

  /**
   * ポケモン一覧を更新する
   */
  const updatePokemonBasicInfos = useCallback(
    (pokemonBasicInfos: PokemonBasicInfo[]) => {
      setPokemonBasicInfos(pokemonBasicInfos)
    },
    [setPokemonBasicInfos]
  )

  return { updatePokemonBasicInfos }
}
