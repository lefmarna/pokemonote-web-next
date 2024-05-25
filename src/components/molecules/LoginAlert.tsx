import styled from '@emotion/styled'
import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRememberRouteMutators } from '@/store/rememberRouteState'

const LoginText = styled('span')`
  cursor: pointer;
`

export const LoginAlert = () => {
  const router = useRouter()
  const path = usePathname()
  const queries = useSearchParams()
  const queryParams = queries.toString() ? `?${queries.toString()}` : ''

  const { updateRememberRoute } = useRememberRouteMutators()

  const goToLoginPage = () => {
    updateRememberRoute(`${path}${queryParams}`)
    router.push('/login')
  }

  return (
    <Container maxWidth="xl" disableGutters sx={{ pt: 1.5, px: 1.5 }}>
      <Alert
        variant="outlined"
        severity="info"
        color="warning"
        sx={{
          color: '#ed6c02',
        }}
      >
        計算結果の保存には、
        <LoginText onClick={goToLoginPage}>ログイン</LoginText>
        が必要です。
      </Alert>
    </Container>
  )
}
