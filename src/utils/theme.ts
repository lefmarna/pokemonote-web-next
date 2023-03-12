import { Breakpoints, createTheme, useMediaQuery } from '@mui/material'

type Breakpoint = keyof Breakpoints['values']

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    secondary: {
      main: '#424242',
    },
  },
})

export const useMediaQueryUp = (breakpoint: Breakpoint) => {
  return useMediaQuery(theme.breakpoints.up(breakpoint))
}

export const useMediaQueryDown = (breakpoint: Breakpoint) => {
  return useMediaQuery(theme.breakpoints.down(breakpoint))
}
