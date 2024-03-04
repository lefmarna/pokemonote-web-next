import { Suspense } from 'react'
import { PokemonIndex } from './PokemonIndex'
import { getMetadata } from '@/utils/helpers'

export const metadata = getMetadata('みんなの投稿')

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PokemonIndex />
    </Suspense>
  )
}
