import { useMediaQuery } from '@mui/material'
import { theme } from './theme'
import type { Breakpoints } from '@mui/material'

type Breakpoint = keyof Breakpoints['values']

export const useMediaQueryUp = (breakpoint: Breakpoint) => {
  return useMediaQuery(theme.breakpoints.up(breakpoint))
}

export const useMediaQueryDown = (breakpoint: Breakpoint) => {
  return useMediaQuery(theme.breakpoints.down(breakpoint))
}
