import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import type { AlertColor, SnackbarOrigin } from '@mui/material'

type SnackBar = {
  isOpen: boolean
  message: string
  severity: AlertColor | undefined
  anchorOrigin: SnackbarOrigin | undefined
}

export const snackbarRecoilState = atom<SnackBar>({
  key: 'snackbarState',
  default: {
    isOpen: false,
    message: '',
    severity: undefined,
    anchorOrigin: undefined,
  },
})

export const useSnackbarState = () => {
  return useRecoilValue(snackbarRecoilState)
}

export const useSnackbarMutators = () => {
  const setSnackbar = useSetRecoilState(snackbarRecoilState)

  const showSnackBar = useCallback(
    (
      message: string,
      severity: AlertColor = 'success',
      anchorOrigin: SnackbarOrigin = {
        vertical: 'bottom',
        horizontal: 'center',
      }
    ) => {
      setSnackbar({
        isOpen: true,
        message,
        severity,
        anchorOrigin,
      })
    },
    [setSnackbar]
  )

  const closeSnackbar = useCallback(() => {
    setSnackbar({
      isOpen: false,
      message: '',
      severity: undefined,
      anchorOrigin: undefined,
    })
  }, [setSnackbar])

  return {
    showSnackBar,
    closeSnackbar,
  }
}
