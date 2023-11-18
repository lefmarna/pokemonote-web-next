import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { memo, type MouseEvent } from 'react'
import { useAuthUserState } from '@/store/authUserState'
import { SLink } from '@/styles'
import type { PokemonSummary } from '@/types/openapi/schemas'

type Props = {
  title: string
  pokemon: PokemonSummary
  handleDeletePokemon: (id: number) => Promise<void>
}

export const PokemonCard = memo(function PokemonCard(props: Props) {
  const { title, pokemon, handleDeletePokemon } = props
  const authUser = useAuthUserState()
  const router = useRouter()

  const onClickPokemonName = () => {
    router.push(`/pokemons/show?id=${pokemon.id}`)
  }

  const onClickCopyIcon = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLDivElement)) return
    navigator.clipboard.writeText(event.target.innerText).catch((e) => {
      console.error(e)
    })
  }

  const editPokemon = () => {
    if (pokemon.user.username === authUser?.username) {
      router.push(`/pokemons/edit?id=${pokemon.id}`)
    } else {
      router.push('/')
    }
  }

  const onClickDeleteButton = () => {
    handleDeletePokemon(pokemon.id)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          onClick={onClickPokemonName}
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontSize: '18px',
            fontWeight: 'bold',
            mb: 1,
          }}
        >
          {pokemon.pokemonName}
        </Box>
        <Box
          sx={{
            width: '140px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Box>Lv {pokemon.level ?? ''}</Box>
          <Box sx={{ ml: 2 }}>{pokemon.natureName}</Box>
        </Box>
      </Box>
      <Box
        sx={{ cursor: 'pointer', wordBreak: 'break-word', mb: 1 }}
        onClick={onClickCopyIcon}
      >
        {pokemon.stats}
      </Box>
      {title === 'マイページ' &&
      authUser?.username === pokemon.user.username ? (
        <div>
          <Button onClick={editPokemon}>編集</Button>
          <Button onClick={onClickDeleteButton}>削除</Button>
        </div>
      ) : (
        <Box
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontSize: '12px',
          }}
        >
          投稿者：
          <SLink
            href={{
              pathname: '/users/show',
              query: { username: pokemon.user.username },
            }}
          >
            {pokemon.user.nickname}
          </SLink>
        </Box>
      )}
    </>
  )
})
