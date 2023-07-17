import { Metadata } from 'next'
import { PokemonIndex } from './PokemonIndex'

export const metadata: Metadata = {
  title: 'みんなの投稿',
}

export default function Page() {
  return <PokemonIndex />
}
