import { Nature } from '@/types'
import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const selectedNatureRecoilState = atom<Nature>({
  key: 'selectedNatureState',
  default: {
    name: 'がんばりや',
    stats: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  },
})

export const useSelectedNatureState = () => {
  return useRecoilValue(selectedNatureRecoilState)
}

export const useSelectedNatureMutators = () => {
  const setSelectedNature = useSetRecoilState(selectedNatureRecoilState)

  /**
   * 性格を更新する
   */
  const updateSelectedNature = useCallback(
    (nature: Nature) => {
      setSelectedNature(nature)
    },
    [setSelectedNature]
  )

  return { updateSelectedNature }
}
