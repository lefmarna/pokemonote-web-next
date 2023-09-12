'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { useAuthUserState } from '@/store/authUserState'
import { useRememberRouteMutators } from '@/store/rememberRouteState'
import type { ComponentType } from 'react'

export const authMiddleware = (WrappedComponent: ComponentType) => {
  return function AuthMiddlewareComponent() {
    const authUser = useAuthUserState()
    const { updateRememberRoute } = useRememberRouteMutators()

    const router = useRouter()
    const path = usePathname()
    const queries = useSearchParams()
    const queryParams = queries.toString() ? `?${queries.toString()}` : ''

    // ユーザーがログインしていない場合、ログインページにリダイレクト
    useEffect(() => {
      if (authUser) return

      updateRememberRoute(`${path}${queryParams}`)
      router.replace('/login')
    }, [authUser, router, path, queryParams, updateRememberRoute])

    if (!authUser) return <LoadingPageTemplate />

    // ユーザーがログインしている場合は、引数として渡されたコンポーネントを表示
    return <WrappedComponent />
  }
}
