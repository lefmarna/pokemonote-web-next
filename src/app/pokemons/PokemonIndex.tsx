'use client'

import { useSearchParams } from 'next/navigation'
import { useSWROpenApi } from '@/libs/swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'

export const PokemonIndex = () => {
  const searchParams = useSearchParams()

  const { data, isLoading } = useSWROpenApi({
    url: '/api/v2/pokemons',
    query: {
      page: searchParams.get('page') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    },
  })

  if (isLoading) return <LoadingPageTemplate />

  return (
    <PokemonTableTemplate
      title="ポケモン一覧"
      pokemons={data?.data}
      paginate={data?.paginate}
    />
  )
}
