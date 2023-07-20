import { getMetadata } from '@/libs/metadata'
import { PokemonShow } from './PokemonShow'

export const metadata = getMetadata('ポケモン詳細')

export default function Page() {
  return <PokemonShow />
}
