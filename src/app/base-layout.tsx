'use client'

import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { useMediaQueryUp } from '@/utils/theme'
import { Box } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
}

export const BaseLayout = (props: Props) => {
  const { children } = props

  const isLargeUpScreen = useMediaQueryUp('lg')
  const [drawer, setDrawer] = useState(isLargeUpScreen)
  const [isFirstRender, setIsFirstRender] = useState(true)

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
