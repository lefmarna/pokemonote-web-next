import { Button } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export const CalcButton = (props: Props) => {
  const { children, disabled = false, onClick } = props

  return (
    <Button
      centerRipple
      color="secondary"
      disabled={disabled}
      onClick={onClick}
      size="small"
      sx={{ px: 0 }}
      variant="contained"
    >
      {children}
    </Button>
  )
}
