'use client'

import { title } from 'process'
import { Grid, styled } from '@mui/material'
import { theme } from '@/libs/mui'
import { AdCode } from '@/components/organisms/AdCode'
import { PokemonCard } from '@/components/organisms/PokemonCard'
import { useMediaQueryUp } from '@/hooks/style/useMediaQueries'
import type { PokemonSummary } from '@/types/openapi/schemas'

const StyledBox = styled('div')(
  ({
    isSmDown,
    isLastLine,
    isAdsense = false,
  }: {
    isSmDown: boolean
    isLastLine: boolean
    isAdsense?: boolean
  }) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: isLastLine ? `1px solid ${theme.palette.divider}` : 'none',
    borderLeft: isSmDown ? 'none' : `1px solid ${theme.palette.divider}`,
    borderRight: isSmDown ? 'none' : `1px solid ${theme.palette.divider}`,
    fontSize: '15px',
    padding: isAdsense ? '0 0 -1px 0' : `${theme.spacing(2)}`,
    margin: '0 auto',
    marginBottom: isAdsense ? '0px' : '-1px',
    maxWidth: isSmDown ? '100%' : 'calc(100% - 24px)',
  })
)

type Props = {
  pokemons: PokemonSummary[]
  isSmDown: boolean
  handleDeletePokemon: (id: number) => Promise<void>
  isLastLine: (index: number) => boolean
}

export const PokemonCards = (props: Props) => {
  const { pokemons, isSmDown, handleDeletePokemon, isLastLine } = props
  const isMdUp = useMediaQueryUp('md')

  return pokemons.flatMap((pokemon, index) => {
    const item = (
      <Grid item xs={12} md={6} key={pokemon.id}>
        <StyledBox isSmDown={isSmDown} isLastLine={isLastLine(index)}>
          <PokemonCard
            title={title}
            pokemon={pokemon}
            handleDeletePokemon={handleDeletePokemon}
          />
        </StyledBox>
      </Grid>
    )

    if (isMdUp) return item
    if (index % 4 !== 3) return item

    return [
      <Grid item xs={12} md={6} key={`ad-${index}`}>
        <StyledBox isSmDown={isSmDown} isLastLine={isLastLine(index)} isAdsense>
          <AdCode
            slot="8228947029"
            style={{ display: 'block', width: '100%' }}
            format="fluid"
          />
        </StyledBox>
      </Grid>,
      item,
    ]
  })
}
