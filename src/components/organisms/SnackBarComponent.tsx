'use client'

import { Box } from '@mui/material'
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
    >
      <Box
        bgcolor="success.main"
        color="white"
        sx={{
          px: 2,
          py: 1,
        }}
      >
        {snackbar.message}
      </Box>
    </Snackbar>
  )
}

export default SnackbarComponent
