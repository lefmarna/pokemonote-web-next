import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import type { PokemonBasicInfo } from '@/types/openapi/schemas'

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
