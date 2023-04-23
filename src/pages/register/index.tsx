import { useRequireLogin } from '@/hooks/middleware/useRequireLogin'

export default function Register() {
  useRequireLogin()

  return <>登録ページ</>
}
