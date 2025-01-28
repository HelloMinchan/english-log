import styled from '@emotion/styled'
import { Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useToastClear } from '../../hooks'
import { DebouncedButton } from '../../components'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { LogCounts, supabase, TextType } from '../../api'
import { logTypeState, logCreatedAtState } from '../../store'
import { useEffect, useState } from 'react'

export function MainPage() {
  const navigate = useNavigate()
  useToastClear()
  const setLogTypeState: SetterOrUpdater<TextType> = useSetRecoilState(logTypeState)
  const setLogCreatedAtState: SetterOrUpdater<string | null> = useSetRecoilState(logCreatedAtState)
  const [isLoading, setIsLoading] = useState(true)
  const [logCounts, setLogCounts] = useState<LogCounts | null>(null)

  useEffect(() => {
    const fetchLogCounts = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase.rpc('get_log_counts')

        if (error) {
          return
        }

        setLogCounts(data[0])
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchLogCounts()
  }, [])

  if (isLoading) {
    return <Container>Loading...</Container>
  }
  return (
    <Container
      sx={{
        paddingTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <StatsContainer>
        <Typography variant="body1">총 단어 : {logCounts?.word_counts}개</Typography>
        <Typography variant="body1">총 문장 : {logCounts?.sentence_counts}개</Typography>
      </StatsContainer>
      <StatsContainer>
        <Typography variant="body1" color="error">
          오답 : {logCounts?.wrong_counts}개
        </Typography>
      </StatsContainer>

      <Stack spacing={2} sx={{ width: '70vw', paddingTop: '70px' }}>
        <DebouncedButton
          text={'텍스트 저장'}
          variant="contained"
          size="large"
          onClick={() => navigate('/text-insert')}
          sx={{ fontSize: '20px', height: '50px', backgroundColor: '#ff7f00' }}
        />
        <DebouncedButton
          text={'단어 테스트'}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            setLogTypeState(TextType.WORD)
            setLogCreatedAtState(null)
            navigate('/word-test')
          }}
          sx={{ fontSize: '20px', height: '50px' }}
        />
        <DebouncedButton
          text={'문장 테스트'}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            setLogTypeState(TextType.SENTENCE)
            setLogCreatedAtState(null)
            navigate('/sentence-test')
          }}
          sx={{ fontSize: '20px', height: '50px' }}
        />
        <DebouncedButton
          text={'통합 테스트'}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            setLogTypeState(TextType.INTEGRATION)
            setLogCreatedAtState(null)
            navigate('/integration-test')
          }}
          sx={{ fontSize: '20px', height: '50px' }}
        />
        <DebouncedButton
          text={'오답 테스트'}
          variant="contained"
          size="large"
          onClick={() => {
            setLogTypeState(TextType.WRONG)
            setLogCreatedAtState(null)
            navigate('/test')
          }}
          disabled={logCounts?.wrong_counts === 0 ? true : false}
          sx={{ fontSize: '20px', height: '50px', backgroundColor: '#f05650' }}
        />
      </Stack>
    </Container>
  )
}

const StatsContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`
