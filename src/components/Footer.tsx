import { useEffect, useRef } from 'react'
import { siteProfile } from '../content/site'
import { useSiteEffects } from './SiteEffects'

const marqueeItems = Array.from({ length: 10 }, (_, index) => index)
const copyrightText = `© 2026 ${siteProfile.name}`

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const directionRef = useRef(reverse)

  useEffect(() => {
    const track = trackRef.current
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animation = track.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], {
      duration: 112000,
      iterations: Infinity,
      easing: 'linear',
      direction: reverse ? 'reverse' : 'normal',
    })
    animationRef.current = animation

    return () => {
      animation.cancel()
      animationRef.current = null
    }
  }, [])

  useEffect(() => {
    if (directionRef.current === reverse) return
    animationRef.current?.reverse()
    directionRef.current = reverse
  }, [reverse])

  const renderItems = (prefix: string) =>
    marqueeItems.map((index) => (
      <span className="footer-marquee-item" key={`${prefix}-${index}`}>
        {copyrightText}
      </span>
    ))

  return (
    <div ref={trackRef} className="footer-marquee-track">
      <div className="footer-marquee-content">{renderItems('first')}</div>
      <div className="footer-marquee-content" aria-hidden="true">
        {renderItems('second')}
      </div>
    </div>
  )
}

export function Footer() {
  const { marqueeReversed } = useSiteEffects()

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
            <MarqueeTrack reverse={marqueeReversed ? layer % 2 === 0 : layer % 2 === 1} />
          </div>
        ))}
      </div>
    </footer>
  )
}
