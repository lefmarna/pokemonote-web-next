'use client'

import { title } from 'process'
import { Grid, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { theme } from '@/libs/mui'
import { AdCode } from '@/components/organisms/AdCode'
import { PokemonCard } from '@/components/organisms/PokemonCard'
import {
  useMediaQueryDown,
  useMediaQueryUp,
} from '@/hooks/style/useMediaQueries'
import { requestOpenapi } from '@/utils/helpers'
import type { PokemonSummary } from '@/types/openapi/schemas'

const PokemonCardWrapper = styled('div')(
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
}

export const PokemonCards = (props: Props) => {
  const { pokemons } = props
  const router = useRouter()

  const isSmDown = useMediaQueryDown('sm')
  const isMdUp = useMediaQueryUp('md')

  const [deletedPokemonIds, setDeletedPokemonIds] = useState<number[]>([])
  const filteredPokemons = pokemons.filter((pokemon) => {
    return !deletedPokemonIds.includes(pokemon.id)
  })

  const handleDeletePokemon = useCallback(
    async (id: number) => {
      try {
        await requestOpenapi({
          url: '/api/v2/pokemons/{id}',
          method: 'delete',
          path: {
            id: String(id),
          },
        })
        // フロント側でもテーブルから削除する必要がある
        setDeletedPokemonIds((prevDeletedPokemonIds) => [
          ...prevDeletedPokemonIds,
          id,
        ])
      } catch (error) {
        console.log(error)
        router.push('/')
      }
    },
    [router]
  )

  const isLastLine = useCallback(
    (index: number) => {
      if (isMdUp) return index >= pokemons.length - 2
      return index === pokemons.length - 1
    },
    [pokemons.length, isMdUp]
  )

  return filteredPokemons.flatMap((pokemon, index) => {
    const item = (
      <Grid item xs={12} md={6} key={pokemon.id}>
        <PokemonCardWrapper isSmDown={isSmDown} isLastLine={isLastLine(index)}>
          <PokemonCard
            title={title}
            pokemon={pokemon}
            handleDeletePokemon={handleDeletePokemon}
          />
        </PokemonCardWrapper>
      </Grid>
    )

    if (isMdUp) return item
    if (index % 4 !== 3) return item

    return [
      <Grid item xs={12} md={6} key={`ad-${index}`}>
        <PokemonCardWrapper
          isSmDown={isSmDown}
          isLastLine={isLastLine(index)}
          isAdsense
        >
          <AdCode slot="8228947029" format="rectangle" />
        </PokemonCardWrapper>
      </Grid>,
      item,
    ]
  })
}
