import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const levelRecoilState = atom<number | ''>({
  key: 'levelState',
  default: 50,
})

export const useLevelState = () => {
  return useRecoilValue(levelRecoilState)
}

export const useLevelMutators = () => {
  const setLevel = useSetRecoilState(levelRecoilState)

  /**
   * レベルを更新する
   */
  const updateLevel = useCallback(
    (level: number | '') => {
      setLevel(level)
    },
    [setLevel]
  )

  return { updateLevel }
}
