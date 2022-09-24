import { Box, Button, Grid, TextField } from '@mui/material'
import { ChangeEvent, MouseEvent, useRef } from 'react'
import { Nature, PokemonData, Stat } from '../../types'
import {
  HP_INDEX,
  LOWER_NATURE,
  MAX_EV,
  MAX_REAL_NUMBER,
  MIN_LEVEL,
  UPPER_NATURE,
} from '../../utils/constants'
import { convertToInteger, numberToInt, valueVerification } from '../../utils/utilities'

type Props = {
  level: number | ''
  realNumber: number
  selectedPokemon: PokemonData
  selectedNature: Nature
  stats: Stat[]
  statsIndex: number
  updateEffortValue: (value: number | '', index: number) => void
}

export const RealNumberField = (props: Props) => {
  const {
    level,
    realNumber,
    selectedPokemon,
    selectedNature,
    stats,
    statsIndex,
    updateEffortValue,
  } = props

  const realNumberRef = useRef<HTMLInputElement>()

  const onSelected = () => {
    if (!realNumberRef || !realNumberRef.current) return
    realNumberRef.current.select()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let setValue = Number(convertToInteger(event.target.value, MAX_REAL_NUMBER))
    const currentPokemonStat = selectedPokemon.stats[statsIndex]
    const formatLv = numberToInt(level, MIN_LEVEL)
    const formatIndividualValue = numberToInt(stats[statsIndex].individualValue)

    // HPのみ計算式が異なる
    if (statsIndex === HP_INDEX) {
      setValue =
        (Math.ceil(((setValue - formatLv - 10) * 100) / formatLv) -
          currentPokemonStat * 2 -
          formatIndividualValue) *
        4
    }

    // HP以外の計算では、性格補正を修正してから努力値の逆算を行う必要がある
    if (statsIndex !== HP_INDEX) {
      const formatEffortValue = numberToInt(stats[statsIndex].effortValue)
      const currentNatureStat = selectedNature.stats[statsIndex]
      if (setValue % 11 === 10 && currentNatureStat === UPPER_NATURE) {
        if (
          setValue >=
          Math.floor(
            (Math.floor(
              ((currentPokemonStat * 2 +
                formatIndividualValue +
                Math.floor(formatEffortValue / 4)) *
                formatLv) /
                100
            ) +
              5) *
              currentNatureStat
          )
        ) {
          setValue += 1
        } else {
          setValue -= 1
        }
      }
      if (currentNatureStat === UPPER_NATURE) {
        setValue = Math.ceil(setValue / UPPER_NATURE)
      } else if (currentNatureStat === LOWER_NATURE) {
        setValue = Math.ceil(setValue / LOWER_NATURE)
      }
      setValue =
        (Math.ceil(((setValue - 5) * 100) / formatLv) -
          currentPokemonStat * 2 -
          formatIndividualValue) *
        4
    }

    // 【共通の処理】計算した値を代入する
    const verifiedSetEffortValue = valueVerification(setValue, MAX_EV)
    updateEffortValue(verifiedSetEffortValue, statsIndex)
  }

  const incrementRealNumber = () => {
    updateRealNumber(realNumber + 1)
  }

  const decrementRealNumber = () => {
    updateRealNumber(realNumber - 1)
  }

  const updateRealNumber = (realNumber: number) => {
    let setValue = Number(convertToInteger(realNumber, MAX_REAL_NUMBER, false))
    const formatLv = numberToInt(level, MIN_LEVEL)
    const formatIndividualValue = numberToInt(stats[statsIndex].individualValue)

    // HPのみ計算式が異なる
    if (statsIndex === HP_INDEX) {
      setValue =
        (Math.ceil(((setValue - formatLv - 10) * 100) / formatLv) -
          selectedPokemon.stats[statsIndex] * 2 -
          formatIndividualValue) *
        4
    }
    // HP以外の計算では、性格補正を修正してから努力値の逆算を行う必要がある
    if (statsIndex !== HP_INDEX) {
      const effortValue = numberToInt(stats[statsIndex].effortValue)
      const selectedNatureStat = selectedNature.stats[statsIndex]
      if (setValue % 11 === 10 && selectedNatureStat === UPPER_NATURE) {
        if (
          setValue >=
          Math.floor(
            (Math.floor(
              ((selectedPokemon.stats[statsIndex] * 2 +
                formatIndividualValue +
                Math.floor(effortValue / 4)) *
                formatLv) /
                100
            ) +
              5) *
              selectedNatureStat
          )
        ) {
          setValue += 1
        } else {
          setValue -= 1
        }
      }
      if (selectedNatureStat === UPPER_NATURE) {
        setValue = Math.ceil(setValue / UPPER_NATURE)
      } else if (selectedNatureStat === LOWER_NATURE) {
        setValue = Math.ceil(setValue / LOWER_NATURE)
      }
      setValue =
        (Math.ceil(((setValue - 5) * 100) / formatLv) -
          selectedPokemon.stats[statsIndex] * 2 -
          formatIndividualValue) *
        4
    }

    // 【共通の処理】計算した値を代入する
    const verifiedSetValue = valueVerification(setValue, MAX_EV)
    updateEffortValue(verifiedSetValue, statsIndex)
  }

  return (
    <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 }, display: 'flex' }}>
      <TextField
        type="tel"
        label={stats[statsIndex].name}
        value={realNumber}
        inputRef={realNumberRef}
        onChange={onChange}
        onClick={onSelected}
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box>
        <Button
          centerRipple
          color="secondary"
          onClick={incrementRealNumber}
          size="small"
          sx={{
            px: 0,
          }}
          variant="contained"
        >
          ▲
        </Button>
        <Button
          centerRipple
          color="secondary"
          onClick={decrementRealNumber}
          size="small"
          sx={{
            px: 0,
          }}
          variant="contained"
        >
          ▼
        </Button>
      </Box>
    </Grid>
  )
}
