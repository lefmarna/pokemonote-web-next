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
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MouseEvent, useState } from 'react'
import { useAuthUserMutators, useAuthUserState } from '@/store/authUserState'

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
      await axios.post('/logout')
      updateAuthUser(null)
    } catch (e) {
      if (!axios.isAxiosError(e) || e.response?.status !== 401) return
      console.log(e)
    } finally {
      setIsLoading(false)
    }

    router.replace('/login')
  }

  return (
    <Box>
      <AppBar position="fixed" color="primary">
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
          <Box onClick={returnTopPage} sx={{ cursor: 'pointer', px: 2, ml: 2 }}>
            <Image
              height="64"
              width="240"
              alt="Pokemonote"
              src="/images/logo.svg"
            />
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
          <Box>
            <MenuItem onClick={goLogin}>ログイン</MenuItem>
            <MenuItem onClick={goRegister}>新規登録</MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  )
}
