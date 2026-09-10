import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import type { MediaAsset } from '../content/projects'
import { useSiteEffects } from './SiteEffects'

type MobileAudioCandidate = {
  video: HTMLVideoElement
  visibleArea: number
}

const mobileAudioCandidates = new Map<HTMLVideoElement, MobileAudioCandidate>()
let activeMobileAudioVideo: HTMLVideoElement | null = null

const updateMobileAudio = () => {
  if (document.documentElement.dataset.siteMuted === 'true' || document.documentElement.dataset.mediaViewerOpen === 'true') {
    mobileAudioCandidates.forEach(({ video }) => {
      video.muted = true
    })
    activeMobileAudioVideo = null
    return
  }

  const previousVideo = activeMobileAudioVideo
  const nextVideo =
    [...mobileAudioCandidates.values()].filter(({ visibleArea }) => visibleArea > 0).sort((a, b) => b.visibleArea - a.visibleArea)[0]?.video ?? null

  mobileAudioCandidates.forEach(({ video }) => {
    video.muted = video !== nextVideo
  })
  activeMobileAudioVideo = nextVideo

  if (!nextVideo || (nextVideo === previousVideo && !nextVideo.paused)) return
  nextVideo.play().catch(() => {
    nextVideo.muted = true
  })
}

type MediaFrameProps = {
  asset?: MediaAsset
  variant?: 'hero' | 'card' | 'detail'
  autoplayPreview?: boolean
  autoplayMuted?: boolean
  hoverAudio?: boolean
  controls?: boolean
  muteToggle?: boolean
  expandMedia?: boolean
  expandGallery?: MediaAsset[]
  expandIndex?: number
  showCaption?: boolean
  loading?: 'eager' | 'lazy'
}

export function MediaFrame({
  asset,
  variant = 'detail',
  autoplayPreview = false,
  autoplayMuted = true,
  hoverAudio = false,
  controls = false,
  muteToggle = false,
  expandMedia = false,
  expandGallery,
  expandIndex = 0,
  showCaption = true,
  loading = 'lazy',
}: MediaFrameProps) {
  const { isMuted: siteMuted, mediaViewerOpen, setMediaViewerOpen } = useSiteEffects()
  const mediaRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(!asset?.src)
  const [posterFailed, setPosterFailed] = useState(false)
  const [isMuted, setIsMuted] = useState(autoplayMuted)
  const [isVisible, setIsVisible] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 800px)').matches)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 800px)')
    const updateMobileState = () => setIsMobile(mediaQuery.matches)
    updateMobileState()
    mediaQuery.addEventListener?.('change', updateMobileState)
    return () => mediaQuery.removeEventListener?.('change', updateMobileState)
  }, [])

  useEffect(() => {
    setHasError(!asset?.src)
    setPosterFailed(false)
    setIsMuted(autoplayMuted)
    setExpandedIndex(null)
  }, [asset?.src, asset?.poster, autoplayMuted, muteToggle])
  useEffect(() => {
    const element = mediaRef.current
    if (!element || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [asset?.src, variant])

  useEffect(() => {
    if (!autoplayPreview || asset?.kind !== 'video') return
    const video = videoRef.current
    if (!video) return
    video.muted = siteMuted || mediaViewerOpen || (muteToggle ? isMuted : Boolean((autoplayPreview && autoplayMuted) || usesHoverAudio))
    video.play().catch(() => {
      if (autoplayMuted || siteMuted || mediaViewerOpen) return
      video.muted = true
      video
        .play()
        .then(() => {
          if (!siteMuted && !mediaViewerOpen) video.muted = false
        })
        .catch(() => undefined)
    })
  }, [asset?.src, asset?.kind, autoplayMuted, autoplayPreview, mediaViewerOpen, muteToggle, siteMuted])

  const showPoster = hasError && Boolean(asset?.poster) && !posterFailed

  const showMuteToggle = asset?.kind === 'video' && muteToggle
  const usesHoverAudio = asset?.kind === 'video' && hoverAudio && !muteToggle

  useEffect(() => {
    if (!isMobile || !usesHoverAudio || !('IntersectionObserver' in window)) return
    const element = mediaRef.current
    const video = videoRef.current
    if (!element || !video) return

    mobileAudioCandidates.set(video, { video, visibleArea: 0 })
    const observer = new IntersectionObserver(
      ([entry]) => {
        const candidate = mobileAudioCandidates.get(video)
        if (!candidate) return
        candidate.visibleArea = entry.isIntersecting ? entry.intersectionRect.width * entry.intersectionRect.height : 0
        updateMobileAudio()
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      mobileAudioCandidates.delete(video)
      if (activeMobileAudioVideo === video) {
        video.muted = true
        activeMobileAudioVideo = null
      }
      updateMobileAudio()
    }
  }, [asset?.src, isMobile, usesHoverAudio])
  const expandedAssets = expandGallery?.length ? expandGallery : asset ? [asset] : []
  const expandedAsset = expandedAssets[expandedIndex ?? expandIndex]
  const navigateExpandedImage = (direction: 1 | -1) => {
    setExpandedIndex((index) => {
      if (index === null || expandedAssets.length < 2) return index
      return Math.max(0, Math.min(expandedAssets.length - 1, index + direction))
    })
  }
  const openExpandedMedia = () => {
    if (expandedAssets.length === 0) return
    setExpandedIndex(Math.min(expandIndex, expandedAssets.length - 1))
  }
  const isMediaViewerOpen = expandedIndex !== null

  useEffect(() => {
    if (!isMediaViewerOpen) return
    const previousMuteStates = new Map<HTMLVideoElement, boolean>()
    document.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
      previousMuteStates.set(video, video.muted)
      video.muted = true
    })
    setMediaViewerOpen(true)

    return () => {
      previousMuteStates.forEach((muted, video) => {
        video.muted = muted
      })
      setMediaViewerOpen(false)
    }
  }, [isMediaViewerOpen, setMediaViewerOpen])

  useEffect(() => {
    if (expandedIndex === null) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setExpandedIndex(null)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        navigateExpandedImage(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        navigateExpandedImage(1)
      }
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [expandedIndex, expandedAssets.length])

  const playWithHoverAudio = async () => {
    const video = videoRef.current
    if (!video || siteMuted || mediaViewerOpen) return

    document.querySelectorAll<HTMLVideoElement>('[data-hover-audio="true"]').forEach((otherVideo) => {
      if (otherVideo !== video) otherVideo.muted = true
    })
    video.muted = false
    await video.play().catch(() => undefined)
  }
  useEffect(() => {
    if (siteMuted || mediaViewerOpen || !isHovered || !usesHoverAudio) return
    void playWithHoverAudio()
  }, [mediaViewerOpen, siteMuted, isHovered, usesHoverAudio])

  const muteOnLeave = () => {
    if (videoRef.current) videoRef.current.muted = true
  }

  const toggleMute = async () => {
    const video = videoRef.current
    if (!video || siteMuted) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted) await video.play().catch(() => undefined)
  }

  return (
    <>
      <figure
        ref={mediaRef}
        className={`media-frame media-frame-${variant} asset-rise media-scroll-reveal${isVisible ? ' is-visible' : ''}`}
        onMouseEnter={usesHoverAudio && !isMobile ? () => setIsHovered(true) : undefined}
        onMouseLeave={
          usesHoverAudio && !isMobile
            ? () => {
                setIsHovered(false)
                muteOnLeave()
              }
            : undefined
        }
      >
        <div className="media-frame-visual">
          {!asset || hasError ? (
            showPoster && asset ? (
              <img src={asset.poster} alt={asset.alt} loading={loading} decoding="async" onError={() => setPosterFailed(true)} />
            ) : (
              <div className="media-fallback" role="img" aria-label="Media unavailable">
                <span className="fallback-mark" aria-hidden="true">
                  ＋
                </span>
                <span>Media placeholder</span>
                <small>Supply an image or reel to complete this frame.</small>
              </div>
            )
          ) : asset.kind === 'video' ? (
            <>
              <video
                ref={videoRef}
                src={asset.src}
                preload={variant === 'card' ? 'none' : 'metadata'}
                poster={asset.poster}
                muted={
                  siteMuted || mediaViewerOpen || isMediaViewerOpen || (muteToggle ? isMuted : Boolean((autoplayPreview && autoplayMuted) || usesHoverAudio))
                }
                playsInline
                controls={controls && !muteToggle}
                autoPlay={autoplayPreview}
                loop={autoplayPreview}
                data-hover-audio={usesHoverAudio ? 'true' : undefined}
                role={expandMedia ? 'button' : undefined}
                tabIndex={expandMedia ? 0 : undefined}
                aria-label={expandMedia ? `Expand video: ${asset.alt}` : asset.alt}
                onClick={expandMedia ? openExpandedMedia : undefined}
                onKeyDown={
                  expandMedia
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          openExpandedMedia()
                        }
                      }
                    : undefined
                }
                onError={() => {
                  setHasError(true)
                  const video = videoRef.current
                  if (!video) return
                  mobileAudioCandidates.delete(video)
                  updateMobileAudio()
                }}
              />
              {showMuteToggle && (
                <button
                  className="media-mute-toggle"
                  type="button"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  aria-pressed={!isMuted}
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    void toggleMute()
                  }}
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              )}
            </>
          ) : expandMedia ? (
            <button className="media-expand-trigger" type="button" aria-label={`Expand image: ${asset.alt}`} onClick={openExpandedMedia}>
              <img src={asset.src} alt={asset.alt} loading={loading} decoding="async" onError={() => setHasError(true)} />
            </button>
          ) : (
            <img src={asset.src} alt={asset.alt} loading={loading} decoding="async" onError={() => setHasError(true)} />
          )}
        </div>
        {showCaption && asset?.caption && variant !== 'card' && <figcaption>{asset.caption}</figcaption>}
      </figure>
      {expandedIndex !== null &&
        expandedAsset &&
        createPortal(
          <div
            className="media-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Expanded ${expandedAsset.kind} ${expandedIndex + 1} of ${expandedAssets.length}: ${expandedAsset.alt}`}
            onClick={() => setExpandedIndex(null)}
          >
            <button
              className="media-lightbox-close"
              type="button"
              aria-label={`Close expanded ${expandedAsset.kind}`}
              autoFocus
              onClick={() => setExpandedIndex(null)}
            >
              Close
            </button>
            {expandedAssets.length > 1 && (
              <>
                <button
                  className="media-lightbox-nav media-lightbox-prev"
                  type="button"
                  aria-label={`Previous ${expandedAsset.kind}`}
                  disabled={expandedIndex === 0}
                  onClick={(event) => {
                    event.stopPropagation()
                    navigateExpandedImage(-1)
                  }}
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  className="media-lightbox-nav media-lightbox-next"
                  type="button"
                  aria-label={`Next ${expandedAsset.kind}`}
                  disabled={expandedIndex === expandedAssets.length - 1}
                  onClick={(event) => {
                    event.stopPropagation()
                    navigateExpandedImage(1)
                  }}
                >
                  <span aria-hidden="true">→</span>
                </button>
              </>
            )}
            {expandedAsset.kind === 'image' ? (
              <img src={expandedAsset.src} alt={expandedAsset.alt} onClick={(event) => event.stopPropagation()} />
            ) : (
              <video
                muted={siteMuted || mediaViewerOpen || isMediaViewerOpen}
                src={expandedAsset.src}
                poster={expandedAsset.poster}
                controls
                autoPlay
                playsInline
                onClick={(event) => event.stopPropagation()}
              />
            )}
          </div>,
          document.body,
        )}
    </>
  )
}
