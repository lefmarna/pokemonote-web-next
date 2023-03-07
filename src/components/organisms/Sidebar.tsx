import { authUserState } from '@/store'
import {
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

type Props = {
  drawer: boolean
  onCloseDrawer: () => void
}

export const Sidebar = (props: Props) => {
  const { drawer, onCloseDrawer } = props

  const [authUser, setAuthUser] = useRecoilState(authUserState)

  const siteMenuLists = [
    {
      name: 'Home',
      icon: 'mdi-home',
      link: '/',
    },
    {
      name: 'みんなの投稿',
      icon: 'mdi-pokemon-go',
      link: '/pokemons',
    },
  ]

  const tools = [
    {
      name: 'ステータス計算機',
      icon: 'mdi-calculator',
      link: '/calc-stats',
    },
    {
      name: '素早さ計算機',
      icon: 'mdi-run-fast',
      link: '/calc-speed',
    },
    {
      name: '種族値ランキング',
      icon: 'mdi-finance',
      link: '/base-stats-ranking',
    },
  ]

  const otherMenuLists = [
    // {
    //   name: 'チップを贈る',
    //   icon: 'mdi-heart',
    //   link: '/give-tip',
    //   requireAuth: true,
    // },
    {
      name: '利用規約',
      icon: 'mdi-comment-alert',
      link: '/privacy-policy',
    },
    {
      name: 'お問い合わせ',
      icon: 'mdi-email',
      link: '/lefmarna-otoiawase',
    },
    {
      name: '設定',
      icon: 'mdi-cog',
      link: '/settings',
      requireAuth: true,
    },
  ]

  const otherMenuListsFiltered = () => {
    if (authUser) {
      return otherMenuLists
    } else {
      return otherMenuLists.filter((otherMenu) => otherMenu.requireAuth !== true)
    }
  }

  return (
    <Drawer anchor="left" open={drawer} onClose={onCloseDrawer}>
      <List>
        <Divider />
        <ListItem>
          <ListItemText primary="Menu" />
        </ListItem>
        <Divider />
        <List dense>
          {siteMenuLists.map((siteMenuList) => (
            <ListItemButton key={siteMenuList.name} component="a" href={siteMenuList.link}>
              <ListItemIcon>
                <Icon>{siteMenuList.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={siteMenuList.name} />
            </ListItemButton>
          ))}
          {/* ログイン時のみマイページを表示する */}
          {authUser && (
            <ListItemButton
              key="mypage"
              component="a"
              // href={`/users/${$store.getters.authUser.username}`}
            >
              <ListItemIcon>
                <Icon>mdi-account</Icon>
              </ListItemIcon>
              <ListItemText primary="マイページ" />
            </ListItemButton>
          )}
        </List>
        <Divider />
        <ListItem>
          <ListItemText primary="Tools" />
        </ListItem>
        <Divider />
        <List dense>
          {tools.map((tool) => (
            <ListItemButton key={tool.name} component="a" href={tool.link}>
              <ListItemIcon>
                <Icon>{tool.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={tool.name} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <ListItem>
          <ListItemText primary="Others" />
        </ListItem>
        <Divider />
        <List dense>
          {otherMenuListsFiltered().map((otherMenuList) => (
            <ListItemButton key={otherMenuList.name} component="a" href={otherMenuList.link}>
              <ListItemIcon>
                <Icon>{otherMenuList.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={otherMenuList.name} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <ListItem> © Copyright 2021 Pokemonote. </ListItem>
      </List>
    </Drawer>
  )
}
