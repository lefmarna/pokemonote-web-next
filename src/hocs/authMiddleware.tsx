'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { useAuthUserState } from '@/store/authUserState'
import { useIsInitializationState } from '@/store/isInitializationState'
import { useRememberRouteMutators } from '@/store/rememberRouteState'
import type { ComponentType } from 'react'

export const authMiddleware = (WrappedComponent: ComponentType) => {
  return function AuthMiddlewareComponent() {
    const authUser = useAuthUserState()
    const isInitialization = useIsInitializationState()
    const { updateRememberRoute } = useRememberRouteMutators()

    const router = useRouter()
    const path = usePathname()
    const queries = useSearchParams()
    const queryParams = queries.toString() ? `?${queries.toString()}` : ''

    // 初期化が終わっていて、ユーザーがログインしていない場合、ログインページにリダイレクト
    useEffect(() => {
      if (!isInitialization || authUser) return

      updateRememberRoute(`${path}${queryParams}`)
      router.replace('/login')
    }, [
      isInitialization,
      authUser,
      router,
      path,
      queryParams,
      updateRememberRoute,
    ])

    // 初期化が終わっていない（認証状態がまだ確認できない）時に表示される
    if (!authUser) {
      return <LoadingPageTemplate />
    }

    // ユーザーがログインしている場合は、引数として渡されたコンポーネントを表示
    return <WrappedComponent />
  }
}
