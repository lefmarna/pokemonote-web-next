'use client'

import { exit } from 'process'
import { Alert, Slide } from '@mui/material'
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
    <Slide
      in={snackbar.isOpen}
      timeout={{ appear: 100, enter: 200, exit: 500 }}
      direction="left"
      // anchorOrigin={snackbar.anchorOrigin}
      // sx={sx}
    >
      <Alert
        severity={snackbar.severity}
        variant="filled"
        sx={{ position: 'absolute', zIndex: '2000', width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Slide>
  )
}

export default SnackbarComponent
