import { useAuthUserState } from '@/store/authUserState'
import { PokemonSummary } from '@/types'
import { DataGrid, GridRenderCellParams, jaJP } from '@mui/x-data-grid'
import axios from 'axios'
import { IconButton, Link } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'

type Props = {
  title: string
  pokemons?: PokemonSummary[]
}

const PokemonTableTemplate = (props: Props) => {
  const { title, pokemons = [] } = props

  const router = useRouter()

  const authUser = useAuthUserState()

  const columns = [
    {
      field: 'name',
      headerName: 'ポケモン名',
      flex: 1,
      renderCell: (params: GridRenderCellParams<PokemonSummary>) => (
        <Link href={`/pokemons/${params.row.id}`}>{params.row.name}</Link>
      ),
    },
    { field: 'lv', headerName: 'レベル', flex: 1 },
    { field: 'nature', headerName: '性格', flex: 1 },
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
        params.row.user.username === router.query.username ? (
          <div>
            <IconButton
              onClick={() => router.push(`/pokemons/${params.row.id}/edit`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deletePokemon(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <Link href={`/users/${params.row.user.username}`}>
            {params.row.user.username}
          </Link>
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
      router.push(`/pokemons/${item.id}/edit`)
    } else {
      router.push('/')
    }
  }

  const deletePokemon = async (id: number): Promise<void> => {
    try {
      await axios.delete(`/pokemons/${id}`)
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

export default PokemonTableTemplate
