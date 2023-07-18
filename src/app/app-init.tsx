'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { useAuthUserMutators } from '@/store/authUserState'
import { useIsInitializationMutators } from '@/store/isInitializationState'
import { useNaturesMutators } from '@/store/naturesState'
import { usePokemonBasicInfosSMutators } from '@/store/pokemonBasicInfosState'
import type { AuthUser, Nature, PokemonBasicInfo } from '@/types'

export const AppInit = () => {
  const { updateAuthUser } = useAuthUserMutators()

  const { updatePokemonBasicInfos } = usePokemonBasicInfosSMutators()
  const { updateNatures } = useNaturesMutators()

  const { completeInitialization } = useIsInitializationMutators()

  const { data: loginData } = useSWR<{
    data: {
      auth_user: AuthUser | null
    }
  }>('/init/login', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const { data: StaticData } = useSWR<{
    data: {
      pokemon_basic_infos: PokemonBasicInfo[]
      natures: Nature[]
    }
  }>('/init/fetch', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useEffect(() => {
    if (!loginData || !StaticData) return
    updateAuthUser(loginData.data.auth_user)
    updatePokemonBasicInfos(StaticData.data.pokemon_basic_infos)
    updateNatures(StaticData.data.natures)
    completeInitialization()
  }, [
    loginData,
    StaticData,
    completeInitialization,
    updateAuthUser,
    updatePokemonBasicInfos,
    updateNatures,
  ])

  return null
}
