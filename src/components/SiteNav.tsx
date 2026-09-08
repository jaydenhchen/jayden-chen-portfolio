import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteProfile } from '../content/site'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'CAD', href: '/cad' },
  { label: 'CGI', href: '/cgi' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

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
        <Link className="wordmark" to="/" aria-label={`${siteProfile.name} home`}>
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
              <span className="nav-index" aria-hidden="true">0{links.indexOf(link) + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
