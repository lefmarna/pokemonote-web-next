import { Box, Button, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useMediaQueryDown } from '@/hooks/style/useMediaQueries'
import { useAuthUserState } from '@/store/authUserState'
import { SLink } from '@/styles'
import type { PokemonSummary } from '@/types/openapi/schemas'
import type { MouseEvent } from 'react'

type Props = {
  title: string
  pokemon: PokemonSummary
}

export const PostedPokemon = (props: Props) => {
  const { title, pokemon } = props
  const isSmDown = useMediaQueryDown('sm')
  const authUser = useAuthUserState()
  const router = useRouter()

  const onClickCopyIcon = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLDivElement)) return
    navigator.clipboard.writeText(event.target.innerText).catch((e) => {
      console.error(e)
    })
  }

  const editPokemon = () => {
    if (pokemon.user.username === authUser?.username) {
      router.push(`/pokemons/${pokemon.id}/edit`)
    } else {
      router.push('/')
    }
  }

  const deletePokemon = async () => {
    // try {
    //   await $axios.delete(`/pokemons/${id}`)
    //   // 削除するポケモンのデータを探す
    //   const deletePokemon = pokemonTable.value.findIndex(
    //     (pokemon: Pokemon) => pokemon.id === id
    //   )
    //   // 配列から要素を削除
    //   pokemonTable.value.splice(deletePokemon, 1)
    // } catch (error) {
    //   console.log(error)
    //   router.push('/')
    // }
  }

  const nameWrapper = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }

  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          maxWidth: isSmDown ? '100%' : 'calc(100% - 24px)',
          border: '0.5px solid #E0E0E0',
          p: 2,
          fontSize: '15px',
          mx: 'auto',
        }}
      >
        <Box sx={nameWrapper}>
          <Box sx={{ fontSize: '1.1rem', fontWeight: 'bold', mb: 1 }}>
            {/* {'ヒヒダルマ(ダルマ・ガラル)'} */}
            {pokemon.pokemonName}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box>Lv {pokemon.level ?? ''}</Box>
            <Box sx={{ ml: 2 }}>{pokemon.natureName}</Box>
          </Box>
        </Box>
        <Box sx={{ wordBreak: 'break-word', mb: 1 }} onClick={onClickCopyIcon}>
          {'291(155)-289(119)-264(150)-175(138)-244(177)-201(173)'}
        </Box>
        {/* <Box sx={{ wordBreak: 'break-word' }}>{pokemon.stats}</Box> */}
        {title === 'マイページ' &&
        authUser?.username === pokemon.user.username ? (
          <div>
            <Button onClick={editPokemon}>編集</Button>
            <Button onClick={deletePokemon}>削除</Button>
          </div>
        ) : (
          <Box
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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
      </Box>
    </Grid>
  )
}
