import { Route, Routes } from 'react-router-dom'
import { MePage } from '../pages/public'

export function PublicRoute() {
  return (
    <Routes>
      <Route path="*" element={<MePage />} />
    </Routes>
  )
}
