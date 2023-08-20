'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { useAuthUserState } from '@/store/authUserState'
import { useIsInitializationState } from '@/store/isInitializationState'
import { useRememberRouteState } from '@/store/rememberRouteState'
import type { ComponentType } from 'react'

export const noAuthMiddleware = (WrappedComponent: ComponentType) => {
  return function NoAuthMiddlewareComponent() {
    const authUser = useAuthUserState()
    const isInitialization = useIsInitializationState()

    const rememberRoute = useRememberRouteState()

    const router = useRouter()

    // 初期化が終わっていて、ユーザーがログインしている場合、トップページにリダイレクト
    useEffect(() => {
      if (!isInitialization || !authUser) return

      router.push(rememberRoute)
    }, [isInitialization, authUser, router, rememberRoute])

    // 初期化が終わっていない（認証状態がまだ確認できない）時に表示される
    if (!isInitialization || authUser) {
      return <LoadingPageTemplate />
    }

    // ユーザーがログインしていない場合は、引数として渡されたコンポーネントを表示
    return <WrappedComponent />
  }
}
