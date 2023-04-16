import { Nature, StatsKey } from '@/types'
import { LOWER_NATURE, UPPER_NATURE } from '@/utils/constants'
import { numberToInt } from '@/utils/utilities'

// ポケモンのステータス計算に関するカスタムフック
export const usePokemonStats = () => {
  /**
   * HPの実数値を計算する
   */
  const calcHpRealNumber = (level: number, baseStat: number, iv: number, ev: number) => {
    const realNumberCommon = calcRealNumberCommon(level, baseStat, iv, ev)
    return realNumberCommon + 10 + level
  }

  /**
   * HP以外の実数値を計算する
   */
  const calcRealNumber = (
    level: number,
    baseStat: number,
    iv: number,
    ev: number,
    natureModifier = 1
  ) => {
    const realNumberCommon = calcRealNumberCommon(level, baseStat, iv, ev)
    return Math.floor((realNumberCommon + 5) * natureModifier)
  }

  /**
   * HPとその他の実数値の共通部分の計算ロジック
   */
  const calcRealNumberCommon = (level: number, baseStat: number, iv: number, ev: number) => {
    return Math.floor(((baseStat * 2 + iv + Math.floor(ev / 4)) * level) / 100)
  }

  /**
   * 実数値が性格補正有の11n+10(存在しえない値)のとき、元の値を参照し±1された正常な値に調整する
   *
   * 【例】
   * 185 -> 186 に更新するとき => 187
   * 187 -> 186 に更新するとき => 185
   */
  const adjustRealNumber = (
    newRealNumber: number,
    level: number,
    baseStat: number,
    iv: number,
    ev: number,
    natureModifier: number
  ) => {
    if (newRealNumber % 11 !== 10 || natureModifier !== UPPER_NATURE) return newRealNumber

    const currentRealNumber = calcRealNumber(level, baseStat, iv, ev, natureModifier)
    return newRealNumber + (newRealNumber >= currentRealNumber ? 1 : -1)
  }

  /**
   * 性格補正抜きのピュアな実数値を取得する
   */
  const getPureRealNumber = (realNumber: number, natureModifier: number) => {
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
   * 努力値を計算する
   */
  const calcEv = (
    statKey: StatsKey,
    pureRealNumber: number,
    level: number,
    baseStat: number,
    iv: number
  ) => {
    return statKey === 'hp'
      ? (Math.ceil(((pureRealNumber - level - 10) * 100) / level) - baseStat * 2 - iv) * 4
      : (Math.ceil(((pureRealNumber - 5) * 100) / level) - baseStat * 2 - iv) * 4
  }

  /**
   * 実数値を取得する
   */
  const getRealNumber = (
    statKey: StatsKey,
    pokemonName: string,
    level: number | '',
    baseStat: number,
    iv: number | '',
    ev: number | '',
    natureModifier = 1
  ): number => {
    const formatLevel = numberToInt(level, 1)
    const formatIv = numberToInt(iv)
    const formatEv = numberToInt(ev)

    if (statKey === 'hp') {
      if (pokemonName === 'ヌケニン') return 1
      return calcHpRealNumber(formatLevel, baseStat, formatIv, formatEv)
    }

    return calcRealNumber(formatLevel, baseStat, formatIv, formatEv, natureModifier)
  }

  /**
   * 性格補正値を取得する
   */
  const getNatureModifier = (stat: StatsKey, nature: Nature) => {
    switch (stat) {
      case nature.increasedStat:
        return 1.1
      case nature.decreasedStat:
        return 0.9
      default:
        return 1
    }
  }

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
  const getTotalValue = (values: (number | '')[]) => {
    return values.reduce((sum: number, value) => {
      sum += numberToInt(value)
      return sum
    }, 0)
  }

  return {
    adjustRealNumber,
    calcEv,
    getPureRealNumber,
    calcRealNumber,
    getNatureModifier,
    getRealNumber,
    getStatsInitial,
    getTotalValue,
  }
}
