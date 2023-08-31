'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { $axios } from '@/libs/axios'
import { useAuthUserMutators } from '@/store/authUserState'
import { useIsInitializationMutators } from '@/store/isInitializationState'
import { useNaturesMutators } from '@/store/naturesState'
import { usePokemonBasicInfosSMutators } from '@/store/pokemonBasicInfosState'
import type { Response } from '@/types/openapi/extractor'

export const AppInit = () => {
  const { updateAuthUser } = useAuthUserMutators()

  const { updatePokemonBasicInfos } = usePokemonBasicInfosSMutators()
  const { updateNatures } = useNaturesMutators()

  const { completeInitialization } = useIsInitializationMutators()

  // CSRFトークンの取得完了フラグ
  const [isCompleteCsrfCookie, setIsCompleteCsrfCookie] = useState(false)

  const checkLoginPath = '/api/v2/init/login'
  const { data: loginData } = useSWR<Response<typeof checkLoginPath, 'get'>>(
    isCompleteCsrfCookie ? checkLoginPath : null
  )

  const initFetchPath = '/api/v2/init/fetch'
  const { data: StaticData } = useSWR<Response<typeof initFetchPath, 'get'>>(
    isCompleteCsrfCookie ? initFetchPath : null
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
