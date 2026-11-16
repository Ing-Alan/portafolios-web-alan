import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { ProjectPage } from '@/pages/ProjectPage'
import { NotFound } from '@/pages/NotFound'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="proyectos/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
