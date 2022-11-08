import { Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { ChangeEvent, MouseEvent, useRef } from 'react'
import { Stat } from '../../types'
import { MAX_EV } from '../../utils/constants'
import { convertToInteger } from '../../utils/utilities'
import { CalcButton } from '../molecules/CalcButton'

type Props = {
  stats: Stat[]
  statsIndex: number
  updateEffortValue: (value: number | '', index: number) => void
}

export const EffortValueField = (props: Props) => {
  const { stats, statsIndex, updateEffortValue } = props

  const effortValueRef = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!effortValueRef || !effortValueRef.current) return
    effortValueRef.current.select()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatValue = convertToInteger(event.target.value, MAX_EV)
    updateEffortValue(formatValue, statsIndex)
  }

  const onClickCalcButton = (event: MouseEvent<HTMLElement>, effortValue: number) => {
    const formatValue = effortValue !== 0 ? effortValue : ''
    updateEffortValue(formatValue, statsIndex)
  }

  const calcButtonStyle = {
    minWidth: '34px',
    '@media screen and (max-width: 360px)': {
      minWidth: '33.4px',
    },
    '@media screen and (max-width: 320px)': {
      minWidth: '31.6px',
    },
  }

  return (
    <Grid item xs={5} sx={{ pl: { xs: 2, md: 4 }, display: 'flex' }}>
      <TextField
        type="tel"
        label="努力値"
        placeholder="0"
        value={stats[statsIndex].effortValue}
        inputRef={effortValueRef}
        onClick={onSelected}
        onChange={onChange}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box>
        <CalcButton onClick={onClickCalcButton} sx={{ mb: 0.5, ...calcButtonStyle }}>
          {252}
        </CalcButton>
        <CalcButton onClick={onClickCalcButton} sx={calcButtonStyle}>
          {0}
        </CalcButton>
      </Box>
    </Grid>
  )
}
