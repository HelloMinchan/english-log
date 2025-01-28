import { Button, Container, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export function MainPage() {
  const navigate = useNavigate()

  return (
    <Container
      sx={{
        paddingTop: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Stack spacing={2} sx={{ width: '70vw' }}>
        <Button variant="contained" color="primary" size="large" onClick={() => navigate('/word-insert')}>
          텍스트 저장
        </Button>
        <Button variant="contained" color="primary" size="large">
          단어 테스트
        </Button>
        <Button variant="contained" color="primary" size="large">
          문장 테스트
        </Button>
        <Button variant="contained" color="primary" size="large">
          통합 테스트
        </Button>
      </Stack>
    </Container>
  )
}
