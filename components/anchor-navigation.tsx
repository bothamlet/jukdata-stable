'use client'

import { useEffect } from 'react'

const DESKTOP_OFFSETS: Record<string, number> = {
  top: 0,
  paslaugos: 0,
  projektai: 0,
  komanda: 0,
  kontaktai: 80,
}

const MOBILE_OFFSETS: Record<string, number> = {
  top: 0,
  paslaugos: 0,
  projektai: 0,
  komanda: 0,
  kontaktai: 60,
}

export function AnchorNavigation() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest('a[href]')
      if (!link) return

      const rawHref = link.getAttribute('href')
      if (!rawHref) return

      const url = new URL(rawHref, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname !== window.location.pathname) return
      if (!url.hash) return

      const id = decodeURIComponent(url.hash.slice(1))
      if (id === 'technologijos') return

      const target = document.getElementById(id)
      if (!target) return

      const isMobile = window.matchMedia('(max-width: 768px)').matches
      const offsets = isMobile ? MOBILE_OFFSETS : DESKTOP_OFFSETS
      const offset = offsets[id] ?? 0
      const top =
        id === 'top'
          ? 0
          : target.getBoundingClientRect().top + window.scrollY - offset

      event.preventDefault()
      window.history.pushState(null, '', url.hash)
      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
