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

  useEffect(() => {
    if (!realNumberRef || !realNumberRef.current) return
    realNumberRef.current.value = String(realNumber)
    // eslint-disable-next-line
  }, [realNumber, stats[statsIndex]])

  const onChange = useCallback(
    (e: HTMLElementEvent<HTMLInputElement>) => {
      const formatValue = convertToInteger(e.target.value, 999)
      updateRealNumber(formatValue, statsIndex)
    },
    [statsIndex, updateRealNumber]
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
