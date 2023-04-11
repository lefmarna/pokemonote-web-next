import React from 'react'
import { Typography } from '@mui/material'

type Props = {
  text: string
}

export const Title = (props: Props) => {
  const { text } = props

  return (
    <div>
      <Typography id="title" sx={{ fontWeight: 'bold', my: 2 }} variant="h5">
        {text}
      </Typography>
    </div>
  )
}
