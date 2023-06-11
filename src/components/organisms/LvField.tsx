import { Box, TextField } from '@mui/material'
import { ChangeEvent, MouseEvent, useRef } from 'react'
import { DEFAULT_LEVEL, MAX_LEVEL } from '@/utils/constants'
import { convertToInteger } from '@/utils/utilities'
import { CalcButton } from '@/components/molecules/CalcButton'
import { useResponsiveStyles } from '@/hooks/style/useResponsiveStyles'

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

  const { androidStyle, iPhoneSEStyle } = useResponsiveStyles()

  const calcButtonStyle = {
    minWidth: '34px',
    ...androidStyle({ minWidth: '33.4px' }),
    ...iPhoneSEStyle({ minWidth: '31.6px' }),
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
      <Box sx={{ ml: 0.3 }}>
        <CalcButton
          onClick={assignLevel}
          sx={{ mb: 0.5, display: 'block', ...calcButtonStyle }}
        >
          {MAX_LEVEL}
        </CalcButton>
        <CalcButton onClick={assignLevel} sx={calcButtonStyle}>
          {DEFAULT_LEVEL}
        </CalcButton>
      </Box>
    </Box>
  )
}
