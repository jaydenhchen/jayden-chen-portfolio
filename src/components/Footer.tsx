import { siteProfile } from '../content/site'

const marqueeItems = Array.from({ length: 10 }, (_, index) => index)
const copyrightText = `© 2026 ${siteProfile.name}`

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const renderItems = (prefix: string) => marqueeItems.map((index) => (
    <span className="footer-marquee-item" key={`${prefix}-${index}`}>{copyrightText}</span>
  ))

  return (
    <div className={`footer-marquee-track${reverse ? ' is-reverse' : ''}`}>
      <div className="footer-marquee-content">{renderItems('first')}</div>
      <div className="footer-marquee-content" aria-hidden="true">{renderItems('second')}</div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-topbar">
        <button
          className="footer-top"
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
        >
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>
      <div className="footer-marquee" aria-hidden="true">
        {[0, 1, 2, 3].map((layer) => (
          <div className="footer-marquee-row" key={layer}>
            <MarqueeTrack reverse={layer % 2 === 1} />
          </div>
        ))}
      </div>
    </footer>
  )
}
