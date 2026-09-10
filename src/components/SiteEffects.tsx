import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

const speedLevels = [0.2, 0.25, 1 / 3, 0.5, 1, 2, 3, 4, 5] as const
const defaultSpeed = 1
type Feedback = {
  id: number
  text: string
}

type SiteEffectsValue = {
  theme: Theme
  toggleTheme: () => void
  isMuted: boolean
  toggleMute: () => void
  mediaViewerOpen: boolean
  setMediaViewerOpen: (open: boolean) => void
  marqueeReversed: boolean
  toggleMarqueeDirection: () => void
  speedMultiplier: number
  increaseSpeed: () => void
  decreaseSpeed: () => void
  resetSpeed: () => void
}

const defaultValue: SiteEffectsValue = {
  theme: 'dark',
  toggleTheme: () => undefined,
  isMuted: false,
  toggleMute: () => undefined,
  mediaViewerOpen: false,
  setMediaViewerOpen: () => undefined,
  marqueeReversed: false,
  toggleMarqueeDirection: () => undefined,
  speedMultiplier: defaultSpeed,
  increaseSpeed: () => undefined,
  decreaseSpeed: () => undefined,
  resetSpeed: () => undefined,
}

const SiteEffectsContext = createContext<SiteEffectsValue>(defaultValue)

const formatSpeed = (speed: number) => {
  if (speed === 0.2) return '1/5x'
  if (speed === 0.25) return '1/4x'
  if (speed === 1 / 3) return '1/3x'
  if (speed === 0.5) return '1/2x'
  return `${speed}x`
}

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function SiteEffectsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'
  })
  const [isMuted, setIsMuted] = useState(false)
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false)
  const [speedMultiplier, setSpeedMultiplier] = useState(defaultSpeed)
  const [marqueeReversed, setMarqueeReversed] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const feedbackIdRef = useRef(0)
  const feedbackTimeoutRef = useRef<number | undefined>(undefined)

  const showFeedback = useCallback((text: string) => {
    feedbackIdRef.current += 1
    setFeedback({ id: feedbackIdRef.current, text })
    if (feedbackTimeoutRef.current !== undefined) window.clearTimeout(feedbackTimeoutRef.current)
    feedbackTimeoutRef.current = window.setTimeout(() => setFeedback(null), 1200)
  }, [])

  useEffect(
    () => () => {
      if (feedbackTimeoutRef.current !== undefined) window.clearTimeout(feedbackTimeoutRef.current)
    },
    [],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem('portfolio-theme', theme)
    } catch {
      // Local storage is optional; theme changes still apply for this visit.
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.siteMuted = String(isMuted)
    if (isMuted) {
      document.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
        video.muted = true
      })
    }
  }, [isMuted])
  useEffect(() => {
    document.documentElement.dataset.mediaViewerOpen = String(mediaViewerOpen)
    if (mediaViewerOpen) {
      document.querySelectorAll<HTMLVideoElement>('.media-frame video').forEach((video) => {
        video.muted = true
      })
    }
  }, [mediaViewerOpen])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      showFeedback(next === 'light' ? 'Light mode' : 'Dark mode')
      return next
    })
  }, [showFeedback])

  const toggleMute = useCallback(() => {
    setIsMuted((current) => {
      const next = !current
      showFeedback(next ? 'Muted' : 'Unmuted')
      return next
    })
  }, [showFeedback])

  const toggleMarqueeDirection = useCallback(() => {
    setMarqueeReversed((current) => {
      const next = !current
      showFeedback(next ? 'Reversed' : 'Forward')
      return next
    })
  }, [showFeedback])

  const changeSpeed = useCallback(
    (direction: 1 | -1) => {
      setSpeedMultiplier((current) => {
        const currentIndex = speedLevels.indexOf(current as (typeof speedLevels)[number])
        const nextIndex = Math.max(0, Math.min(speedLevels.length - 1, currentIndex + direction))
        const next = speedLevels[nextIndex]
        showFeedback(formatSpeed(next))
        return next
      })
    },
    [showFeedback],
  )

  const increaseSpeed = useCallback(() => changeSpeed(1), [changeSpeed])
  const decreaseSpeed = useCallback(() => changeSpeed(-1), [changeSpeed])
  const resetSpeed = useCallback(() => {
    setSpeedMultiplier(defaultSpeed)
    showFeedback(formatSpeed(defaultSpeed))
  }, [showFeedback])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return
      if (event.key === 'm' || event.key === 'M') {
        event.preventDefault()
        toggleMute()
      } else if (event.key === 'l' || event.key === 'L') {
        event.preventDefault()
        toggleTheme()
      } else if (event.key === 's' || event.key === 'S') {
        event.preventDefault()
        toggleMarqueeDirection()
      } else if (event.key === '=') {
        event.preventDefault()
        increaseSpeed()
      } else if (event.key === '-' || event.code === 'NumpadSubtract') {
        event.preventDefault()
        decreaseSpeed()
      } else if (event.key === '0') {
        event.preventDefault()
        resetSpeed()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [decreaseSpeed, increaseSpeed, resetSpeed, toggleMarqueeDirection, toggleMute, toggleTheme])

  return (
    <SiteEffectsContext.Provider
      value={{
        theme,
        toggleTheme,
        isMuted,
        toggleMute,
        mediaViewerOpen,
        setMediaViewerOpen,
        marqueeReversed,
        toggleMarqueeDirection,
        speedMultiplier,
        increaseSpeed,
        decreaseSpeed,
        resetSpeed,
      }}
    >
      {feedback && (
        <div key={feedback.id} className="site-shortcut-feedback" role="status" aria-live="polite">
          {feedback.text}
        </div>
      )}
      {children}
    </SiteEffectsContext.Provider>
  )
}

export function useSiteEffects() {
  return useContext(SiteEffectsContext)
}
