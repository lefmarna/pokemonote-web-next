'use client'

import { Container, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

// import Title from '@/components/Title'

export const LefmarnaOtoiawaseThanks = () => {
  const router = useRouter()

  return (
    <Container>
      {/* <p text="チップを贈る" /> */}
      <p>
        応援ありがとうございます。
        <br />
        引き続き『Pokemonote』をよろしくお願いします。
      </p>
      <Button
        onClick={() => router.push('/')}
        variant="contained"
        color="primary"
      >
        トップページへ戻る
      </Button>
    </Container>
  )
}
