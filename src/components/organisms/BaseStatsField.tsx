import { Grid, TextField } from '@mui/material'

type Props = {
  baseStat: number
  statsInitial: string
  natureStat: number
}

export const BaseStatsField = (props: Props) => {
  const { baseStat, statsInitial, natureStat } = props

  return (
    <Grid xs={3} spacing={3}>
      <TextField
        label="種族値"
        placeholder="0"
        value={`${statsInitial}${baseStat}`}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        disabled
      />
    </Grid>
  )
}
