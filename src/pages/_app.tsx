import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { memo, useEffect } from 'react'
import axios from 'axios'
import { authUserState, natureDataState, pokemonDataState } from '../store'
import useSWR, { SWRConfig } from 'swr'

const AppInit = memo(() => {
  const setAuthUser = useSetRecoilState(authUserState)
  const setPokemonData = useSetRecoilState(pokemonDataState)
  const setNatureData = useSetRecoilState(natureDataState)

  const { data } = useSWR('init')

  useEffect(() => {
    if (!data) return
    setAuthUser(data.data.auth_user)
    setPokemonData(data.data.pokemon_data)
    setNatureData(data.data.nature_data)
  }, [data, setAuthUser, setPokemonData, setNatureData])

  return <></>
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL
  axios.defaults.withCredentials = true

  const swrConfigValue = {
    fetcher: (url: string) => axios.get(url).then((res) => res.data),
    onError: (error: unknown) => {
      if (!axios.isAxiosError(error)) {
        console.log(error)
        return
      }

      switch (error.status) {
        case '404':
          console.log('404')
          console.log(error)
          break
        case '403':
          console.log('403')
          console.log(error)
          break
        default:
          console.log(error)
      }
    },
  }

  return (
    <RecoilRoot>
      <SWRConfig value={swrConfigValue}>
        <AppInit />
        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  )
}

export default MyApp
