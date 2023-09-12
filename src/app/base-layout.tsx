'use client'

import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { LoadingPageTemplate } from '@/components/templates/LoadingPageTemplate'
import { useMediaQueryUp } from '@/hooks/style/useMediaQueries'
import { useIsInitializationState } from '@/store/isInitializationState'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BaseLayout = (props: Props) => {
  const { children } = props

  const pathname = usePathname()

  const isLargeUpScreen = useMediaQueryUp('lg')
  const [drawer, setDrawer] = useState(isLargeUpScreen)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const isInitialization = useIsInitializationState()

  const onCloseDrawer = () => {
    setDrawer(false)
  }

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  useEffect(() => {
    setDrawer(isLargeUpScreen)

    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [isLargeUpScreen, isFirstRender])

  useEffect(() => {
    setDrawer(isLargeUpScreen)
  }, [pathname, setDrawer, isLargeUpScreen])

  if (isFirstRender) return null

  if (isInitialization === false) return <LoadingPageTemplate />

  return (
    <>
      <Sidebar drawer={drawer} onCloseDrawer={onCloseDrawer} />
      <Box
        component="main"
        sx={{
          marginLeft: isLargeUpScreen && drawer ? '260px' : '0px',
          transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Header toggleDrawer={toggleDrawer} />
        {children}
      </Box>
    </>
  )
}
