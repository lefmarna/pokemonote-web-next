import { SxProps, Theme } from '@mui/material'

export function useResponsiveStyles() {
  const breakpoints = {
    iPhone8Plus: 414,
    android: 360,
    iPhoneSE: 320,
  }

  const createResponsiveStyle =
    (device: keyof typeof breakpoints) => (styles: SxProps<Theme>) => {
      return {
        [`@media (max-width:${breakpoints[device]}px)`]: styles,
      }
    }

  const iPhone8PlusStyle = createResponsiveStyle('iPhone8Plus')
  const androidStyle = createResponsiveStyle('android')
  const iPhoneSEStyle = createResponsiveStyle('iPhoneSE')

  return { iPhone8PlusStyle, androidStyle, iPhoneSEStyle }
}
