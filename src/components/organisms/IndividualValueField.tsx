import { Box, Grid, TextField } from '@mui/material'
import { ChangeEvent, MouseEvent, useRef } from 'react'
import { Stat } from '../../types'
import {
  ATTACK_INDEX,
  MAX_IV,
  MAX_TOTAL_EV,
  SPEED_INDEX,
  SP_ATTACK_INDEX,
} from '../../utils/constants'
import { convertToInteger } from '../../utils/utilities'
import { CalcButton } from '../molecules/CalcButton'

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

  const onClickCalcButton = (event: MouseEvent<HTMLElement>, individualValue: number) => {
    const formatValue = individualValue !== 0 ? individualValue : ''
    updateIndividualValue(formatValue, statsIndex)
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
        value={stats[statsIndex].individualValue}
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
