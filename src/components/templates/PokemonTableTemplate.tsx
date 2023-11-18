'use client'

import { Search } from '@mui/icons-material'
import { Box, Container, Grid, Pagination, TextField } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { theme } from '@/libs/mui'
import { Title } from '@/components/molecules/Title'
import { PokemonCards } from '@/components/organisms/PokemonCards'
import type { Paginate } from '@/types/front'
import type { PokemonSummary } from '@/types/openapi/schemas'
import type { ChangeEvent, KeyboardEvent } from 'react'

type Props = {
  title: string
  pokemons?: PokemonSummary[]
  paginate?: Paginate
}

export const PokemonTableTemplate = (props: Props) => {
  const { title, pokemons = [], paginate = undefined } = props
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = useSearchParams()
  const initSearch = searchParams.get('search')

  const [searchText, setSearchText] = useState(initSearch ?? '')
  const isSameSearchText = searchText === (initSearch ?? '')

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
        <PokemonCards pokemons={pokemons} />
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
