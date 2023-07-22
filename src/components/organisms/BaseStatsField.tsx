'use client'

import { Grid, TextField } from '@mui/material'
import { memo } from 'react'
import { LOWER_NATURE, UPPER_NATURE } from '@/utils/constants'

type Props = {
  value: number
  statsInitial: string
  natureStat: number
}

export const BaseStatsField = memo(function BaseStatsField(props: Props) {
  const { value, statsInitial, natureStat } = props

  const getTextFieldColor = () => {
    switch (natureStat) {
      case UPPER_NATURE:
        return 'red'
      case LOWER_NATURE:
        return 'blue'
      default:
        return undefined
    }
  }

  return (
    <Grid item xs={33}>
      <TextField
        label="種族値"
        placeholder="0"
        value={`${statsInitial}${value}`}
        variant="standard"
        InputLabelProps={{
          shrink: true,
          sx: {
            userSelect: 'none',
          },
        }}
        disabled
        sx={{
          '& .MuiInputBase-input': {
            WebkitTextFillColor: getTextFieldColor(),
            userSelect: 'none',
          },
        }}
      />
    </Grid>
  )
})
