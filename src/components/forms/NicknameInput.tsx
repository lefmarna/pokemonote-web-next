import { Person } from '@mui/icons-material'
import { memo } from 'react'
import { BaseFormInput } from '@/components/forms/BaseFormInput'

type Props = {
  label?: string
  value?: string
  required?: boolean
  setValue: (value: string) => void
}

export const NicknameInput = memo(function NicknameInput(props: Props) {
  const { label = 'ニックネーム', value, required = false, setValue } = props

  const validateRules = {
    required: {
      rule: (value: string) => value.length === 0,
      label: 'この項目は必須です',
    },
    format: {
      rule: (value: string) => {
        const length = value.length
        return length < 4 || 50 < length
      },
      label: '4〜50文字で入力してください',
    },
  }

  return (
    <BaseFormInput
      label={label}
      value={value}
      placeholder="4〜50文字で入力してください"
      required={required}
      validateRules={validateRules}
      updateValue={setValue}
      StartIcon={<Person />}
    />
  )
})
