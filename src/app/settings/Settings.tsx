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
  TextField,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { $axios, isAxiosError } from '@/libs/axios'
import { EmailInput } from '@/components/forms/EmailInput'
import { NicknameInput } from '@/components/forms/NicknameInput'
import { UsernameInput } from '@/components/forms/UsernameInput'
import { DialogCard } from '@/components/molecules/DialogCard'
import { authMiddleware } from '@/hocs/authMiddleware'
import { useAuthUserMutators } from '@/store/authUserState'
import { exceptionErrorToArray } from '@/utils/helpers'

export const Settings = authMiddleware(() => {
  const router = useRouter()
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
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
  const [updatePasswordErrors, setUpdatePasswordErrors] = useState<string[]>([])

  // アカウント情報の更新処理
  const updateAccount = async () => {
    setIsLoading(true)
    try {
      const response = await $axios.put(
        '/settings/account',
        updateAccountParams
      )
      alert('ユーザー情報を更新しました')
      setUpdateAccountParams({
        username: '',
        nickname: '',
      })
      setUpdateAccountErrors([])
      updateAuthUser(response.data.data)
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
      await $axios.put('/settings/password', passwordParams)
      alert('パスワードを更新しました')
      // closeDialog()
      setPasswordParams({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
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
      await $axios.delete(`/settings/unsubscribe`)
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
      <Card sx={{ maxWidth: 540, mx: 'auto', mt: 5 }}>
        <CardHeader title="Pokemonote - 設定" />
        <List>
          <ListItemButton onClick={handleOpenModal('name')}>
            アカウント情報の変更
          </ListItemButton>
          <ListItemButton onClick={handleOpenModal('email')}>
            メールアドレスの変更
          </ListItemButton>
          <ListItemButton onClick={handleOpenModal('password')}>
            パスワードの更新
          </ListItemButton>
          <ListItemButton onClick={handleOpenModal('unsubscribe')}>
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
        {/* 各フィールドの内容を実装してください */}
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
