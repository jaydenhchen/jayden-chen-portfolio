import { lazy, Suspense, useEffect } from 'react'
import { Link, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { Footer } from './components/Footer'
import { SiteNav } from './components/SiteNav'
import { SiteEffectsProvider } from './components/SiteEffects'
import { CGIPage } from './pages/CGIPage'
import { CGIVideoPage } from './pages/CGIVideoPage'
import { CADProjectPage } from './pages/CADProjectPage'
import { HomePage } from './pages/HomePage'
import { OtherProjectsPage } from './pages/OtherProjectsPage'
import { ProjectPage } from './pages/ProjectPage'
const LazyCADPage = lazy(() => import('./pages/CADPage').then(({ CADPage }) => ({ default: CADPage })))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
      })
      return () => window.cancelAnimationFrame(frame)
    }

    if (navigationType === 'POP') return
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname, hash, navigationType])

  return null
}

function NotFoundPage() {
  return (
    <main className="not-found page-shell text-reveal">
      <p className="eyebrow">404 / Signal lost</p>
      <h1>That route is not in the archive</h1>
      <p>Return to the work index and choose a live project route</p>
      <Link className="button button-primary" to="/#work">
        Back to all work <span aria-hidden="true">↗</span>
      </Link>
    </main>
  )
}

export default function App() {
  return (
    <SiteEffectsProvider>
      <>
        <ScrollToTop />
        <SiteNav />
        <Suspense fallback={<main className="archive-loading page-shell">Loading archive…</main>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cad" element={<LazyCADPage />} />
            <Route path="/cad/:slug" element={<CADProjectPage />} />
            <Route path="/cgi" element={<CGIPage />} />
            <Route path="/cgi/:slug" element={<CGIVideoPage />} />
            <Route path="/other" element={<OtherProjectsPage />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </>
    </SiteEffectsProvider>
  )
}
