import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { ProjectPage } from '@/pages/ProjectPage'
import { NotFound } from '@/pages/NotFound'

// TEMPORAL: laboratorio del ñandutí, solo en desarrollo. Borrar al final del proyecto.
const NandutiLab = import.meta.env.DEV ? lazy(() => import('@/pages/dev/NandutiLab')) : null

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="proyectos/:slug" element={<ProjectPage />} />
        {NandutiLab && (
          <Route
            path="dev/nanduti"
            element={
              <Suspense fallback={null}>
                <NandutiLab />
              </Suspense>
            }
          />
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
