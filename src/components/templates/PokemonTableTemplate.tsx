'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { DataGrid, jaJP } from '@mui/x-data-grid'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useAuthUserState } from '@/store/authUserState'
import { SLink } from '@/styles'
import { requestOpenApi } from '@/utils/helpers'
import type { PokemonSummary } from '@/types/openapi/schemas'
import type { GridRenderCellParams } from '@mui/x-data-grid'

type Props = {
  title: string
  pokemons?: PokemonSummary[]
}

export const PokemonTableTemplate = (props: Props) => {
  const { title, pokemons = [] } = props

  const router = useRouter()
  const searchParams = useSearchParams()

  const authUser = useAuthUserState()

  const [deletedPokemonIds, setDeletedPokemonIds] = useState<number[]>([])

  const filteredPokemons = pokemons.filter((pokemon) => {
    return !deletedPokemonIds.includes(pokemon.id)
  })

  const columns = [
    {
      field: 'pokemonName',
      headerName: 'ポケモン名',
      flex: 1,
      renderCell: (params: GridRenderCellParams<PokemonSummary>) => (
        <SLink
          href={{
            pathname: '/pokemons/show',
            query: { id: params.row.id },
          }}
        >
          {params.row.pokemonName}
        </SLink>
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
          <SLink
            href={{
              pathname: '/users/show',
              query: { username: params.row.user.username },
            }}
          >
            {params.row.user.username}
          </SLink>
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
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div>{title}</div>
      <DataGrid
        columns={columns}
        rows={filteredPokemons}
        sortingOrder={['desc', 'asc']}
        autoHeight
        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  )
}
