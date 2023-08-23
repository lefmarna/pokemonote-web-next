'use client'

import { Dialog, Card, CardActions, CardHeader } from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import type { ReactNode } from 'react'

type Props = {
  title: string
  cancelButtonText?: string
  submitButtonText: string
  isDanger?: boolean
  isLoading?: boolean
  children: ReactNode
  onSubmit: () => void
}

export const DialogCard = (props: Props) => {
  const {
    title,
    cancelButtonText = 'キャンセル',
    submitButtonText,
    isDanger = false,
    isLoading = false,
    onSubmit,
    children,
  } = props
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = () => {
    onSubmit()
    handleClose()
  }

  const submitButtonColor = isDanger ? 'error' : 'primary'

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <Card>
          <CardHeader className="justify-center">{title}</CardHeader>
          <CardActions className="justify-space-around">
            <Button
              variant="outlined"
              color="secondary"
              disabled={isLoading}
              onClick={handleClose}
              style={{ minWidth: 125 }}
            >
              {cancelButtonText}
            </Button>
            <Button
              variant="contained"
              color={submitButtonColor}
              disabled={isLoading}
              onClick={handleSubmit}
              style={{ minWidth: 125 }}
            >
              {isLoading ? <CircularProgress size={24} /> : submitButtonText}
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </>
  )
}
