import { createTheme, ThemeProvider } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { memo, useEffect, useState } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import useSWR, { SWRConfig } from 'swr'
import '@/styles/globals.scss'
import { authUserState, natureDataState, pokemonDataState } from '@/store'
import { AppProps } from 'next/app'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'

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

export default function App({ Component, pageProps }: AppProps) {
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

  const [drawer, setDrawer] = useState(false)

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  const onCloseDrawer = () => {
    setDrawer(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <SWRConfig value={swrConfigValue}>
          <Sidebar drawer={drawer} onCloseDrawer={onCloseDrawer} />
          <AppInit />
          <main style={{ marginLeft: drawer ? '256px' : 0 }}>
            <Header toggleDrawer={toggleDrawer} />
            <Component {...pageProps} />
          </main>
        </SWRConfig>
      </RecoilRoot>
    </ThemeProvider>
  )
}
