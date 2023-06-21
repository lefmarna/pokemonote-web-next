import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const isInitializationRecoilState = atom({
  key: 'isInitializationState',
  default: false,
})

export const useIsInitializationState = () => {
  return useRecoilValue(isInitializationRecoilState)
}

export const useIsInitializationMutators = () => {
  const setIsInitialization = useSetRecoilState(isInitializationRecoilState)

  /**
   * 初期化フラグをONにする（OFFにすることはないため、OFFにする処理は設けていない）
   */
  const completeInitialization = useCallback(() => {
    setIsInitialization(true)
  }, [setIsInitialization])

  return { completeInitialization }
}
