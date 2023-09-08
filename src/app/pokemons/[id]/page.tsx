import { PokemonS } from './PokemonS'
import { getMetadata } from '@/utils/helpers'

export const dynamic = 'error'
export const dynamicParams = true

export const metadata = getMetadata('ポケモンS')

export default function Page() {
  return <PokemonS />
}
