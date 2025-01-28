import { Route, Routes } from 'react-router-dom'
import { Layout } from '../components'
import { MainPage, TestDetailPage, TestListPage, TextInsertPage } from '../pages/private'
import { TextType } from '../api'

export function PrivateRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<MainPage />} />
        <Route path="/text-insert" element={<TextInsertPage />} />
        <Route path="/word-test" element={<TestListPage type={TextType.WORD} />} />
        <Route path="/sentence-test" element={<TestListPage type={TextType.SENTENCE} />} />
        <Route path="/integration-test" element={<TestListPage type={TextType.INTEGRATION} />} />
        <Route path="/test" element={<TestDetailPage />} />
      </Route>
    </Routes>
  )
}
