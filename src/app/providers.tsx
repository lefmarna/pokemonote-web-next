'use client'

import axios, { AxiosError } from 'axios'
import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  const swrConfigValue = {
    fetcher: (url: string) => axios.get(url).then((res) => res.data),
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
    <RecoilRoot>
      <SWRConfig value={swrConfigValue}>{children}</SWRConfig>
    </RecoilRoot>
  )
}
