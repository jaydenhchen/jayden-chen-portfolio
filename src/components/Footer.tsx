import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { siteProfile } from '../content/site'
import { useSiteEffects } from './SiteEffects'

const initialMarqueeItemCount = 10
const copyrightText = `© 2026 ${siteProfile.name}`

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const directionRef = useRef(reverse)
  const [itemCount, setItemCount] = useState(initialMarqueeItemCount)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const ensureViewportCoverage = () => {
      const content = track.querySelector<HTMLElement>('.footer-marquee-content')
      const item = content?.querySelector<HTMLElement>('.footer-marquee-item')
      if (!content || !item) return

      const gap = Number.parseFloat(window.getComputedStyle(content).columnGap) || 0
      const contentWidth = content.getBoundingClientRect().width
      const itemWidth = item.getBoundingClientRect().width
      if (itemWidth === 0 || contentWidth >= window.innerWidth) return

      const additionalItems = Math.ceil((window.innerWidth - contentWidth) / (itemWidth + gap))
      if (additionalItems > 0) {
        setItemCount(content.children.length + additionalItems)
      }
    }

    ensureViewportCoverage()
    window.addEventListener('resize', ensureViewportCoverage)
    return () => window.removeEventListener('resize', ensureViewportCoverage)
  }, [])

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

  return (
    <div ref={trackRef} className="footer-marquee-track">
      {[0, 1].map((copy) => (
        <div className="footer-marquee-content" aria-hidden={copy === 1} key={copy}>
          {Array.from({ length: itemCount }, (_, index) => (
            <span className="footer-marquee-item" key={`${copy}-${index}`}>
              {copyrightText}
            </span>
          ))}
        </div>
      ))}
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
