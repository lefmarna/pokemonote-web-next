import { List, ListItem, ListItemText } from '@mui/material'

type Props = {
  errors: string[]
}

export const ErrorList = (props: Props) => {
  const { errors } = props

  if (errors.length === 0) return null

  return (
    <List>
      {errors.map((error, index) => (
        <ListItem disableGutters key={index}>
          <ListItemText primaryTypographyProps={{ color: 'error.main' }}>
            {error}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}
