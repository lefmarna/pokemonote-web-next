import { Grid, TextField } from '@mui/material'
import { useRef } from 'react'
import { Stat } from '../../types'

type Props = {
  stats: Stat[]
  statsIndex: number
}

export const EffortValueField = (props: Props) => {
  const { stats, statsIndex } = props

  const effortValueRef = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!effortValueRef || !effortValueRef.current) return
    effortValueRef.current.select()
  }

  return (
    <Grid item xs={5} sx={{ pl: { xs: 2, md: 4 } }}>
      <TextField
        type="tel"
        label="努力値"
        placeholder="0"
        value={stats[statsIndex].effortValue}
        inputRef={effortValueRef}
        onClick={onSelected}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  )
}
