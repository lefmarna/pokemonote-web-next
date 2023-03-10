import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
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
    <form>
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
        {errors.length > 0 && (
          <List sx={{ mt: 3 }}>
            {errors.map((error, index) => {
              return (
                <ListItem disableGutters key={index}>
                  <ListItemText primaryTypographyProps={{ color: 'error.main' }}>
                    {error}
                  </ListItemText>
                </ListItem>
              )
            })}
          </List>
        )}
      </Container>
    </form>
  )
}
