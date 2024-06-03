'use client'

import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import SnackbarComponent from '@/components/organisms/SnackBarComponent'
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
  const [open, setOpen] = useState(isLargeUpScreen)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const isInitialization = useIsInitializationState()

  const onClose = () => {
    setOpen(false)
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setOpen(isLargeUpScreen)

    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [isLargeUpScreen, isFirstRender])

  useEffect(() => {
    setOpen(isLargeUpScreen)
  }, [pathname, setOpen, isLargeUpScreen])

  if (isFirstRender) return null

  if (isInitialization === false) return <LoadingPageTemplate />

  const marginLeft = isLargeUpScreen && open ? '275.523px' : '0px'

  return (
    <>
      <Sidebar open={open} onClose={onClose} />
      <Box component="main" sx={{ marginLeft }}>
        <div>
          <SnackbarComponent sx={{ width: `calc(100% - ${marginLeft})` }} />
        </div>
        <Header toggleDrawer={toggleDrawer} />
        {children}
      </Box>
    </>
  )
}
