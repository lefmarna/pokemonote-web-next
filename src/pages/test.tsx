import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Test: NextPage = () => {
  const [value] = useState('')

  const router = useRouter()

  const onClickRouterPush = () => {
    if (value === 'setup') {
      router.push('/setup')
    }
    if (value === 'code') {
      router.push('/code')
    }
    if (value === 'other') {
      router.push('/other')
    }
  }
  return (
    <>
      <Button
        onClick={onClickRouterPush}
        variant="contained"
        sx={{ width: 1 }}
        disabled={value === ''}
      >
        次へ
      </Button>
    </>
  )
}

export default Test
