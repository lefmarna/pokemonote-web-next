'use client'

import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import { PokemonSummary } from '@/types'
import useSWR from 'swr'

export const PokemonIndex = () => {
  const { data, isLoading } = useSWR<{ data: PokemonSummary[] }>('/pokemons')

  if (isLoading) return <LoadingPageTemplate />

  return (
    <>
      <PokemonTableTemplate title="ポケモン一覧" pokemons={data?.data} />
    </>
  )
}
