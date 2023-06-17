import { authMiddleware } from '@/hocs/authMiddleware'

const Settings = () => {
  return <>設定</>
}

export default authMiddleware(Settings)
