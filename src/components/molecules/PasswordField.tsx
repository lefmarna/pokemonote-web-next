import { passwordValidation } from '@/utils/regex'
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, FocusEvent, memo, useState } from 'react'

type Props = {
  name?: string
  label?: string
  value?: string
  required?: boolean
  autoComplete?: 'current-password' | 'new-password'
  updatePassword: (event: ChangeEvent<HTMLInputElement>) => void
}

export const PasswordField = memo((props: Props) => {
  const {
    name,
    label = 'パスワード',
    value,
    required = false,
    autoComplete = 'current-password',
    updatePassword,
  } = props

  const [showPassword, setShowPassword] = useState(false)
  const [localValidateMessage, setLocalValidateMessage] = useState<string>()

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const validatePassword = (e: FocusEvent<HTMLInputElement>) => {
    const password = e.target.value
    if (password.length === 0) {
      setLocalValidateMessage('この項目は必須です')
    } else if (!passwordValidation.test(password)) {
      setLocalValidateMessage(
        'パスワードは、英数それぞれ1種類以上含む、8〜64文字で入力してください'
      )
    } else {
      setLocalValidateMessage(undefined)
    }
  }

  const isError = () => {
    return localValidateMessage !== undefined
  }

  const togglePasswordIcon = showPassword ? <Visibility /> : <VisibilityOff />

  return (
    <TextField
      name={name}
      type={showPassword ? 'text' : 'password'}
      label={label}
      value={value}
      required={required}
      variant="standard"
      autoComplete={autoComplete}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility}>
              {togglePasswordIcon}
            </IconButton>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        required: false,
      }}
      error={isError()}
      helperText={localValidateMessage}
      onChange={updatePassword}
      onFocus={() => setLocalValidateMessage(undefined)}
      onBlur={validatePassword}
    />
  )
})
