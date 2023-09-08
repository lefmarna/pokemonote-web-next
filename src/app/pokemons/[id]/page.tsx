import { PokemonS } from './PokemonS'
import { getMetadata } from '@/utils/helpers'

export const dynamic = 'force-static'
export const dynamicParams = true

export const metadata = getMetadata('ポケモンS')

export default function Page() {
  return <PokemonS />
}
