import { getMetadata } from '@/libs/metadata'
import { PokemonIndex } from './PokemonIndex'

export const metadata = getMetadata('みんなの投稿')

export default function Page() {
  return <PokemonIndex />
}
