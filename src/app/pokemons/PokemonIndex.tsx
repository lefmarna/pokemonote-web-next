'use client'

import useSWR from 'swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import type { PokemonIndexResponse } from '@/types/openapi'

export const PokemonIndex = () => {
  const { data, isLoading } = useSWR<PokemonIndexResponse>('/pokemons')

  if (isLoading) return <LoadingPageTemplate />

  return <PokemonTableTemplate title="ポケモン一覧" pokemons={data?.data} />
}
