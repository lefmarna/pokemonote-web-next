import { Box } from '@mui/material'

type Props = {
  pokemonName: string
  level: number
  natureName: string
  stats: string
}

export const PostedPokemon = (props: Props) => {
  const { pokemonName, level, natureName, stats } = props

  return (
    <div>
      <Box>{pokemonName}</Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>Lv {level}</Box>
        <Box sx={{ ml: 2 }}>{natureName}</Box>
      </Box>
      <Box sx={{ fontSize: '12px' }}>{stats}</Box>
      <Box>投稿者：</Box>
    </div>
  )
}
