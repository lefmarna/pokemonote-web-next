import { Typography } from '@mui/material'
import React, { memo } from 'react'

type Props = {
  text: string
}

export const Title = memo(function Title(props: Props) {
  const { text } = props

  return (
    <div>
      <Typography id="title" sx={{ fontWeight: 'bold', my: 2 }} variant="h5">
        {text}
      </Typography>
    </div>
  )
})
