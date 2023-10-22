'use client'

import {
  Announcement,
  Calculate,
  DirectionsRun,
  Email,
  Person,
  Settings,
  TrendingUp,
} from '@mui/icons-material'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import HomeIcon from '@mui/icons-material/Home'
import {
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'
import { AdCode } from './AdCode'
import { useMediaQueryUp } from '@/hooks/style/useMediaQueries'
import { useAuthUserState } from '@/store/authUserState'

type Props = {
  open: boolean
  onClose: () => void
}

export const Sidebar = (props: Props) => {
  const { open, onClose } = props

  const authUser = useAuthUserState()

  const sideBarContents = {
    siteMenuLists: [
      {
        id: 1,
        name: 'Home',
        icon: <HomeIcon />,
        link: '/',
      },
      {
        id: 2,
        name: 'みんなの投稿',
        icon: <CatchingPokemonIcon />,
        link: '/pokemons',
      },
    ],
    tools: [
      {
        id: 1,
        name: 'ステータス計算機',
        icon: <Calculate />,
        link: '/calc-stats',
      },
      {
        id: 2,
        name: '素早さ計算機',
        icon: <DirectionsRun />,
        link: '/calc-speed',
      },
      {
        id: 3,
        name: '種族値ランキング',
        icon: <TrendingUp />,
        link: '/base-stats-ranking',
      },
    ],
    otherMenuLists: [
      {
        id: 1,
        name: '利用規約',
        icon: <Announcement />,
        link: '/privacy-policy',
        requireAuth: false,
      },
      {
        id: 2,
        name: 'お問い合わせ',
        icon: <Email />,
        link: '/lefmarna-otoiawase',
        requireAuth: false,
      },
      {
        id: 3,
        name: '設定',
        icon: <Settings />,
        link: '/settings',
        requireAuth: true,
      },
    ],
  } as const

  const otherMenuListsFiltered = () => {
    if (authUser) {
      return sideBarContents.otherMenuLists
    }

    return sideBarContents.otherMenuLists.filter(
      (otherMenu) => otherMenu.requireAuth !== true
    )
  }

  const isLargeUpScreen = useMediaQueryUp('lg')

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="left"
      variant={isLargeUpScreen ? 'persistent' : 'temporary'}
    >
      <Divider />
      <ListItem>
        <ListItemText primary="Menu" />
      </ListItem>
      <Divider />
      <List dense>
        {sideBarContents.siteMenuLists.map((siteMenuList) => (
          <Link href={siteMenuList.link} key={siteMenuList.id}>
            <ListItemButton key={siteMenuList.name}>
              <ListItemIcon>
                <Icon>{siteMenuList.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={siteMenuList.name} />
            </ListItemButton>
          </Link>
        ))}
        {/* ログイン時のみマイページを表示する */}
        {authUser && (
          <Link
            href={{
              pathname: '/users/show',
              query: { username: authUser.username },
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="マイページ" />
            </ListItemButton>
          </Link>
        )}
      </List>
      <Divider />
      <ListItem>
        <ListItemText primary="Tools" />
      </ListItem>
      <Divider />
      <List dense>
        {sideBarContents.tools.map((tool) => (
          <Link href={tool.link} key={tool.id}>
            <ListItemButton key={tool.name}>
              <ListItemIcon>
                <Icon>{tool.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={tool.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <Box sx={{ textAlign: 'center', margin: '0 auto' }}>
        <AdCode
          slot="4559543564"
          format="rectangle"
          style={{
            display: 'inline-block',
            width: '232px',
            height: '232px',
            marginTop: '12px',
          }}
        />
      </Box>
      <ListItem>
        <ListItemText primary="Others" />
      </ListItem>
      <Divider />
      <List dense>
        {otherMenuListsFiltered().map((otherMenuList) => (
          <Link href={otherMenuList.link} key={otherMenuList.id}>
            <ListItemButton key={otherMenuList.name}>
              <ListItemIcon>
                <Icon>{otherMenuList.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={otherMenuList.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <ListItem> © Copyright 2021 Pokemonote. </ListItem>
    </Drawer>
  )
}
