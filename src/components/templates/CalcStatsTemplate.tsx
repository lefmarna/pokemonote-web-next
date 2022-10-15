import { Container, Grid } from '@mui/material'
import { Nature, PokemonData, Stat } from '../../types'
import {
  ATTACK_INDEX,
  DEFENCE_INDEX,
  HP_INDEX,
  LOWER_NATURE,
  MAX_EV,
  MAX_REAL_NUMBER,
  MIN_LEVEL,
  SPEED_INDEX,
  SP_ATTACK_INDEX,
  SP_DEFENCE_INDEX,
  UPPER_NATURE,
} from '../../utils/constants'
import { convertToInteger, numberToInt, valueVerification } from '../../utils/utilities'
import { BaseStatsField } from '../organisms/BaseStatsField'
import { EffortValueField } from '../organisms/EffortValueField'
import { IndividualValueField } from '../organisms/IndividualValueField'
import { RealNumberField } from '../organisms/RealNumberField'
import { StatsTableHeader } from '../organisms/StatsTableHeader'

type Props = {
  selectedPokemon: PokemonData
  selectedNature: Nature
  level: number | ''
  stats: Stat[]
  updatePokemon: (pokemon: PokemonData) => void
  updateNature: (nature: Nature) => void
  updateLevel: (level: number | '') => void
  updateStats: (stats: Stat[]) => void
}

export const CalcStatsTemplate = (props: Props) => {
  const {
    selectedPokemon,
    selectedNature,
    stats,
    level,
    updatePokemon,
    updateNature,
    updateLevel,
    updateStats,
  } = props

  const getStat = (index: number, tmpEv = 0): number => {
    const formatLv = numberToInt(Number(level), 1)
    const formatIndividualValue = numberToInt(stats[index].individualValue)
    let formatEffortValue = 0
    // 耐久調整ボタンから呼び出した場合は、仮の努力値を代入する
    if (tmpEv) {
      formatEffortValue = tmpEv
    } else {
      formatEffortValue = numberToInt(props.stats[index].effortValue)
    }
    if (index === HP_INDEX) {
      if (selectedPokemon.name === 'ヌケニン') return 1
      return (
        Math.floor(
          ((selectedPokemon.stats[index] * 2 +
            formatIndividualValue +
            Math.floor(formatEffortValue / 4)) *
            formatLv) /
            100
        ) +
        10 +
        formatLv
      )
    } else {
      return Math.floor(
        (Math.floor(
          ((selectedPokemon.stats[index] * 2 +
            formatIndividualValue +
            Math.floor(formatEffortValue / 4)) *
            formatLv) /
            100
        ) +
          5) *
          selectedNature.stats[index]
      )
    }
  }

  /**
   * 実数値は努力値の更新による自動計算によって求めるため、直接代入してはいけない。
   */
  const realNumbers = [
    getStat(HP_INDEX),
    getStat(ATTACK_INDEX),
    getStat(DEFENCE_INDEX),
    getStat(SP_ATTACK_INDEX),
    getStat(SP_DEFENCE_INDEX),
    getStat(SPEED_INDEX),
  ]

  const updateIndividualValue = (individualValue: number | '', statsIndex: number) => {
    const newStats = stats.map((stat, index) => {
      if (index === statsIndex) {
        return { ...stat, individualValue }
      }
      return stat
    })
    updateStats(newStats)
  }

  /**
   * 努力値を更新する
   *
   * @param {number} effortValue 努力値
   * @param {number} statsIndex ステータス番号
   * @return {void}
   */
  const updateEffortValue = (effortValue: number | '', statsIndex: number) => {
    const newStats = stats.map((stat, index) => {
      if (index === statsIndex) {
        return { ...stat, effortValue }
      }
      return stat
    })
    updateStats(newStats)
  }

  /**
   * 実数値から努力値を求める
   *
   * @param {number|''} realNumber 実数値
   * @param {number} statsIndex ステータス番号
   * @return {number|''} 努力値
   */
  const getEffortValue = (realNumber: number | '', statsIndex: number) => {
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

    return valueVerification(setValue, MAX_EV)
  }

  const updateRealNumber = (realNumber: number | '', statsIndex: number) => {
    const newStats = stats.map((stat, index) => {
      if (index === statsIndex) {
        // FIXME 何故か型を明示的に書かないとエラーになる
        const effortValue: number | '' = getEffortValue(realNumber, statsIndex)
        const formatRealNumber = getStat(statsIndex)
        return {
          ...stat,
          effortValue,
          realNumber: formatRealNumber,
        }
      }
      return stat
    })
    updateStats(newStats)
  }

  return (
    <Container sx={{ pt: 2 }}>
      <Grid container spacing={{ md: 4, lg: 8, xl: 12 }} columns={{ xs: 9, md: 18 }}>
        <Grid item md={9} xs={18}>
          <StatsTableHeader
            selectedPokemon={selectedPokemon}
            selectedNature={selectedNature}
            level={level}
            updatePokemon={updatePokemon}
            updateNature={updateNature}
            updateLevel={updateLevel}
          />
          {stats.map((stat, index) => (
            <Grid container columns={18} key={stat.name} sx={{ mt: 1 }}>
              <BaseStatsField
                baseStat={selectedPokemon.stats[index]}
                statsInitial={stat.initial}
                natureStat={selectedNature.stats[index]}
              />
              <IndividualValueField
                stats={stats}
                statsIndex={index}
                updateIndividualValue={updateIndividualValue}
              />
              <EffortValueField
                stats={stats}
                statsIndex={index}
                updateEffortValue={updateEffortValue}
              />
              <RealNumberField
                realNumber={realNumbers[index]}
                stats={stats}
                statsIndex={index}
                updateRealNumber={updateRealNumber}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item md={9} xs={18}></Grid>
      </Grid>
    </Container>
  )
}
