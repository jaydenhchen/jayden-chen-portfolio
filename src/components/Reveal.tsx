import { type ReactNode, useEffect, useRef, useState } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener?.('change', updatePreference)

    return () => mediaQuery.removeEventListener?.('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true)
      return
    }

    const element = elementRef.current
    if (!element || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: '0px 0px -10% 0px', threshold: 0.01 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${reducedMotion ? 'reduced-motion' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
