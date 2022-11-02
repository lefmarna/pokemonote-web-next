import { Button, styled, SxProps, Theme } from '@mui/material'
import { MouseEvent } from 'react'

type Props = {
  children: number
  disabled?: boolean
  sx?: SxProps<Theme>
  onClick: (event: MouseEvent<HTMLElement>, children: number) => void
}

export const CalcButton = (props: Props) => {
  const { children, disabled = false, sx, onClick } = props

  const StyledButton = styled(Button)({
    minWidth: '3em',
  })

  return (
    <StyledButton
      centerRipple
      color="secondary"
      disabled={disabled}
      onClick={(e) => onClick(e, children)}
      size="small"
      sx={{
        px: 0,
        minWidth: '3em',
        '@media screen and (max-width: 320x)': {
          minWidth: '2.8em',
        },
        ...sx,
      }}
      variant="contained"
    >
      {children}
    </StyledButton>
  )
}
