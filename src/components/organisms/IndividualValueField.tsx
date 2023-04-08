import { Box, Grid, TextField } from '@mui/material'
import { ChangeEvent, MouseEvent, useRef } from 'react'
import { NullableStats, StatsKeys } from '@/types'
import { MAX_IV } from '@/utils/constants'
import { convertToInteger } from '@/utils/utilities'
import { CalcButton } from '@/components/molecules/CalcButton'

type Props = {
  value: number | ''
  statKey: StatsKeys
  updateIvs: (newIvs: Partial<NullableStats>) => void
}

export const IndividualValueField = (props: Props) => {
  const { value, statKey, updateIvs } = props

  const individualValuerRef = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!individualValuerRef || !individualValuerRef.current) return
    individualValuerRef.current.select()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatValue = convertToInteger(event.target.value, MAX_IV)
    updateIvs({ [statKey]: formatValue })
  }

  const onClickCalcButton = (event: MouseEvent<HTMLElement>, newIv: number) => {
    const formatValue = newIv !== 0 ? newIv : ''
    updateIvs({ [statKey]: formatValue })
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
    <Grid item xs={5} sx={{ pl: { xs: 2, md: 4 }, display: 'flex' }}>
      <TextField
        type="tel"
        label="個体値"
        placeholder="0"
        value={value}
        inputRef={individualValuerRef}
        onClick={onSelected}
        onChange={onChange}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box>
        <CalcButton onClick={onClickCalcButton} sx={{ mb: 0.5, ...calcButtonStyle }}>
          {31}
        </CalcButton>
        <CalcButton onClick={onClickCalcButton} sx={calcButtonStyle}>
          {0}
        </CalcButton>
      </Box>
    </Grid>
  )
}
