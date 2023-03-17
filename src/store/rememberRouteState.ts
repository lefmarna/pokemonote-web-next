import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const rememberRouteRecoilState = atom({
  key: 'rememberRouteState',
  default: '',
})

export const useRememberRouteState = () => {
  return useRecoilValue(rememberRouteRecoilState)
}

export const useRememberRouteMutators = () => {
  const setRememberRoute = useSetRecoilState(rememberRouteRecoilState)

  /**
   * ログイン時のリダイレクト先URLを更新する
   */
  const updateRememberRoute = useCallback(
    (RememberRoute: string) => {
      setRememberRoute(RememberRoute)
    },
    [setRememberRoute]
  )

  return { updateRememberRoute }
}
