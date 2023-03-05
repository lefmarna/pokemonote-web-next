import { Pokemon } from '@/types'
import { useRouter } from 'next/router'

type Props = {
  title: string
  pokemons?: Pokemon[]
}

export const PokemonTableTemplate = (props: Props) => {
  const { title, pokemons = [] } = props

  const router = useRouter()

  return <div>{title}</div>
}
