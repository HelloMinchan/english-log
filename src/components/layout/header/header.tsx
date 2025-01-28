import styled from '@emotion/styled'

import { Outlet } from 'react-router-dom'

interface HeaderProps {
  children?: React.ReactElement
}

export function Header({ children }: HeaderProps) {
  const toHome = () => {
    window.location.href = '/'
  }

  return (
    <>
      <HeaderContainer>
        <div onClick={toHome} style={{ fontSize: '30px', cursor: 'pointer' }}>
          EnglishLog
        </div>
      </HeaderContainer>

      {children || <Outlet />}
    </>
  )
}

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 5% 0 5%;
  width: 100%;
  height: 60px;
  background-color: gray;
  color: white;

  z-index: 999;
`
