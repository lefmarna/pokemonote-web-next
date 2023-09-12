'use client'

import { ThemeProvider } from '@mui/material'
import { useRouter } from 'next/navigation'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import { $axios, isAxiosError } from '@/libs/axios'
import { theme } from '@/libs/mui'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  const router = useRouter()

  const swrConfigValue = {
    fetcher: (url: string) => $axios.get(url).then((res) => res.data),
    onError: (e: unknown) => {
      // Network Error
      if (!isAxiosError(e)) {
        console.log(e)
        return
      }

      // HTTP Error
      switch (e.response?.status) {
        case 401:
          router.replace('/login')
          break
        case 403:
          router.replace('/')
          break
        case 404:
          router.replace('/')
          break
        default:
          console.log(e)
      }
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <SWRConfig value={swrConfigValue}>{children}</SWRConfig>
      </RecoilRoot>
    </ThemeProvider>
  )
}
