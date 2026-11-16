import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '@/data/site'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/**
 * Título de la pestaña, descripción, canonical y Open Graph de la página actual.
 * Nota: los bots de LinkedIn/WhatsApp no ejecutan JS; para ellos valen las metas
 * estáticas de index.html. Esto sirve para la pestaña, Google y el historial.
 */
export function useDocumentMeta(title: string, description?: string): void {
  const { pathname } = useLocation()
  useEffect(() => {
    const url = `${SITE_URL}${pathname}`
    document.title = title
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description)
      setMeta('meta[property="og:description"]', 'property', 'og:description', description)
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, pathname])
}
