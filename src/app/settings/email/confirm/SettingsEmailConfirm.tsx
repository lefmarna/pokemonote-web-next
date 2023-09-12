'use client'

import { FormTemplate } from '@/components/templates/FormTemplate'
import { authMiddleware } from '@/hocs/authMiddleware'

export const SettingsEmailConfirm = authMiddleware(() => {
  return (
    <FormTemplate title="メールアドレスの変更">
      <p>メールアドレスの変更はまだ完了していません。</p>
      <p>
        ご入力いただきましたメールアドレス宛に、変更用URLを記載した確認メールを送信いたしました。
      </p>
      <p>内容をご確認のうえ、メールアドレスの変更を完了してください。</p>
    </FormTemplate>
  )
})
