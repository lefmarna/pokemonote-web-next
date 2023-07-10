import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
} from '@mui/material'
import { AccountCircle, Email } from '@mui/icons-material'

export default function LefmarnaOtoiawase() {
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await fetch('/lefmarna-otoiawase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })
      router.push('/lefmarna-otoiawase/thanks')
    } catch (error) {
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Card sx={{ maxWidth: 540, mx: 'auto', mt: 5 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              Pokemonote - お問い合わせ
            </Typography>
            <TextField
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              name="name"
              id="name"
              label="お名前"
              fullWidth
              sx={{ mt: 3 }}
              InputProps={{
                startAdornment: <AccountCircle />,
              }}
            />
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              name="email"
              id="email"
              label="メールアドレス"
              fullWidth
              sx={{ mt: 3 }}
              InputProps={{
                startAdornment: <Email />,
              }}
            />
            <TextField
              label="お問い合わせ内容"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              minRows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="info"
              sx={{ mx: 'auto', px: 5 }}
              disabled={isLoading}
              size="large"
            >
              送信する
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  )
}
