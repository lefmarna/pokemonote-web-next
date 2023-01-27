import { Button, Container, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  buttonText: string
  isLoading?: boolean
  errors?: string[]
  submit: () => void
}

export const FormTemplate = (props: Props) => {
  const { children, title, buttonText, isLoading = false, submit, errors = [] } = props

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={4}>
        <Typography align="center" variant="h5">
          Pokemonote - {title}
        </Typography>
        {children}
        <Button
          onClick={submit}
          color="primary"
          variant="contained"
          size="large"
          disabled={isLoading}
        >
          {buttonText}
        </Button>
      </Stack>
    </Container>
  )
}
