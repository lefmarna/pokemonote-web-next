'use client'

import { Alert, Fade, Slide } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import { useSnackbarMutators, useSnackbarState } from '@/store/snackbarState'
import type { SxProps, Theme } from '@mui/material'

type Props = {
  sx?: SxProps<Theme>
}

function SnackbarComponent(props: Props) {
  const { sx = undefined } = props
  const snackbar = useSnackbarState()

  const { closeSnackbar } = useSnackbarMutators()

  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      TransitionComponent={(props) => <Slide {...props} direction="left" />}
      anchorOrigin={snackbar.anchorOrigin}
      sx={sx}
    >
      <Alert
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
