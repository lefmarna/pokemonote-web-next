'use client'

import {
  Dialog,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Stack,
} from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import type { ReactNode } from 'react'

type Props = {
  title: string
  cancelButtonText?: string
  submitButtonText: string
  isDanger?: boolean
  isLoading?: boolean
  children: ReactNode
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

export const DialogCard = (props: Props) => {
  const {
    title,
    cancelButtonText = 'キャンセル',
    submitButtonText,
    isDanger = false,
    isLoading = false,
    open,
    onSubmit,
    onClose,
    children,
  } = props

  const handleSubmit = () => {
    onSubmit()
  }

  const submitButtonColor = isDanger ? 'error' : 'primary'

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" sx={{ py: 3 }}>
      <Card sx={{ p: 3 }}>
        <CardHeader title={title} titleTypographyProps={{ align: 'center' }} />
        <CardContent>
          <Stack spacing={4}>{children}</Stack>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant="outlined"
            color="secondary"
            disabled={isLoading}
            onClick={onClose}
            sx={{ minWidth: 125 }}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant="contained"
            color={submitButtonColor}
            disabled={isLoading}
            onClick={handleSubmit}
            sx={{ minWidth: 125 }}
          >
            {isLoading ? <CircularProgress size={24} /> : submitButtonText}
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}
