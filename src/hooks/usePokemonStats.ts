import { Nature, StatsKey } from '@/types'

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

  return {
    calcHpRealNumber,
    calcRealNumber,
    getNatureModifier,
    getStatsInitial,
  }
}
