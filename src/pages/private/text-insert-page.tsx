import styled from '@emotion/styled'
import { useState } from 'react'
import { supabase, SupabaseErrorCode, TextType } from '../../api'
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { DebouncedButton } from '../../components'
import { isErrorToastOpenState, errorToastMessageState, isSuccessToastOpenState, successToastMessageState } from '../../store'
import { useSetRecoilState, SetterOrUpdater } from 'recoil'
import { getKoreanToday } from '../../util'

export function TextInsertPage() {
  const [text, setText] = useState('')
  const [meaning, setMeaning] = useState('')
  const [type, setType] = useState<TextType>(TextType.WORD)
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)
  const setSuccessToastMessage: SetterOrUpdater<string> = useSetRecoilState(successToastMessageState)

  const handleSave = async () => {
    try {
      const { error } = await supabase.from('log').insert([
        {
          text: text,
          meaning: meaning,
          type: type,
          created_at: getKoreanToday(),
        },
      ])

      if (error) throw error

      setText('')
      setMeaning('')
      setIsSuccessToastOpen(true)
      switch (type) {
        case TextType.WORD:
          setSuccessToastMessage('단어가 등록되었습니다.')
          break
        default:
          setSuccessToastMessage('문장이 등록되었습니다.')
      }
    } catch (error: any) {
      setIsErrorToastOpen(true)
      switch (error.code) {
        case SupabaseErrorCode.DUPLICATE:
          setErrorToastMessage('중복된 텍스트가 존재합니다!')
          break
        default:
          setErrorToastMessage('에러가 발생했습니다!')
      }
    }
  }

  return (
    <Container>
      <InputContainer>
        <TextField fullWidth placeholder="텍스트를 입력하세요" value={text} onChange={(e) => setText(e.target.value)} />
        <TextField fullWidth placeholder="뜻을 입력하세요" value={meaning} onChange={(e) => setMeaning(e.target.value)} />
        <FormControl>
          <FormLabel>유형</FormLabel>
          <RadioGroup row value={type} onChange={(e) => setType(e.target.value as TextType)}>
            <FormControlLabel value={TextType.WORD} control={<Radio />} label="단어" />
            <FormControlLabel value={TextType.SENTENCE} control={<Radio />} label="문장" />
          </RadioGroup>
        </FormControl>
        <DebouncedButton
          text={'저장하기'}
          variant="contained"
          onClick={handleSave}
          fullWidth
          sx={{ fontSize: '20px', height: '50px', backgroundColor: '#ff7f00' }}
        />
      </InputContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
`
