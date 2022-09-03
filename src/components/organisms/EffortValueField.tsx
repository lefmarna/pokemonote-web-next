import { Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { FormEvent, MouseEvent, useRef } from 'react'
import { Stat } from '../../types'
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

  const onClickCalcButton = (event: MouseEvent<HTMLElement>, effortValue: number) => {
    const value = effortValue !== 0 ? effortValue : ''
    updateEffortValue(value, statsIndex)
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
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box>
        <CalcButton onClick={onClickCalcButton}>{252}</CalcButton>
        <CalcButton onClick={onClickCalcButton}>{0}</CalcButton>
      </Box>
    </Grid>
  )
}
