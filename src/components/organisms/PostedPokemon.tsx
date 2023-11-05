import { ContentCopy } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'
import { useMediaQueryDown } from '@/hooks/style/useMediaQueries'
import { SLink } from '@/styles'
import type { PokemonSummary } from '@/types/openapi/schemas'

type Props = {
  pokemon: PokemonSummary
}

export const PostedPokemon = (props: Props) => {
  const { pokemon } = props
  const isSmDown = useMediaQueryDown('sm')

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
        <Box sx={{ wordBreak: 'break-word', mb: 1 }}>
          {'291(155)-289(119)-264(150)-175(138)-244(177)-201(173)'}
          <ContentCopy sx={{ cursor: 'pointer' }} />
        </Box>
        {/* <Box sx={{ wordBreak: 'break-word' }}>{pokemon.stats}</Box> */}
        <Box sx={{ wordBreak: 'break-word' }}>
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
      </Box>
    </Grid>
  )
}
