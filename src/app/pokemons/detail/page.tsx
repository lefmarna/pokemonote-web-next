import { PokemonDetail } from './PokemonDetail'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('ポケモン詳細')

export default function Page() {
  return <PokemonDetail />
}
