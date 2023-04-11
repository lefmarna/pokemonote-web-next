import { Nature } from '@/types'
import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

export const naturesRecoilState = atom<Nature[]>({
  key: 'naturesState',
  default: [],
})

export const useNaturesState = () => {
  return useRecoilValue(naturesRecoilState)
}

export const useNaturesMutators = () => {
  const setNatures = useSetRecoilState(naturesRecoilState)

  /**
   * 性格一覧を更新する
   */
  const updateNatures = useCallback(
    (natures: Nature[]) => {
      setNatures(natures)
    },
    [setNatures]
  )

  return { updateNatures }
}
