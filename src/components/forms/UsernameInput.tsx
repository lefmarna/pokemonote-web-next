'use client'

import { Person } from '@mui/icons-material'
import { memo } from 'react'
import { BaseFormInput } from '@/components/forms/BaseFormInput'

type Props = {
  label?: string
  value?: string
  required?: boolean
  setValue: (value: string) => void
}

export const UsernameInput = memo(function UsernameInput(props: Props) {
  const { label = 'ユーザー名', value, required = false, setValue } = props

  const validateRules = {
    required: {
      rule: (value: string) => value.length === 0,
      label: 'この項目は必須です',
    },
    format: {
      rule: (value: string) => !/^[a-z\d]{5,15}$/i.test(value),
      label: '英数5〜15文字で入力してください。',
    },
  }

  return (
    <BaseFormInput
      label={label}
      value={value}
      placeholder="英数5〜15文字で入力してください。"
      required={required}
      validateRules={validateRules}
      updateValue={setValue}
      StartIcon={<Person />}
    />
  )
})
