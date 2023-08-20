import { useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import type { AuthUser } from '@/types/front'

const authUserRecoilState = atom<AuthUser | null>({
  key: 'authUserState',
  default: null,
})

export const useAuthUserState = () => {
  return useRecoilValue(authUserRecoilState)
}

export const useAuthUserMutators = () => {
  const setAuthUser = useSetRecoilState(authUserRecoilState)

  /**
   * ログインユーザーを更新する
   */
  const updateAuthUser = useCallback(
    (authUser: AuthUser | null) => {
      setAuthUser(authUser)
    },
    [setAuthUser]
  )

  return { updateAuthUser }
}
