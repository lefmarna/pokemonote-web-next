'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { $axios } from '@/libs/axios'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { PokemonTableTemplate } from '@/components/templates/PokemonTableTemplate'
import { useAuthUserState } from '@/store/authUserState'
import type { PokemonSummary, ShowUser, User } from '@/types'

export const UserShow = () => {
  const [user, setUser] = useState<User | null>(null)
  const [pokemonSummaries, setPokemonSummaries] = useState<PokemonSummary[]>([])
  const authUser = useAuthUserState()

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await $axios.get<{ data: ShowUser }>(
          `/api/v2/users/${searchParams.get('username')}`
        )
        const showUser = response.data.data
        setUser(showUser.user)
        setPokemonSummaries(showUser.pokemons)
      } catch (error) {
        router.push('/')
      }
    })()
  }, [searchParams, router])

  if (user === null) return <LoadingPageTemplate />

  const title =
    authUser?.username === user.username
      ? 'マイページ'
      : `${user.username}さんの投稿`

  return <PokemonTableTemplate title={title} pokemons={pokemonSummaries} />
}
