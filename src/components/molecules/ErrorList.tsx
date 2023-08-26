import { List, ListItem, ListItemText } from '@mui/material'
import { memo } from 'react'
import type { SxProps } from '@mui/material'

type Props = {
  errors: string[]
  sx?: SxProps
}

export const ErrorList = memo(function ErrorList(props: Props) {
  const { errors, sx = undefined } = props

  if (errors.length === 0) return null

  return (
    <List sx={sx}>
      {errors.map((error, index) => (
        <ListItem disableGutters key={index}>
          <ListItemText primaryTypographyProps={{ color: 'error.main' }}>
            {error}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
})
