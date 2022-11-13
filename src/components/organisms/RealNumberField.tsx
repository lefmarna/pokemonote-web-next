import { Box, Button, Grid, TextField } from '@mui/material'
import { FocusEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react'
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

  useEffect(() => {
    if (!realNumberRef || !realNumberRef.current) return
    realNumberRef.current.value = String(realNumber)
    // eslint-disable-next-line
  }, [realNumber, stats[statsIndex]])

  const onBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const formatValue = convertToInteger(e.target.value, 999)
      updateRealNumber(formatValue, statsIndex)
    },
    [statsIndex, updateRealNumber]
  )

  const onKeydown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter' || e.nativeEvent.isComposing) return
      if (!(e.target instanceof HTMLInputElement)) return

      const formatValue = convertToInteger(e.target.value, 999)
      updateRealNumber(formatValue, statsIndex)
    },
    [statsIndex, updateRealNumber]
  )

  const onSelected = () => {
    if (!realNumberRef || !realNumberRef.current) return
    realNumberRef.current.select()
  }

  const incrementRealNumber = () => {
    updateRealNumber(realNumber + 1, statsIndex)
  }

  const decrementRealNumber = () => {
    updateRealNumber(realNumber - 1, statsIndex)
  }

  const calcButtonStyle = {
    minWidth: '28px',
    '@media screen and (max-width: 360px)': {
      minWidth: '27.5px',
    },
    '@media screen and (max-width: 320px)': {
      minWidth: '26px',
    },
  }

  return (
    <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 }, display: 'flex' }}>
      <TextField
        id={`real-number-${stats[statsIndex].name}`}
        type="tel"
        label={stats[statsIndex].name}
        defaultValue={realNumber}
        inputRef={realNumberRef}
        onBlur={onBlur}
        onKeyDown={onKeydown}
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
            mb: 0.5,
            ...calcButtonStyle,
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
            ...calcButtonStyle,
          }}
          variant="contained"
        >
          ▼
        </Button>
      </Box>
    </Grid>
  )
}
