import Snackbar from '@mui/material/Snackbar'
import { useSnackbarMutators, useSnackbarState } from '@/store/snackbarState'
import { Alert } from '@mui/material'

function SnackbarComponent() {
  const snackbar = useSnackbarState()

  const { closeSnackbar } = useSnackbarMutators()

  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
