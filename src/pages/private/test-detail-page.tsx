import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { supabase, TextType } from '../../api'
import { useRecoilValue } from 'recoil'
import { logTypeState, logCreatedAtState } from '../../store'
import { Card, CardContent, Button, Typography, Box } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { DebouncedButton } from '../../components'

export function TestDetailPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const logType = useRecoilValue(logTypeState)
  const logCreatedAt = useRecoilValue(logCreatedAtState)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        let query = supabase.from('log').select('*')

        if (logType === 'wrong') {
          query = query.gt('wrong_count', 0)
        }
        if (logType === TextType.WORD || logType === TextType.SENTENCE) {
          query = query.eq('type', logType)
        }
        if (logCreatedAt) {
          query = query.eq('created_at', logCreatedAt)
        }

        const { data, error } = await query

        if (error) {
          return
        }

        setLogs(data || [])
      } catch (error) {
        console.error('로그 데이터 조회 중 오류 발생:', error)
      }
    }

    fetchLogs()
  }, [logType, logCreatedAt])

  const handleAnswer = async (isCorrect: boolean) => {
    if (isCorrect) {
      if (logType === TextType.WRONG) {
        if (logs[currentIndex].wrong_count > 0) {
          try {
            const { error } = await supabase
              .from('log')
              .update({ wrong_count: logs[currentIndex].wrong_count - 1 })
              .eq('id', logs[currentIndex].id)

            if (error) {
              console.error('wrong_count 업데이트 실패:', error)
            }
          } catch (error) {
            console.error('wrong_count 업데이트 중 오류 발생:', error)
          }
        }
      }
      setCorrectCount((prev) => prev + 1)
    } else {
      try {
        const { error } = await supabase
          .from('log')
          .update({ wrong_count: logs[currentIndex].wrong_count + 1 })
          .eq('id', logs[currentIndex].id)

        if (error) {
          console.error('wrong_count 업데이트 실패:', error)
        }
      } catch (error) {
        console.error('wrong_count 업데이트 중 오류 발생:', error)
      }
      setWrongCount((prev) => prev + 1)
    }

    if (currentIndex < logs.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowMeaning(false)
    } else {
      setIsCompleted(true)
    }
  }

  const getTestTypeText = (type: TextType) => {
    switch (type) {
      case TextType.WORD:
        return '단어 테스트'
      case TextType.SENTENCE:
        return '문장 테스트'
      case TextType.INTEGRATION:
        return '통합 테스트'
      default:
        return '오답 테스트'
    }
  }

  return (
    <Container>
      <HeaderContainer>
        <Typography variant="h4" gutterBottom>
          {getTestTypeText(logType)}
        </Typography>
        <Typography variant="h5" gutterBottom>
          일자 : {logCreatedAt ? logCreatedAt : '전체'}
        </Typography>
        {logs.length > 0 && !isCompleted && (
          <Typography variant="h6" gutterBottom>
            ({currentIndex + 1} / {logs.length})
          </Typography>
        )}
      </HeaderContainer>

      {logs.length > 0 && !isCompleted && (
        <CardContainer>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {logs[currentIndex].text}
              </Typography>
              <ShowAnswerButton variant="text" onClick={() => setShowMeaning(true)} sx={{ width: '100%', mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                {!showMeaning ? (
                  '답 보기'
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    {logs[currentIndex].meaning}
                  </Typography>
                )}
              </ShowAnswerButton>
            </CardContent>
          </StyledCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
            <DebouncedButton
              text={'X'}
              variant="contained"
              onClick={() => handleAnswer(false)}
              sx={{ width: '50%', height: '70px', fontSize: '35px', fontWeight: 'bold', backgroundColor: '#f05650' }}
            />
            <DebouncedButton
              text={'O'}
              variant="contained"
              onClick={() => handleAnswer(true)}
              sx={{ width: '50%', height: '70px', fontSize: '35px', fontWeight: 'bold', backgroundColor: '#4caf50' }}
            />
          </Box>
        </CardContainer>
      )}

      {isCompleted && (
        <ResultContainer>
          <Typography variant="h4" gutterBottom>
            테스트 종료!
          </Typography>
          <Typography variant="h6" gutterBottom>
            총 개수: {logs.length}
          </Typography>
          <Typography variant="h6" color="success.main" gutterBottom>
            맞은 개수: {correctCount}
          </Typography>
          <Typography variant="h6" color="error.main" gutterBottom>
            틀린 개수: {wrongCount}
          </Typography>
          <BackButton variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            이전 페이지로
          </BackButton>
        </ResultContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  padding: 140px 20px 0px;
  gap: 20px;
`

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: center;
  margin-bottom: 20px;
`

const CardContainer = styled.div`
  width: 100%;
  max-width: 500px;
`

const ResultContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`

const StyledCard = styled(Card)`
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const BackButton = styled(Button)`
  && {
    margin-top: 20px;
  }
`

const ShowAnswerButton = styled(Button)`
  && {
    text-transform: none;
    justify-content: flex-start;
    font-size: 1rem;
    &:hover {
      background-color: transparent;
    }
  }
`
