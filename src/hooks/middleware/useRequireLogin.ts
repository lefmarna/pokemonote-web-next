import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthUserState } from '@/store/authUserState'
import { useRememberRouteMutators } from '@/store/rememberRouteState'

export const useRequireLogin = () => {
  const authUser = useAuthUserState()
  const { updateRememberRoute } = useRememberRouteMutators()
  const router = useRouter()

  useEffect(() => {
    if (authUser) return
    updateRememberRoute(router.pathname)
    router.push('/login')
  }, [authUser, router, updateRememberRoute])
}
