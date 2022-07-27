import { Grid, TextField } from '@mui/material'
import { useRef } from 'react'
import { Stat } from '../../types'

type Props = {
  stats: Stat[]
  statsIndex: number
}

export const IndividualValueField = (props: Props) => {
  const { stats, statsIndex } = props

  const individualValuerRef = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!individualValuerRef || !individualValuerRef.current) return
    individualValuerRef.current.select()
  }

  return (
    <Grid xs={5} sx={{ pl: { xs: 2, md: 4 } }}>
      <TextField
        type="tel"
        label="個体値"
        placeholder="0"
        value={stats[statsIndex].individualValue}
        inputRef={individualValuerRef}
        onClick={onSelected}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  )
}
