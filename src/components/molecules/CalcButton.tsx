import { Button, SxProps, Theme } from '@mui/material'
import { MouseEvent } from 'react'

type Props = {
  children: number
  disabled?: boolean
  sx?: SxProps<Theme>
  onClick: (event: MouseEvent<HTMLElement>, children: number) => void
}

export const CalcButton = (props: Props) => {
  const { children, disabled = false, sx, onClick } = props

  return (
    <Button
      centerRipple
      color="secondary"
      disabled={disabled}
      onClick={(e) => onClick(e, children)}
      size="small"
      sx={{
        px: 0,
        ...sx,
      }}
      variant="contained"
    >
      {children}
    </Button>
  )
}
