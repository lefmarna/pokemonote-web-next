'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSWROpenApi } from '@/libs/swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import { useAuthUserState } from '@/store/authUserState'
import type { User, PokemonSummary } from '@/types/openapi/schemas'

export const UserDetail = () => {
  const authUser = useAuthUserState()
  const searchParams = useSearchParams()

  const [user, setUser] = useState<User | null>(null)
  const [pokemonSummaries, setPokemonSummaries] = useState<PokemonSummary[]>([])
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1

  const { data, isLoading } = useSWROpenApi({
    url: '/api/v2/users/{username}',
    path: {
      username: searchParams.get('username') ?? '',
    },
    query: {
      page: searchParams.get('page') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    },
  })

  useEffect(() => {
    if (data === undefined) return

    setUser(data.data.user)
    setPokemonSummaries(data.data.pokemons)
  }, [data])

  if (isLoading) return <LoadingPageTemplate />

  const paginate = {
    currentPage,
    perPage: 10,
    count: 3,
    total: pokemonSummaries.length ?? 0,
  }

  const title =
    authUser?.username === user?.username
      ? 'マイページ'
      : `${user?.username}さんの投稿`

  return (
    <PokemonTableTemplate
      title={title}
      pokemons={pokemonSummaries}
      paginate={paginate}
    />
  )
}
