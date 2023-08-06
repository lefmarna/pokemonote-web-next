'use client'

import { Alert, Snackbar } from '@mui/material'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

export const MessageAlert = (props: Props) => {
  const { open, setOpen } = props

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        ログインしました
      </Alert>
    </Snackbar>
  )
}
