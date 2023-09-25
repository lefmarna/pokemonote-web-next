import { Box } from '@mui/material'

export const PostedPokemon = () => {
  return (
    <div>
      <div>ポケモン名</div>
      <Box sx={{ display: 'flex' }}>
        <div>Lv 50</div>
        <Box sx={{ ml: 2 }}>がんばりや</Box>
      </Box>
      <div>300-120-120-120-120-120</div>
    </div>
  )
}
