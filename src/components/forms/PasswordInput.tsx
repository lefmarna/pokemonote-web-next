'use client'

import { Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { memo, useState } from 'react'
import { BaseFormInput } from '@/components/forms/BaseFormInput'

type Props = {
  label?: string
  value: string
  required?: boolean
  autoComplete?: 'current-password' | 'new-password'
  setValue: (value: string) => void
}

export const PasswordInput = memo(function PasswordInput(props: Props) {
  const {
    label = 'パスワード',
    value,
    required = false,
    autoComplete = 'current-password',
    setValue,
  } = props

  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordIcon = showPassword ? <Visibility /> : <VisibilityOff />

  const passwordValidation = /^(?=.*?[a-z])(?=.*?\d)[a-z\d!@#$%^&*]{8,64}$/i

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

  return (
    <BaseFormInput
      type={showPassword ? 'text' : 'password'}
      label={label}
      value={value}
      required={required}
      autoComplete={autoComplete}
      validateRules={validateRules}
      updateValue={setValue}
      StartIcon={<Lock />}
      EndIcon={
        <IconButton onClick={handleTogglePasswordVisibility}>
          {togglePasswordIcon}
        </IconButton>
      }
    />
  )
})
