import { useCallback, useMemo } from 'react'
import {
  LOWER_NATURE,
  MAX_EV,
  MAX_REAL_NUMBER,
  MIN_LEVEL,
  UPPER_NATURE,
} from '@/utils/constants'
import {
  convertToInteger,
  numberToInt,
  valueVerification,
} from '@/utils/utilities'
import type { Nature, Pokemon, StatsKey } from '@/types'

// ポケモンのステータス計算に関するカスタムフック
export const usePokemonStats = (pokemon: Pokemon) => {
  /**
   * HPの実数値を計算する
   */
  const calcHpRealNumber = useCallback(
    (level: number, baseStat: number, iv: number, ev: number) => {
      const realNumberCommon = calcRealNumberCommon(level, baseStat, iv, ev)
      return realNumberCommon + 10 + level
    },
    []
  )

  /**
   * HP以外の実数値を計算する
   */
  const calcRealNumber = useCallback(
    (
      level: number,
      baseStat: number,
      iv: number,
      ev: number,
      natureModifier = 1
    ) => {
      const realNumberCommon = calcRealNumberCommon(level, baseStat, iv, ev)
      return Math.floor((realNumberCommon + 5) * natureModifier)
    },
    []
  )

  /**
   * HPとその他の実数値の共通部分の計算ロジック
   */
  const calcRealNumberCommon = (
    level: number,
    baseStat: number,
    iv: number,
    ev: number
  ) => {
    return Math.floor(((baseStat * 2 + iv + Math.floor(ev / 4)) * level) / 100)
  }

  /**
   * 実数値が性格補正有の11n+10(存在しえない値)のとき、元の値を参照し±1された正常な値に調整する
   *
   * 【例】
   * 185 -> 186 に更新するとき => 187
   * 187 -> 186 に更新するとき => 185
   */
  const adjustRealNumber = useCallback(
    (
      newRealNumber: number,
      level: number,
      baseStat: number,
      iv: number,
      ev: number,
      natureModifier = 1
    ) => {
      if (newRealNumber % 11 !== 10 || natureModifier !== UPPER_NATURE)
        return newRealNumber

      const currentRealNumber = calcRealNumber(
        level,
        baseStat,
        iv,
        ev,
        natureModifier
      )
      return newRealNumber + (newRealNumber >= currentRealNumber ? 1 : -1)
    },
    [calcRealNumber]
  )

  /**
   * 性格補正抜きのピュアな実数値を取得する
   */
  const getPureRealNumber = (realNumber: number, natureModifier = 1) => {
    switch (natureModifier) {
      case UPPER_NATURE:
        return Math.ceil(realNumber / UPPER_NATURE)
      case LOWER_NATURE:
        return Math.ceil(realNumber / LOWER_NATURE)
      default:
        return realNumber
    }
  }

  /**
   * 性格補正値を取得する
   */
  const getNatureModifier = useCallback((stat: StatsKey, nature: Nature) => {
    switch (stat) {
      case nature.increasedStat:
        return 1.1
      case nature.decreasedStat:
        return 0.9
      default:
        return 1
    }
  }, [])

  /**
   * 実数値から努力値を求める
   */
  const getEv = useCallback(
    (newRealNumber: number | null, statKey: StatsKey) => {
      const realNumber = Number(
        convertToInteger(newRealNumber, MAX_REAL_NUMBER, false)
      )
      const level = numberToInt(pokemon.level, MIN_LEVEL)
      const baseStat = pokemon.basicInfo.baseStats[statKey]
      const iv = numberToInt(pokemon.ivs[statKey])
      const ev = numberToInt(pokemon.evs[statKey])
      const natureModifier =
        statKey !== 'hp' ? getNatureModifier(statKey, pokemon.nature) : 1

      const adjustedRealNumber = adjustRealNumber(
        realNumber,
        level,
        baseStat,
        iv,
        ev,
        natureModifier
      )
      const pureRealNumber = getPureRealNumber(
        adjustedRealNumber,
        natureModifier
      )

      const newEv =
        statKey === 'hp'
          ? (Math.ceil(((pureRealNumber - level - 10) * 100) / level) -
              baseStat * 2 -
              iv) *
            4
          : (Math.ceil(((pureRealNumber - 5) * 100) / level) -
              baseStat * 2 -
              iv) *
            4

      return valueVerification(newEv, MAX_EV)
    },
    [
      adjustRealNumber,
      getNatureModifier,
      pokemon.basicInfo.baseStats,
      pokemon.evs,
      pokemon.ivs,
      pokemon.level,
      pokemon.nature,
    ]
  )

  /**
   * 実数値を取得する
   */
  const getRealNumber = useCallback(
    (statKey: StatsKey, tmpEv?: number): number => {
      const level = numberToInt(Number(pokemon.level), 1)
      const baseStat = pokemon.basicInfo.baseStats[statKey]
      const iv = numberToInt(pokemon.ivs[statKey])
      // 耐久調整ボタンから呼び出した場合は、仮の努力値を代入する
      const ev = tmpEv ?? numberToInt(pokemon.evs[statKey])

      if (statKey === 'hp') {
        if (pokemon.basicInfo.name === 'ヌケニン') return 1
        return calcHpRealNumber(level, baseStat, iv, ev)
      }

      return calcRealNumber(
        level,
        baseStat,
        iv,
        ev,
        getNatureModifier(statKey, pokemon.nature)
      )
    },
    [
      pokemon.basicInfo.name,
      pokemon.nature,
      pokemon.level,
      pokemon.basicInfo.baseStats,
      pokemon.evs,
      pokemon.ivs,
      calcHpRealNumber,
      calcRealNumber,
      getNatureModifier,
    ]
  )

  /**
   * HABCDSを取得する
   */
  const getStatsInitial = (statKey: StatsKey) => {
    switch (statKey) {
      case 'hp':
        return 'H'
      case 'attack':
        return 'A'
      case 'defense':
        return 'B'
      case 'spAttack':
        return 'C'
      case 'spDefense':
        return 'D'
      case 'speed':
        return 'S'
    }
  }

  /**
   * 配列内の数値を合計した結果を返す
   */
  const getTotalValue = (values: (number | null)[]) => {
    return values.reduce((sum: number, value) => {
      sum += numberToInt(value)
      return sum
    }, 0)
  }

  /**
   * 実数値はその他の要素（努力値など）の更新による自動計算によって求める
   */
  const realNumbers = useMemo(() => {
    return {
      hp: getRealNumber('hp'),
      attack: getRealNumber('attack'),
      defense: getRealNumber('defense'),
      spAttack: getRealNumber('spAttack'),
      spDefense: getRealNumber('spDefense'),
      speed: getRealNumber('speed'),
    }
  }, [getRealNumber])

  /**
   * 種族値の合計値
   */
  const totalBaseStats = useCallback(() => {
    return getTotalValue(Object.values(pokemon.basicInfo.baseStats))
  }, [pokemon.basicInfo.baseStats])

  /**
   * 個体値の合計値
   */
  const totalIv = useCallback(() => {
    return getTotalValue(Object.values(pokemon.ivs))
  }, [pokemon.ivs])

  /**
   * 努力値の合計値
   */
  const totalEv = useCallback(() => {
    return getTotalValue(Object.values(pokemon.evs))
  }, [pokemon.evs])

  /**
   * 実数値の合計値
   */
  const totalStats = useCallback(() => {
    return getTotalValue(Object.values(realNumbers))
  }, [realNumbers])

  return {
    realNumbers,
    getEv,
    getNatureModifier,
    getRealNumber,
    getStatsInitial,
    totalBaseStats,
    totalIv,
    totalEv,
    totalStats,
  }
}
