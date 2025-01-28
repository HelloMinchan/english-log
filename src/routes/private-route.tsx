import { Route, Routes } from 'react-router-dom'
import { Layout } from '../components'
import { MainPage, TextInsertPage } from '../pages/private'

export function PrivateRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<MainPage />} />
        <Route path="/word-insert" element={<TextInsertPage />} />
      </Route>
    </Routes>
  )
}
