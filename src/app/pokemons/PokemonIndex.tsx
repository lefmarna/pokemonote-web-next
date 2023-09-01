'use client'

import { useOpenApiSWR } from '@/libs/swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'

export const PokemonIndex = () => {
  const { data, isLoading } = useOpenApiSWR('/api/v2/pokemons')

  if (isLoading) return <LoadingPageTemplate />

  return <PokemonTableTemplate title="ポケモン一覧" pokemons={data?.data} />
}
