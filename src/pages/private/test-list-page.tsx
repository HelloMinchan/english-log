import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { TextType } from '../../api'
import { useEffect, useState } from 'react'
import { supabase } from '../../api'
import { DebouncedButton } from '../../components'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'
import { logCreatedAtState, logTypeState } from '../../store'

interface TestListPageProps {
  type: TextType
}

export function TestListPage({ type }: TestListPageProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [CreatedAts, setCreatedAts] = useState<string[]>([])
  const setLogTypeState: SetterOrUpdater<TextType> = useSetRecoilState(logTypeState)
  const setLogCreatedAtState: SetterOrUpdater<string | null> = useSetRecoilState(logCreatedAtState)

  const getTitle = () => {
    switch (type) {
      case TextType.WORD:
        return '단어 생성 일자 선택'
      case TextType.SENTENCE:
        return '문장 생성 일자 선택'
      default:
        return '통합 생성 일자 선택'
    }
  }

  useEffect(() => {
    const fetchCreatedAts = async () => {
      setIsLoading(true)
      const { data, error } = await supabase.rpc('group_logs_created_at_by_type', { log_type: type })
      if (error) {
        console.error('Error fetching grouped data:', error)
      } else {
        setCreatedAts(data)
      }
      setIsLoading(false)
    }

    fetchCreatedAts()
  }, [])

  if (isLoading) {
    return <Container>Loading...</Container>
  }
  return (
    <Container>
      <Title>{getTitle()}</Title>
      <DebouncedButton
        onClick={() => {
          setLogTypeState(type)
          setLogCreatedAtState(null)
          navigate('/test')
        }}
        text={'전체'}
        key={'total'}
        sx={{ fontSize: '20px', height: '50px' }}
      />
      <ButtonContainer>
        {CreatedAts.map((createdAt) => (
          <DebouncedButton
            onClick={() => {
              setLogTypeState(type)
              setLogCreatedAtState(createdAt)
              navigate('/test')
            }}
            text={createdAt}
            key={createdAt}
            sx={{ fontSize: '20px', height: '50px' }}
          />
        ))}
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`

const Title = styled.h1`
  margin-bottom: 20px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
`
