'use client'

import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoginAlert } from '@/components/molecules/LoginAlert'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { useAuthUserState } from '@/store/authUserState'
import { usePokemonMutators, usePokemonState } from '@/store/pokemonState'
import { requestOpenapi } from '@/utils/helpers'
import type { PokemonPostParams } from '@/types/openapi/schemas'

export const CalcStats = () => {
  const authUser = useAuthUserState()
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

  const sendPokemon = async (params: PokemonPostParams) => {
    setIsLoading(true)
    try {
      const response = await requestOpenapi({
        url: '/api/v2/pokemons',
        method: 'post',
        data: params,
      })
      router.push(`/pokemons/detail?id=${response.data.data.id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {!authUser && (
        <Box sx={{ pt: 1.5, px: 1.5 }}>
          <LoginAlert />
        </Box>
      )}
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
    </div>
  )
}
