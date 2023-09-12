'use client'

import { useSWROpenApi } from '@/libs/swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'

export const PokemonIndex = () => {
  const { data, isLoading } = useSWROpenApi({
    url: '/api/v2/pokemons',
  })

  if (isLoading) return <LoadingPageTemplate />

  return <PokemonTableTemplate title="ポケモン一覧" pokemons={data?.data} />
}
