'use client'

import { NextPage } from 'next'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { usePokemonMutators, usePokemonState } from '@/store/pokemonState'
import { PokemonParams } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CalcStats: NextPage = () => {
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
      const response = await axios.post('/pokemons', params)
      router.push(`/pokemons/${response.data.data.id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CalcStatsTemplate
      title="ステータス計算機"
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

export default CalcStats
