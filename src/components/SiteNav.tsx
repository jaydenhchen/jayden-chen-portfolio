import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteProfile } from '../content/site'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'CAD', href: '/cad' },
  { label: 'CGI', href: '/cgi' },
  { label: 'Other projects', href: '/other' },
]

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'
  })
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
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

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
    <header className="site-nav">
      <div className="nav-inner">
        <Link className={`wordmark${isLogoIntro ? ' logo-intro' : ''}`} to="/" aria-label={`${siteProfile.name} home`}>
          <span className="wordmark-mark" aria-hidden="true">{siteProfile.monogram}</span>
          <span className="wordmark-name">{siteProfile.name}</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="menu-toggle-label">Menu</span>
          <span className="menu-toggle-icon" aria-hidden="true"><i /><i /></span>
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation${isOpen ? ' is-open' : ''}`}
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
          <button
            className="theme-toggle"
            type="button"
            aria-pressed={theme === 'light'}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          >
            <span className="theme-toggle-swatch" aria-hidden="true" />
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
      </div>
    </header>
  )
}
