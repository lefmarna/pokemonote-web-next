import { emailValidation } from '@/utils/regex'
import { BaseFormField } from './BaseFormField'
import { Email } from '@mui/icons-material'
import { memo } from 'react'

type Props = {
  label?: string
  value?: string
  required?: boolean
  setValue: (value: string) => void
}

export const EmailField = memo(function EmailField(props: Props) {
  const { label = 'メールアドレス', value, required = false, setValue } = props

  const validateRules = {
    required: {
      rule: (value: string) => value.length === 0,
      label: 'この項目は必須です',
    },
    format: {
      rule: (value: string) => !emailValidation.test(value),
      label: 'メールアドレスは有効ではありません',
    },
  }

  return (
    <BaseFormField
      type="email"
      label={label}
      value={value}
      required={required}
      autoComplete="email"
      validateRules={validateRules}
      updateValue={setValue}
      StartIcon={<Email />}
    />
  )
})
