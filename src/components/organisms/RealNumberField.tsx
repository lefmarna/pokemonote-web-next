import { Grid, TextField } from '@mui/material'
import { useRef } from 'react'
import { Stat } from '../../types'

type Props = {
  realNumber: number
  stats: Stat[]
  statsIndex: number
}

export const RealNumberField = (props: Props) => {
  const { realNumber, stats, statsIndex } = props

  const realNumberRef = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!realNumberRef || !realNumberRef.current) return
    realNumberRef.current.select()
  }

  return (
    <Grid xs={5} sx={{ pl: { xs: 2, sm: 3 } }}>
      <TextField
        type="tel"
        label={stats[statsIndex].name}
        value={realNumber}
        inputRef={realNumberRef}
        onClick={onSelected}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  )
}
