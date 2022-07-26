import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { memo, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { authUserState, natureDataState, pokemonDataState } from '../store'
import useSWR, { SWRConfig } from 'swr'
import { Header } from '../components/organisms/Header'
import { createTheme, ThemeProvider } from '@mui/material'

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

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#424242',
      },
    },
  })

  const swrConfigValue = {
    fetcher: (url: string) => axios.get(url).then((res) => res.data),
    onError: (error: AxiosError) => {
      switch (error.status) {
        case '404':
          console.log(error)
          break
        case '403':
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
        <SWRConfig value={swrConfigValue}>
          <Header />
          <AppInit />
          <main>
            <Component {...pageProps} />
          </main>
        </SWRConfig>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default MyApp
