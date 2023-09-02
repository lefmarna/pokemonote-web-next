'use client'

import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material'
import { isAxiosError } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthUserMutators, useAuthUserState } from '@/store/authUserState'
import { useRememberRouteMutators } from '@/store/rememberRouteState'
import { requestOpenApi } from '@/utils/helpers'
import type { MouseEvent } from 'react'

type Props = {
  toggleDrawer: () => void
}

export const Header = (props: Props) => {
  const { toggleDrawer } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const profileMenuId = 'profile-menu'
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const authUser = useAuthUserState()
  const { updateAuthUser } = useAuthUserMutators()
  const { updateRememberRoute } = useRememberRouteMutators()

  const openProfileMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeProfileMenu = () => {
    setAnchorEl(null)
  }

  const returnTopPage = () => {
    router.push('/')
  }

  const goLogin = () => {
    closeProfileMenu()
    router.push('/login')
  }

  const goRegister = () => {
    closeProfileMenu()
    router.push('/register')
  }

  const logout = async () => {
    setIsLoading(true)

    try {
      await requestOpenApi({
        url: '/api/v2/logout',
        method: 'post',
      })
      updateAuthUser(null)

      // NOTE: middlewareのrememberRouteの更新を待機してから初期化する
      setTimeout(() => {
        updateRememberRoute('/')
      }, 0)
    } catch (e) {
      if (!isAxiosError(e) || e.response?.status !== 401) return
      console.log(e)
    } finally {
      setIsLoading(false)
    }

    router.replace('/login')
  }

  return (
    <Box>
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ display: 'flex', maxHeight: '64px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            size="large"
            sx={{ '&:hover': { bgcolor: '#2B81D6' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            onClick={returnTopPage}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              px: 2,
              ml: 2,
              aspectRatio: '240 / 64',
              width: '240px',
              maxWidth: 'calc(100vw - 116px - 32px)',
            }}
          >
            <Image alt="Pokemonote" src="/images/logo.svg" fill />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Avatar
              onClick={openProfileMenu}
              aria-controls={profileMenuId}
              aria-haspopup="true"
              alt=""
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id={profileMenuId}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={closeProfileMenu}
      >
        {authUser && authUser.isAuthenticated ? (
          <MenuItem onClick={logout} disabled={isLoading}>
            ログアウト
          </MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={goLogin}>ログイン</MenuItem>
            <MenuItem onClick={goRegister}>新規登録</MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  )
}
