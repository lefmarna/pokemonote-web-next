import { css, CSSObject } from '@emotion/react'

const breakpointIPhone8Plus = 414
const breakpointAndroid = 360
const breakpointIPhoneSE = 320

const iPhone8Plus = (styles: CSSObject) => css`
  @media (max-width: ${breakpointIPhone8Plus}px) {
    ${styles}
  }
`

const Android = (styles: CSSObject) => css`
  @media (max-width: ${breakpointAndroid}px) {
    ${styles}
  }
`

const iPhoneSE = (styles: CSSObject) => css`
  @media (max-width: ${breakpointIPhoneSE}px) {
    ${styles}
  }
`
