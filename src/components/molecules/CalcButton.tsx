import { Button } from '@mui/material'
import { MouseEvent } from 'react'

type Props = {
  children: number
  disabled?: boolean
  onClick: (event: MouseEvent<HTMLElement>, children: number) => void
}

export const CalcButton = (props: Props) => {
  const { children, disabled = false, onClick } = props

  return (
    <Button
      centerRipple
      color="secondary"
      disabled={disabled}
      onClick={(e) => onClick(e, children)}
      size="small"
      sx={{ px: 0 }}
      variant="contained"
    >
      {children}
    </Button>
  )
}
