import styled from '@emotion/styled'
import Link from 'next/link'

export const useEmotion = () => {
  const StyledLink = styled(Link)`
    color: #1976d2;
    text-decoration: underline;

    &:visited {
      color: #551a8b;
    }

    &:active {
      color: #ff0000;
    }
  `

  return {
    StyledLink,
  }
}
