import { Grid, TextField } from '@mui/material'
import styles from '@/styles/Home.module.scss'
import { LOWER_NATURE, UPPER_NATURE } from '@/utils/constants'
import { memo } from 'react'

type Props = {
  value: number
  statsInitial: string
  natureStat: number
}

export const BaseStatsField = memo((props: Props) => {
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
        className={styles.dander}
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
