'use client'

import { Box, Slide } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import { useSnackbarMutators, useSnackbarState } from '@/store/snackbarState'

function SnackbarComponent() {
  const snackbar = useSnackbarState()

  const { closeSnackbar } = useSnackbarMutators()

  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={Slide}
    >
      <Box
        bgcolor="success.main"
        color="white"
        sx={{
          px: 2,
          py: 1,
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        {snackbar.message}
      </Box>
    </Snackbar>
  )
}

export default SnackbarComponent
