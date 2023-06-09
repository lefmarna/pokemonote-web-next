import { passwordValidation } from '@/utils/regex'
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, FocusEvent, memo, useState } from 'react'

type Props = {
  name?: string
  label?: string
  value: string
  required?: boolean
  autoComplete?: 'current-password' | 'new-password'
  updatePassword: (newPassword: string) => void
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

  const [localValidateMessage, setLocalValidateMessage] = useState<string>('')
  const [prevLocalValidateMessage, setPrevLocalValidateMessage] =
    useState<string>('')

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const validateRules = {
    required: {
      rule: (value: string) => value.length === 0,
      label: 'この項目は必須です',
    },
    format: {
      rule: (value: string) => !passwordValidation.test(value),
      label:
        'パスワードは、英数それぞれ1種類以上含む、8〜64文字で入力してください',
    },
  }

  const validatePassword = (e: FocusEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    const targetValidationRule = Object.values(validateRules).find(
      (validateRule) => {
        return validateRule.rule(newPassword)
      }
    )
    setLocalValidateMessage(targetValidationRule?.label ?? '')
    setPrevLocalValidateMessage(targetValidationRule?.label ?? '')
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    updatePassword(newPassword)

    if (prevLocalValidateMessage === '') return

    const prevLocalValidateRule = Object.values(validateRules).find(
      (validateRule) => {
        return validateRule.label === prevLocalValidateMessage
      }
    )

    if (prevLocalValidateRule?.rule(newPassword)) {
      setLocalValidateMessage(prevLocalValidateRule.label)
    } else {
      setLocalValidateMessage('')
    }
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
      error={localValidateMessage !== ''}
      helperText={localValidateMessage}
      onChange={onChange}
      onBlur={validatePassword}
    />
  )
})
