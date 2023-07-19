'use client'

import { FormTemplate } from '@/components/templates/FormTemplate'

export const PasswordConfirm = () => {
  return (
    <FormTemplate title="パスワード再設定の受付">
      <p>
        ご入力いただきましたメールアドレス宛に、パスワード再設定用URLを記載した確認メールを送信いたしました。
      </p>
      <p>内容をご確認のうえ、パスワード再設定を完了してください。</p>
    </FormTemplate>
  )
}
