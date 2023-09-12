'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSWROpenApi } from '@/libs/swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import { useAuthUserState } from '@/store/authUserState'
import type { User } from '@/types/openapi/schemas'
import type { PokemonSummary } from '@/types/openapi/schemas'

export const UserShow = () => {
  const [user, setUser] = useState<User | null>(null)
  const [pokemonSummaries, setPokemonSummaries] = useState<PokemonSummary[]>([])
  const authUser = useAuthUserState()

  const router = useRouter()
  const searchParams = useSearchParams()

  const { data, error } = useSWROpenApi({
    url: '/api/v2/users/{username}',
    path: {
      username: searchParams.get('username') ?? '',
    },
  })

  useEffect(() => {
    if (data === undefined) return

    setUser(data.data.user)
    setPokemonSummaries(data.data.pokemons)
  }, [data])

  useEffect(() => {
    if (error === undefined) return

    router.push('/')
  }, [error, router])

  if (user === null) return <LoadingPageTemplate />

  const title =
    authUser?.username === user.username
      ? 'マイページ'
      : `${user.username}さんの投稿`

  return <PokemonTableTemplate title={title} pokemons={pokemonSummaries} />
}
