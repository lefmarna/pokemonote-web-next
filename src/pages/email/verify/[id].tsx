import { noAuthMiddleware } from '@/hocs/noAuthMiddleware'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuthUserMutators } from '../../../store/authUserState'

const VerifyEmail = () => {
  const router = useRouter()

  const { updateAuthUser } = useAuthUserMutators()

  ;(async () => {
    try {
      const response = await axios.get(
        `/email/verify/${router.query.id}?expires=${router.query.expires}&signature=${router.query.signature}`
      )

      updateAuthUser(response.data.data)
      // store.dispatch('notice')
    } catch (error) {
      console.log(error)
    }
    router.push('/')
  })()

  return <div>メール認証中...</div>
}

export default noAuthMiddleware(VerifyEmail)
