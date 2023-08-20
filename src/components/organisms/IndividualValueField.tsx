'use client'

import { Box, Grid, TextField } from '@mui/material'
import { memo, useRef } from 'react'
import { CalcButton } from '@/components/molecules/CalcButton'
import { useResponsiveStyles } from '@/hooks/style/useResponsiveStyles'
import { MAX_IV } from '@/utils/constants'
import { convertToInteger } from '@/utils/utilities'
import type { NullableStats, StatsKey } from '@/types/front'
import type { ChangeEvent, MouseEvent } from 'react'

type Props = {
  value: number | null
  statKey: StatsKey
  updateIvs: (newIvs: Partial<NullableStats>) => void
}

export const IndividualValueField = memo(function IndividualValueField(
  props: Props
) {
  const { value, statKey, updateIvs } = props

  const ivElement = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!ivElement || !ivElement.current) return
    ivElement.current.select()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newIv = convertToInteger(event.target.value, MAX_IV)
    updateIvs({ [statKey]: newIv })
  }

  const onClickCalcButton = (
    event: MouseEvent<HTMLElement>,
    buttonValue: number
  ) => {
    const newIv = buttonValue !== 0 ? buttonValue : null
    updateIvs({ [statKey]: newIv })
  }

  const { androidStyle, iPhoneSEStyle } = useResponsiveStyles()

  const calcButtonStyle = {
    minWidth: '28px',
    ...androidStyle({ minWidth: '27.5px' }),
    ...iPhoneSEStyle({ minWidth: '26px' }),
  }

  return (
    <Grid item xs={73} sx={{ pl: { xs: 2, md: 4 }, display: 'flex' }}>
      <TextField
        type="tel"
        label="個体値"
        placeholder="0"
        value={value ?? ''}
        inputRef={ivElement}
        onClick={onSelected}
        onChange={onChange}
        variant="standard"
        InputLabelProps={{
          shrink: true,
          sx: {
            userSelect: 'none',
          },
        }}
      />
      <Box sx={{ ml: 0.3 }}>
        <CalcButton
          onClick={onClickCalcButton}
          sx={{ mb: 0.5, display: 'block', ...calcButtonStyle }}
        >
          {31}
        </CalcButton>
        <CalcButton onClick={onClickCalcButton} sx={calcButtonStyle}>
          {0}
        </CalcButton>
      </Box>
    </Grid>
  )
})
