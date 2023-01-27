import { AppBar, Avatar, Box, Menu, MenuItem, Toolbar } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MouseEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import { authUserState } from '../../store'

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const profileMenuId = 'profile-menu'
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [authUser, setAuthUser] = useRecoilState(authUserState)

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
    router.push('register')
  }

  const logout = async () => {
    setIsLoading(true)

    try {
      await axios.post('/logout')
      setAuthUser(null)
    } catch (e) {
      if (!axios.isAxiosError(e) || e.response?.status !== 401) return
      console.log(e)
    } finally {
      setIsLoading(false)
    }

    router.replace('/login')
  }

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Box onClick={returnTopPage} sx={{ cursor: 'pointer', ml: 1 }}>
              <Image height="64" width="240" alt="Pokemonote" src="/images/logo.svg" />
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
          {authUser && authUser.email_verified_at ? (
            <MenuItem onClick={logout} disabled={isLoading}>
              ログアウト
            </MenuItem>
          ) : (
            <>
              <MenuItem onClick={goLogin}>ログイン</MenuItem>
              <MenuItem onClick={goRegister}>新規登録</MenuItem>
            </>
          )}
        </Menu>
      </Box>
    </>
  )
}
