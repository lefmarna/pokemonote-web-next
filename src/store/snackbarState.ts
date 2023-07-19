import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import type { AlertColor } from '@mui/material'

type SnackBar = {
  isOpen: boolean
  message: string
  severity: AlertColor | undefined
}

export const snackbarRecoilState = atom<SnackBar>({
  key: 'snackbarState',
  default: {
    isOpen: false,
    message: '',
    severity: undefined,
  },
})

export const useSnackbarState = () => {
  return useRecoilValue(snackbarRecoilState)
}

export const useSnackbarMutators = () => {
  const setSnackbar = useSetRecoilState(snackbarRecoilState)

  const showSnackBar = useCallback(
    (newMessage: string, newSeverity: AlertColor = 'success') => {
      setSnackbar({
        isOpen: true,
        message: newMessage,
        severity: newSeverity,
      })
    },
    [setSnackbar]
  )

  const closeSnackbar = useCallback(() => {
    setSnackbar({
      isOpen: false,
      message: '',
      severity: undefined,
    })
  }, [setSnackbar])

  return {
    showSnackBar,
    closeSnackbar,
  }
}
