import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteProfile } from '../content/site'
import { useSiteEffects } from './SiteEffects'

const links = [
  { label: 'CAD', to: '/cad' },
  { label: 'CGI', to: '/cgi' },
  { label: 'Other projects', to: '/other' },
]
const isCurrentPath = (pathname: string, destination: string) => pathname === destination || pathname.startsWith(`${destination}/`)

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useSiteEffects()
  const [isLogoIntro, setIsLogoIntro] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      return !window.localStorage.getItem('portfolio-logo-intro-seen')
    } catch {
      return false
    }
  })
  const location = useLocation()

  useEffect(() => {
    if (!isLogoIntro) return
    const finishIntro = () => {
      setIsLogoIntro(false)
      try {
        window.localStorage.setItem('portfolio-logo-intro-seen', 'true')
      } catch {
        // Local storage is optional; the animation still completes.
      }
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishIntro()
      return
    }
    const timeout = window.setTimeout(finishIntro, 1500)
    return () => window.clearTimeout(timeout)
  }, [isLogoIntro])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return (
    <header id="top" className="site-nav">
      <div className="nav-inner">
        <Link
          className={`wordmark${isLogoIntro ? ' logo-intro' : ''}${location.pathname === '/' ? ' is-current' : ''}`}
          to="/"
          aria-label={`${siteProfile.name} home`}
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          <span className="wordmark-name">{siteProfile.name}</span>
        </Link>

        <button className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="primary-navigation" onClick={() => setIsOpen((open) => !open)}>
          <span className="menu-toggle-label">Menu</span>
          <span className="menu-toggle-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>

        <nav id="primary-navigation" className={`primary-navigation${isOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.to}
              className={isCurrentPath(location.pathname, link.to) ? 'is-current' : undefined}
              to={link.to}
              aria-current={isCurrentPath(location.pathname, link.to) ? 'page' : undefined}
              onClick={() => {
                setIsOpen(false)
                if (link.to === '/' && location.pathname === '/') window.scrollTo({ top: 0, behavior: 'auto' })
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="theme-toggle"
            type="button"
            aria-pressed={theme === 'light'}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={toggleTheme}
          >
            <span className="theme-toggle-swatch" aria-hidden="true" />
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
      </div>
    </header>
  )
}
