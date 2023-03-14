import { Stat } from '@/types'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const statsRecoilState = atom<Stat[]>({
  key: 'statsState',
  default: [
    {
      name: 'ＨＰ',
      initial: 'H',
      individualValue: 31,
      effortValue: '',
    },
    {
      name: 'こうげき',
      initial: 'A',
      individualValue: 31,
      effortValue: '',
    },
    {
      name: 'ぼうぎょ',
      initial: 'B',
      individualValue: 31,
      effortValue: '',
    },
    {
      name: 'とくこう',
      initial: 'C',
      individualValue: 31,
      effortValue: '',
    },
    {
      name: 'とくぼう',
      initial: 'D',
      individualValue: 31,
      effortValue: '',
    },
    {
      name: 'すばやさ',
      initial: 'S',
      individualValue: 31,
      effortValue: '',
    },
  ],
})

export const useStatsState = () => {
  return useRecoilValue(statsRecoilState)
}

export const useStatsMutators = () => {
  const setState = useSetRecoilState(statsRecoilState)

  /**
   * ステータスを更新する
   */
  const updateStats = (stats: Stat[]) => {
    setState(stats)
  }

  return { updateStats }
}
