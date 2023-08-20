'use client'

import { useEffect } from 'react'
import { $axios } from '@/libs/axios'
import { useAuthUserMutators } from '@/store/authUserState'
import { useIsInitializationMutators } from '@/store/isInitializationState'
import { useNaturesMutators } from '@/store/naturesState'
import { usePokemonBasicInfosSMutators } from '@/store/pokemonBasicInfosState'
import { requestApi } from '@/utils/helpers'

export const AppInit = () => {
  const { updateAuthUser } = useAuthUserMutators()

  const { updatePokemonBasicInfos } = usePokemonBasicInfosSMutators()
  const { updateNatures } = useNaturesMutators()

  const { completeInitialization } = useIsInitializationMutators()

  useEffect(() => {
    ;(async () => {
      await $axios.get('/sanctum/csrf-cookie')

      const [loginData, StaticData] = await Promise.all([
        requestApi({
          url: '/api/v2/init/login',
          method: 'get',
        }),
        requestApi({
          url: '/api/v2/init/fetch',
          method: 'get',
        }),
      ])

      updateAuthUser(loginData.data.data)
      updatePokemonBasicInfos(StaticData.data.data.pokemonBasicInfos)
      updateNatures(StaticData.data.data.natures)

      completeInitialization()
    })()
  }, [
    completeInitialization,
    updateAuthUser,
    updateNatures,
    updatePokemonBasicInfos,
  ])

  return null
}
