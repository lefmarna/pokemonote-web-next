import { Nature, NullableStats, Pokemon, PokemonBasicInfo } from '@/types'
import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const pokemonRecoilState = atom<Pokemon>({
  key: 'PokemonState',
  default: {
    basicInfo: {
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
    level: 50,
    nature: {
      name: 'がんばりや',
      increasedStat: null,
      decreasedStat: null,
    },
    ivs: {
      hp: 31,
      attack: 31,
      defense: 31,
      spAttack: 31,
      spDefense: 31,
      speed: 31,
    },
    evs: {
      hp: '',
      attack: '',
      defense: '',
      spAttack: '',
      spDefense: '',
      speed: '',
    },
  },
})

export const usePokemonState = () => {
  return useRecoilValue(pokemonRecoilState)
}

export const usePokemonMutators = () => {
  const setPokemon = useSetRecoilState(pokemonRecoilState)

  /**
   * ポケモンを更新する
   */
  const updatePokemon = useCallback(
    (pokemon: Pokemon) => {
      setPokemon(pokemon)
    },
    [setPokemon]
  )

  /**
   * ポケモンの性格を更新する
   */
  const updateNature = useCallback(
    (newNature: Nature) => {
      setPokemon((prevState) => ({
        ...prevState,
        nature: newNature,
      }))
    },
    [setPokemon]
  )

  /**
   * ポケモンの基本情報を更新する
   */
  const updateBasicInfo = useCallback(
    (newBasicInfo: PokemonBasicInfo) => {
      setPokemon((prevState) => ({
        ...prevState,
        basicInfo: newBasicInfo,
      }))
    },
    [setPokemon]
  )

  /**
   * ポケモンのレベルを更新する
   */
  const updateLevel = useCallback(
    (newLevel: number | '') => {
      setPokemon((prevState) => ({
        ...prevState,
        level: newLevel,
      }))
    },
    [setPokemon]
  )

  /**
   * ポケモンの個体値を更新する
   */
  const updateIvs = useCallback(
    (newIvs: Partial<NullableStats>) => {
      setPokemon((prevState) => ({
        ...prevState,
        ivs: {
          ...prevState.ivs,
          ...newIvs,
        },
      }))
    },
    [setPokemon]
  )

  /**
   * ポケモンの努力値を更新する
   */
  const updateEvs = useCallback(
    (newEvs: Partial<NullableStats>) => {
      setPokemon((prevState) => ({
        ...prevState,
        evs: {
          ...prevState.evs,
          ...newEvs,
        },
      }))
    },
    [setPokemon]
  )

  return {
    updatePokemon,
    updateBasicInfo,
    updateNature,
    updateLevel,
    updateIvs,
    updateEvs,
  }
}
