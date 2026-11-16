import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'

// Code splitting: las páginas de proyecto (galería, lightbox) se cargan al entrar a una
const ProjectPage = lazy(() => import('@/pages/ProjectPage').then((m) => ({ default: m.ProjectPage })))

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="proyectos/:slug"
          element={
            <Suspense fallback={<div className="min-h-[70vh]" aria-hidden="true" />}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
