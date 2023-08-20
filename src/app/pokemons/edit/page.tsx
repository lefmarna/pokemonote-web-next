import { PokemonEdit } from './PokemonEdit'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('ポケモン編集')

export default function Page() {
  return <PokemonEdit />
}
