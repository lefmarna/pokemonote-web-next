import { Box, Button, Grid, TextField } from '@mui/material'
import { FocusEvent, KeyboardEvent, memo, useCallback, useEffect, useRef } from 'react'
import { StatsKey } from '@/types'
import { convertToInteger } from '@/utils/utilities'

type Props = {
  value: number
  statKey: StatsKey
  updateRealNumber: (realNumber: number | '', statKey: StatsKey) => void
}

export const RealNumberField = memo((props: Props) => {
  const { value, statKey, updateRealNumber } = props

  const realNumberRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (!realNumberRef || !realNumberRef.current) return
    realNumberRef.current.value = String(value)
  }, [value])

  const onBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const formatValue = convertToInteger(e.target.value, 999)
      updateRealNumber(formatValue, statKey)
    },
    [statKey, updateRealNumber]
  )

  const onKeydown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter' || e.nativeEvent.isComposing) return
      if (!(e.target instanceof HTMLInputElement)) return

      const formatValue = convertToInteger(e.target.value, 999)
      updateRealNumber(formatValue, statKey)
    },
    [statKey, updateRealNumber]
  )

  const onSelected = () => {
    if (!realNumberRef || !realNumberRef.current) return
    realNumberRef.current.select()
  }

  const incrementRealNumber = () => {
    updateRealNumber(value + 1, statKey)
  }

  const decrementRealNumber = () => {
    updateRealNumber(value - 1, statKey)
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

  const getStatName = () => {
    switch (statKey) {
      case 'hp':
        return 'ＨＰ'
      case 'attack':
        return 'こうげき'
      case 'defense':
        return 'ぼうぎょ'
      case 'spAttack':
        return 'とくこう'
      case 'spDefense':
        return 'とくぼう'
      case 'speed':
        return 'すばやさ'
    }
  }

  const statName = getStatName()

  return (
    <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 }, display: 'flex' }}>
      <TextField
        id={`real-number-${statName}`}
        type="tel"
        label={statName}
        defaultValue={value}
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
})
