import { PokemonIndex } from './PokemonIndex'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'みんなの投稿',
}

export default function Page() {
  return <PokemonIndex />
}
