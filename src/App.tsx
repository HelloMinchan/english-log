import { ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { GlobalStyle, globalTheme } from './styles'
import { Router } from './routes'
import { Toast } from './components'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={globalTheme}>
        <GlobalStyle />
        <Router />
        <Toast />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
