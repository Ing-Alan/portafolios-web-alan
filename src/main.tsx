import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/components/ThemeProvider'
import { App } from './App'
import './styles/index.css'

const root = document.getElementById('root')
if (!root) throw new Error('No se encontró #root')

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      {/* reducedMotion="user": Framer Motion respeta prefers-reduced-motion */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  </StrictMode>,
)
