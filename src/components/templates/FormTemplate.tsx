'use client'

import { LoadingButton } from '@mui/lab'
import { Container, Stack, Typography } from '@mui/material'
import { ErrorList } from '../molecules/ErrorList'
import { SLink } from '@/styles'
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
        <ErrorList errors={errors} sx={{ mt: 3 }} />
        {links.length > 0 && (
          <Stack spacing={2} sx={{ mt: 4, fontSize: '.875rem' }}>
            {links.map((link, index) => {
              return (
                <SLink href={link.href} key={index}>
                  {link.text}
                </SLink>
              )
            })}
          </Stack>
        )}
      </Container>
    </form>
  )
}
