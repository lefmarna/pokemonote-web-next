'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { useAuthUserState } from '@/store/authUserState'
import { useRememberRouteState } from '@/store/rememberRouteState'
import type { ComponentType } from 'react'

export const noAuthMiddleware = (WrappedComponent: ComponentType) => {
  return function NoAuthMiddlewareComponent() {
    const authUser = useAuthUserState()
    const rememberRoute = useRememberRouteState()

    const router = useRouter()

    // ユーザーがログインしている場合、トップページにリダイレクト
    useEffect(() => {
      if (!authUser) return

      router.push(rememberRoute)
    }, [authUser, router, rememberRoute])

    if (authUser) return <LoadingPageTemplate />

    // ユーザーがログインしていない場合は、引数として渡されたコンポーネントを表示
    return <WrappedComponent />
  }
}
