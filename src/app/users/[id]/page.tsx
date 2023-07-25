import { notFound } from 'next/navigation'
import { $axios } from '@/libs/axios'
import { UserShow } from './UserShow'
import type { ShowUser } from '@/types'

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const response = await $axios.get<{ data: ShowUser }>(`/users/${params.id}`)
    const showUser = response.data.data

    return (
      <UserShow user={showUser.user} pokemonSummaries={showUser.pokemons} />
    )
  } catch (e) {
    return notFound()
  }
}
