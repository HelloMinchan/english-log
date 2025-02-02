import styled from '@emotion/styled'

import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { FormControl, FormGroup, FormControlLabel, Switch } from '@mui/material'
import { reverseTestState } from '../../../store/setting'

interface HeaderProps {
  children?: React.ReactElement
}

export function Header({ children }: HeaderProps) {
  const [reverseTest, setReverseTest] = useRecoilState(reverseTestState)

  const toHome = () => {
    window.location.href = '/english-log'
  }

  const handleRerveseTestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked
    setReverseTest(newValue)
    localStorage.setItem('el_reverse_test', newValue.toString())
  }

  return (
    <>
      <HeaderContainer>
        <div onClick={toHome} style={{ fontSize: '30px', cursor: 'pointer' }}>
          EnglishLog
        </div>

        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="end"
              control={
                <Switch
                  color="primary"
                  checked={reverseTest}
                  onChange={handleRerveseTestChange}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#33cf4d',
                      '& + .MuiSwitch-track': {
                        backgroundColor: '#33cf4d',
                      },
                    },
                  }}
                />
              }
              label="리버스 테스트"
              labelPlacement="start"
            />
          </FormGroup>
        </FormControl>
      </HeaderContainer>

      {children || <Outlet />}
    </>
  )
}

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 5% 0 5%;
  width: 100%;
  height: 60px;
  background-color: gray;
  color: white;

  z-index: 999;
`
