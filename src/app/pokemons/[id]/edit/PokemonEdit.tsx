'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { $axios } from '@/libs/axios'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import type { Nature, NullableStats, Pokemon, PokemonBasicInfo } from '@/types'

export const PokemonEdit = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const [pokemon, setPokemon] = useState<Pokemon>({
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
    description: '',
  })

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

  /**
   * ポケモンの説明を更新する
   */
  const updateDescription = useCallback(
    (newDescription: string) => {
      setPokemon((prevState) => ({
        ...prevState,
        description: newDescription,
      }))
    },
    [setPokemon]
  )

  const sendPokemon = async () => {
    setIsLoading(true)
    try {
      await $axios.put(`/pokemons/${pathname}`)
      router.push(`/pokemons/${pathname}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CalcStatsTemplate
      title="ポケモン編集"
      buttonText="更新する"
      pokemon={pokemon}
      isLoading={isLoading}
      updateBasicInfo={updateBasicInfo}
      updateNature={updateNature}
      updateLevel={updateLevel}
      updateIvs={updateIvs}
      updateEvs={updateEvs}
      sendPokemon={sendPokemon}
      updateDescription={updateDescription}
    />
  )
}
