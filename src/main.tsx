import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
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
        {/* LazyMotion + m: solo se incluyen las funciones de animación que se usan (bundle más chico) */}
        <LazyMotion features={domAnimation} strict>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  </StrictMode>,
)
