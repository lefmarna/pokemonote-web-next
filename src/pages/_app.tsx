import { Box, ThemeProvider } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { memo, useEffect, useState } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import useSWR, { SWRConfig } from 'swr'
import '@/styles/globals.scss'
import { natureDataState, pokemonDataState } from '@/store'
import { AppProps } from 'next/app'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { theme, useMediaQueryUp } from '@/utils/theme'
import { useAuthUserMutators } from '@/store/authUserState'

const AppInit = memo(() => {
  const { updateAuthUser } = useAuthUserMutators()
  const setPokemonData = useSetRecoilState(pokemonDataState)
  const setNatureData = useSetRecoilState(natureDataState)

  const { data } = useSWR('init')

  useEffect(() => {
    if (!data) return
    updateAuthUser(data.data.auth_user)
    setPokemonData(data.data.pokemon_data)
    setNatureData(data.data.nature_data)
  }, [data, updateAuthUser, setPokemonData, setNatureData])

  return <></>
})

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL
  axios.defaults.withCredentials = true

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

  const isLargeUpScreen = useMediaQueryUp('lg')

  const [drawer, setDrawer] = useState(false)

  const drawerWidth = 257

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  const onCloseDrawer = () => {
    setDrawer(false)
  }

  useEffect(() => {
    setDrawer(isLargeUpScreen)
  }, [isLargeUpScreen])

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <SWRConfig value={swrConfigValue}>
          <Sidebar drawer={drawer} onCloseDrawer={onCloseDrawer} />
          <AppInit />
          <Box
            component="main"
            sx={{ paddingLeft: drawer && isLargeUpScreen ? `${drawerWidth}px` : 0 }}
          >
            <Header toggleDrawer={toggleDrawer} />
            <Component {...pageProps} />
          </Box>
        </SWRConfig>
      </RecoilRoot>
    </ThemeProvider>
  )
}
