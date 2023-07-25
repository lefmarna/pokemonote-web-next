'use client'

import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import { useAuthUserState } from '@/store/authUserState'
import type { PokemonSummary, User } from '@/types'

type Props = {
  user: User
  pokemonSummaries: PokemonSummary[]
}

export const UserShow = (props: Props) => {
  const { user, pokemonSummaries } = props
  const authUser = useAuthUserState()

  if (user === null) return <LoadingPageTemplate />

  const title =
    authUser?.username === user.username
      ? 'マイページ'
      : `${user.username}さんの投稿`

  return <PokemonTableTemplate title={title} pokemons={pokemonSummaries} />
}
