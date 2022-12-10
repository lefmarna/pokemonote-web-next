import { Container, Grid } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { Nature, PokemonData, Stat } from '../../types'
import {
  ATTACK_INDEX,
  DEFENCE_INDEX,
  HP_INDEX,
  LOWER_NATURE,
  MAX_EV,
  MAX_REAL_NUMBER,
  MAX_TOTAL_EV,
  MIN_LEVEL,
  SPEED_INDEX,
  SP_ATTACK_INDEX,
  SP_DEFENCE_INDEX,
  UPPER_NATURE,
} from '../../utils/constants'
import { convertToInteger, numberToInt, valueVerification } from '../../utils/utilities'
import { BaseStatsField } from '../organisms/BaseStatsField'
import { CalcStatsOptions } from '../organisms/CalcStatsOptions'
import { EffortValueField } from '../organisms/EffortValueField'
import { IndividualValueField } from '../organisms/IndividualValueField'
import { RealNumberField } from '../organisms/RealNumberField'
import { StatsTableHeader } from '../organisms/StatsTableHeader'

type Props = {
  buttonText: string
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
    buttonText,
    selectedPokemon,
    selectedNature,
    stats,
    level,
    updatePokemon,
    updateNature,
    updateLevel,
    updateStats,
  } = props

  const [description, setDescription] = useState('')

  const getStat = useMemo(
    () =>
      (index: number, tmpEv = 0): number => {
        const formatLv = numberToInt(Number(level), 1)
        const formatIndividualValue = numberToInt(stats[index].individualValue)
        let formatEffortValue = 0
        // 耐久調整ボタンから呼び出した場合は、仮の努力値を代入する
        if (tmpEv) {
          formatEffortValue = tmpEv
        } else {
          formatEffortValue = numberToInt(stats[index].effortValue)
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
      },
    [level, stats, selectedNature.stats, selectedPokemon.name, selectedPokemon.stats]
  )

  /**
   * 実数値は努力値の更新による自動計算によって求めるため、直接代入してはいけない。
   */
  const realNumbers = useMemo(
    () => [
      getStat(HP_INDEX),
      getStat(ATTACK_INDEX),
      getStat(DEFENCE_INDEX),
      getStat(SP_ATTACK_INDEX),
      getStat(SP_DEFENCE_INDEX),
      getStat(SPEED_INDEX),
    ],
    [getStat]
  )

  /**
   * 個体値を更新する
   *
   * @param {number | ''} individualValue 個体値
   * @param {number} statsIndex ステータス番号
   * @return {void}
   */
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
   * @param {number | ''} effortValue 努力値
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
        return {
          ...stat,
          effortValue,
        }
      }
      return stat
    })
    updateStats(newStats)
  }

  type RealNumber = {
    index: number
    value: number | ''
  }

  const updateRealNumbers = (realNumbers: RealNumber[]) => {
    const newStats = stats.map((stat, index) => {
      const targetRealNumber = realNumbers.find((realNumber) => realNumber.index === index)
      if (!targetRealNumber) return stat

      if (index === targetRealNumber.index) {
        // FIXME 何故か型を明示的に書かないとエラーになる
        const effortValue: number | '' = getEffortValue(
          targetRealNumber.value,
          targetRealNumber.index
        )
        return {
          ...stat,
          effortValue,
        }
      }
      return stat
    })
    updateStats(newStats)
  }

  // const updateRealNumbers = (realNumbers: { value: number | ''; statsIndex: number }[]) => {
  //   const newStats = stats.map((stat, index) => {
  //     const targetRealNumber = realNumbers.some((realNumber) => realNumber.statsIndex === index)
  //     if (!targetRealNumber) return

  //     const effortValue: number | '' = getEffortValue(targetRealNumber.value, index)

  //     if (index === realNumbers.find) {
  //       // FIXME 何故か型を明示的に書かないとエラーになる
  //       const effortValue: number | '' = getEffortValue(realNumber, index)
  //       return {
  //         ...stat,
  //         effortValue,
  //       }
  //     }
  //     return stat
  //   })
  //   updateStats(newStats)
  // }

  // 種族値の合計値を計算する
  const totalBaseStats = useCallback(() => {
    return Object.values(selectedPokemon.stats).reduce((sum, stat) => {
      sum += stat
      return sum
    }, 0)
  }, [selectedPokemon.stats])

  // 個体値の合計値を計算する
  const totalIv = useCallback(() => {
    return stats.reduce((sum, stat) => {
      sum += numberToInt(stat.individualValue)
      return sum
    }, 0)
  }, [stats])

  // 努力値の合計値を計算する
  const totalEv = useCallback(() => {
    return stats.reduce((sum, stat) => {
      sum += numberToInt(stat.effortValue)
      return sum
    }, 0)
  }, [stats])

  const totalStats = useCallback(() => {
    return (
      realNumbers[HP_INDEX] +
      realNumbers[ATTACK_INDEX] +
      realNumbers[DEFENCE_INDEX] +
      realNumbers[SP_ATTACK_INDEX] +
      realNumbers[SP_DEFENCE_INDEX] +
      realNumbers[SPEED_INDEX]
    )
  }, [realNumbers])

  const durabilityAdjustment = (
    calcStyle: string,
    selectDefenceEnhancement: number,
    selectSpDefenceEnhancement: number
  ) => {
    // 攻撃、特攻、素早さの努力値を除いた値を求める
    const remainderEffortValue =
      MAX_TOTAL_EV -
      Number(stats[ATTACK_INDEX].effortValue) -
      Number(stats[SP_ATTACK_INDEX].effortValue) -
      Number(stats[SPEED_INDEX].effortValue)

    // 計算に使う努力値を一時的に格納しておくための変数
    let tmpHpEV = remainderEffortValue // HPから順に計算していくので、最初に余りの努力値をそのまま代入している
    let tmpDefenceEV = 0
    let tmpSpDefenceEV = 0

    // 計算に使う実数値を一時的に格納しておくための変数
    let tmpHp = 0
    let tmpDefence = 0
    let tmpSpDefence = 0

    // 実数値の計算は耐久補正込で行うが、代入する際には元の値を使うため、別の変数を用意することにした
    let tmpDefenceEnhancement = 0
    let tmpSpDefenceEnhancement = 0

    // 最終的に代入することになる実数値を格納しておくための変数
    let resultHp = 0
    let resultDefence = 0
    let resultSpDefence = 0

    // 計算された耐久指数を比較していくのに用いる変数
    let oldHBD = 0
    let newHBD = 0

    // 計算スタイルが H=B+D の際に、BとDの差分を比較するのに用いる変数
    let tmpDiff: number | null = null

    updateEffortValue('', HP_INDEX)
    updateEffortValue('', DEFENCE_INDEX)
    updateEffortValue('', SP_DEFENCE_INDEX)

    // 努力値の余りが最大値より大きかった場合、スタートであるHPの仮努力値を最大値とする
    if (tmpHpEV > MAX_EV) tmpHpEV = MAX_EV

    // HP→特防→防御の順に総当たりで計算していく
    while (tmpHpEV >= 0) {
      tmpHp = getStat(HP_INDEX, tmpHpEV) // HPの努力値からHPの実数値を計算
      tmpSpDefenceEV = remainderEffortValue - tmpHpEV
      if (tmpSpDefenceEV > MAX_EV) {
        tmpSpDefenceEV = MAX_EV
      }
      // 防御より先に特防を計算することで、端数が出た場合に特防に割り振られるようになる(ダウンロード対策でB<Dのほうが好まれることから、このような仕様にしている)
      while (tmpSpDefenceEV >= 0) {
        tmpSpDefence = getStat(SP_DEFENCE_INDEX, tmpSpDefenceEV) // 特防の努力値から特防の実数値を計算
        tmpDefenceEV = remainderEffortValue - tmpHpEV - tmpSpDefenceEV
        // 防御の仮努力値が最大値を超えてしまう場合には値を更新しない
        if (tmpDefenceEV > MAX_EV) break

        tmpDefence = getStat(DEFENCE_INDEX, tmpDefenceEV) // 防御の努力値から防御の実数値を計算

        // 耐久補正込での耐久値を求める
        tmpDefenceEnhancement = Math.floor(tmpDefence * selectDefenceEnhancement)
        tmpSpDefenceEnhancement = Math.floor(tmpSpDefence * selectSpDefenceEnhancement)

        // 耐久指数を計算する（計算スタイルによって結果が異なる）
        if (calcStyle === 'balance') {
          newHBD =
            (tmpHp * tmpDefenceEnhancement * tmpSpDefenceEnhancement) /
            (tmpDefenceEnhancement + tmpSpDefenceEnhancement)
        }

        if (calcStyle === 'performance') {
          newHBD = tmpHp * (tmpDefenceEnhancement + tmpSpDefenceEnhancement)

          // NOTE 結果が同じ時には防御と特防の差が小さい方が好ましいため、最も差分の小さな値を入れるようにしている
          if (oldHBD === newHBD && resultHp === tmpHp) {
            const diff = Math.abs(tmpDefenceEnhancement - tmpSpDefenceEnhancement)
            if (tmpDiff === null || tmpDiff > diff) {
              tmpDiff = diff
              resultDefence = tmpDefence
              resultSpDefence = tmpSpDefence
            }
          }
        }

        // 耐久指数が前回のものより大きければ更新、そうでなければ更新しない
        if (oldHBD < newHBD) {
          oldHBD = newHBD
          resultHp = tmpHp
          resultDefence = tmpDefence
          resultSpDefence = tmpSpDefence
          tmpDiff = null
        }
        tmpSpDefenceEV--
      }
      tmpHpEV--
    }
    // 最も優秀だった結果を代入する
    updateRealNumbers([
      {
        index: HP_INDEX,
        value: resultHp,
      },
      {
        index: DEFENCE_INDEX,
        value: resultDefence,
      },
      {
        index: SP_DEFENCE_INDEX,
        value: resultSpDefence,
      },
    ])
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
          <Grid container columns={18} sx={{ mt: 1 }}>
            <Grid item xs={3} sx={{ pl: { xs: 2, sm: 3 } }}>
              {totalBaseStats()}
            </Grid>
            <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 } }}>
              {totalIv()}
            </Grid>
            <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 } }}>
              <span>{totalEv()}</span>/&nbsp;{MAX_TOTAL_EV}
            </Grid>
            <Grid item xs={5} sx={{ pl: { xs: 2, sm: 3 } }}>
              {totalStats()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={9} xs={18}>
          <CalcStatsOptions
            description={description}
            buttonText={buttonText}
            realNumbers={realNumbers}
            stats={stats}
            updateEffortValue={updateEffortValue}
            durabilityAdjustment={durabilityAdjustment}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
