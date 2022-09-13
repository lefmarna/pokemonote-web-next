import { Grid, TextField } from '@mui/material'
import { ChangeEvent, useRef } from 'react'
import { Stat } from '../../types'
import { MAX_IV } from '../../utils/constants'
import { convertToInteger } from '../../utils/utilities'

type Props = {
  stats: Stat[]
  statsIndex: number
  updateIndividualValue: (value: number | '', index: number) => void
}

export const IndividualValueField = (props: Props) => {
  const { stats, statsIndex, updateIndividualValue } = props

  const individualValuerRef = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!individualValuerRef || !individualValuerRef.current) return
    individualValuerRef.current.select()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatValue = convertToInteger(event.target.value, MAX_IV)
    updateIndividualValue(formatValue, statsIndex)
  }

  return (
    <Grid item xs={5} sx={{ pl: { xs: 2, md: 4 } }}>
      <TextField
        type="tel"
        label="個体値"
        placeholder="0"
        value={stats[statsIndex].individualValue}
        inputRef={individualValuerRef}
        onClick={onSelected}
        onChange={onChange}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  )
}
