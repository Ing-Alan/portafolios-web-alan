import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/** Al cambiar de ruta: si hay #ancla, desplaza hasta ella; si no, vuelve arriba. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        // scroll-behavior (CSS) decide si es suave; con movimiento reducido es instantáneo.
        // scroll-padding-top compensa la barra fija.
        el.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    // `key` cambia en cada navegación: repetir un clic al mismo #ancla vuelve a desplazar.
  }, [pathname, hash, key])
  return null
}

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollManager />
      <Navbar />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
