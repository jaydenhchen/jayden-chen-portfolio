import { siteProfile } from '../content/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-note"><span className="signal-dot" aria-hidden="true" />Available for thoughtful problems.</p>
        <p className="footer-copy">© {new Date().getFullYear()} {siteProfile.name}</p>
        <a className="footer-top" href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  )
}
