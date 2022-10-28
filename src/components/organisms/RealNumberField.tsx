import { Box, Button, Grid, TextField } from '@mui/material'
import { useCallback, useEffect, useRef } from 'react'
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

  interface HTMLElementEvent<T extends HTMLElement> extends Event {
    target: T
  }

  const onChange = useCallback(
    (e: HTMLElementEvent<HTMLInputElement>) => {
      const formatValue = convertToInteger(e.target.value, 999)
      updateRealNumber(formatValue, statsIndex)
      if (!realNumberRef || !realNumberRef.current) return
      realNumberRef.current.value = String(realNumber)
    },
    [statsIndex, updateRealNumber, realNumber]
  )

  const didEffect = useRef(false)
  useEffect(() => {
    if (didEffect.current) return
    didEffect.current = true

    realNumberRef?.current?.addEventListener('change', {
      handleEvent: onChange,
    })
  }, [onChange])

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

  return (
    <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 }, display: 'flex' }}>
      <TextField
        id={`real-number-${stats[statsIndex].name}`}
        type="tel"
        label={stats[statsIndex].name}
        defaultValue={realNumber}
        inputRef={realNumberRef}
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
