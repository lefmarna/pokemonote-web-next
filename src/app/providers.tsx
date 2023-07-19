'use client'

import { ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import type { AxiosError } from '@/libs/axios'
import { $axios } from '@/libs/axios'
import { theme } from '@/utils/theme'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  const swrConfigValue = {
    fetcher: (url: string) => $axios.get(url).then((res) => res.data),
    onError: (error: AxiosError) => {
      switch (error.status) {
        case 404:
          console.log(error)
          break
        case 403:
          console.log(error)
          break
        default:
          console.log(error)
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
