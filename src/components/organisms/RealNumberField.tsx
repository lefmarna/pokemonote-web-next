import { Box, Button, Grid, TextField } from '@mui/material'
import {
  FocusEvent,
  KeyboardEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'
import { StatsKey } from '@/types'
import { convertToInteger } from '@/utils/utilities'
import { useResponsiveStyles } from '@/hooks/style/useResponsiveStyles'

type Props = {
  value: number
  statKey: StatsKey
  updateRealNumber: (realNumber: number | '', statKey: StatsKey) => void
}

export const RealNumberField = memo(function RealNumberField(props: Props) {
  const { value, statKey, updateRealNumber } = props

  const realNumberElement = useRef<HTMLInputElement>()

  // 努力値が252 -> 252となるケースで、更新が検知されずに実数値の入力内容が残ってしまうのを回避するための変数
  const [prevRealNumber, setPrevRealNumber] = useState('')

  // 計算結果を画面に即時反映する
  useEffect(() => {
    if (!realNumberElement || !realNumberElement.current) return
    realNumberElement.current.value = String(value)
    setPrevRealNumber(String(value))
  }, [value, prevRealNumber])

  // onBlur と onKeydown の組み合わせにより、擬似的にchangeイベントを再現する
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const newRealNumber = convertToInteger(e.target.value, 999)
    updateRealNumber(newRealNumber, statKey)
    setPrevRealNumber(e.target.value)
  }

  const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return
    if (!(e.target instanceof HTMLInputElement)) return

    const newRealNumber = convertToInteger(e.target.value, 999)
    updateRealNumber(newRealNumber, statKey)
    setPrevRealNumber(e.target.value)
  }

  const onSelected = () => {
    if (!realNumberElement || !realNumberElement.current) return
    realNumberElement.current.select()
  }

  const incrementRealNumber = () => {
    updateRealNumber(value + 1, statKey)
  }

  const decrementRealNumber = () => {
    updateRealNumber(value - 1, statKey)
  }

  const { androidStyle, iPhoneSEStyle } = useResponsiveStyles()

  const calcButtonStyle = {
    minWidth: '28px',
    ...androidStyle({ minWidth: '27.5px' }),
    ...iPhoneSEStyle({ minWidth: '26px' }),
  }

  const getStatName = () => {
    switch (statKey) {
      case 'hp':
        return 'ＨＰ'
      case 'attack':
        return '攻撃'
      case 'defense':
        return '防御'
      case 'spAttack':
        return '特攻'
      case 'spDefense':
        return '特防'
      case 'speed':
        return '素早'
    }
  }

  const statName = getStatName()

  return (
    <Grid item xs={73} sx={{ pl: { xs: 2, sm: 3 }, display: 'flex' }}>
      <TextField
        type="tel"
        label={statName}
        defaultValue={value}
        inputRef={realNumberElement}
        onBlur={onBlur}
        onKeyDown={onKeydown}
        onClick={onSelected}
        variant="standard"
        InputLabelProps={{
          shrink: true,
          sx: {
            userSelect: 'none',
          },
        }}
      />
      <Box sx={{ ml: 0.3 }}>
        <Button
          centerRipple
          color="secondary"
          onClick={incrementRealNumber}
          size="small"
          sx={{
            px: 0,
            mb: 0.5,
            display: 'block',
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
