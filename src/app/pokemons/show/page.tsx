import { PokemonShow } from './PokemonShow'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('ポケモン詳細')

export default function Page() {
  return <PokemonShow />
}
