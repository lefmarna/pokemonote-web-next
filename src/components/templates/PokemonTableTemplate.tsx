'use client'

import { Search } from '@mui/icons-material'
import {
  Box,
  Container,
  Grid,
  Pagination,
  TextField,
  styled,
} from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { theme } from '@/libs/mui'
import { AdCode } from '../organisms/AdCode'
import { Title } from '@/components/molecules/Title'
import { PostedPokemon } from '@/components/organisms/PostedPokemon'
import {
  useMediaQueryDown,
  useMediaQueryUp,
} from '@/hooks/style/useMediaQueries'
import { requestOpenapi } from '@/utils/helpers'
import type { Paginate } from '@/types/front'
import type { PokemonSummary } from '@/types/openapi/schemas'
import type { ChangeEvent, KeyboardEvent } from 'react'

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
  title: string
  pokemons?: PokemonSummary[]
  paginate?: Paginate
}

export const PokemonTableTemplate = (props: Props) => {
  const { title, pokemons = [], paginate = undefined } = props

  const router = useRouter()
  const pathname = usePathname()
  const isMdUp = useMediaQueryUp('md')
  const isSmDown = useMediaQueryDown('sm')

  const searchParams = useSearchParams()
  const initSearch = searchParams.get('search')

  const [searchText, setSearchText] = useState(initSearch ?? '')
  const [deletedPokemonIds, setDeletedPokemonIds] = useState<number[]>([])

  const isSameSearchText = searchText === (initSearch ?? '')

  const filteredPokemons = pokemons.filter((pokemon) => {
    return !deletedPokemonIds.includes(pokemon.id)
  })

  const renderPokemons = () => {
    return filteredPokemons.flatMap((pokemon, index) => {
      const item = [
        <Grid item xs={12} md={6} key={pokemon.id}>
          <StyledBox isSmDown={isSmDown} isLastLine={isLastLine(index)}>
            <PostedPokemon
              title={title}
              pokemon={pokemon}
              handleDeletePokemon={handleDeletePokemon}
            />
          </StyledBox>
        </Grid>,
      ]

      // 4つ目と8つ目の要素の前にAdCodeを挿入する
      if (index !== 3 && index !== 7) return item

      return [
        <Grid item xs={12} md={6} key={`ad-${index}`}>
          <StyledBox
            isSmDown={isSmDown}
            isLastLine={isLastLine(index)}
            isAdsense
          >
            <AdCode
              slot="8228947029"
              style={{ display: 'block', width: '100%', height: '115.5px' }}
              format="fluid"
            />
          </StyledBox>
        </Grid>,
        ...item,
      ]
    })
  }

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
      search: searchText !== '' ? searchText : null,
    })
    router.push(url)
  }

  const onChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const onKeyDownSearchText = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return
    if (!(e.target instanceof HTMLInputElement)) return
    if (isSameSearchText) return

    const url = createUrlWithParams(pathname, {
      page: '1',
      search: searchText !== '' ? searchText : null,
    })
    router.replace(url, {
      scroll: false,
    })
  }

  const onBlurSearchText = () => {
    if (isSameSearchText) return

    const url = createUrlWithParams(pathname, {
      page: searchParams.get('page'),
      search: searchText !== '' ? searchText : null,
    })
    router.replace(url, {
      scroll: false,
    })
  }

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

  return (
    <Container disableGutters sx={{ my: 3 }}>
      <Box sx={{ px: 1.5 }}>
        <Title text={title} />
      </Box>
      <Box sx={{ textAlign: 'right', mb: 2, pr: 2 }}>
        <TextField
          value={searchText}
          onChange={onChangeSearchText}
          onKeyDown={onKeyDownSearchText}
          onBlur={onBlurSearchText}
          placeholder="Search"
          variant="standard"
          InputProps={{
            endAdornment: <Search sx={{ color: theme.palette.grey[600] }} />,
          }}
        />
      </Box>
      <Grid container>
        {renderPokemons()}
        {/* {filteredPokemons.map((pokemon, index) => (
          <PostedPokemon
            key={pokemon.id}
            title={title}
            pokemon={pokemon}
            handleDeletePokemon={handleDeletePokemon}
            isLastLine={isLastLine(index)}
          />
        ))} */}
        <Grid
          item
          sx={{
            mt: 2,
            mx: 'auto',
          }}
        >
          {paginate && (
            <Pagination
              color="primary"
              count={paginate.count}
              page={paginate.currentPage}
              onChange={handleChangePage}
              sx={{ mt: 1 }}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
