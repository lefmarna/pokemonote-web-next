import { Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { ChangeEvent, memo, MouseEvent, useRef } from 'react'
import { NullableStats, StatsKey } from '@/types'
import { MAX_EV } from '@/utils/constants'
import { convertToInteger } from '@/utils/utilities'
import { CalcButton } from '@/components/molecules/CalcButton'
import { useResponsiveStyles } from '@/hooks/style/useResponsiveStyles'

type Props = {
  value: number | ''
  statKey: StatsKey
  updateEvs: (newIvs: Partial<NullableStats>) => void
}

export const EffortValueField = memo((props: Props) => {
  const { value, statKey, updateEvs } = props

  const evElement = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!evElement || !evElement.current) return
    evElement.current.select()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEv = convertToInteger(event.target.value, MAX_EV)
    updateEvs({ [statKey]: newEv })
  }

  const onClickCalcButton = (
    event: MouseEvent<HTMLElement>,
    buttonValue: number
  ) => {
    const newEv = buttonValue !== 0 ? buttonValue : ''
    updateEvs({ [statKey]: newEv })
  }

  const { androidStyle, iPhoneSEStyle } = useResponsiveStyles()

  const calcButtonStyle = {
    minWidth: '34px',
    ...androidStyle({ minWidth: '33.4px' }),
    ...iPhoneSEStyle({ minWidth: '31.6px' }),
  }

  return (
    <Grid item xs={5} sx={{ pl: { xs: 2, md: 4 }, display: 'flex' }}>
      <TextField
        type="tel"
        label="努力値"
        placeholder="0"
        value={value}
        inputRef={evElement}
        onClick={onSelected}
        onChange={onChange}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box>
        <CalcButton
          onClick={onClickCalcButton}
          sx={{ mb: 0.5, ...calcButtonStyle }}
        >
          {252}
        </CalcButton>
        <CalcButton onClick={onClickCalcButton} sx={calcButtonStyle}>
          {0}
        </CalcButton>
      </Box>
    </Grid>
  )
})
