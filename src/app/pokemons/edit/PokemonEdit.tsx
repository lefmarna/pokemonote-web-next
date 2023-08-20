'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { CalcStatsTemplate } from '@/components/templates/CalcStatsTemplate'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { authMiddleware } from '@/hocs/authMiddleware'
import { useNaturesState } from '@/store/naturesState'
import { usePokemonBasicInfosState } from '@/store/pokemonBasicInfosState'
import { requestApi } from '@/utils/helpers/requestApi'
import type {
  Nature,
  NullableStats,
  Pokemon,
  PokemonBasicInfo,
} from '@/types/front'
import type { PokemonPostParams } from '@/types/openapi/schemas'

export const PokemonEdit = authMiddleware(() => {
  const searchParams = useSearchParams()
  const pokemonId = searchParams.get('id')
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  const pokemonBasicInfos = usePokemonBasicInfosState()
  const natures = useNaturesState()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await requestApi({
          url: '/api/v2/pokemons/{id}/edit',
          method: 'get',
          pathParameters: {
            id: pokemonId ?? '',
          },
        })
        const data = response.data.data
        const basicInfo = pokemonBasicInfos.find(
          (basicInfo: PokemonBasicInfo) => basicInfo.name === data.pokemonName
        )
        const nature = natures.find(
          (nature: Nature) => nature.name === data.natureName
        )

        if (basicInfo === undefined || nature === undefined) return

        setPokemon({
          ...data,
          basicInfo: basicInfo,
          nature: nature,
        })
      } catch (error) {
        router.push('/')
      }
    })()
  }, [pokemonId, router, natures, pokemonBasicInfos])

  /**
   * ポケモンの基本情報を更新する
   */
  const updateBasicInfo = useCallback(
    (newBasicInfo: PokemonBasicInfo) => {
      setPokemon((prevState) => {
        if (prevState === null) return null

        return {
          ...prevState,
          basicInfo: newBasicInfo,
        }
      })
    },
    [setPokemon]
  )

  /**
   * ポケモンの性格を更新する
   */
  const updateNature = useCallback(
    (newNature: Nature) => {
      setPokemon((prevState) => {
        if (prevState === null) return null

        return {
          ...prevState,
          nature: newNature,
        }
      })
    },
    [setPokemon]
  )

  /**
   * ポケモンのレベルを更新する
   */
  const updateLevel = useCallback(
    (newLevel: number | null) => {
      setPokemon((prevState) => {
        if (prevState === null) return null

        return {
          ...prevState,
          level: newLevel,
        }
      })
    },
    [setPokemon]
  )

  /**
   * ポケモンの個体値を更新する
   */
  const updateIvs = useCallback(
    (newIvs: Partial<NullableStats>) => {
      setPokemon((prevState) => {
        if (prevState === null) return null

        return {
          ...prevState,
          ivs: {
            ...prevState.ivs,
            ...newIvs,
          },
        }
      })
    },
    [setPokemon]
  )

  /**
   * ポケモンの努力値を更新する
   */
  const updateEvs = useCallback(
    (newEvs: Partial<NullableStats>) => {
      setPokemon((prevState) => {
        if (prevState === null) return null

        return {
          ...prevState,
          evs: {
            ...prevState.evs,
            ...newEvs,
          },
        }
      })
    },
    [setPokemon]
  )

  /**
   * ポケモンの説明を更新する
   */
  const updateDescription = useCallback(
    (newDescription: string) => {
      setPokemon((prevState) => {
        if (prevState === null) return null

        return {
          ...prevState,
          description: newDescription,
        }
      })
    },
    [setPokemon]
  )

  const sendPokemon = async (params: PokemonPostParams) => {
    setIsLoading(true)
    try {
      await requestApi({
        url: '/api/v2/pokemons/{id}',
        method: 'put',
        pathParameters: {
          id: pokemonId ?? '',
        },
        data: params,
      })
      router.push(`/pokemons/show?id=${pokemonId}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (pokemon === null) return <LoadingPageTemplate />

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
})
