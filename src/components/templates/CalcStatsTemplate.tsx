import { Box, Container, Grid } from '@mui/material'
import { useMemo } from 'react'
import { Nature, PokemonData, Stat } from '../../types'
import {
  ATTACK_INDEX,
  DEFENCE_INDEX,
  HP_INDEX,
  SPEED_INDEX,
  SP_ATTACK_INDEX,
  SP_DEFENCE_INDEX,
} from '../../utils/constants'
import { numberToInt } from '../../utils/utilities'
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
  updateStats: (stats: Stat[]) => void
}

export const CalcStatsTemplate = (props: Props) => {
  const { selectedPokemon, selectedNature, stats, level, updateStats } = props

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

  return (
    <Container sx={{ pt: 2 }}>
      <Grid container spacing={{ md: 4, lg: 8, xl: 12 }} columns={{ xs: 9, md: 18 }}>
        <Grid item md={9} xs={18}>
          <StatsTableHeader />
          {stats.map((stat, index) => (
            <Grid container columns={18} key={stat.name}>
              <BaseStatsField
                baseStat={selectedPokemon.stats[index]}
                statsInitial={stat.initial}
                natureStat={selectedNature.stats[index]}
              />
              <IndividualValueField stats={stats} statsIndex={index} />
              <EffortValueField stats={stats} statsIndex={index} />
              <RealNumberField realNumber={realNumbers[index]} stats={stats} statsIndex={index} />
            </Grid>
          ))}
          <Grid></Grid>
        </Grid>
        <Grid item md={9} xs={18}></Grid>
      </Grid>
    </Container>
  )
}
