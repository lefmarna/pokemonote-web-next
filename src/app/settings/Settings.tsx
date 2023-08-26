'use client'

import { ErrorOutline } from '@mui/icons-material'
import {
  Alert,
  Card,
  CardHeader,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { $axios, isAxiosError } from '@/libs/axios'
import { EmailInput } from '@/components/forms/EmailInput'
import { NicknameInput } from '@/components/forms/NicknameInput'
import { PasswordInput } from '@/components/forms/PasswordInput'
import { UsernameInput } from '@/components/forms/UsernameInput'
import { DialogCard } from '@/components/molecules/DialogCard'
import { authMiddleware } from '@/hocs/authMiddleware'
import { useAuthUserMutators, useAuthUserState } from '@/store/authUserState'
import { MODAL_CLOSE_TIME_MS } from '@/utils/constants'
import { exceptionErrorToArray, requestApi, sleep } from '@/utils/helpers'

export const Settings = authMiddleware(() => {
  const router = useRouter()
  const authUser = useAuthUserState()
  const { updateAuthUser } = useAuthUserMutators()

  const [isLoading, setIsLoading] = useState(false)
  const [updateAccountParams, setUpdateAccountParams] = useState({
    username: '',
    nickname: '',
  })
  const [updateAccountErrors, setUpdateAccountErrors] = useState<string[]>([])
  const [updateEmailParams, setUpdateEmailParams] = useState({
    currentEmail: '',
    newEmail: '',
    newEmail_confirmation: '',
  })
  const [updateEmailErrors, setUpdateEmailErrors] = useState<string[]>([])
  const [passwordParams, setPasswordParams] = useState({
    currentPassword: '',
    newPassword: '',
    newPassword_confirmation: '',
  })
  const [updatePasswordErrors, setUpdatePasswordErrors] = useState<string[]>([])

  // アカウント情報の更新処理
  const updateAccount = async () => {
    if (authUser === null) return

    setIsLoading(true)
    try {
      await requestApi({
        url: '/api/v2/settings/account',
        method: 'put',
        data: updateAccountParams,
      })
      alert('ユーザー情報を更新しました')
      onCloseModal()
      updateAuthUser({
        ...authUser,
        ...updateAccountParams,
      })
      await sleep(MODAL_CLOSE_TIME_MS)
      setUpdateAccountParams({
        username: '',
        nickname: '',
      })
      setUpdateAccountErrors([])
    } catch (error) {
      setUpdateAccountErrors(exceptionErrorToArray(error, [401, 422]))
    } finally {
      setIsLoading(false)
    }
  }

  // メールアドレスの更新処理
  const updateEmail = async () => {
    setIsLoading(true)
    try {
      await $axios.post('/settings/email', updateEmailParams)
      router.push('/settings/email/confirm')
      onCloseModal()
    } catch (error) {
      setUpdateEmailErrors(exceptionErrorToArray(error, [401, 422]))
    } finally {
      setIsLoading(false)
    }
  }

  // パスワードの更新処理
  const updatePassword = async () => {
    setIsLoading(true)
    try {
      await requestApi({
        url: '/api/v2/settings/password',
        method: 'put',
        data: passwordParams,
      })
      alert('パスワードを更新しました')
      onCloseModal()
      await sleep(MODAL_CLOSE_TIME_MS)
      setPasswordParams({
        currentPassword: '',
        newPassword: '',
        newPassword_confirmation: '',
      })
      setUpdatePasswordErrors([])
    } catch (error) {
      setUpdatePasswordErrors(exceptionErrorToArray(error, [401, 422]))
    } finally {
      setIsLoading(false)
    }
  }

  // 退会処理
  const unsubscribe = async () => {
    setIsLoading(true)
    try {
      await requestApi({
        url: '/api/v2/settings/unsubscribe',
        method: 'delete',
      })
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 401) return
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    updateAuthUser(null)
    router.replace('/login')
  }

  type ModalType = 'name' | 'email' | 'password' | 'unsubscribe'

  const [modalType, setModalType] = useState<ModalType | null>(null)

  const handleOpenModal = (modalType: ModalType) => () => {
    setModalType(modalType)
  }

  const onCloseModal = () => {
    setModalType(null)
  }

  return (
    <Container>
      <Card sx={{ maxWidth: 540, mx: 'auto', mt: 5, pt: 2, px: 2 }}>
        <CardHeader
          title="Pokemonote - 設定"
          titleTypographyProps={{ align: 'center' }}
        />
        <List>
          <ListItemButton sx={{ py: 1.5 }} onClick={handleOpenModal('name')}>
            アカウント情報の変更
          </ListItemButton>
          <Divider />
          <ListItemButton sx={{ py: 1.5 }} onClick={handleOpenModal('email')}>
            メールアドレスの変更
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{ py: 1.5 }}
            onClick={handleOpenModal('password')}
          >
            パスワードの更新
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{ py: 1.5 }}
            onClick={handleOpenModal('unsubscribe')}
          >
            退会
          </ListItemButton>
        </List>
      </Card>
      <DialogCard
        title="Pokemonote - アカウント情報の変更"
        submitButtonText="変更する"
        isLoading={isLoading}
        onSubmit={updateAccount}
        open={modalType === 'name'}
        onClose={onCloseModal}
      >
        <UsernameInput
          value={updateAccountParams.username}
          setValue={(username: string) =>
            setUpdateAccountParams((prevParams) => {
              return {
                ...prevParams,
                username,
              }
            })
          }
        />
        <NicknameInput
          value={updateAccountParams.nickname}
          setValue={(nickname: string) =>
            setUpdateAccountParams((prevParams) => {
              return {
                ...prevParams,
                nickname,
              }
            })
          }
        />
        <List>
          {updateAccountErrors.map((error, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Alert severity="error" icon={<ErrorOutline />} />
              </ListItemIcon>
              <ListItemText>{error}</ListItemText>
            </ListItem>
          ))}
        </List>
      </DialogCard>
      <DialogCard
        title="Pokemonote - メールアドレスの変更"
        submitButtonText="確認メールを送信する"
        isLoading={isLoading}
        onSubmit={updateEmail}
        open={modalType === 'email'}
        onClose={onCloseModal}
      >
        <EmailInput
          value={updateEmailParams.currentEmail}
          label="現在のメールアドレス"
          setValue={(currentEmail: string) => {
            setUpdateEmailParams((prevParams) => {
              return {
                ...prevParams,
                currentEmail,
              }
            })
          }}
        />
        <EmailInput
          value={updateEmailParams.newEmail}
          label="新しいメールアドレス"
          setValue={(newEmail: string) => {
            setUpdateEmailParams((prevParams) => {
              return {
                ...prevParams,
                newEmail,
              }
            })
          }}
        />
        <EmailInput
          value={updateEmailParams.newEmail_confirmation}
          label="新しいメールアドレス（確認用）"
          setValue={(newEmail_confirmation: string) => {
            setUpdateEmailParams((prevParams) => {
              return {
                ...prevParams,
                newEmail_confirmation,
              }
            })
          }}
        />
      </DialogCard>
      <DialogCard
        title="Pokemonote - パスワードの更新"
        submitButtonText="更新する"
        isLoading={isLoading}
        onSubmit={updatePassword}
        open={modalType === 'password'}
        onClose={onCloseModal}
      >
        <PasswordInput
          value={passwordParams.currentPassword}
          label="現在のパスワード"
          setValue={(currentPassword: string) => {
            setPasswordParams((prevParams) => {
              return {
                ...prevParams,
                currentPassword,
              }
            })
          }}
        />
        <PasswordInput
          value={passwordParams.newPassword}
          label="新しいパスワード"
          setValue={(newPassword: string) => {
            setPasswordParams((prevParams) => {
              return {
                ...prevParams,
                newPassword,
              }
            })
          }}
        />
        <PasswordInput
          value={passwordParams.newPassword_confirmation}
          label="確認用パスワード"
          setValue={(newPassword_confirmation: string) => {
            setPasswordParams((prevParams) => {
              return {
                ...prevParams,
                newPassword_confirmation,
              }
            })
          }}
        />
      </DialogCard>
      <DialogCard
        title="Pokemonote - アカウント退会"
        submitButtonText="退会する"
        isDanger={true}
        isLoading={isLoading}
        onSubmit={unsubscribe}
        open={modalType === 'unsubscribe'}
        onClose={onCloseModal}
      >
        <div>
          これまでに投稿されたポケモンのデータも全て削除されます。
          <br />
          本当に退会してもよろしいですか？
        </div>
      </DialogCard>
    </Container>
  )
})
