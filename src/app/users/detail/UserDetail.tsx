'use client'

import { useSearchParams } from 'next/navigation'
import { useSWROpenApi } from '@/libs/swr'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import { useAuthUserState } from '@/store/authUserState'

export const UserDetail = () => {
  const authUser = useAuthUserState()
  const searchParams = useSearchParams()

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

  if (isLoading) return <LoadingPageTemplate />

  const title =
    authUser?.username === data?.data.user.username
      ? 'マイページ'
      : `${data?.data.user.username}さんの投稿`

  return (
    <PokemonTableTemplate
      title={title}
      pokemons={data?.data.pokemons.data}
      paginate={data?.data.pokemons.paginate}
    />
  )
}
