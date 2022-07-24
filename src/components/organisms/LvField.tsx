import { Box, TextField } from '@mui/material'
import { ChangeEvent, MouseEvent } from 'react'
import { useRecoilState } from 'recoil'
import { levelState } from '../../store'
import { MAX_LEVEL, MIN_LEVEL } from '../../utils/constants'
import { convertToInteger } from '../../utils/utilities'
import { CalcButton } from '../molecules/CalcButton'

export const LvField = () => {
  const [level, setLevel] = useRecoilState(levelState)

  const updateLevel = (event: ChangeEvent<HTMLInputElement>) => {
    if (event === undefined) return
    const formatLevel = convertToInteger(event.target.value, MAX_LEVEL, false)
    setLevel(formatLevel)
  }

  const assignLevel = (event: MouseEvent<HTMLElement>, level: number) => {
    setLevel(level)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <TextField
          type="tel"
          label="レベル"
          value={level}
          onChange={updateLevel}
          placeholder="1"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box>
        <CalcButton onClick={assignLevel}>{MAX_LEVEL}</CalcButton>
        <CalcButton onClick={assignLevel}>{MIN_LEVEL}</CalcButton>
      </Box>
    </Box>
  )
}
