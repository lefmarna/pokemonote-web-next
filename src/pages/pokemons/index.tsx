import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import useSWR from 'swr'

export default function Pokemons() {
  const { data, isLoading } = useSWR('/pokemons')

  console.log(data)

  if (isLoading) return <div>loading...</div>

  return (
    <>
      <PokemonTableTemplate title="ポケモン一覧" />
    </>
  )
}
