'use client'

import { ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import { $axios, AxiosError } from '@/utils/axios'
import { theme } from '@/utils/theme'

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
