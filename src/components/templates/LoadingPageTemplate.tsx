import { Box, CircularProgress } from '@mui/material'

export const LoadingPageTemplate = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
      }}
    >
      <CircularProgress
        sx={{
          width: '100%',
          height: 'auto',
        }}
      />
    </Box>
  )
}
