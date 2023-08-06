import { getMetadata } from '@/libs/metadata'
import { PokemonEdit } from './PokemonEdit'

export const metadata = getMetadata('ポケモン編集')

export default function Page() {
  return <PokemonEdit />
}
