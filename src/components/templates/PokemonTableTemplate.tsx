'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { DataGrid, jaJP } from '@mui/x-data-grid'
import { useRouter, useSearchParams } from 'next/navigation'
import { $axios } from '@/libs/axios'
import { useEmotion } from '@/hooks/style/useEmotion'
import { useAuthUserState } from '@/store/authUserState'
import type { PokemonSummary } from '@/types'
import type { GridRenderCellParams } from '@mui/x-data-grid'

type Props = {
  title: string
  pokemons?: PokemonSummary[]
}

export const PokemonTableTemplate = (props: Props) => {
  const { title, pokemons = [] } = props
  const { StyledLink } = useEmotion()

  const router = useRouter()
  const searchParams = useSearchParams()

  const authUser = useAuthUserState()

  const columns = [
    {
      field: 'pokemonName',
      headerName: 'ポケモン名',
      flex: 1,
      renderCell: (params: GridRenderCellParams<PokemonSummary>) => (
        <StyledLink
          href={{
            pathname: '/pokemons/show',
            query: { id: params.row.id },
          }}
        >
          {params.row.pokemonName}
        </StyledLink>
      ),
    },
    { field: 'level', headerName: 'レベル', flex: 1 },
    { field: 'natureName', headerName: '性格', flex: 1 },
    {
      field: 'stats',
      headerName: 'ステータス',
      flex: 1,
      renderCell: (params: GridRenderCellParams<PokemonSummary>) => (
        <div>
          {params.row.stats}
          <IconButton
            onClick={() => navigator.clipboard.writeText(params.row.stats)}
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: 'username',
      headerName: '投稿者',
      flex: 1,
      renderCell: (params: GridRenderCellParams<PokemonSummary>) =>
        params.row.user.username === searchParams.get('username') ? (
          <div>
            <IconButton
              onClick={() => router.push(`/pokemons/edit/?id=${params.row.id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deletePokemon(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <StyledLink
            href={{
              pathname: '/users/show',
              query: { username: params.row.user.username },
            }}
          >
            {params.row.user.username}
          </StyledLink>
        ),
    },
  ]

  const writeToClipboard = (clipText: string): void => {
    navigator.clipboard.writeText(clipText).catch((e) => {
      console.error(e)
    })
  }

  const editItem = (item: PokemonSummary): void => {
    if (item.user.username === authUser?.username) {
      router.push(`/pokemons/edit?id=${item.id}`)
    } else {
      router.push('/')
    }
  }

  const deletePokemon = async (id: number): Promise<void> => {
    try {
      await $axios.delete(`/api/v2/pokemons/${id}`)
      // 削除するポケモンのデータを探す
      const deletePokemon = pokemons.findIndex(
        (pokemon: PokemonSummary) => pokemon.id === id
      )
      // 配列から要素を削除
      pokemons.splice(deletePokemon, 1)
    } catch (error) {
      console.log(error)
      router.push('/')
    }
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div>{title}</div>
      <DataGrid
        columns={columns}
        rows={pokemons}
        sortingOrder={['desc', 'asc']}
        autoHeight
        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  )
}
