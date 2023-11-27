'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSWROpenApi } from '@/libs/swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import { useAuthUserState } from '@/store/authUserState'
import type { User } from '@/types/openapi/schemas'
import type { PokemonSummary } from '@/types/openapi/schemas'

export const UserDetail = () => {
  const authUser = useAuthUserState()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [user, setUser] = useState<User | null>(null)
  const [pokemonSummaries, setPokemonSummaries] = useState<PokemonSummary[]>([])
  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  )

  const { data, isLoading, error } = useSWROpenApi({
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

  if (isLoading || user === null) return <LoadingPageTemplate />

  const PER_PAGE = 10
  const pageCount = Math.ceil(pokemonSummaries.length / PER_PAGE)

  const paginate = {
    currentPage,
    perPage: PER_PAGE,
    count: pageCount,
    total: pokemonSummaries.length,
  }

  const chunkArray = <T,>(array: T[], chunkSize: number) =>
    Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
      array.slice(index * chunkSize, (index + 1) * chunkSize)
    )

  const chunkedPokemons = chunkArray(pokemonSummaries, PER_PAGE)

  const title =
    authUser?.username === user.username
      ? 'マイページ'
      : `${user.username}さんの投稿`

  return (
    <PokemonTableTemplate
      title={title}
      pokemons={chunkedPokemons[currentPage - 1]}
      paginate={paginate}
    />
  )
}
