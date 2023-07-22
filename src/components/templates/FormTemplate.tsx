'use client'

import { LoadingButton } from '@mui/lab'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useEmotion } from '@/hooks/style/useEmotion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  buttonText?: string
  isLoading?: boolean
  errors?: string[]
  links?: { href: string; text: string }[]
  onSubmit?: () => void
}

export const FormTemplate = (props: Props) => {
  const {
    children,
    title,
    buttonText = '',
    errors = [],
    isLoading = false,
    links = [],
    onSubmit,
  } = props

  const { StyledLink } = useEmotion()

  return (
    <form>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Stack spacing={4}>
          <Typography align="center" variant="h5">
            Pokemonote - {title}
          </Typography>
          {children}
          {buttonText && (
            <LoadingButton
              onClick={onSubmit}
              color="primary"
              variant="contained"
              size="large"
              loading={isLoading}
            >
              {buttonText}
            </LoadingButton>
          )}
        </Stack>
        {errors.length > 0 && (
          <List sx={{ mt: 3 }}>
            {errors.map((error, index) => {
              return (
                <ListItem disableGutters key={index}>
                  <ListItemText
                    primaryTypographyProps={{ color: 'error.main' }}
                  >
                    {error}
                  </ListItemText>
                </ListItem>
              )
            })}
          </List>
        )}
        {links.length > 0 && (
          <Stack spacing={2} sx={{ mt: 4, fontSize: '.875rem' }}>
            {links.map((link, index) => {
              return (
                <StyledLink href={link.href} key={index}>
                  {link.text}
                </StyledLink>
              )
            })}
          </Stack>
        )}
      </Container>
    </form>
  )
}
