import { Box, TextField } from '@mui/material'
import { ChangeEvent, MouseEvent, useRef } from 'react'
import { MAX_LEVEL, MIN_LEVEL } from '../../utils/constants'
import { convertToInteger } from '../../utils/utilities'
import { CalcButton } from '../molecules/CalcButton'

type Props = {
  level: number | ''
  updateLevel: (level: number | '') => void
}

export const LvField = (props: Props) => {
  const { level, updateLevel } = props
  const levelRef = useRef<HTMLInputElement>()

  const onChangeLevel = (event: ChangeEvent<HTMLInputElement>) => {
    if (event === undefined) return
    const formatLevel = convertToInteger(event.target.value, MAX_LEVEL, false)
    updateLevel(formatLevel)
  }

  const assignLevel = (event: MouseEvent<HTMLElement>, level: number) => {
    updateLevel(level)
  }

  const onSelected = () => {
    if (!levelRef || !levelRef.current) return
    levelRef.current.select()
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <TextField
          type="tel"
          label="レベル"
          value={level}
          onChange={onChangeLevel}
          inputRef={levelRef}
          onClick={onSelected}
          placeholder="1"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box>
        <CalcButton onClick={assignLevel} sx={{ mb: 0.5 }}>
          {MAX_LEVEL}
        </CalcButton>
        <CalcButton onClick={assignLevel}>{MIN_LEVEL}</CalcButton>
      </Box>
    </Box>
  )
}
