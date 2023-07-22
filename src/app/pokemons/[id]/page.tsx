import { notFound } from 'next/navigation'
import { $axios } from '@/libs/axios'
import { getMetadata } from '@/libs/metadata'
import { PokemonShow } from './PokemonShow'
import type { PokemonSummary } from '@/types'

export const metadata = getMetadata('ポケモン詳細')

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const response = await $axios.get<{ data: PokemonSummary }>(
      `/pokemons/${params.id}`
    )
    return <PokemonShow pokemonSummary={response.data.data} />
  } catch (e) {
    return notFound()
  }
}
