import { Box, Grid, TextField } from '@mui/material'
import { ChangeEvent, memo, MouseEvent, useRef } from 'react'
import { NullableStats, StatsKey } from '@/types'
import { MAX_IV } from '@/utils/constants'
import { convertToInteger } from '@/utils/utilities'
import { CalcButton } from '@/components/molecules/CalcButton'

type Props = {
  value: number | ''
  statKey: StatsKey
  updateIvs: (newIvs: Partial<NullableStats>) => void
}

export const IndividualValueField = memo((props: Props) => {
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
    const newIv = buttonValue !== 0 ? buttonValue : ''
    updateIvs({ [statKey]: newIv })
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
        inputRef={ivElement}
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
          {31}
        </CalcButton>
        <CalcButton onClick={onClickCalcButton} sx={calcButtonStyle}>
          {0}
        </CalcButton>
      </Box>
    </Grid>
  )
})
