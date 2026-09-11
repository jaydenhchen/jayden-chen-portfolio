import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

const speedLevels = [0.2, 0.25, 1 / 3, 0.5, 1, 2, 3, 4, 5] as const
const defaultSpeed = 1
const maxVolume = 10
const defaultVolume = maxVolume
type Feedback = {
  id: number
  text: string
}

type SiteEffectsValue = {
  theme: Theme
  toggleTheme: () => void
  isMuted: boolean
  toggleMute: () => void
  magnifierEnabled: boolean
  toggleMagnifier: () => void
  mediaViewerOpen: boolean
  setMediaViewerOpen: (open: boolean) => void
  volume: number
  setVolumeLevel: (level: number) => void
  increaseVolume: () => void
  decreaseVolume: () => void
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
  magnifierEnabled: true,
  toggleMagnifier: () => undefined,
  mediaViewerOpen: false,
  setMediaViewerOpen: () => undefined,
  volume: defaultVolume,
  setVolumeLevel: () => undefined,
  increaseVolume: () => undefined,
  decreaseVolume: () => undefined,
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
  const [magnifierEnabled, setMagnifierEnabled] = useState(true)
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false)
  const [volume, setVolume] = useState(defaultVolume)
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
  useLayoutEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!favicon) return
    favicon.href = `${import.meta.env.BASE_URL}favicon${theme === 'light' ? '-light' : ''}.svg`
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
    const normalizedVolume = volume / maxVolume
    document.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
      video.volume = normalizedVolume
    })
  }, [volume])
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
  const toggleMagnifier = useCallback(() => {
    if (!mediaViewerOpen) return
    setMagnifierEnabled((current) => {
      const next = !current
      showFeedback(next ? 'Magnifier on' : 'Magnifier off')
      return next
    })
  }, [mediaViewerOpen, showFeedback])

  const setVolumeLevel = useCallback(
    (level: number) => {
      setVolume((current) => {
        const next = Math.max(0, Math.min(maxVolume, Math.round(level)))
        if (next !== current) showFeedback(`Volume ${next}/10`)
        return next
      })
    },
    [showFeedback],
  )

  const changeVolume = useCallback(
    (direction: 1 | -1) => {
      setVolume((current) => {
        const next = Math.max(0, Math.min(maxVolume, current + direction))
        showFeedback(`Volume ${next}/10`)
        return next
      })
    },
    [showFeedback],
  )

  const increaseVolume = useCallback(() => changeVolume(1), [changeVolume])
  const decreaseVolume = useCallback(() => changeVolume(-1), [changeVolume])

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
      if (isEditableTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key === 'm' || event.key === 'M') {
        event.preventDefault()
        toggleMute()
      } else if (event.key === 'g' || event.key === 'G') {
        event.preventDefault()
        toggleMagnifier()
      } else if (event.key === 'l' || event.key === 'L') {
        event.preventDefault()
        toggleTheme()
      } else if (event.key === 's' || event.key === 'S') {
        event.preventDefault()
        toggleMarqueeDirection()
      } else if (event.key === '1') {
        event.preventDefault()
        decreaseVolume()
      } else if (event.key === '2') {
        event.preventDefault()
        increaseVolume()
      } else if (event.key === '=' || event.key === '-' || event.code === 'NumpadSubtract' || event.key === '0') {
        if (!document.querySelector('.stl-viewer')) return
        event.preventDefault()
        if (event.key === '=') increaseSpeed()
        else if (event.key === '0') resetSpeed()
        else decreaseSpeed()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [decreaseSpeed, decreaseVolume, increaseSpeed, increaseVolume, resetSpeed, toggleMagnifier, toggleMarqueeDirection, toggleMute, toggleTheme])
  return (
    <SiteEffectsContext.Provider
      value={{
        theme,
        toggleTheme,
        isMuted,
        toggleMute,
        magnifierEnabled,
        toggleMagnifier,
        mediaViewerOpen,
        setMediaViewerOpen,
        volume,
        setVolumeLevel,
        increaseVolume,
        decreaseVolume,
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
