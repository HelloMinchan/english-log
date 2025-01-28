import { BrowserRouter } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { PrivateRoute } from './private-route'
import { PublicRoute } from './public-route'
import { meState } from '../store'

export function Router() {
  const me: string | null = useRecoilValue(meState)

  return <BrowserRouter basename="/english-log">{me === import.meta.env.VITE_ME ? <PrivateRoute /> : <PublicRoute />}</BrowserRouter>
}
