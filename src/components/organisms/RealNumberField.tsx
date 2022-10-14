import { Box, Button, Grid, TextField } from '@mui/material'
import { ChangeEvent, useRef } from 'react'
import { Stat } from '../../types'
import { convertToInteger } from '../../utils/utilities'

type Props = {
  realNumber: number
  stats: Stat[]
  statsIndex: number
  updateRealNumber: (value: number | '', index: number) => void
}

export const RealNumberField = (props: Props) => {
  const { realNumber, stats, statsIndex, updateRealNumber } = props

  const realNumberRef = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!realNumberRef || !realNumberRef.current) return
    realNumberRef.current.select()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatValue = convertToInteger(event.target.value, 999)
    updateRealNumber(formatValue, statsIndex)
  }

  const incrementRealNumber = () => {
    updateRealNumber(realNumber + 1, statsIndex)
  }

  const decrementRealNumber = () => {
    updateRealNumber(realNumber - 1, statsIndex)
  }

  return (
    <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 }, display: 'flex' }}>
      <TextField
        type="tel"
        label={stats[statsIndex].name}
        value={stats[statsIndex].realNumber}
        inputRef={realNumberRef}
        onChange={onChange}
        onClick={onSelected}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box>
        <Button
          centerRipple
          color="secondary"
          onClick={incrementRealNumber}
          size="small"
          sx={{
            px: 0,
          }}
          variant="contained"
        >
          ▲
        </Button>
        <Button
          centerRipple
          color="secondary"
          onClick={decrementRealNumber}
          size="small"
          sx={{
            px: 0,
          }}
          variant="contained"
        >
          ▼
        </Button>
      </Box>
    </Grid>
  )
}
