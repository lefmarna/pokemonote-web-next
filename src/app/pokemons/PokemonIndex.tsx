'use client'

import useSWR from 'swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import type { SchemaOf } from '@/types/openapi'

export const PokemonIndex = () => {
  const path = '/api/v2/pokemons'
  const { data, isLoading } = useSWR<SchemaOf<typeof path, 'get'>>(path)

  if (isLoading) return <LoadingPageTemplate />

  return <PokemonTableTemplate title="ポケモン一覧" pokemons={data?.data} />
}
