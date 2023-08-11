'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { $axios } from '@/libs/axios'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { usePokemonMutators, usePokemonState } from '@/store/pokemonState'
import type { PokemonParams } from '@/types'

export const CalcStats = () => {
  const pokemon = usePokemonState()
  const {
    updateBasicInfo,
    updateNature,
    updateLevel,
    updateIvs,
    updateEvs,
    updateDescription,
  } = usePokemonMutators()

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const sendPokemon = async (params: PokemonParams) => {
    setIsLoading(true)
    try {
      const response = await $axios.post('/api/v2/pokemons', params)
      router.push(`/pokemons/show?id=${response.data.data.id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CalcStatsTemplate
      title="ステータス計算機（ポケモンSV）"
      buttonText="投稿する"
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
