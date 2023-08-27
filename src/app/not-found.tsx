'use client'

import {
  Container,
  Card,
  CardContent,
  Button,
  CardActions,
  CardHeader,
} from '@mui/material'
import { SLink } from '@/styles'

export default function NotFound() {
  return (
    <Container sx={{ py: 2, px: 1.5 }}>
      <Card elevation={0}>
        <CardHeader title="404 Not Found" />
        <CardContent>
          <p>お探しのページは見つかりませんでした。</p>
        </CardContent>
        <CardActions>
          <SLink href="/">
            <Button color="primary">トップページへ戻る</Button>
          </SLink>
        </CardActions>
      </Card>
    </Container>
  )
}
