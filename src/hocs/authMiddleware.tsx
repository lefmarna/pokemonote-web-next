import React, { ComponentType, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthUserState } from '@/store/authUserState'
import { useRememberRouteMutators } from '@/store/rememberRouteState'
import { useIsInitializationState } from '@/store/isInitializationState'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'

export const authMiddleware = (WrappedComponent: ComponentType) => {
  return function AuthMiddlewareComponent() {
    const authUser = useAuthUserState()
    const isInitialization = useIsInitializationState()
    const { updateRememberRoute } = useRememberRouteMutators()

    const router = useRouter()

    // 初期化が終わっていて、ユーザーがログインしていない場合、ログインページにリダイレクト
    useEffect(() => {
      if (!isInitialization || authUser) return

      updateRememberRoute(router.pathname)
      router.push('/login')
    }, [isInitialization, authUser, router, updateRememberRoute])

    // 初期化が終わっていない（認証状態がまだ確認できない）時に表示される
    if (!authUser) {
      return <LoadingPageTemplate />
    }

    // ユーザーがログインしている場合は、引数として渡されたコンポーネントを表示
    return <WrappedComponent />
  }
}
