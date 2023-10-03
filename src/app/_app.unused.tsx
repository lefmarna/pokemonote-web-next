import { Box, ThemeProvider } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import useSWR, { SWRConfig } from 'swr'
import '@/styles/globals.scss'
import { theme } from '@/libs/mui'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import SnackbarComponent from '@/components/organisms/SnackBarComponent'
import { useMediaQueryUp } from '@/hooks/style/useMediaQueries'
import { useAuthUserMutators } from '@/store/authUserState'
import { useIsInitializationMutators } from '@/store/isInitializationState'
import { useNaturesMutators } from '@/store/naturesState'
import { usePokemonBasicInfosSMutators } from '@/store/pokemonBasicInfosState'
import type {
  AuthUser,
  Nature,
  PokemonBasicInfo,
} from '@/types/openapi/schemas'
import type { AxiosError } from 'axios'
import type { AppProps } from 'next/app'

const AppInit = () => {
  const { updateAuthUser } = useAuthUserMutators()

  const { updatePokemonBasicInfos } = usePokemonBasicInfosSMutators()
  const { updateNatures } = useNaturesMutators()

  const { completeInitialization } = useIsInitializationMutators()

  const { data: loginData } = useSWR<{
    data: {
      auth_user: AuthUser | null
    }
  }>('/init/login', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const { data: StaticData } = useSWR<{
    data: {
      pokemon_basic_infos: PokemonBasicInfo[]
      natures: Nature[]
    }
  }>('/init/fetch', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useEffect(() => {
    if (!loginData || !StaticData) return
    updateAuthUser(loginData.data.auth_user)
    updatePokemonBasicInfos(StaticData.data.pokemon_basic_infos)
    updateNatures(StaticData.data.natures)
    completeInitialization()
  }, [
    loginData,
    StaticData,
    completeInitialization,
    updateAuthUser,
    updatePokemonBasicInfos,
    updateNatures,
  ])

  return <></>
}

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
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
  const [drawer, setDrawer] = useState(isLargeUpScreen)

  const router = useRouter()

  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    setDrawer(isLargeUpScreen)

    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [isLargeUpScreen, isFirstRender])

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  const onCloseDrawer = () => {
    setDrawer(false)
  }

  const meta = {
    title: 'Pokemonote',
    description: 'ポケモンの育成に役立つツールを提供します。',
  }

  const handleRouteChange = useCallback(() => {
    setDrawer(isLargeUpScreen)
  }, [isLargeUpScreen])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, handleRouteChange])

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:image"
          content="https://pokemonote.com/twitter_card.jpg"
        />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@lefmarna" />
        <meta property="format-detection" content="telephone=no" />
        {process.env.NEXT_PUBLIC_NODE_ENV !== 'production' && (
          <meta name="robots" content="noindex,nofollow" />
        )}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <SWRConfig value={swrConfigValue}>
            {!isFirstRender && (
              <>
                <Sidebar drawer={drawer} onCloseDrawer={onCloseDrawer} />
                <AppInit />
                <Box
                  component="main"
                  sx={{
                    marginLeft: isLargeUpScreen && drawer ? '260px' : '0px',
                    transition:
                      'margin-left 225ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Header toggleDrawer={toggleDrawer} />
                  <Component {...pageProps} />
                </Box>
              </>
            )}
            <SnackbarComponent />
          </SWRConfig>
        </RecoilRoot>
      </ThemeProvider>
    </>
  )
}
