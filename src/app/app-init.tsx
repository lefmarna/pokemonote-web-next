'use client'

import { useEffect, useState } from 'react'
import { $axios } from '@/libs/axios'
import { useSWROpenApi } from '@/libs/swr'
import { useAuthUserMutators } from '@/store/authUserState'
import { useIsInitializationMutators } from '@/store/isInitializationState'
import { useNaturesMutators } from '@/store/naturesState'
import { usePokemonBasicInfosSMutators } from '@/store/pokemonBasicInfosState'

export const AppInit = () => {
  const { updateAuthUser } = useAuthUserMutators()

  const { updatePokemonBasicInfos } = usePokemonBasicInfosSMutators()
  const { updateNatures } = useNaturesMutators()

  const { completeInitialization } = useIsInitializationMutators()

  // CSRFトークンの取得完了フラグ
  const [isCompleteCsrfCookie, setIsCompleteCsrfCookie] = useState(false)

  const { data: loginData } = useSWROpenApi(
    isCompleteCsrfCookie
      ? {
          url: '/api/v2/init/login',
        }
      : null
  )

  const { data: StaticData } = useSWROpenApi(
    isCompleteCsrfCookie
      ? {
          url: '/api/v2/init/fetch',
        }
      : null
  )

  useEffect(() => {
    ;(async () => {
      await $axios.get('/sanctum/csrf-cookie')
      setIsCompleteCsrfCookie(true)
    })()
  }, [])

  useEffect(() => {
    if (!loginData || !StaticData) return
    updateAuthUser(loginData.data)
    updatePokemonBasicInfos(StaticData.data.pokemonBasicInfos)
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
