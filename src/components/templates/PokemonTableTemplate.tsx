'use client'

import { AccountCircle } from '@mui/icons-material'
import { Box, Container, Grid, Pagination, TextField } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Title } from '@/components/molecules/Title'
import { PostedPokemon } from '@/components/organisms/PostedPokemon'
import { useMediaQueryUp } from '@/hooks/style/useMediaQueries'
import { requestOpenApi } from '@/utils/helpers'
import type { PokemonSummary } from '@/types/openapi/schemas'
import type { ChangeEvent, KeyboardEvent } from 'react'

type Props = {
  title: string
  pokemons?: PokemonSummary[]
}

export const PokemonTableTemplate = (props: Props) => {
  const { title, pokemons = [] } = props

  const router = useRouter()
  const pathname = usePathname()
  const isMdUp = useMediaQueryUp('md')

  const searchParams = useSearchParams()
  const initSearch = searchParams.get('search')

  const [searchText, setSearchText] = useState(initSearch)
  const [deletedPokemonIds, setDeletedPokemonIds] = useState<number[]>([])

  const filteredPokemons = pokemons.filter((pokemon) => {
    return !deletedPokemonIds.includes(pokemon.id)
  })

  const createUrlWithParams = (
    pathname: string,
    params: Record<string, string | null>
  ): string => {
    const query = Object.keys(params)
      .filter((key) => params[key] != null)
      .map((key) => `${key}=${encodeURIComponent(params[key] as string)}`)
      .join('&')

    return `${pathname}${query ? `?${query}` : ''}`
  }

  const handleChangePage = (e: ChangeEvent<unknown>, value: number) => {
    const url = createUrlWithParams(pathname, {
      page: value ? String(value) : null,
      search: searchText,
    })
    router.push(url)
  }

  const onChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const onKeyDownSearchText = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return
    if (!(e.target instanceof HTMLInputElement)) return

    const currentPage = searchParams.get('page')
    const url = createUrlWithParams(pathname, {
      page: currentPage,
      search: searchText,
    })
    router.replace(url, {
      scroll: false,
    })
  }

  const onBlurSearchText = () => {
    const currentPage = searchParams.get('page')
    const url = createUrlWithParams(pathname, {
      page: currentPage,
      search: searchText,
    })
    router.replace(url, {
      scroll: false,
    })
  }

  useEffect(() => {
    setSearchText(initSearch)
  }, [initSearch])

  const handleDeletePokemon = useCallback(
    async (id: number) => {
      try {
        await requestOpenApi({
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

  return (
    <Container disableGutters sx={{ my: 3 }}>
      <Box sx={{ px: 1.5 }}>
        <Title text={title} />
      </Box>
      <TextField
        value={searchText ?? ''}
        onChange={onChangeSearchText}
        onKeyDown={onKeyDownSearchText}
        onBlur={onBlurSearchText}
        InputProps={{
          startAdornment: <AccountCircle />,
        }}
      />
      <Grid container>
        {filteredPokemons.map((pokemon, index) => (
          <PostedPokemon
            key={pokemon.id}
            title={title}
            pokemon={pokemon}
            handleDeletePokemon={handleDeletePokemon}
            isLastLine={isLastLine(index)}
          />
        ))}
        <Grid
          item
          sx={{
            mt: 2,
            mx: 'auto',
          }}
        >
          <Pagination color="primary" count={10} onChange={handleChangePage} />
        </Grid>
      </Grid>
    </Container>
  )
}
